const app = getApp();
Component({
  
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    titleIndex:{  //默认是待接单事件那里
      type: Number,
      value : 0
    }
  },
 
  /**
   * 组件的初始数据
   */
  data: {
    dialogShow: false, //弹层属性
    mask: true,
    maskCosable: false,
    dialogContent: "",
    buttons: [{ text: '取消' }, { text: '确认' }],

    handHeigth: 100,
    display: true,    //搜索框状态
    waitReceipt: false, //待接单状态
    notPrinted: true,  //未打印状态
    delivered: true,  //待送货状态
    unpaid: true,     //未付款状态
    arrears: true,    //欠款状态
    accepted: true,   //已收款状态
    totalRecordsNum: '' , //items里显示 订单的总数
    items: ["待接单", "未打印", "待送货", "未付款", "欠款", "已收款"],
    startData: "开始时间",
    endData: "结束时间",
    deliveredObj: {/*  待送货对象  */
      saleTotal: 0,     /*销售总额*/
      retreatTotal: ''   /*退货总额*/
    },
    unpaidObj: {/*  未付款对象  */
      saleUnpaidTotal: 0,      /*未付款总额*/
      retreatUnpaidTotal: 0    /*退货总额*/
    },
    arrearsObj: {/*  欠款对象  */
      salesArrears: 0,            /*销售欠款*/
      arrearsHaveCollected: 0,   /*欠款已收*/
      arrearstoCollected: 0        /*欠款待收*/
    },
    acceptedObj: {/*  已收款对象  */
      saleReceived: 0,            /*销售已收*/
      saleActualReceipt: 0,       /*销售实收*/
      saleShouldRefunded: 0,      /*销售应退*/
      saleRetreat: 0              /*销售实退*/
    },
    list:[],
    mold:0
  },

  ready(){
    let titleIndex = this.data.titleIndex;
    this.titleMethod(titleIndex , this);
  },
  

  /**
   * 组件的方法列表
   */
  methods: {

    getData() {
      console.log("刷新数据")
    },


    //点击标题导航栏事件
    handleHeadItemClick(e) {
      let that = this;
      if (this.data.currentTab === e.target.dataset.index) {
        return false;
      } else {
        let titleIndex = e.target.dataset.index;
        this.titleMethod(titleIndex,this)
        this.triggerEvent('indextap', { titleIndex: titleIndex}, {});
      }
    },

    //方法
    titleMethod(titleIndex , that){  //待接单
      if (titleIndex == 0) {
        that.setData({
          list: [],
          handHeigth: 100,
          display: true,
          waitReceipt: false,
          notPrinted: true,
          delivered: true,
          unpaid: true,
          arrears: true,
          accepted: true,
          totalRecordsNum:''
        });
        that.waitingOrder(1);
      } else if (titleIndex == 1) {  //未打印
        that.setData({
          list: [],
          handHeigth: 175,
          display: false,
          waitReceipt: true,
          notPrinted: false,
          delivered: true,
          unpaid: true,
          arrears: true,
          accepted: true,
          totalRecordsNum: ''
        });
        that.notPrintedOrder(1, '', '');
      } else if (titleIndex == 2) { //待送货   
        that.setData({
          list: [],
          handHeigth: 240,
          display: false,
          waitReceipt: true,
          notPrinted: true,
          delivered: false,
          unpaid: true,
          arrears: true,
          accepted: true,
          totalRecordsNum: ''
        });
        this.stayDeliveredOrder(1 , '' ,'' ,'');
      } else if (titleIndex == 3) { //未付款
        that.setData({
          list: [],
          handHeigth: 240,
          display: false,
          waitReceipt: true,
          notPrinted: true,
          delivered: true,
          unpaid: false,
          arrears: true,
          accepted: true,
          totalRecordsNum: ''
        });
        this.unpaidOrder(1 ,'' , '','','','');
      } else if (titleIndex == 4) { //欠款
        that.setData({
          list: [],
          handHeigth: 240,
          display: false,
          waitReceipt: true,
          notPrinted: true,
          delivered: true,
          unpaid: true,
          arrears: false,
          accepted: true,
          totalRecordsNum: ''
        })
      } else if (titleIndex == 5) { //已收款
        that.setData({
          list: [],
          handHeigth: 290,
          display: false,
          waitReceipt: true,
          notPrinted: true,
          delivered: true,
          unpaid: true,
          arrears: true,
          accepted: false,
          totalRecordsNum: ''
        })
      }
    },


    //点击搜索框搜索
    handleInputSearch() {
      console.log("点击搜索")
    },

    //扫一扫事件
    _saoClick() {
      wx.scanCode({
        success: (res) => {
          var path = res.path
          console.log(res.result)

        }
      })
    },
    //开始时间
    _handleStartDataClick(event) {
      this.setData({
        startData: event.detail.value
      })
    },
    //结束时间
    _handleEndDataClick(event) {
      this.setData({
        endData: event.detail.value
      })
    },

    //点击进入订单详情页面事件
    handleOrderDetailClick(){
      wx.navigateTo({
        url: '/pages/views/business/sales/orderDetail/orderDetail',
      })
    },

    //开启弹层事件
    handleReceiptClick(event){
      var dialogContent = '';
      var dialogShow = true;
      if(event.target.dataset.msg == '接单'){
        dialogContent = '确认接单?'
      } else if (event.target.dataset.msg == '拒单'){
        dialogContent = '拒绝订单?'
      } else if (event.target.dataset.msg == '修改订单'){
        dialogShow = false;
        wx.navigateTo({
          url: '/pages/views/business/sales/updataSaleOrder/updataSaleOrder?title='+ 2222,
        })
      } else if (event.target.dataset.msg == '保存订单') {
        dialogContent = '确定保存?'
      } else if (event.target.dataset.msg == '取消订单') {
        dialogContent = '取消订单?'
      } else if (event.target.dataset.msg == '打印') {
        dialogContent = '打印?'
      } else if (event.target.dataset.msg == '确认送达') {
        dialogContent = '订单已送达?'
      } else if (event.target.dataset.msg == '付款') {
        dialogContent = '付款?'
      } else if (event.target.dataset.msg == '完成收款') {
        dialogContent = '完成收款?'
      }


      this.setData({
        dialogShow: dialogShow,
        dialogContent: dialogContent,
      })
    },
    //弹窗操作按钮事件
    tapDialogButton(){
      this.setData({
        dialogShow:false
      })
    },
    bindfocus(event){
      this.setData({
        layerHeight: event.detail.height 
      })
    },


    //待接单接口方法
    waitingOrder(pageNo){
      app.post(app.globalData.businessHost +'/order/waitingOrder',{pageNo: pageNo}).then((res) => {
        let data = res;
        this.setData({
          list: data.records,
          totalRecordsNum: data.totalRecordsNum
        })
      }).catch((res) => {
        wx.showToast({
          title: res,
          icon: 'none'
        })
      });
    },
    
    /**
     * 未打印订单接口方法
     * @pageNo 页数
     * @name 名称
     * @number 订单号
     */
    notPrintedOrder(pageNo, name, number){
      app.post(app.globalData.businessHost+'/order/notPrintedOrder', { pageNo: pageNo, name: name ,number: number }).then((res) => {
        let data = res
        this.setData({
          list: data.records,
          totalRecordsNum: data.totalRecordsNum
        })
      }).catch((res) => {
        wx.showToast({
          title: res,
          icon: 'none'
        })
      });
    },
    /**
     * 待送货订单接口方法
     * @pageNo 页数
     * @name 名称
     * @number 订单号
     * @staffName 员工名称
     */
    stayDeliveredOrder(pageNo, name, number, staffName){
      app.post(app.globalData.businessHost +'/order/stayDelivered',{pageNo , name , number , staffName}).then((res) => {
          let data = res;
          this.setData({
            list: data.records,
            totalRecordsNum: data.totalRecordsNum,
            ['deliveredObj.saleTotal'] : res.hashMap.sale,
            ['deliveredObj.retreatTotal']: res.hashMap.return
          })
      });
    },
    /**
     * 待送货订单接口方法
     * @pageNo 页数
     * @name 名称
     * @number 订单号
     * @staffName 员工名称
     * @startTime 开始时间
     * @endTime 结束时间
     */
    unpaidOrder(pageNo, name, number, staffName, startTime, endTime){
      app.post(app.globalData.businessHost +'order/unpaidOrder', { pageNo: pageNo, name: name, number: number, staffName: staffName, startTime:        startTime, endTime: endTime }).then((res) => { 
        let data = res;
        this.setData({
          list: data.records,
          totalRecordsNum: data.totalRecordsNum,
          ['unpaidObj.saleUnpaidTotal']: res.hashMap.price,
          ['unpaidObj.retreatUnpaidTotal']: res.hashMap.retreat_price
        })
      });
    }

    

  }, //.......methods


  
})
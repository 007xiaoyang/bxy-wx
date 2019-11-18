// pages/component/business/sales/sales.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {

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
    currentTab: 0,
    display: true,    //搜索框状态
    waitReceipt: false, //待接单状态
    notPrinted: true,  //未打印状态
    delivered: true,  //待送货状态
    unpaid: true,     //未付款状态
    arrears: true,    //欠款状态
    accepted: true,   //已收款状态
    items: ["待接单", "未打印", "待送货", "未付款", "欠款", "已收款"],
    startData: "开始时间",
    endData: "结束时间",
    deliveredObj: {/*  待送货对象  */
      saleTotal: 0,     /*销售总额*/
      retreatTotal: 0   /*退货总额*/
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

  

  /**
   * 组件的方法列表
   */
  methods: {
    //点击标题导航栏事件
    handleHeadItemClick(e) {
      let that = this;
      if (this.data.currentTab === e.target.dataset.index) {
        return false;
      } else {

        if (e.target.dataset.index == 0) {
          that.setData({
            handHeigth: 100,
            currentTab: e.target.dataset.index,
            display: true,
            waitReceipt: false,
            notPrinted: true,
            delivered: true,
            unpaid: true,
            arrears: true,
            accepted: true
          })
        } else if (e.target.dataset.index == 1) {
          that.setData({
            handHeigth: 175,
            currentTab: e.target.dataset.index,
            display: false,
            waitReceipt: true,
            notPrinted: false,
            delivered: true,
            unpaid: true,
            arrears: true,
            accepted: true
          })
        } else if (e.target.dataset.index == 2) {
          that.setData({
            handHeigth: 240,
            currentTab: e.target.dataset.index,
            display: false,
            waitReceipt: true,
            notPrinted: true,
            delivered: false,
            unpaid: true,
            arrears: true,
            accepted: true
          })
        } else if (e.target.dataset.index == 3) {
          that.setData({
            handHeigth: 240,
            currentTab: e.target.dataset.index,
            display: false,
            waitReceipt: true,
            notPrinted: true,
            delivered: true,
            unpaid: false,
            arrears: true,
            accepted: true
          })
        } else if (e.target.dataset.index == 4) {
          that.setData({
            handHeigth: 240,
            currentTab: e.target.dataset.index,
            display: false,
            waitReceipt: true,
            notPrinted: true,
            delivered: true,
            unpaid: true,
            arrears: false,
            accepted: true
          })
        } else if (e.target.dataset.index == 5) {
          that.setData({
            handHeigth: 290,
            currentTab: e.target.dataset.index,
            display: false,
            waitReceipt: true,
            notPrinted: true,
            delivered: true,
            unpaid: true,
            arrears: true,
            accepted: false
          })
        }
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
    }

  },
  attached() {
   
  }
})
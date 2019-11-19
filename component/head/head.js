// component/top/top.js
Component({

  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    
    largeHeight:{    /*内容区域的高度，必须要设置*/ 
      type: Number,
      value: 0
    },
    type: {           /*input输入框类型，默认text*/ 
      type: String,
      value: 'text'
    },
    placeholder: {     /*input输入框占位符placeholder*/ 
      type: String,
      value: ''
    },
    placeholderStyle: {  /*input输入框占位符样式placeholder*/ 
      type: String ,
      value: 'font-size:25rpx'
    },
    confirmType: {       /*手机键盘右下角按钮类型，默认搜索*/ 
      type: String ,
      value: 'search',
    },
    startDate: {         /*开始时间搜索内容*/ 
      type: String,
      value: '开始时间'
    },
    endDate: {           /*结束时间搜索内容*/ 
      type: String,
      value: '结束时间'
    },

    mode: {              /*顶部内容要展示的区域 */  
      type: String,
      value: ''
    },
    modeLable: {          /*顶部内容要展示的区域 （标题）*/ 
      type: String,
      value: ''
    },
    labelText: {       /*顶部内容要展示的区域*/ 
      type: Array,
      value: []
    }

  },



  /**
   * 组件的初始数据
   */
  data: {
    show: true,
    shangIcon: '/assets/icons/shang.png',
    xiaIcon: '/assets/icons/xia.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {

    //输入框事件
    conFirmTap: function conFirmTap(e){
      var value = e.detail.value;
      this.triggerEvent('confirmtap', { value: value}, {});
    },

    //收缩事件
    shrinkTap: function shrinkTap(e) {
      var icon = e.currentTarget.dataset.icon;
      var height = e.currentTarget.dataset.height;
      this.setData({
        show: icon
      })
      this.triggerEvent('shrinktap', { height: height}, {});
    },

    //点击二维码事件
    scanTap: function scanTap(e){
      var type = e.currentTarget.dataset.type;
      this.triggerEvent("scantap", { type: type},{})
    },

    //挑选时间事件
    changeDateTap: function changeDateTap(e){
      var value = e.detail.value;
      var date = e.currentTarget.dataset.date;
      this.triggerEvent("changedatetap", { value: value, date: date}, {})
    }
  }
})

// component/switch/switch.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    switchLoginShow:{
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //根据选择进入不同端的小程序
    loginTap(event) {
      var dataset = event.currentTarget;
      var logintype = dataset.dataset.logintype;
      this.triggerEvent('logintap', { logintype: logintype }, {});
      wx.reLaunch({ url: '/pages/login/login?logintype=' + logintype})
    },
  }
})

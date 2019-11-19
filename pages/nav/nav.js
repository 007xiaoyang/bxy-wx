let app = getApp()
Page({
  data: {
    isShow: false,
    isSelectLoing: false,
    loginType: '',
    currentTab: 1,
    //这里只做tab名和显示图标
    items: [] ,
    
  },

  onLoad: function (option) {
    var that = this;
    var loginPhone = wx.getStorageSync("loginPhone");   
    var loginType = wx.getStorageSync("loginType");  
    if (loginPhone == null || loginPhone == '') {
      that.setData({
        isSelectLoing: true
      });
    } else {

      //获取用户登录信息application/x-www-form-urlencoded;charset=utf-8
      wx.request({
        url: app.globalData.host + '/shopApp/getUserLoginInfo',
        method: 'POST',
        data: { loginPhone: loginPhone, loginType: loginType},
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          that.setData({ isShow: true, loginType: res.data.data.loginType});
          that.menuMethod(res.data.data.loginType)
        },
        fail: function (res) {
          wx.showToast({
            title: '服务器异常',
            icon: 'none',
            duration: 1000,
            mask: true
          })
        }
      })
     
    }
 
  },




  //根据选择进入不同端的小程序
  handleSelectClick(event){
    var dataset = event.currentTarget;
    var logintype = dataset.dataset.logintype;
    if (logintype == 1 || logintype == 2 ){
      wx.reLaunch({
        url: '/pages/login/login?logintype=' + logintype
      })
    }else{
      this.menuMethod(logintype);
      this.setData({
        isShow: true,
        isSelectLoing: false,
        loginType: logintype
      })
    }
  },
  menuMethod(logintype){
    if (logintype == 1) {
      this.setData({
        items: [{
          "text": "销售订单",
          "iconPath": "/assets/icons/business/xs-off.png",
          "selectedIconPath": "/assets/icons/business/xs-on.png"
        },
        {
          "text": "财务管理",
          "iconPath": "/assets/icons/business/cw-off.png",
          "selectedIconPath": "/assets/icons/business/cw-on.png"
        },
        {
          "text": "采购订单",
          "iconPath": "/assets/icons/business/cg-off.png",
          "selectedIconPath": "/assets/icons/business/cg-on.png"
        },
        {
          "text": "库存管理",
          "iconPath": "/assets/icons/business/ck-off.png",
          "selectedIconPath": "/assets/icons/business/ck-on.png"
        },
        {
          "text": "资料中心",
          "iconPath": "/assets/icons/business/zl-off.png",
          "selectedIconPath": "/assets/icons/business/zl-on.png"
        }]
      });
    } else if (logintype == 2) {
      this.setData({
        items: [{
          "text": "订单",
          "iconPath": "/assets/icons/staff/dd-off.png",
          "selectedIconPath": "/assets/icons/staff/dd-on.png"
        },
        {
          "text": "共享",
          "iconPath": "/assets/icons/staff/gx-off.png",
          "selectedIconPath": "/assets/icons/staff/gx-on.png"
        },
        {
          "text": "功能",
          "iconPath": "/assets/icons/staff/gn-off.png",
          "selectedIconPath": "/assets/icons/staff/gn-on.png"
        },
        {
          "text": "我的",
          "iconPath": "/assets/icons/staff/rx-off.png",
          "selectedIconPath": "/assets/icons/staff/rx-on.png"
        }]
      });
    } else if (logintype == 0) {
      this.setData({
        items: [{
          "text": "首页",
          "iconPath": "/assets/icons/user/home-off.png",
          "selectedIconPath": "/assets/icons/user/home-on.png"
        },
        {
          "text": "消息",
          "iconPath": "/assets/icons/user/xx-off.png",
          "selectedIconPath": "/assets/icons/user/xx-on.png"
        },
        {
          "text": "购物车",
          "iconPath": "/assets/icons/user/gwc-off.png",
          "selectedIconPath": "/assets/icons/user/gwc-on.png"
        },
        {
          "text": "我的",
          "iconPath": "/assets/icons/user/wd-off.png",
          "selectedIconPath": "/assets/icons/user/wd-on.png"
        }]
      });
    }
  },

  //点击底部导航栏事件
  swichNav: function (e) {
    let that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})

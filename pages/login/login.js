// pages/login/login.js
var app = getApp()
Page({


  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    isPassword: true,
    loginType: '1',
    loginFormObj: [],

  },

  onLoad(option) {
    this.setData({
      loginType: 1
    })
  },

  //点击闭眼睛图片触发事件
  handlebiyanjingIcon() {
    this.setData({
      isPassword: false
    })
  },
  //点击睁眼图片触发事件
  handlezhegnyanjingIcon() {
    this.setData({
      isPassword: true
    })
  },

  //输入框输入内容时触发事件
  handleBindInputValue(event) {
    var that = this;
    var dataset = event.currentTarget.dataset;
    var name = dataset.name;
    //拼接对象属性名，用于赋值对象属性
    var loginFormOrder = 'loginFormObj.' + name;

    //获取input框输入的值 ,并且赋值
    var inputValue = event.detail.value;
    that.data[name] = inputValue;
    that.setData({
      [loginFormOrder]: that.data[name]
    })
  },


  //点击登录触发事件
  handleFormSubmit(event) {
    var data = this.data;
    wx.request({
      url: app.globalData.host + 'business/login',
      data: {
        role: data.loginType,
        phone: data.loginFormObj.loginAccount,
        password: data.loginFormObj.loginPassword
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        var info = res.data.info;
        if (res.data.code == 1) {
          wx.showToast({
            title: '登录成功，正在为您跳转。。',
            icon: 'none',
            duration: 1000,
            mask: true
          });
          //把号码和登录类型数据缓存起来
          wx.setStorageSync('loginPhone', data.loginFormObj.loginAccount);
          wx.setStorageSync('loginType', data.loginType);
          //修改登录信息
          wx.request({
            url: app.globalData.host + 'shopApp/updataUserLoginInfo',
            data: {
              token: res.data.data,
              role: data.loginType,
              loginPhone: data.loginFormObj.loginAccount,
              loginType: data.loginType
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function(res) {
              wx.navigateTo({
                url: "/pages/nav/nav"
              });
            }
          });

        } else {
          wx.showToast({
            title: info,
            icon: 'none',
            duration: 1000,
            mask: true
          })
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '服务器发生错误',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    })

  },
})
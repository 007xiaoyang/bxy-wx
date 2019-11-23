// pages/login/login.js
var app = getApp()
Page({


  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    isPassword: true,
    loginType: '',
    loginFormObj: [],

  },

  onLoad(option) {
    let loginType = option.logintype;
    this.setData({
      loginType: loginType
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
    let url = '';
    let data = this.data;
    let phone = data.loginFormObj.loginAccount;
    let password = data.loginFormObj.loginPassword
    let role = data.loginType;
    if (this.data.loginType == 0) {
      url = app.globalData.userHost + '/user/login.do'
    } else {
      url = app.globalData.businessHost + '/business/login'
    }
    //登录
    app.post(url, { phone: phone, password: password, role: role}).then((res) =>{
      wx.showToast({
        title: '登录成功，正在为您跳转。。',
        icon: 'none',
        duration: 1300,
        mask: true
      });
      //把号码和登录类型数据缓存起来
      wx.setStorageSync('loginPhone', phone);
      wx.setStorageSync('loginType', role);
      wx.setStorageSync('token', res);
      //修改登录信息
      wx.request({
        url: app.globalData.businessHost + '/shopApp/updataUserLoginInfo',
        data: {
          token: res,
          role: role,
          loginPhone: phone,
          loginType: role
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          wx.reLaunch({
            url: "/pages/index/index"
          });
        },
        fail: function (res) {
          wx.showToast({
            title: '服务器发生错误',
            icon: 'none',
            duration: 1000,
            mask: true
          });
        }

      }); //......修改登录信息....
    }); //.....post

  }, //......handleFormSubmit
})
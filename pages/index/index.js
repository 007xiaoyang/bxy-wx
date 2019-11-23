let app = getApp()
Page({
  data: {
    titleIndex: 3, // 销售订单标题里的下标
    loginPhone: '',
    loginType: '' , //登录类型，也就是角色 ，1店铺 ，2员工 ，0 用户
    isShow: false, //内容组件是否显示 ，默认是不显示的
    current: 0 , //tabbar导航栏下标   ，默认0下标
    switchLoginShow: false , //切换登录按钮 ， 默认不显示，根据是否登录后再进行开启
    list: []  
      
  },

  //页面初始化加载
  onLoad: function (option) {
    var that = this;
    var loginPhone = wx.getStorageSync("loginPhone");
    var loginType = wx.getStorageSync("loginType");
    this.setData({
      loginPhone: loginPhone,
      loginType : loginType
    });
    if (loginPhone != null && loginPhone != "") {
      //获取用户登录信息application/x-www-form-urlencoded;charset=utf-8
      wx.request({
        url: app.globalData.host + 'shopApp/getUserLoginInfo',
        method: 'POST',
        data: { loginPhone: loginPhone, loginType: loginType },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        dataType: 'json',
        responseType: 'text',
        success: function (res) {},
        fail: function (res) {
          wx.showToast({
            title: '服务器异常',
            icon: 'none',
            duration: 1000,
            mask: true
          })
        }
      });
    }
  }, //....onLoad()........

  //每次进来都进行刷新组件
  onShow(){
    let loginPhone = this.data.loginPhone;
    let loginType = this.data.loginType;
    if(loginPhone == null || loginPhone == ''){
      this.setData({
        switchLoginShow : true
      });
    }else{
      //此作用是为了刷新组件
      this.setData({isShow: false});
      this.setData({
        isShow: true,
        loginPhone: loginPhone,
        loginType: loginType
      });
      this.menuMethod(loginType);
    }
  },

  //监听销售订单标题回调事件
  bindIndexTap(e) {
    let titleIndex = e.detail.titleIndex;
    this.setData({
      titleIndex: titleIndex
    })
  },


  //监听点击导航栏回调事件
  tabChange(e) {
    let currentTap = e.detail.index;
    this.setData({
      current: currentTap
    }) 
  },
  

  //导航栏菜单方法
  menuMethod(logintype) {
    if (logintype == 1) {
      this.setData({
        list: [{
          "text": "销售订单",
          "iconPath": "/assets/icons/business/xs-off.png",
          "selectedIconPath": "/assets/icons/business/xs-on.png",
          "badge": 0
        },
        {
          "text": "财务管理",
          "iconPath": "/assets/icons/business/cw-off.png",
          "selectedIconPath": "/assets/icons/business/cw-on.png",
          "badge": 0
        },
        {
          "text": "采购订单",
          "iconPath": "/assets/icons/business/cg-off.png",
          "selectedIconPath": "/assets/icons/business/cg-on.png",
          "badge": 0
        },
        {
          "text": "库存管理",
          "iconPath": "/assets/icons/business/ck-off.png",
          "selectedIconPath": "/assets/icons/business/ck-on.png",
          "badge": 0
        },
        {
          "text": "资料中心",
          "iconPath": "/assets/icons/business/zl-off.png",
          "selectedIconPath": "/assets/icons/business/zl-on.png",
          "badge": 0
        }]
      });
    } else if (logintype == 2) {
      this.setData({
        items: [{
          "text": "订单",
          "iconPath": "/assets/icons/staff/dd-off.png",
          "selectedIconPath": "/assets/icons/staff/dd-on.png",
          "badge": 0
        },
        {
          "text": "共享",
          "iconPath": "/assets/icons/staff/gx-off.png",
          "selectedIconPath": "/assets/icons/staff/gx-on.png",
          "badge": 0
        },
        {
          "text": "功能",
          "iconPath": "/assets/icons/staff/gn-off.png",
          "selectedIconPath": "/assets/icons/staff/gn-on.png",
          "badge": 0
        },
        {
          "text": "我的",
          "iconPath": "/assets/icons/staff/rx-off.png",
          "selectedIconPath": "/assets/icons/staff/rx-on.png",
          "badge": 0
        }]
      });
    } else if (logintype == 0) {
      this.setData({
        items: [{
          "text": "首页",
          "iconPath": "/assets/icons/user/home-off.png",
          "selectedIconPath": "/assets/icons/user/home-on.png",
          "badge": 0
        },
        {
          "text": "消息",
          "iconPath": "/assets/icons/user/xx-off.png",
          "selectedIconPath": "/assets/icons/user/xx-on.png",
          "badge": 0
        },
        {
          "text": "购物车",
          "iconPath": "/assets/icons/user/gwc-off.png",
          "selectedIconPath": "/assets/icons/user/gwc-on.png",
          "badge": 0
        },
        {
          "text": "我的",
          "iconPath": "/assets/icons/user/wd-off.png",
          "selectedIconPath": "/assets/icons/user/wd-on.png",
          "badge": 0
        }]
      });
    }
  }
});
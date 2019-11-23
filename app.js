App({
  onLaunch: function () {
  },

  //封装请求函数
  post: function (url, data) {
    var token = wx.getStorageSync("token");
    var role = wx.getStorageSync("loginType");
    var defaultParam = { token: token, role: role };
    data = this.extend(defaultParam , data);
    var promise = new Promise((resolve, reject) => {
      
      var that = this;
      wx.showLoading({
        title: '加载中',
      });
      
      //网络请求
      wx.request({
        url:  url,
        data: data,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          if (res.data.code == 1) {          
            resolve(res.data.data);
          } else {                                    
            reject(res.data.info);
          }
        },
        fail: function (e) {
          reject('网络出错，请联系管理员！');
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    });
    return promise;
  },
  extend: function (data, dataExtend) {
    var res = {};
    for (var key in data) {
      res[key] = data[key];
    }
    for (var key in dataExtend) {
      res[key] = dataExtend[key];
    }
    return res;
  },

  //路径
  globalData:{
    //host: "http://localhost:8089/"
    businessHost: "https://www.bxy8888.com:8443",
    userHost: "https://www.bxy8888.com:8888"
  }
})

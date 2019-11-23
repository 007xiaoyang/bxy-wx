// pages/views/business/finance/purchase/purchase.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    largeHeight: 155,   /**  顶部到内容的高度*/
    startDate: '开始时间',
    endDate: '结束时间',
    labelText: [{
      oneName: '已到货采购金额',
      oneNum: '0',
      twoName: '采购欠款金额',
      twoNum: '0',
      threeName: '采购未付金额',
      threeNum: '0',
      fourName: '采购应付金额',
      fourNum: '0',
      fiveName: '采购实付金额',
      fiveNum: '0'
    }]
  },

  //输入框点击完成事件回调
  headleConfirmTap(e) {
    console.log(e)
  },

  //收缩事件回调
  headleShrinkTap(e) {
    var height = e.detail.height;
    if (height == 0) {
      height = 161
    }
    this.setData({
      largeHeight: height
    })
  },

  //扫一扫事件回调
  headleScanTap(e) {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: [],
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //时间回调事件
  headleChangeDatetTap(e) {
    var detail = e.detail;
    var date = detail.date;
    var dateValue = detail.value;
    this.setData({
      [date]: dateValue
    })
  }

})
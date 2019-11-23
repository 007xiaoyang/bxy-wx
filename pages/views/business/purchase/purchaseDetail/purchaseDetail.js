// pages/views/business/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    topHeight: 465,
    touchStartTime: 0,   // 触摸开始时间
    touchEndTime: 0,     // 触摸结束时间
    lastTapTime: 0,  // 最后一次单击事件点击发生时间
  },
  multipleTap(e) {
    let diffTouch = this.data.touchEndTime - this.data.touchStartTime;
    let curTime = e.timeStamp;
    let lastTime = this.data.lastTapDiffTime;
    this.data.lastTapDiffTime = curTime;
    //两次点击间隔小于300ms, 认为是双击
    let diff = curTime - lastTime;
    if (diff < 250) {
      let state = e.currentTarget.dataset.state;
      let height = state == true ? 465 : 245;
      clearTimeout(this.data.lastTapTimeoutFunc); // 成功触发双击事件时，取消单击事件的执行
      this.setData({
        show: state,
        topHeight: height
      })
    }
  },
  catchtouchmove() { return }
})
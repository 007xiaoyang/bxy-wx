
Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },
  properties: {
    title: {
      type: String,
      value: ''
    },
    extClass: {
      type: String,
      value: ''
    },
    //点击遮罩层是否关闭 ? true 关闭 false 不关闭
    maskClosable: {
      type: Boolean,
      value: true
    },
    mask: {
      type: Boolean,
      value: true
    },
    show: {
      type: Boolean,
      value: true,
      observer: '_showChange'
    },
    buttons: {
      type: Array,
      value: []
    },
    top: {
      type: Boolean,
      value: true
    },
    bottom:{
      type: Boolean,
      value: true
    },
    topBtn: {
      type: Boolean,
      value: false
    },
    bottomBtn: {
      type: Boolean,
      value: false
    }

  },
  data: {
    innerShow: false
  },
  ready: function ready() {
    var buttons = this.data.buttons;
    var len = buttons.length;
    buttons.forEach(function (btn, index) {
      if (len === 1) {
        btn.className = 'weui-dialog__btn_primary';
      } else if (index === 0) {
        btn.className = 'weui-dialog__btn_default';
      } else {
        btn.className = 'weui-dialog__btn_primary';
      }
    });
    this.setData({
      buttons: buttons
    });
  },

  methods: {
    buttonTap: function buttonTap(e) {
      var index = e.currentTarget.dataset.index;

      this.triggerEvent('buttontap', { index: index, item: this.data.buttons[index] }, {});
    },
    close: function close() {
      var data = this.data;
      if (!data.maskClosable) return;
      this.setData({
        show: false
      });
      this.triggerEvent('close', {}, {});
    },
    stopEvent: function stopEvent() { },
    catchtouchmove(){return }
  }
});

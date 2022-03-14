// pages/index/submit/process4/process4.js
Page({

    data: {
      active: 4,
    },
    gotoPageProcess3:function (options) {
    wx.navigateTo({
          url: '../process3/process3',//要跳转到的页面路径
    })
},
    gotoPageProcess5:function (options) {
    wx.navigateTo({
          url: '../process5/process5',//要跳转到的页面路径
    })
},
priceTap(e) {
    var value = e.detail.value;
    value = value.replace(/[^\d\.]|^\./g, '').replace(/\.{2}/g, '.').replace(/^([1-9]\d*|0)(\.\d{1,2})(\.|\d{1})?$/, '$1$2').replace(/^0\d{1}/g, '0');
    this.setData({
      ["editForm.priceFL"]: value
    })
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
})
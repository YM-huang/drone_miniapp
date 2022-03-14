// pages/index/submit/process3/process3.js
Page({
    data: {
      active: 3,
    },
    gotoPageProcess4:function (options) {
        wx.navigateTo({
              url: '../process4/process4',//要跳转到的页面路径
        })
    },
    gotoPageProcess2:function (options) {
        wx.navigateTo({
              url: '../process2/process2',//要跳转到的页面路径
        })
    },
    textareaInput1: function(e) {
        console.log(e.detail.value)
      },
      textareaInput2: function (e) {
        console.log(e.detail.value)
      },
      onChange(event) {
        wx.showToast({
          title: `切换到标签 ${event.detail.name}`,
          icon: 'none',
        });
      },
})
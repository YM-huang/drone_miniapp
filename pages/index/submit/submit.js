// pages/submit/submit.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
    },
    gotoPageProcess1:function (options) {
        wx.navigateTo({
              url: 'process1/process1',//要跳转到的页面路径
        })
    },
    onChange(event) {
        wx.showToast({
          title: `切换到标签 ${event.detail.name}`,
          icon: 'none',
        });
      },
})
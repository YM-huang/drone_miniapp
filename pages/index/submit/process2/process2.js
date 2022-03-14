// pages/index/submit/process1/process1.js
Page({
    data: {
        active: 2,
      },
    gotoPageProcess3:function (options) {
        wx.redirectTo({
              url: '../process3/process3',//要跳转到的页面路径
        })
    },
    gotoPageProcess1:function (options) {
        wx.navigateTo({
              url: '../process1/process1',//要跳转到的页面路径
        })
    }
})
// pages/profile/profile.js
Page({
    data: {
        orderList: [
        { icon: 'message.png', info: '我的账户' },
        { icon: 'pointer.png', info: '我的积分' },
        { icon: 'vip.png', info: '我的飞手' },
        { icon: 'vip.png', info: '我的发票' },
        { icon: 'vip.png', info: '我的单位' },
        { icon: 'vip.png', info: '我的签名' }
        ],
        serviceList: [
        { icon: 'cart.png', info: '客服中心' },
        { icon: 'app.png', info: '下载APP' },
        ]
    },
    gotoPageWallet() {
      wx.navigateTo({
            url: '/pages/my/wallet/wallet',//要跳转到的页面路径
      })  
   },
    gotoPageDiscount() {
        wx.navigateTo({
              url: '/pages/my/discount/discount',//要跳转到的页面路径
        })  
     },
     gotoPageHistory() {
      wx.navigateTo({
            url: '/pages/my/history/history',//要跳转到的页面路径
      })  
   },
     gotoPageRecord() {
      wx.navigateTo({
            url: '/pages/my/record/record',//要跳转到的页面路径
      })  
   },
   gotoPageSignin() {
    wx.navigateTo({
          url: '/pages/my/signin/signin',//要跳转到的页面路径
    })  
 },
     onDiscount(){
        wx.navigateTo({
          url: "/pages/my/discount/discount"
        });
      },
    onLoad: function (options) {

    },
}) 
// app.js
// var customer='';
App({
  onLaunch() {
    wx.cloud.init({
      env:"cloud1-4g02yqp27aa7e10a",
      traceUser:true
      })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})

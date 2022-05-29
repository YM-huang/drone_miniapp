// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    wx.cloud.init({
      env:"cloud2-2gwpfs6821514b01",
      traceUser:true
      })
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

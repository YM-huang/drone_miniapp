// pages/my/wallet/wallet.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address:'积分卡',
        balance:'0'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    copy:function(){
        var _this = this;
        wx.setClipboardData({
          data: _this.data.address,
          success: function (res) {
            wx.showToast({
              title: '已复制',
            })
          }
        })
      },
      gotoCollect:function(){
        wx.navigateTo({
          url: '../collectMoney/collectMoney',
        })
      },
      payMoney:function(){
        wx.scanCode({
          success:function(res){
            //console.log(res.result)
            var datas = res.result.split('+');
            var address = datas[0];
            var amount = datas[1];
            wx.navigateTo({
              url: '../amountinput/amountinput?address='+address+'&amount='+amount,
            })
          }
        })
      },
    //   gotoTransfer:function(){
    //     wx.navigateTo({
    //       url: '../transfer/transfer',
    //     })
    //   },
      gotoTransfer:function(){
        wx.navigateTo({
          url: '../addressinput/addressinput',
        })
      },
      fresh:function(){
        var _this = this;
        wx.showLoading({
          title: '',
        })
        wx.request({
          url: getApp().globalData.baseUrl + '/getBalance',
    
          data: {
            address: _this.data.address
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {
            wx.hideLoading();
            _this.setData({
              balance: res.data.balance
            })
          }
        })
      },
      gotoHis:function(){
        wx.navigateTo({
          url: '../history/history',
        })
      },

})
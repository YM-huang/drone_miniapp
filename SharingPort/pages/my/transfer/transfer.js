// pages/transfer/transfer.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      list:[],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
          height:getApp().globalData.height-135
        })
        var list = wx.getStorageSync('list');
        this.setData({
          list:list
        })
    },
    gotoinputaddress:function(){
      wx.navigateTo({
        url: '../addressinput/addressinput',
      })
    },
    gotoinput:function(e){
      var address = e.currentTarget.dataset.address;
      console.log(address);
      wx.navigateTo({
        url: '../amountinput/amountinput?address='+address,
      })
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
    
    }
  })
// pages/addressinput/addressinput.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      address:'',
      line:'100'
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    
    },
    getAddress:function(e){
      this.setData({
        address:e.detail.value
      })
    },
    submit:function(){
      var address = wx.getStorageSync('address');
      if(this.data.address==''){
        wx.showToast({
          title: '不能为空',
          image:'../img/error.png'
        })
        return ;
      } else if (this.data.address == address){
        wx.showToast({
          title: '请输入他人地址',
          image: '../img/error.png'
        })
        return;
      }
      var _this = this;
      //判断地址是否存在
      wx.request({
        url: getApp().globalData.baseUrl+'/isExit',
        method: 'POST',
        data: {
          to: _this.data.address
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success:function(res){
          if(res.data){
            //不存在
            wx.showToast({
              title: '地址不存在',
              image:'../img/error.png'
            })
            return ;
          }else{
            //地址存在
            wx.navigateTo({
              url: '../amountinput/amountinput?address='+_this.data.address,
            })
          }
        }
      })
    },
    getCopy:function(){
      var _this = this;
      wx.getClipboardData({
        success:function(res){
          _this.setData({
            address:res.data
          })
        }
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
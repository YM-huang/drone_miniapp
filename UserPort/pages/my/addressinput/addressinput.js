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
    async submit(){
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
      let that = this;
      var c1 = new wx.cloud.Cloud({
        // 资源方 小程序A的 AppID
        resourceAppid: 'wx145f71cc609485c9',
        // 资源方 小程序A的 的云开发环境ID
        resourceEnv: 'cloud1-4g02yqp27aa7e10a',
    })
      // 跨账号调用，必须等待 init 完成
          // init 过程中，资源方小程序对应环境下的 cloudbase_auth 函数会被调用，并需返回协议字段（见下）来确认允许访问、并可自定义安全规则
      await c1.init()
      // wx.cloud.database().collection('xiaoshitou').get()
      wx.cloud.callFunction({
        name:'getOpenid',
      }).then(res=>{
          // console.log(res)//res就将appid和openid返回了
          //做一些后续操作，不用考虑代码的异步执行问题。
          let _openid=res.result.OPENID
          c1.database().collection("cus_info").where({
            _openid: res.result.OPENID
          }).get()
          .then(res=>{
            // console.log(res)
            c1.database().collection("cus_info").where({
              _openid: _openid
            }).get()
            .then(res=>{
              // console.log(res.data[0].userInfo)
              let userInfo=res.data[0].userInfo.nickName;
                this.setData({
                  userInfo:userInfo
                })
                // console.log(userInfo)
            let nickName=userInfo;
            var data1={address,nickName}
            //确认订单后更新订单状态
              wx.cloud.callFunction({
                name:"updateMoney",
                data:{
                  address:data1.address,
                  nickName:nickName
                }
              }).then(res=>{
                // console.log(res)
              })
  
              wx.showToast({
                title: '充值成功',
              })
        })
      })
            // console.log(userInfo)
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
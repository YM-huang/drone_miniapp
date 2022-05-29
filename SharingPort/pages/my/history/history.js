// pages/my/history/history.js
var deliverList=[];
const db=wx.cloud.database();
var f_name='';
var nickName='';
Page({
    /**
     * 页面的初始数据
     */
    data: {
      userInfo:{},
      finshOrder:[]
    },
    onLoad(){
      this.getOpenid();
    },
    getOpenid(){
      let that = this;
      wx.cloud.callFunction({
        name:'getOpenid',
      }).then(res=>{
          console.log(res)//res就将appid和openid返回了
          //做一些后续操作，不用考虑代码的异步执行问题。
          let _openid=res.result.OPENID
          db.collection("f_info").where({
            _openid: res.result.OPENID
          }).get()
          .then(res=>{
            db.collection("f_info").where({
              _openid: _openid
            }).get()
            .then(res=>{
              // console.log(res.data[0].userInfo.nickName)
              let nickName=res.data[0].userInfo.nickName
                this.setData({
                  nickName:nickName
                })
                // console.log(nickName)
                db.collection("t_describe").where({
                  f_name:nickName
                }).get()
                .then(res=>{
                  let finshOrder=res
                    this.setData({
                      finshOrder:finshOrder.data
                    })
                    console.log(finshOrder)
                  })
                })
            })
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

    },
    gotoPagePoster() {
        wx.navigateTo({
              url: '/pages/my/poster/poster',//要跳转到的页面路径
        })  
     }
})
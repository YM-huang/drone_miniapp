// pages/userinfo/history/history.js
const db=wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '订单查询', //导航栏中间的标题
    },
    deliverList:[],
    confirmBoxVisible: false,//确认弹框的显示
  },
  /**
 * 生命周期函数--监听页面加载
 */
async onLoad() {
   this.getOpenid();
  // 声明新的 cloud 实例
  var c1 = new wx.cloud.Cloud({
    // 资源方 小程序A的 AppID
    resourceAppid: 'wx145f71cc609485c9',
    // 资源方 小程序A的 的云开发环境ID
    resourceEnv: 'cloud1-4g02yqp27aa7e10a',
})
      await c1.init()
      c1.database().collection('t_describe').get()
        .then(res => {
            console.log('共享环境请求数据成功',res.data)
            this.setData({
                deliverList:res.data
      })
  })
 this.refreshView = this.selectComponent("#refreshView")//刷新组件
  // console.log(deliverList)
},
check(){
    this.setData({
      confirmBoxVisible: true,
    })
    wx.navigateTo({
        url: '/pages/my/addcomment/addcomment',//要跳转到的页面路径
    }) 
  },
//关闭弹窗
close(){
    this.setData({
      confirmBoxVisible: false
    })
  },
async getOpenid(){
  let that = this;
  var c1 = new wx.cloud.Cloud({
    // 资源方 小程序A的 AppID
    resourceAppid: 'wx145f71cc609485c9',
    // 资源方 小程序A的 的云开发环境ID
    resourceEnv: 'cloud1-4g02yqp27aa7e10a',
})
   await c1.init()
  wx.cloud.callFunction({
    name:'getOpenid',
  }).then(res=>{
      console.log(res)//res就将appid和openid返回了
      //做一些后续操作，不用考虑代码的异步执行问题。
      let _openid=res.result.OPENID
      c1.database().collection("cus_info").where({
        _openid: res.result.OPENID
      }).get()
      .then(res=>{
        c1.database().collection("cus_info").where({
          _openid: _openid
        }).get()
        .then(res=>{
          // console.log(res.data[0].userInfo.nickName)
          let nickName=res.data[0].userInfo.nickName
            this.setData({
              nickName:nickName
            })
            // console.log(nickName)
            c1.database().collection("t_describe").where({
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

  }
})
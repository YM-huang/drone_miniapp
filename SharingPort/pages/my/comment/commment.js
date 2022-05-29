// pages/userinfo/history/history.js
const app = getApp()
var deliverList=[];
const db=wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nvabarData:{
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '进行中的订单', //导航栏 中间的标题
      photo:''
    },
    contentheight: 0,
    height: app.globalData.height * 2 + 20,   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    // this.getOpenid();
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
        console.log(res)//res就将appid和openid返回了
        //做一些后续操作，不用考虑代码的异步执行问题。
        let _openid=res.result.OPENID
        c1.database().collection("f_info").where({
          _openid: _openid
        }).get()
        .then(res=>{
          console.log(res.data)
          let photo=res.data[0].userInfo.avatarUrl;
          let tocustomer=res.data[0].userInfo.nickName;
          this.setData({
            photo:photo
          })
          c1.database().collection("t_describe").where({
            tocustomer: tocustomer
          }).get()
          .then(res=>{
            // console.log(res)
            let deliverList=res.data
              this.setData({
                deliverList:deliverList
              })
              // console.log(deliverList)
          })
          })
    })
  // 声明新的 cloud 实例
  //   var c1 = new wx.cloud.Cloud({
  //     // 资源方 小程序A的 AppID
  //     resourceAppid: 'wx145f71cc609485c9',
  //     // 资源方 小程序A的 的云开发环境ID
  //     resourceEnv: 'cloud1-4g02yqp27aa7e10a',
  // })
  //   // 跨账号调用，必须等待 init 完成
  //       // init 过程中，资源方小程序对应环境下的 cloudbase_auth 函数会被调用，并需返回协议字段（见下）来确认允许访问、并可自定义安全规则
  //       await c1.init()
  //     // wx.cloud.database().collection('xiaoshitou').get()
  //     c1.database().collection('t_describe').get()
  //         .then(res => {
  //             // console.log('共享环境请求数据成功',res.data)
  //             this.setData({
  //                 deliverList:res.data
  //             })
    // })
   this.refreshView = this.selectComponent("#refreshView")//刷新组件
  },
//  async getOpenid() {

//   },
  //触摸开始
  handletouchstart: function (event) {
    this.refreshView.handletouchstart(event)
  },
  //触摸移动
  handletouchmove: function (event) {
    this.refreshView.handletouchmove(event)
  },
  //触摸结束
  handletouchend: function (event) {
    this.refreshView.handletouchend(event)
  },
  //触摸取消
  handletouchcancel: function (event) {
    this.refreshView.handletouchcancel(event)
  },
  //页面滚动
  onPageScroll: function (event) {
    this.refreshView.onPageScroll(event)
  },
  onPullDownRefresh: function () {
    setTimeout(() => { this.refreshView.stopPullRefresh() }, 2000)
  }
})
// pages/userinfo/history/history.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '进行中的订单', //导航栏 中间的标题
    },
    deliverList: [],
    contentheight: 0,
    height: app.globalData.height * 2 + 20,   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    // 声明新的 cloud 实例
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
        c1.database().collection('f_task').get()
            .then(res => {
                console.log('共享环境请求数据成功', res)
            })

    this.refreshView = this.selectComponent("#refreshView")//刷新组件
    
    for (let i = 0; i < 4; i++){
            // console.log(singleData);
            let singleObject = {};
            singleObject = {
              torider: 'mm',//客户名
              sever_type: '服务类型',//服务类型选择
              meet_place: "保密",//交接地点
              unit_price: "178",//单价
              cus_details: "尽快送达",//客户的备注信息
              upload_time: "2021-03-24 15:33",//订单提交时间
              choose_rider: "singleData[6]",//选择骑手
              is_matched: '1',//是否匹配到骑手
              on_working: '1',//订单是否被配送
              is_outdata: "singleData[9]",//订单是否完成
              is_failed: "singleData[10]",//订单是否被遗弃
              shoppingId: "singleData[11]"//订单编号
            }
            // console.log(singleObject);
            this.setData({
              deliverList: this.data.deliverList.concat(singleObject)
            });
        }
          
       
  },
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
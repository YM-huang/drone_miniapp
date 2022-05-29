const db = wx.cloud.database()
const _= db.command;
var idx = 0;//便利的索引值
var deliverList= [];
var currentDeliverList=[];
var index=0;
var f_grade=0;
Page({
  data:{
    confirmBoxVisible: false,//确认弹框的显示
    array:['订单金额','发布时间'],
    time:""
  },
  // 确认接单
  confirm(event){
    idx = event.currentTarget.dataset.idx;
    console.log("当前的是",idx);
    this.setData({
      idx:event.currentTarget.dataset.idx
    })
  },  
  check(){
    this.setData({
      confirmBoxVisible: true,
    })
  },
  //关闭弹窗
  close(){
    this.setData({
      confirmBoxVisible: false
    })
  },
  // 获取后台数据库
  async getData(){
    // 获取数据库对象
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
      c1.database().collection('t_describe').get()
    .then(res=>{
        // console.log(res);
        this.setData({
          // confirmBoxVisible: true,
          deliverList:res.data
        })
      }
    )
  },
  //下单
async getOrder(event){
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
 //拿到该订单信息
  var id=event.currentTarget.dataset.id
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
          var data1={id,idx,nickName}
          //确认订单后更新订单状态
            wx.cloud.callFunction({
              name:"updateConfimed",
              data:{
                id:data1.id,
                nickName:nickName
              }
            }).then(res=>{
              // console.log(res)
            })
            this.close();
            wx.showToast({
              title: '接单成功',
            })
      })
    })
          // console.log(userInfo)
          })
  },
  async cancle(event){
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
 //拿到该订单信息
  var id=event.currentTarget.dataset.id
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
          var data1={id,idx,nickName}
          //确认订单后更新订单状态
            wx.cloud.callFunction({
              name:"updateQuit",
              data:{
                id:data1.id,
                nickName:nickName
              }
            }).then(res=>{
              // console.log(res)
            })
            this.close();
            wx.showToast({
              title: '取消成功',
            })
      })
    })
          // console.log(userInfo)
          })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
          this.getData();
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
          //监听订单状态表
          c1.database().collection("t_describe").watch({
            onChange:res=>{
              this.setData({
                deliverList:res.docs
            })
            },
            onError:err=>{
              console.log(err)
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

  },
  pickChange:function(e){
    this.setData({
      index:e.detail.value
    });
    console.log(e.detail.value)
    if(e.detail.value==0){
      db.collection("t_describe")
      .orderBy('unit_price','desc')
      .get()
      .then(res=>{
        console.log(res.data)
        this.setData({
          deliverList:res.data
        })
      })
    }
    if(e.detail.value==1){
      db.collection("t_describe")
      .orderBy('upload_time','desc')
      .get()
      .then(res=>{
        console.log(res.data)
        this.setData({
          deliverList:res.data
        })
      })
    }
  }
})
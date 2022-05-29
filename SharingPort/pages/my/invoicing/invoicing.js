// pages/userinfo/history/history.js=
// 云数据库设置
const db = wx.cloud.database()
// 聚合操作符
const _= db.command;
var idx = 0;//便利的索引值
var deliverList= [];
var currentDeliverList=[];
var index=0;
var f_grade=0;
// var data=[]
Page({
  /**
   * 页面的初始数据
   */
  data:{
    // nvabarData: {
    //   showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
    //   title: '开始接单', //导航栏 中间的标题
    // },
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
    //一个接单 骑手积分加100分
    // this.addGrade();
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
  getData(){
    // 获取数据库对象
    db.collection('t_describe').get()
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
  getOrder(event){
 //拿到该订单信息
  var id=event.currentTarget.dataset.id
  //  console.log(id)
  //  console.log(idx)
  //对象与索引绑定
    let that = this;
    wx.cloud.callFunction({
      name:'getOpenid',
    }).then(res=>{
        // console.log(res)//res就将appid和openid返回了
        //做一些后续操作，不用考虑代码的异步执行问题。
        let _openid=res.result.OPENID
        db.collection("f_info").where({
          _openid: res.result.OPENID
        }).get()
        .then(res=>{
          // console.log(res)
          db.collection("f_info").where({
            _openid: _openid
          }).get()
          .then(res=>{
            console.log(res.data[0].userInfo)
            let userInfo=res.data[0].userInfo.nickName;
              this.setData({
                userInfo:userInfo
              })
              // console.log(userInfo)
          let nickName=userInfo;
          var data1={id,idx,nickName}
          //  console.log(data)
          //确认订单后更新订单状态
            wx.cloud.callFunction({
              name:"updateMake",
              data:{
                id:data1.id,
                nickName:nickName
              }
            }).then(res=>{
              // console.log(res)
            })
            this.close();
            wx.showToast({
              title: '订单完成',
            })
    })
          })
          // console.log(userInfo)
          })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
          this.getData();
          //监听订单状态表
          db.collection("t_describe").watch({
            onChange:res=>{
              this.setData({
                deliverList:res.docs
            })
            },
            onError:err=>{
              console.log(err)
            }
          })
          // this.dateChange();
          // this.setData({
          //   deliverList: this.data.deliverList.concat(dataList)
          // });
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
    // console.log(e.detail.value)
    // // pick=e.detail.value
    // // console.log(4564)
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
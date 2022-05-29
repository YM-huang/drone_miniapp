// pages/userinfo/history/history.js
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
      // sever_type:"快递代拿",//服务类型选择
      // meet_place:"五餐门口",//交接地点
      // unit_price:1.0,//单价
      // choose_rider:"rider",//选择骑手
      // cus_details:"无",//客户的备注信息
      // is_matched:true,//是否匹配到骑手
      // upload_time:"2020/5/20",//订单提交时间
      // torider:"rider",//骑手名
      // tocustomer:"customer",//客户名
      // on_working:true,//订单是否被配送
      // is_outdata:true,//订单是否完成
      // is_failed:true//订单是否被遗弃
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
       c1.database().collection("cus_info").where({
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
  },
  
    /**
     * 生命周期函数--监听页面加载
     */
    // onLoad: function (options) {   
          // for(let i=0;i<3;i++){
          //   var singleData = new Array();
          //     // console.log(singleData);
          //     let singleObject = {};
          //     singleObject={
          //       tocustomer: 'MM',//客户名
          //       sever_type: 'singleData[1]',//服务类型选择
          //       meet_place: 'singleData[2]',//交接地点
          //       unit_price: 'singleData[3]',//单价
          //       cus_details: 'singleData[4]',//评价
          //       upload_time: 'singleData[5]',//订单提交时间
          //       choose_rider: 'singleData[6]',//选择飞手
          //       is_matched: '1',//是否匹配到骑手
          //       on_working: '1',//订单是否被配送
          //       is_outdata: '1',//订单是否完成
          //       is_failed: '0'//订单是否被遗弃
          //     }
          //     // console.log(singleObject);
          //     this.setData({
          //       deliverList: this.data.deliverList.concat(singleObject)
          //     });
            
          // }
          // console.log(this.data.deliverList);
        
  
    // },
  
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
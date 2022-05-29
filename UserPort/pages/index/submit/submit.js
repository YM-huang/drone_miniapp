// pages/userinfo/history/history.js
var index = 0;//便利的索引值
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '开始接单', //导航栏 中间的标题
    },
    // visible:true,//本条代拿选项是否可见
    confirmBoxVisible: false,//确认弹框的显示
    deliverList: [],
    currentDeliverList:{},
    array:['时间','路线长短','距离远近','价格'],
    index:0
    // sever_type: "快递代拿",//服务类型选择
    // meet_place: "五餐门口",//交接地点
    // unit_price: 1.0,//单价
    // choose_rider: "瞿智健",//选择骑手
    // cus_details: "无",//客户的备注信息
    // is_matched: true,//是否匹配到骑手
    // upload_time: "2020/5/20",//订单提交时间
    // torider: "瞿智健",//骑手名
    // tocustomer: "吴亦炜",//客户名
    // on_working: true,//订单是否被配送
    // is_outdata: true,//订单是否完成
    // is_failed: true//订单是否被遗弃
  },
  //显示弹窗口
  confirm: function (event) {
    this.setData({
      confirmBoxVisible: true,
    })
    index = event.currentTarget.dataset.index;
    console.log(index);
    this.setData({
      currentDeliverList: this.data.deliverList[index]
    });
    console.log("当前的deliverList是" + this.data.currentDeliverList);
  },  
  close: function () {
    this.setData({
      confirmBoxVisible: false,
    })
  },
  //下单
  getOrder: function (event){
    // let index = event.currentTarget.dataset.index;
    console.log(index);
    let deliverListItem = "deliverList[" + index + "].is_matched";
    this.setData({
      [deliverListItem]: "1",
    });

    wx.request({
      url: 'http://upstairs.sidcloud.cn/usersystem/wechat/updata_list.php',
      method: 'POST',
      data: {
        // sever_type: this.data.sever_type,//服务类型
        // meet_place: this.data.meet_place,//交接地点
        // unit_price: this.data.unit_price,//单价
        // cus_details: this.data.cus_details,//客户的备注信息
        is_matched: 1,//是否匹配到骑手
        // upload_time: this.data.submitTime,//订单提交时间
        torider: "17816125217",//骑手名
        // tocustomer: this.data.tocustomer,//客户名
        on_working: 1,//订单是否被配送
        is_outdata: 0,//订单是否完成
        is_failed: 0,//订单是否被遗弃
        id: this.data.currentDeliverList.shoppingId,//订单id
        // submitTime: this.data.submitTime,  //返回用户提交订单的时间作为时间凭据
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        // console.log(util.formatTime)
        console.log(result.data)
        // console.log("upload successfully");
        wx.showToast({
          title: '接单成功！',
          icon: 'success',
          duration: 1500
        })
      },
      fail: () => {
        console.log("getinf fails")
      },

      complete: () => {
        console.log("getinfo completes")
      },
    })
   
    this.close();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let singleObject = {};
    singleObject = {
      tocustomer: "singleData[0]",//客户名
      sever_type: "无人机配送",//服务类型选择
      meet_place: "浙江工业大学屏峰校区",//交接地点
      unit_price: "7800",//单价
      cus_details: "请尽快送达哦~",//客户的备注信息
      upload_time: "20210302 15:33",//订单提交时间
      choose_rider: "singleData[6]",//选择骑手
      is_matched: '0',//是否匹配到骑手
      on_working: "singleData[8]",//订单是否被配送
      is_outdata: "singleData[9]",//订单是否完成
      is_failed: "singleData[10]",//订单是否被遗弃
      shoppingId: "singleData[11]"//订单编号
    }
    // console.log(singleObject);
    this.setData({
      deliverList: this.data.deliverList.concat(singleObject)
    });
    for (let i = 0; i < 4; i++) {
            // console.log(singleData);
            
            singleObject = {
              tocustomer: "singleData[0]",//客户名
              sever_type: "服务类型",//服务类型选择
              meet_place: "我家",//交接地点
              unit_price: "7800",//单价
              cus_details: i+1,//客户的备注信息
              upload_time: "20210302 15:33",//订单提交时间
              choose_rider: "singleData[6]",//选择骑手
              is_matched: '0',//是否匹配到骑手
              on_working: "singleData[8]",//订单是否被配送
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
  }

  
})
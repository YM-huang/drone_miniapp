// pages/fabu/form/form.js
var util = require("../../../utils/util.js");
//引入事先写好的日期设置util.js文件
var datePicker = require('../../../utils/dateSetting.js')
 
//设定当前的时间，将其设定为常量
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
Page({
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标  1表示显示  0表示不显示
      title: '发布订单', //导航栏 中间的标题
    },
    confirmBoxVisible:false,//确认弹框的显示
    // serviceName:'',//界面显示的服务类型
    // currentDeliverList: {},//选择的骑手信息

    sever_type:'',//服务类型
    meet_place:"",//交接地点
    unit_price:Number,//单价
    // choose_rider:"",//选择骑手
    cus_details:"",//客户的备注信息
    is_matched:0,//是否匹配到骑手
   
    // torider:"",//骑手名
    tocustomer:"",//客户名
    // on_working:0,//订单是否被配送
    // is_outdata:0,//订单是否完成
    // is_failed:0,//订单是否被遗弃
    // shoppingId:"1",
    // upload_time:"",  //返回用户提交订单的时间作为时间凭据
    meet_place:'',
    t_endtime: '',
    t_starttime: '',
    multiArray: [],
    multiIndex: [0, 0, 0, 0, 0],
    choose_year: "",
    active: 1,
  },
  chooseRider:function(){
    wx.navigateTo({
      url: '../chooserider/chooserider',
    })
  },
  getUserProfile(e){
    
  },
  inputtype:function(e){
    let sever_type = e.detail.value;
    this.setData({ sever_type});
    
  },
  inputphone:function(e){
    let t_contact = e.detail.value;
    this.setData({ t_contact});
  },
  inputconsignee:function(e){
    let t_consignee = e.detail.value;
    this.setData({ t_consignee});
  },
  inputprice:function(e){
    let unit_price = e.detail.value;
    if (unit_price<1) {
      this.setData({ unit_price:1});
      wx.showToast({
        title: '请检查！',  
        icon: 'loading',   
        duration: 500 
      })}
    else this.setData({ unit_price});
  },

  inputmeet:function(e){
    let meet_place = e.detail.value;
    this.setData({ meet_place});
  },
  inputreceive:function(e){
    let receive_place = e.detail.value;
    this.setData({ receive_place});
  },

  inputdetails: function (e) {
    let cus_details = e.detail.value;
    this.setData({ cus_details });
  },

  dataChange:function(e) {
    console.log("datachange");
    console.log(e);
    let time = e.detail.value;
    this.setData({selectTime:time});
  },
  confirm:function(e){
    this.setData({
      confirmBoxVisible: true,
    })
  },
  close:function(){
    this.setData({
      confirmBoxVisible: false,
    })
  },
  // async getCusname(){
  //   var c1 = new wx.cloud.Cloud({
  //     // 资源方 小程序A的 AppID
  //     resourceAppid: 'wx145f71cc609485c9',
  //     // 资源方 小程序A的 的云开发环境ID
  //     resourceEnv: 'cloud1-4g02yqp27aa7e10a',
  // })
  //   // 跨账号调用，必须等待 init 完成
  //       // init 过程中，资源方小程序对应环境下的 cloudbase_auth 函数会被调用，并需返回协议字段（见下）来确认允许访问、并可自定义安全规则
  //     await c1.init()
  //     // wx.cloud.database().collection('xiaoshitou').get()
  
  // },
  async btnSub(res){
    // 声明新的 cloud 实例
    var c1 = new wx.cloud.Cloud({
      // 资源方 小程序A的 AppID
      resourceAppid: 'wx145f71cc609485c9',
      // 资源方 小程序A的 的云开发环境ID
      resourceEnv: 'cloud1-4g02yqp27aa7e10a',
    })

    await c1.init()
    // console.log(res)
    var {meet_place,receive_place,t_starttime,t_endtime,cus_details,unit_price,sever_type,t_contact,t_consignee}=res.detail.value;
    var unit_price=Number(unit_price)
    var t_contact=Number(t_contact)
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
          let tocustomer=res.data[0].userInfo.nickName;
          this.setData({
            tocustomer:tocustomer
        })
        c1.database().collection('t_describe').add({
          data: {
            meet_place,
            receive_place,
            t_starttime,
            t_endtime,
            cus_details,
            unit_price,
            sever_type,
            tocustomer:tocustomer,
            t_contact,
            is_matched:false,
            t_consignee,
            upload_time:util.formatTime(new Date()),
          }
        })
        .then(res => {
          console.log(res)
          this.close()
        }),
        //目前不涉及支付功能 直接跳转到首页
        wx.showToast({
          title: '发布订单',
          success:
          wx.switchTab({
            url: '../index',
          })
        })
      })
})
   
    //后续改善
    //1.确认订单后 跳转到支付订单页面 
  
    //2.支付完成后 跳转到首页
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){
    this.setData({
        multiArray:
          [
            [year + "年", year + 1 + "年", year + 2 + "年"],
            datePicker.determineMonth(),
            datePicker.determineDay(year, month),
            datePicker.determineHour(),
            datePicker.determineMinute()
          ],
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

  //最后呈现时间的函数。
  bindMultiPickerChange1: function (e) {
    var dateStr = this.data.multiArray[0][this.data.multiIndex[0]] +
      this.data.multiArray[1][this.data.multiIndex[1]] +
      this.data.multiArray[2][this.data.multiIndex[2]] +
      this.data.multiArray[3][this.data.multiIndex[3]] +
      this.data.multiArray[4][this.data.multiIndex[4]];
    this.setData({
      t_starttime: dateStr
    })
  },
  //最后呈现时间的函数。
  bindMultiPickerChange2: function (e) {
    var dateStr = this.data.multiArray[0][this.data.multiIndex[0]] +
      this.data.multiArray[1][this.data.multiIndex[1]] +
      this.data.multiArray[2][this.data.multiIndex[2]] +
      this.data.multiArray[3][this.data.multiIndex[3]] +
      this.data.multiArray[4][this.data.multiIndex[4]];
    this.setData({
      t_endtime: dateStr
    })
  },
  //当时间选择器呈现并进行滚动选择时间时调用该函数。
  bindMultiPickerColumnChange: function (e) {
    //e.detail.column记录哪一行发生改变，e.detail.value记录改变的值（相当于multiIndex）
    switch (e.detail.column) {
      //这里case的值有0/1/2/3/4,但除了需要记录年和月来确定具体的天数外，其他的都可以暂不在switch中处理。
      case 0:
        //记录改变的年的值
        let year = this.data.multiArray[0][e.detail.value];
        this.setData({
          choose_year: year.substring(0, year.length - 1)
        })
        break;
      case 1:
        //根据选择的年与月，确定天数，并改变multiArray中天的具体值
        let month = this.data.multiArray[1][e.detail.value];
        let dayDates = datePicker.determineDay(this.data.choose_year, month.substring(0, month.length - 1));
        //这里需要额外注意，改变page中设定的data，且只要改变data中某一个值，可以采用下面这种方法
        this.setData({
          ['multiArray[2]']: dayDates
        })
        break;
    }
    //同上，上面改变的是二维数组中的某一个一维数组，这个是改变一个一维数组中某一个值，可供参考。
    this.setData({
      ["multiIndex[" + e.detail.column + "]"]: e.detail.value
    })
  },
})
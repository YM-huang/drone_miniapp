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
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '发布订单', //导航栏 中间的标题
    },
    confirmBoxVisible:false,//确认弹框的显示
    serviceName:'',//界面显示的服务类型
    currentDeliverList: {},//选择的骑手信息

    sever_type:'',//服务类型
    meet_place:"",//交接地点
    unit_price:Number,//单价
    choose_rider:"",//选择骑手
    cus_details:"",//客户的备注信息
    is_matched:0,//是否匹配到骑手
    upload_time:"",//订单提交时间
    torider:"",//骑手名
    tocustomer:"",//客户名
    on_working:0,//订单是否被配送
    is_outdata:0,//订单是否完成
    is_failed:0,//订单是否被遗弃
    shoppingId:"1",
    submitTime:"",  //返回用户提交订单的时间作为时间凭据
    time1: '',
    time2: '',
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
  onGotUserInfo: function (e) {
    let tocustomer = e.detail.userInfo.nickName;
    this.setData({tocustomer});
    console.log("用户名" + this.data.tocustomer);
  },//获取用户信息函数

  type:function(e){ 
    let sever_type = e.detail.value;
    this.setData({
      serviceName: sever_type
    });
    switch (sever_type) {
      case "代拿快递": sever_type = 0, this.setData({ sever_type }); break;
      case "代拿外卖": sever_type = 1, this.setData({ sever_type }); break;
      case "食堂代拿": sever_type = 2, this.setData({ sever_type }); break;
      case "超市代买": sever_type = 3, this.setData({ sever_type }); break;
    }
   
  },

  inputechophone:function(e){
    let tocustomer = e.detail.value;
    this.setData({ tocustomer});
  },

  inputecho1:function(e){
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

  inputecho2:function(e){
    let meet_place = e.detail.value;
    this.setData({ meet_place});
  },

  inputecho3: function (e) {
    let cus_details = e.detail.value;
    this.setData({ cus_details });
  },

  dataChange:function(e) {
    console.log("datachange");
    console.log(e);
    let time = e.detail.value;
    this.setData({selectTime:time});
  },
  confirm:function(){
    this.setData({
      confirmBoxVisible: true,
    })
    let time = util.formatTime(new Date());
    this.setData({
      submitTime: time
    });
  },
  close:function(){
    this.setData({
      confirmBoxVisible: false,
    })
  },
  submit:function(e){
    if (this.data.meet_place === "" || this.data.unit_price === "" || this.data.time1 === '' || this.data.time2 === '' || this.data.tocustomer === ""){
        if (this.data.tocustomer === "") {
            console.log("submit failed");
            wx.showToast({
              title: '请选择联系方式',
              icon: 'loading',
              duration: 1000
            })
          } 
      if (this.data.meet_place === "") {
        console.log("submit failed");
        wx.showToast({
          title: '请选择飞行位置',
          icon: 'loading',
          duration: 1000
        })
      } 
      if (this.data.unit_price === "") {
        console.log("submit failed");
        wx.showToast({
          title: '请选择订单金额',
          icon: 'loading',
          duration: 1000
        })
      }
      if (this.data.time1 === '') {
        console.log("submit failed");
        wx.showToast({
          title: '请选择起始时间',
          icon: 'loading',
          duration: 1000
        })
      }
      if (this.data.time2 === '') {
        console.log("submit failed");
        wx.showToast({
          title: '请选择结束时间',
          icon: 'loading',
          duration: 1000
        })
      }
    }
    else{
      wx.showToast({
        title: '提交成功！',  
        icon: 'success',   
        duration: 1500 
      })
      console.log("submit success");
      this.close();
      let time = util.formatTime(new Date());
      this.setData({
        submitTime:time
      });
    wx.request({
      url: 'http://upstairs.sidcloud.cn/usersystem/wechat/post_list.php',
      method: 'POST',
      data:{
        sever_type: this.data.sever_type,//服务类型
        meet_place: this.data.meet_place,//交接地点
        unit_price: this.data.unit_price,//单价
        cus_details: this.data.cus_details,//客户的备注信息
        is_matched: this.data.is_matched,//是否匹配到骑手
        upload_time: this.data.submitTime,//订单提交时间
        torider: this.data.torider,//骑手名
        tocustomer: this.data.tocustomer,//客户名
        on_working: this.data.on_working,//订单是否被配送
        is_outdata: this.data.is_outdata,//订单是否完成
        is_failed: this.data.failed,//订单是否被遗弃
        shoppingId: 1,//订单id
        submitTime: this.data.submitTime,  //返回用户提交订单的时间作为时间凭据
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        // console.log(util.formatTime)
        console.log(result.data)
        console.log("upload successfully");
      },
      fail: () => {
        console.log("getinf fails")
      },

      complete: () => {
        console.log("getinfo completes")
      },
    })

     //!!!!!!!!!! 这里填写提交订单后的数据回传 !!!!!!!!!!!!!
     setTimeout(function() {
      wx.switchTab({
        url: '../fabu'
      })
    }, 1500)
    
    }
    
},

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
      time1: dateStr
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
      time2: dateStr
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
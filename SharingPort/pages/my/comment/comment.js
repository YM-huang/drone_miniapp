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
    onLoad: function (options) {   
          for(let i=0;i<3;i++){
            var singleData = new Array();
              // console.log(singleData);
              let singleObject = {};
              singleObject={
                tocustomer: 'MM',//客户名
                sever_type: 'singleData[1]',//服务类型选择
                meet_place: 'singleData[2]',//交接地点
                unit_price: 'singleData[3]',//单价
                cus_details: 'singleData[4]',//评价
                upload_time: 'singleData[5]',//订单提交时间
                choose_rider: 'singleData[6]',//选择飞手
                is_matched: '1',//是否匹配到骑手
                on_working: '1',//订单是否被配送
                is_outdata: '1',//订单是否完成
                is_failed: '0'//订单是否被遗弃
              }
              // console.log(singleObject);
              this.setData({
                deliverList: this.data.deliverList.concat(singleObject)
              });
            
          }
          console.log(this.data.deliverList);
        
  
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
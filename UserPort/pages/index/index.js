Page({
  data: {
    imgItems: [
      "../../images/index.jpg",
      "../../images/index2.jpg",
      "../../images/index2.jpg"
    ],
      activeKey: 0,
      show: true,
      indicatorDots: true,  //是否显示面板指示点
      autoplay: true,      //是否自动切换
      interval: 3000,       //自动切换时间间隔
      duration: 1000,       //滑动动画时长
      inputShowed: false,
      inputVal: "",
      circular:true,

      // 首页侧滑
      open: false,
      // mark 是指原点x轴坐标
      mark: 0,
      // newmark 是指移动的最新点的x轴坐标 
      newmark: 0,
      istoright: true,
      addflag:true, //判断是否显示搜索框右侧部分
      addimg:"icon/签到.png",
      confirmBoxVisible: false,//确认弹框的显示
      deliverList: [],
      currentDeliverList: {},
      is_working: true,
      info:["labulafu","dululu"],
  },
    gotoPageNewerTeach:function (options) {
    wx.navigateTo({
          url: 'teaching/teaching',//要跳转到的页面路径
    })  
 },
    gotoPageSubmit:function (options) {
    wx.navigateTo({
          url: 'submit/submit',//要跳转到的页面路径
    })  
},
gotoPageParse:function (options) {
  wx.navigateTo({
        url: 'wxParse/wxParse',//要跳转到的页面路径
  })  
},
gotopageRank:function (options) {
  wx.navigateTo({
    url: '/pages/my/rank/rank',
  })
},
onShareAppMessage: function (res) {
  return {
    title: '我在用小程序查询无人机说明，快一起来用~',
    desc: '可以及时了解无人机的情况哦~~',
    path: 'pages/index/index',
    success: function (res) {
      // 转发成功
    },
    fail: function (res) {
      // 转发失败
    }
  }
},
  // 点击左上角小图标事件
  tap_ch: function(e) {
    if (this.data.open) {
        this.setData({
            open: false
        });
    } else {
        this.setData({
            open: true
        });
    }
  },
  tap_start: function(e) {
    // touchstart事件
    // 把手指触摸屏幕的那一个点的 x 轴坐标赋值给 mark 和 newmark
    this.data.mark = this.data.newmark = e.touches[0].pageX;
  },
  tap_drag: function(e) {
    // touchmove事件
    this.data.newmark = e.touches[0].pageX;
    // 手指从左向右移动
    if (this.data.mark < this.data.newmark) {
        this.istoright = true;
    }
    // 手指从右向左移动
    if (this.data.mark > this.data.newmark) {
        this.istoright = false;
    }
    this.data.mark = this.data.newmark;
  },
  tap_end: function(e) {
    // touchend事件
    this.data.mark = 0;
    this.data.newmark = 0;
    // 通过改变 opne 的值，让主页加上滑动的样式
    if (this.istoright) {
        this.setData({
            open: true
        });
    } else {
        this.setData({
            open: false
        });
    }
  },
  switch_work: function (e) {//改变骑手工作状态
    console.log(e.detail.value);
    this.setData({ is_working: e.detail.value });
    wx.request({
      url: '',
      data: {//?需不需要发送骑手的电话号码
        is_active: e.detail.value?1:0
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        console.log(result.data);
      },
      fail: () => {
        console.log("post failed");
      },
      complete: () => {
        console.log("post complete");
      }

    })
  },
  post:function(){//测试
    wx.showToast({
      title: '努力开发中...',
    })
    wx.request({
      url: '', 
      data: {
        id:1
      },   
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        console.log(result.data);
      },
      fail: () => {
        console.log("post failed");
      },
      complete: () => {
        console.log("post complete");
      }

    })
  },
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
  completeOrder: function (event) {
    // let index = event.currentTarget.dataset.index;
    console.log(index);
    let deliverListItem = "deliverList[" + index + "].is_outdata";
    this.setData({
      [deliverListItem]: "1",
    });
    wx.showToast({
      title: '订单已完成',
      icon: 'success',
      duration: 1500
    }),
      this.close();
  },


  onLoad: function (options) {
    wx.request({
      url: '',//判断is_match==1并且on_working==1
      data: {
        is_matched: 1,
        on_working: 1
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        // console.log(result);
        var arr = result.data;    //绑定数据到Data.gotmsg
        console.log("request successfully");
        console.log(arr);
        var dataList = new Array();
        dataList = arr.split("#$@#666");//切割返回的数据成为多条订单
        // console.log(dataList);
        for (let i = 0; i < dataList.length - 1; i++) {
          var singleData = new Array();
          if (dataList[i]) {
            singleData = dataList[i].split("#$@#$");
            switch (singleData[1]) {
              case "1": singleData[1] = "快递代拿"; break;
              case "2": singleData[1] = "外卖代拿"; break;
              case "3": singleData[1] = "食堂代拿"; break;
              case "4": singleData[1] = "超市代买"; break;
              default: singleData[1] = "无效服务";
            }

            // console.log(singleData);
            let singleObject = {};
            singleObject = {
              tocustomer: singleData[0],//客户名
              sever_type: singleData[1],//服务类型选择
              meet_place: singleData[2],//交接地点
              unit_price: singleData[3],//单价
              cus_details: singleData[4],//客户的备注信息
              upload_time: singleData[5],//订单提交时间
              choose_rider: singleData[6],//选择骑手
              is_matched: singleData[7],//是否匹配到骑手
              on_working: singleData[8],//订单是否被配送
              is_outdata: singleData[9],//订单是否完成
              is_failed: singleData[10]//订单是否被遗弃
            }
            // console.log(singleObject);
            this.setData({
              deliverList: this.data.deliverList.concat(singleObject)
            });
          }
        }
        console.log(this.data.deliverList);
      },

      fail: () => {
        console.log("getinf fails")
      },

      complete: () => {
        console.log("getinfo completes")
      },
    });
  },

  gotoworking:function(){
      wx.navigateTo({
        url: './working/working'　
      })
  },

  gotocustomer:function(){
    
    wx.navigateTo({
      url: './customer/customer'　
    })
  },

  gotodelivering:function(){
    wx.navigateTo({
      url: './delivering/delivering'
    })
  }
})
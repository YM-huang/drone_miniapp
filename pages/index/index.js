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
      addimg:"icon/签到.png"
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
})
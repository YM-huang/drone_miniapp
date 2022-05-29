
const app = getApp()
import WeCropper from './components/we-cropper.js'
const device = wx.getSystemInfoSync() // 获取设备信息
Page({

  /**
   * 页面的初始数据
   */

  data: {
    width: '',
    height: '',
    bg: "/images/live-bg.jpg",  //  海报背景
    wechat: "/images/wechat.png", //微信小程序二维码（正方形图片）
    uploadUrl: "", //上传的图片
    maskHidden: false,  // 是否生成海报
    name: "",  //用户昵称
    avatarUrl: "", //用户头像
    desc: "特斯特斯特",  // 用户简介
    hasUrl: false, //是否有上传图片
    wechatText: '共同见证公益力量',
    cropperOpt: {
      id: 'cropper',  // 用于手势操作的canvas组件标识符
      targetId: 'targetCropper',  // 用于用于生成截图的canvas组件标识符
      pixelRatio: device.pixelRatio,  // 传入设备像素比
      width: device.windowWidth * 0.68, // 画布宽度
      height: device.windowWidth * 0.68,  // 画布高度
      scale: 2.5, // 最大缩放倍数
      zoom: 8 // 缩放系数
    }
  },
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function () {

    var that = this;
    var width = that.data.width;
    var height = that.data.height;
    var context = wx.createCanvasContext('mycanvas');
    context.setFillStyle("#ffe200")
    context.fillRect(0, 0, width * 0.9, height * 0.9)
    context.drawImage(this.data.bg, 0, 0, width * 0.9, height * 0.9);
    context.drawImage(that.data.uploadUrl, width * 0.05, width * 0.05, width * 0.8, width * 0.8);
    context.save(); // 保存当前context的状态

    //绘制小程序二维码
    context.fillStyle = "#fff";
    context.fillRect(0, height * 0.9 - width * 0.25, width * 0.9, width * 0.3);
    context.drawImage(that.data.wechat, width * 0.05, height * 0.9 - width * 0.225, width * 0.2, width * 0.2);
    context.setFontSize(14);
    context.setFillStyle('#333333');
    context.setTextAlign('center');
    context.fillText("长按识别小程序", width * 0.5, height * 0.83);
    context.stroke();
    context.setFontSize(14);
    context.setFillStyle('#333333');
    context.setTextAlign('center');
    context.fillText(this.data.wechatText, width * 0.5, height * 0.857);
    context.stroke();
    //绘制名字
    context.setFontSize(16);
    context.setFillStyle('#333333');
    context.setTextAlign('center');
    context.fillText(that.data.name, width * 0.5, height * 0.68);
    context.stroke();
    //text
    context.setFontSize(14);
    context.setFillStyle('#333333');
    context.setTextAlign('center');
    context.fillText(this.data.desc, width * 0.5, height * 0.71);
    context.stroke();
    //绘制头像
    context.arc(width * 0.15, height * 0.68, width * 0.1, 0, 2 * Math.PI) //画出圆
    context.strokeStyle = "#ffe200";
    context.clip(); //裁剪上面的圆形
    context.drawImage(that.data.avatarUrl, width * 0.05, height * 0.68 - width * 0.1, width * 0.2, width * 0.2); // 在刚刚裁剪的园上画图
    context.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          that.setData({
            imagePath: tempFilePath,
            canvasHidden: true
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 200);
  },
  //点击保存到相册
  save: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              /* 该隐藏的隐藏 */
              that.setData({
                maskHidden: false
              })
            }
          }, fail: function (res) {
            console.log('fail')
          }
        })
      }
    })
  },
  //点击生成
  formSubmit: function (e) {
    var that = this;
    this.getCropperImage();
    this.setData({
      maskHidden: false
    });
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 1000
    });
    setTimeout(function () {
      wx.hideToast()
      that.createNewImg();
      that.setData({
        maskHidden: true
      });
    }, 1000)
  },
  // 获得上传的图片
  choose: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.cropper.pushOrign(res.tempFilePaths[0])
        that.setData({
          hasUrl: true
        })
      }
    })
  },
  remake: function () {
    this.setData({
      maskHidden: false
    })
  },
  touchStart(e) {
    this.cropper.touchStart(e)
  },
  touchMove(e) {
    this.cropper.touchMove(e)
  },
  touchEnd(e) {
    this.cropper.touchEnd(e)
  },
  // 获取截取后的图片
  getCropperImage() {
    var that = this;
    this.cropper.getCropperImage(function (path, err) {
      if (err) {
        wx.showModal({
          title: '温馨提示',
          content: err.message
        })
      } else {
        that.setData({
          uploadUrl: path
        })
        // wx.previewImage({
        //   current: '', // 当前显示图片的http链接
        //   urls: [path] // 需要预览的图片http链接列表
        // })
      }
    })
  },
  onGotUserInfo: function (e) {
    // 获取用户信息
    var that = this;
    this.setData({
      name: "miaomiao",
      avatarUrl: "miaomiao"
    })
    wx.downloadFile({
      url: "miaomiao",
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          that.setData({
            avatarUrl: res.tempFilePath
          })
        }
      }
    })
    this.formSubmit()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取用户信息
    // wx.getUserInfo({
    //   success: res => {
    //     console.log(res.userInfo.avatarUrl)
    //     this.setData({
    //       name: res.userInfo.nickName,
    //       avatarUrl:res.userInfo.avatarUrl
    //     })
    //     wx.downloadFile({
    //       url: res.userInfo.avatarUrl, 
    //       success: function (res) {
    //         // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
    //         if (res.statusCode === 200) {
    //           that.setData({
    //             avatarUrl: res.tempFilePath
    //           })
    //         }
    //       }
    //     })
    //   }
    // })
    wx.getSystemInfo({
      //获取系统信息成功，将系统窗口的宽高赋给页面的宽高  
      success: function (res) {
        that.setData({
          width: res.windowWidth,
          height: res.windowHeight
        })
      }
    })
    // we-cropper 初始化
    const { cropperOpt } = this.data
    this.cropper = new WeCropper(cropperOpt)
      .on('ready', function (ctx) {
        // console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        // console.log(`before picture loaded, i can do something`)
        // console.log(`current canvas context:`, ctx)
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        // console.log(`picture loaded`)
        wx.hideToast()
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

  }
})
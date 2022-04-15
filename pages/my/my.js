// pages/profile/profile.js
Page({
    data: {
        orderList: [
        { icon: 'message.png', info: '我的账户' },
        { icon: 'pointer.png', info: '我的积分' },
        { icon: 'vip.png', info: '我的飞手' },
        { icon: 'vip.png', info: '我的发票' },
        { icon: 'vip.png', info: '我的单位' },
        { icon: 'vip.png', info: '我的签名' }
        ],
        serviceList: [
        { icon: 'cart.png', info: '客服中心' },
        { icon: 'app.png', info: '下载APP' },
        ]
    },
    gotoPageWallet() {
      wx.navigateTo({
            url: '/pages/my/wallet/wallet',//要跳转到的页面路径
      })  
   },
    gotoPageDiscount() {
        wx.navigateTo({
              url: '/pages/my/discount/discount',//要跳转到的页面路径
        })  
     },
     gotoPageService() {
        wx.redirectTo({
            url: '/pages/chat/chat',
          })
     },
     gotoPageSetting() {
        wx.redirectTo({
            url: '/pages/my/setting/setting',
          })
     },
     gotoPageHistory() {
      wx.navigateTo({
            url: '/pages/my/history/history',//要跳转到的页面路径
      })  
   },
     gotoPageRecord() {
      wx.navigateTo({
            url: '/pages/my/record/record',//要跳转到的页面路径
      })  
   },
   gotoPageSignin() {
    wx.navigateTo({
          url: '/pages/my/signin/signin',//要跳转到的页面路径
    })  
 },
     onDiscount(){
        wx.navigateTo({
          url: "/pages/my/discount/discount"
        });
      },
    onLoad: function (options) {

    },
    gotoPageComment() {
        wx.navigateTo({
              url: '/pages/my/comment/commment',//要跳转到的页面路径
        })  
     },
    uploadAvatar:function(){
        wx.chooseImage({
          count: 1,//选取的图片张数
          sizeType: ['original', 'compressed'],//图片大小：原始或压缩
          sourceType: ['album', 'camera'],//图片来源：相册或拍照
          success: (res)=> {
            var tempFilePaths = res.tempFilePaths;
            // console.log(tempFilePaths);
            wx.uploadFile({
              url: 'http://upstairs.sidcloud.cn/usersystem/wechat/head/index.php',
              // filePath: imagePath,
              filePath: tempFilePaths[0],
              name: 'img_src',//文件对应的key
              header: {
                "Content-Type": "multipart/form-data"
              },
              formData: {
                "user": "test",
              },
              success: (res) => {
                console.log("upload successfully");
                // let datas = JSON.parse(res.data);
                let imgUrl = res.data;
                this.setData({ imgUrl: imgUrl });
                console.log("图片地址是" + imgUrl);
              },
              fail: (res) => {
                console.log("avarar upload failed");
              }
            })
          },
        })
    
      },
}) 
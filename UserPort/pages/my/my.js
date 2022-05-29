// pages/profile/profile.js
var Customer=[];
const db=wx.cloud.database();
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
     gotoPageComment() {
        wx.navigateTo({
              url: '/pages/my/comment/comment',//要跳转到的页面路径
        })  
     },
     gotoPageAddComment() {
        wx.navigateTo({
              url: '/pages/my/tocomment/tocomment',//要跳转到的页面路径
        })  
     },
     gotoPageHistory() {
      wx.navigateTo({
            url: '/pages/my/history/history',//要跳转到的页面路径
      })  
   },
   gotoPageConfirmed() {
    wx.navigateTo({
          url: '/pages/my/confirmed/confirmed',//要跳转到的页面路径
    })  
 },
 gotoPageReqtickets() {
    wx.navigateTo({
          url: '/pages/my/reqtickets/reqtickets',//要跳转到的页面路径
    })  
 },
 gotoPageCancle(){
  wx.navigateTo({
    url: '/pages/my/cancle/cancle',//要跳转到的页面路径
})  
 },
     gotoPageRecord() {
      wx.navigateTo({
            url: '/pages/my/record/record',//要跳转到的页面路径
      })  
   },
   gotoPageSetting() {
    wx.navigateTo({
        url: '/pages/my/setting/setting',
      })
 },
   gotoPageSignin() {
    wx.navigateTo({
          url: '/pages/my/signin/signin',//要跳转到的页面路径
    })  
 },
 gotoPageFinished(){
  wx.navigateTo({
    url: '/pages/my/finished/finished',//要跳转到的页面路径
}) 
 },
     onDiscount(){
        wx.navigateTo({
          url: "/pages/my/discount/discount"
        });
      },
async onLoad() {
  // 声明新的 cloud 实例
  var c1 = new wx.cloud.Cloud({
    // 资源方 小程序A的 AppID
    resourceAppid: 'wx145f71cc609485c9',
    // 资源方 小程序A的 的云开发环境ID
    resourceEnv: 'cloud1-4g02yqp27aa7e10a',
})

  // 跨账号调用，必须等待 init 完成
      // init 过程中，资源方小程序对应环境下的 cloudbase_auth 函数会被调用，并需返回协议字段（见下）来确认允许访问、并可自定义安全规则
      await c1.init()
        let that = this;
        wx.cloud.callFunction({
          name:'getOpenid',
        }).then(res=>{
            console.log(res)//res就将appid和openid返回了
            //做一些后续操作，不用考虑代码的异步执行问题。
            let _openid=res.result.OPENID
            c1.database().collection("cus_info").where({
              _openid: res.result.OPENID
            }).get()
            .then(res=>{
              // console.log(res)
              c1.database().collection("cus_info").where({
                _openid: _openid
              }).get()
              .then(res=>{
                console.log(res.data[0].userInfo)
                let userInfo=res.data[0].userInfo
                  this.setData({
                    userInfo:userInfo
                  })
              })
              })
        })
  this.refreshView = this.selectComponent("#refreshView")//刷新组件
  // console.log(deliverList)
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
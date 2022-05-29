// const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
// var nickname='';
const db=wx.cloud.database();
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    inputPassword: true,
    checked: false
  },
  //是否选中
  checkedTap: function () {
    var checked = this.data.checked;
    if(checked){
        this.setData({
            "checked": !checked,
            "inputPassword": true
        })
    }
    else{
        this.setData({
            "checked": !checked,
            "inputPassword": false
        })
    }
  },
  onLoad(){
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  // getUserProfile(event) {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
  //   // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       let userInfo=res.userInfo;
  //       this.setData({
  //         userInfo: userInfo,
  //         hasUserInfo: true
  //       })
  //     },
  //   }),
  //   this.getData();
  // },
  getUserProfile(){
    var checked = this.data.checked;
    if(!checked){
        wx.showToast({
            title: '请勾选用户条款',
          })
    }
    else{
        wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
              let userInfo=res.userInfo;
              this.setData({
                userInfo: userInfo,
                hasUserInfo: true
              })
              wx.cloud.callFunction({
                name:"login",
                success:res=>{
               // 授权用户的openid
                let openId= res.result.openid;
                // console.log(res)
                db.collection('f_info').where({
                  // openid:openId
                }).get().then(ress => {
                  // 判断返回的data长度是否为0，如果为0的话就证明数据库中没有存在该数据，然后进行添加操作
                  if(ress.data.length==0){
                    // 云函数添加
                    wx.cloud.callFunction({
                      name:"userlistadd",  //该名字是云函数名字
                      data:{
                        // appid:appId ,//_openid 等参数是要回传给云函数的入参
                        openId: openId,
                        userInfo: userInfo
                      }
                    })
                // 用户已经存在数据库中，可以直接跳转到主界面
                  }else{
                    console.log("用户已经存在")
                    wx.switchTab({
                      url: '/pages/index/index'
                    })
            }
          })
          },fail(res){
            console.log("云函数login调用失败")
          }
            })
            },
          }),
      
          wx.switchTab({
            url: '/pages/index/index'
          })
    }
  },
  bindAccountInput(e) {
    this.setData({
      account: e.detail.value
    })
  },
  bindPasswordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },
  bindIdentity() {
    this.setData({
      isLoading: true
    })

    setTimeout(() => {
      this.setData({
        isLoading: false
      })
    }, 1000)

  }
})
//   data: {
//     avatarUrl: defaultAvatarUrl,
//   },
//   onChooseAvatar(e) {
//     const { avatarUrl } = e.detail 
//     this.setData({
//       avatarUrl,
//     })
//   },
//   // setFname(res){
//   //   // let nickname=res.detail.value
//   //   this.setData({
//   //     nickname:res.detail.value
//   //   })
//   // },
// getUserInfo: function(event) {
// // login云函数查询用户授权登陆的appid,openid
// console.log(event)
// wx.cloud.callFunction({
//   name: "login",
//   success(res){
//   // 授权用户的openid
//   let openId= res.result.openid
//   console.log(openId)
//   // 判断openid是否存在于数据库
//   db.collection('f_info').where({
//     openid:openId
//   }).get().then(ress => {
//     // 判断返回的data长度是否为0，如果为0的话就证明数据库中没有存在该数据，然后进行添加操作
//     if(ress.data.length==0){
//       // 云函数添加
//       wx.cloud.callFunction({
//         name:"userlistadd",  //该名字是云函数名字
//         data:{
//           // appid:appId ,//_openid 等参数是要回传给云函数的入参
//           openId: openId,
//           userInfo: event.detail.userInfo
//         }
//   })
//   // 用户已经存在数据库中，可以直接跳转到主界面
//     }else{
//       console.log("用户已经存在")
//       wx.switchTab({
//         url: '/pages/index/index'
//       })
//     }
//   })
//   },fail(res){
//     console.log("云函数login调用失败")
//   }
// })
//   },
  // onLoad: function () {
  //   getUserProfile
  // }


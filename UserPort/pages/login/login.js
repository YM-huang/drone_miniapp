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
  getUserProfile(){
    // this.setData({
    //     isLoading: true
    //   })
  
    //   setTimeout(() => {
    //     this.setData({
    //       isLoading: false
    //     })
    //   }, 1000)
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
              console.log(userInfo)
              wx.cloud.callFunction({
                name:"login",
                success:async (res)=>{
               // 授权用户的openid
                let openId= res.result.openid;
                // console.log(res)
                var c1 = new wx.cloud.Cloud({
                  // 资源方 小程序A的 AppID
                  resourceAppid: 'wx145f71cc609485c9',
                  // 资源方 小程序A的 的云开发环境ID
                  resourceEnv: 'cloud1-4g02yqp27aa7e10a',
              })
                    await c1.init();
                  c1.database().collection('cus_info').where({
                    // openid:openId
                }).get().then(ress => {
          //         // 判断返回的data长度是否为0，如果为0的话就证明数据库中没有存在该数据，然后进行添加操作
                  if(ress.data.length==0){
                    // console.log(userInfo)
                    // console.log(openId)
                    c1.database().collection("cus_info").add({
                      data:{
                          // _openid: openId,
                          userInfo: userInfo
                      }
                  })
          //       // 用户已经存在数据库中，可以直接跳转到主界面
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
          })
      
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
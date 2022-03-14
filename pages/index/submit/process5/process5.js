// pages/index/submit/process5/process5.js
Page({
    data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null,
    active: 5,
    },
    // submit函数
    gotoPageProcess4:function (e){
        wx.navigateTo({
              url: '../process4/process4',//要跳转到的页面路径
        })
    },
    
formSubmit: function (e) {
 
    var name = e.detail.value.name;
     
    var phone = e.detail.value.phone;
     
    // mobile
     
    var email = e.detail.value.email;
     
    var company = e.detail.value.mobile;
     
    var job = e.detail.value.job;
     
    var vip = e.detail.value.vip;
     
    if (name==""||phone==""||email==""||company==""||job==""||vip==""){
     
    wx.showModal({
     
    title: '提示',
     
    content: '请输入完整信息！',
     
    success: function (res) {
     
    if (res.confirm) {
     
    console.log('用户点击确定')
     
    }
     
    }
     
    })
     
    } else{
     
    console.log(e.detail.value)
     
    // detail
     
    }
     
    },
     
    loginBtnClick: function () {
     
    if (this.data.name.length == 0 || this.data.phone.length == 0) {
     
    this.setData({
     
    infoMess: '温馨提示：用户名和密码不能为空！',
     
    })
     
    } else {
     
    this.setData({
     
    infoMess: '',
     
    name: '用户名：' + this.data.userN,
     
    phone: '密码：' + this.data.passW
     
    })
     
    }
     
    },
     
     
     
    // 手机号部分
     
    inputPhoneNum: function (e) {
     
    let phoneNumber = e.detail.value
     
    if (phoneNumber.length === 11) {
     
    let checkedNum = this.checkPhoneNum(phoneNumber)
     
    }
     
    },
     
    checkPhoneNum: function (phoneNumber) {
     
    let str = /^1\d{10}$/
     
    if (str.test(phoneNumber)) {
     
    return true
     
    } else {
     
    wx.showToast({
     
    title: '手机号不正确',
     
    image: './../../../../images/fail.png'
     
    })
     
    return false
     
    }
     
    },
     
    // 邮箱验证部分
     
    inputemail: function (e) {
     
    let email = e.detail.value
     
    let checkedNum = this.checkEmail(email)
     
    },
     
    checkEmail: function (email) {
     
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
     
    if (str.test(email)) {
     
    return true
     
    } else {
     
    wx.showToast({
     
    title: '请填写正确的邮箱号',
     
    image: './../../../../images/fail.png'
     
    })
     
    return false
     
    }
     
    },onChange(event) {
        wx.showToast({
          title: `切换到标签 ${event.detail.name}`,
          icon: 'none',
        });
      },
})
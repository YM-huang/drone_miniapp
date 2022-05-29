// pages/my/rank/rank.js
const db = wx.cloud.database()
var index=0
// var fisrt=""
Page({
    /**
     * 页面的初始数据
     */
    data: {
        rankList:{}
    },
    //读取数据库数据
    // getData(){
    //     db.collection("f_info")
    //     .get()
    //     .then(res=>{
    //         this.setData({
    //             rankList:res.data
    //         })
    //         console.log(res.data)
    //     })
    // },
    //对数据库中里程总数进行排序
    getOrder(){
        db.collection("f_info").orderBy("f_grade","desc")
        .get()
        .then(res=>{
            let rankList=res.data
            this.setData({
                rankList:rankList
            })
            console.log(rankList)
            // console.log(rankList[0].userInfo.avatarUrl)
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getOrder()
    },
   
})
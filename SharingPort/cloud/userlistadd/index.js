// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    var openId=event.openId;
    var userInfo=event.userInfo;
    return await db.collection("f_info").add({
        data:{
            // appid:appid,
            _openid: openId,
            userInfo: userInfo
        }
    })
}
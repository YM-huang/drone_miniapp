// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event) => {
    var id =event.id;
    var f_name=event.nickName;
    return await db.collection("t_describe").doc(id).update({
        data:{
            t_state:3,
            f_name:f_name
        }
    })
    // return event;
}
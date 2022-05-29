// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 云函数入口函数
exports.main = async (event) => {
     // 声明新的 cloud 实例
    var c1 = new cloud.Cloud({
    // 资源方 小程序A的 AppID
    resourceAppid: 'wx145f71cc609485c9',
    // 资源方 小程序A的 的云开发环境ID
    resourceEnv: 'cloud1-4g02yqp27aa7e10a',
    })
    await c1.init()
    var id =event.id;
    var tocustomer=event.nickName;
    return await c1.database().collection("t_describe").doc(id).update({
        data:{
            t_state:4,
            tocustomer:tocustomer
        }
    })
    // return event;
}
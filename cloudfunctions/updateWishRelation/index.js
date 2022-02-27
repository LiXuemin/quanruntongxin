const cloud = require('wx-server-sdk')
cloud.init({
    env: 'dev'
})
const db = cloud.database()

exports.main = (event, context, callback) => {
    let wishId = event.wishId
    let nickName = event.nickName
    db.collection('wish_list').doc(wishId).update({
            // data 传入需要局部更新的数据
            data: {
                // 表示将 done 字段置为 true
                volunteerName: nickName,
                status: 2
            }
        })
        .then(console.log)
        .catch(console.error)
};
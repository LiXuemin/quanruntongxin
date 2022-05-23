const cloud = require('wx-server-sdk')
const axios = require('axios').default

cloud.init({
    env: 'dev-8grcb747413937fe'
})


function getUnionId(appid, secret, code, type) {
    axios.get('https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + "&secret=" + secret +
            "&js_code=" + code + "&grant_type=" + type)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

exports.main = (event, context, callback) => {
    const wxContext = cloud.getWXContext()
    console.log(wxContext)
    let code = event.code
    let appId = "wx91355c62a9806481"
    let appSecret = "f7e52c1d34b3ebdc2d1a4e1e02aaea43"
    let type = "authorization_code"
    getUnionId(appId, appSecret, code, type)

};
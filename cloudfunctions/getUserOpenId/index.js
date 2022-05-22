'use strict';
const cloud = require('wx-server-sdk')
cloud.init({
    env: 'dev-8grcb747413937fe'
})
exports.main = (event, context, callback) => {
    let code = event.code
    let appId = "wx91355c62a9806481"
    let appSecret = "f7e52c1d34b3ebdc2d1a4e1e02aaea43"
    let type = "authorization_code"
    wx.request({
        //TODO 云函数调用request
        // url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx91355c62a9806481&secret=f7e52c1d34b3ebdc2d1a4e1e02aaea43&js_code='+res.code+'&grant_type=authorization_code',
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        data: {
          appid: appId,
          secret: appSecret,
          js_code: code,
          grant_type: type
        },success  (res){
            console.log("获取openid", res,res.data)
        }
      })
    callback(null, event);
};
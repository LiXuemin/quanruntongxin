// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.cloud.init({
      env: 'dev-8grcb747413937fe',
      traceUser: true
    }),
    wx.login({
        success (res) {
          if (res.code) {
            console.log("登录成功！",res)
            wx.cloud.callFunction({
                // 云函数名称
                name: 'getUserOpenId',
                // 传给云函数的参数
                data: {
                   code: res.code
                },
                success: function (res) {
                    console.log("云函数获取",res)
                },
                fail: console.error
            })
            
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
  },
  _getUserInfo: function () {
    var userInfoStorage = wx.getStorageSync('user');
    if(!userInfoStorage) {
      var that = this;
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              wx.setStorageSync('user', res.userInfo)
            },
            fail: function() {
              console.log(res)
            }
          })
        }
      })
    }else {
      this.globalData.userInfo = userInfoStorage;
    }

  },
  globalData: {
    userInfo: null
  }
})
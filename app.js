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
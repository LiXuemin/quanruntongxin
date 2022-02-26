// pages/wishcontent/wishcontent.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        _id: '',
        address: '',
        age: 0,
        familyIntro: '',
        gender: true,
        number: '',
        status: 0,
        wish: ''

    },
    showModal(e) {
        this.setData({
            modalName: e.currentTarget.dataset.target
        })
    },
    hideModal(e) {
        this.setData({
            modalName: null
        })
    },
    confirmWish(e) {
        console.log(e.target.dataset.id)
        this.setData({
            modalName: null
        })
    },
    cancelWish(e) {
        this.setData({
            modalName: null
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("跳转到详情页", options)
        this.fetchWishData(options.wishId)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    /**
     * 获取心愿详细数据
     * @param wishId 心愿id
     */
    fetchWishData(wishId) {
        var self = this
        wx.cloud.database().collection('wish_list').doc(wishId).get({
            success: function (res) {
                // res.data 包含该记录的数据
                console.log(res.data)
                self.setData({
                    _id: res.data._id,
                    address: res.data.address,
                    age: res.data.age,
                    familyIntro: res.data.familyIntro,
                    gender: res.data.gender,
                    number: res.data.number,
                    status: res.data.status,
                    wish: res.data.wish
                })
            }
        })
    }
})
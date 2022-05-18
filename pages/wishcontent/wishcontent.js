// pages/wishcontent/wishcontent.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dialogShow: false,
        _id: '',
        address: '',
        age: 0,
        familyIntro: '',
        gender: true,
        number: '',
        status: 0,
        wish: '',
        buttons: [{ text: '取消' }, { text: '确定' }],
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    openConfirm: function () {
        this.setData({
            dialogShow: true
        })
    },
    //TODO 对话框完成事件绑定
    tapDialogButton(e) {
        const _btn = e.detail.item.text;
        console.log(e);
        if (_btn == '确定') {
            this.confirmWish(e)
        }
        this.setData({
            dialogShow: false,
            showOneButtonDialog: false
        })
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
    /**
     * 点击确定，保存用户和心愿的关系
     * 
     */
    confirmWish(e) {
        console.log(e.target.dataset.id)
        const app = getApp()
        this.saveUserWishRelation(e.target.dataset.id, app.globalData.nickName)
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
    },
    saveUserWishRelation(wishId, userNickName) {
        let that = this
        wx.cloud.callFunction({
            // 云函数名称
            name: 'updateWishRelation',
            // 传给云函数的参数
            data: {
                wishId: wishId,
                nickName: userNickName,
            },
            success: function (res) {
                console.log(res) // 3
                let options = {wishId: wishId}
                that.onLoad(options)
            },
            fail: console.error
        })
    }
})
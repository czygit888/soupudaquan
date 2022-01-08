const app = getApp().globalData
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        id: '',
        list: [],
        notHave: false,
    },
    // 封装当前页请求数据函数
    async getdata(id, page) {
        if (!this.data.notHave) {
            let which=wx.getStorageSync('which')
            console.log(which)
            let list = await app.$http({
                url: `/${which}/list`,
                data: {
                    id,
                    page
                }
            })
            if (list.length) {
                this.setData({
                    list: this.data.list.concat(list)
                })
            } else {
                this.setData({
                    notHave: true
                })
            }
        }
    },
    // 触底刷新
    onReachBottom() {
        // 触底增加页码
        let page = this.data.page + 1
        this.setData({
            page
        })
        this.getdata(this.data.id, this.data.page)
    },

    // 详情页
    todetail(e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/detail/detail?id=' + id,
        })
    },

    // 胶囊按钮事件
    _backtoLeft() {
        wx.navigateBack()
    },
    _backtoRight() {
        wx.navigateBack()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
//    获取歌曲id
        let id = options.id
        this.setData({
            id: id
        })
        this.getdata(this.data.id, this.data.page)

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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
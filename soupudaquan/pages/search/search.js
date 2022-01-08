// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        id: '',
        list: [],
        notHave: false,
        value: ''
    },
    // 去详情页
    todetail(e) {
        let id = e.currentTarget.dataset.id
        let index = e.currentTarget.dataset.index
        let which
        this.data.list[index].z_id ? (which = 'zhuanji') : (which = "category")
        console.log(which)
        wx.setStorageSync('which', which)
        wx.navigateTo({
            url: `/pages/detail/detail?id=${id}`
        })
    },
    // 封装请求数据函数
    getData() {
        return new Promise(async (resolve, reject) => {
            if (!this.data.notHave) {
                let ret = await getApp().globalData.$http({
                    url: '/search',
                    data: {
                        page: this.data.page,
                        value: this.data.value
                    }
                })
                resolve(ret)
            }

        })
    },
    // 搜索
    async search() {
        this.setData({
            page: 1,
            notHave: false,
        })
        let ret=await this.getData()
        if (ret.length) {
            this.setData({
                list: ret
            })
        } else {
            this.setData({
                notHave: true
            })
        }

    },
    // 保存输入框中的消息
    input(e) {
        let value = e.detail.value
        this.setData({
            value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
    onReachBottom: async function () {
        // 触底增加页码
        let page = this.data.page + 1
        this.setData({
            page
        })
        let ret=await this.getData()
        if (ret.length) {
            this.setData({
                list: this.data.list.concat(ret)
            })
        } else {
            this.setData({
                notHave: true
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
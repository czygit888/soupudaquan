const app = getApp().globalData
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: [],
        title: '搜谱大全',
        selected: false,
        id: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        let that = this
        let id = options.id
        that.setData({
            id: id
        })
        let which=wx.getStorageSync('which')
        let detail = await app.$http({
            url: `/${which}/detail`,
            data: {
                id
            }
        })
        this.setData({
            detail:detail[0]
        })
        let openId = wx.getStorageSync('openId')
        let isShoucang = await app.$http({
            url: '/user/oneshoucang',
            data: {
                id,
                openId,
                isCate:which=='category'?true:false
            }
        })
   
        // 如果存在收藏
        this.setData({
            detail: detail[0],
            selected: isShoucang.length ? true : false
        })
    },
    onPageScroll(e) {
        this.setData({
            title: e.scrollTop <= 0 ? '搜谱大全' : ''
        })

    },
    // 预览大图
    preview() {
        let that = this
        wx.previewImage({
            urls: [that.data.detail.photo],
        })
    },
    // 收藏
    async shoucang() {
        // 要登陆后才能实现收藏
        if (wx.getStorageSync('openId')) {
            this.setData({
                selected: !this.data.selected
            })
            let id = this.data.id
            let which=wx.getStorageSync('which')
            let isCate=(which=='category')?true:false
            let openId = wx.getStorageSync('openId')
            if (this.data.selected) {
                // 被选中
                // 将歌曲id上传到数据库
                await getApp().globalData.$http({
                    url: '/user/shoucang',
                    data: {
                        id,
                        openId,
                        isCate
                    }
                })
            } else {
                // 取消选中
                // 将歌曲id从数据库中删除
                await getApp().globalData.$http({
                    url: '/user/cancleShoucang',
                    data: {
                        id,
                        openId,
                        isCate
                    }
                })
            }
        } else {
            wx.showToast({
                title: '请先登录哦',
                icon: 'none'
            })
        }
    },
    // 返回首页
    _backtoRight() {
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    // 返回上一页
    _backtoLeft() {
        wx.navigateBack()
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
        let url = encodeURIComponent('/pages/detail/detail?id=' + this.data.id)
        return {
            title: this.data.detail.song + "乐谱详情",
            path: `/pages/index/index?url=${url}`
        }
    }
})
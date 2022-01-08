// pages/shoucang/shoucang.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        total: 0,
        songs: [],
        page: 1,
        notHave: false,
    },
    // 封装当前页请求数据函数
    async getdata() {
        if (!this.data.notHave) {
            let openId = wx.getStorageSync('openId')
            let ret = await getApp().globalData.$http({
                url: '/user/allShoucang',
                data: {
                    openId,
                    page: this.data.page
                }
            })

            if (ret.data.length) {
                this.setData({
                    songs: this.data.songs.concat(ret.data)
                })
            } else {
                this.setData({
                    notHave: true
                })
            }
        }
    },
    // 详情页
    todetail(e) {
        let id = e.currentTarget.dataset.id
        let index = e.currentTarget.dataset.index
        let which
        this.data.songs[index].z_id ? (which = 'zhuanji') : (which = "category")
        console.log(which)
        wx.setStorageSync('which', which)
        wx.navigateTo({
            url: `/pages/detail/detail?id=${id}`
        })
    },
    // 确定删除提示框
    confirm() {
        return new Promise((resolve, reject) => {
            wx.showModal({
                title: '删除图片',
                content: '确定要删除该图片？',
                showCancel: true, //是否显示取消按钮
                cancelText: "否", //默认是“取消”
                confirmText: "是", //默认是“确定”
                success: function (res) {
                    resolve(res)
                }
            })
        })
    },
    // 删除歌曲
    async delete(e) {
        let res = await this.confirm()
        if (res.confirm) {
            let index = e.currentTarget.dataset.id
            let item = this.data.songs[index]
            let id = item["id"]
            let isCate
            let openId = wx.getStorageSync('openId')
            if (Object.keys(item).indexOf("c_id") != -1) {
                // 如果这首歌有c_id就是category分类
                // isCate=true
                isCate = true
            } else {
                isCate = false
            }
            let ret = await getApp().globalData.$http({
                url: '/user/cancleShoucang',
                data: {
                    isCate,
                    id,
                    openId
                }
            })
            if (ret.affectedRows) {
                wx.showToast({
                    title: '删除成功',
                    icon: "success"
                })
                let timer = setTimeout(() => {
                    this.data.songs.splice(index,1)
                    this.setData({
                        songs:[],
                        page:1,
                        notHave:false
                    })
                    this.onLoad()
                    clearTimeout(timer)
                }, 1500)
            } else {
                wx.showToast({
                    title: '删除失败',
                    icon: "error"
                })
            }
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        await this.getdata()
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
        // 触底增加页码
        let page = this.data.page + 1
        this.setData({
            page
        })
        this.getdata()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        let url = encodeURIComponent('/pages/detail/detail?id=' + this.data.id)
        return {
            title: "乐谱详情",
            path: `/pages/index/index?url=${url}`
        }
    }
})
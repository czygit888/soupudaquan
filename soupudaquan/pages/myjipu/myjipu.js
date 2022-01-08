// pages/myjipu/myjipu.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        comments: [],
        page: 1,
        notHave: false,
        guanli: false,
        selList: [],
        select_all: false
    },
    // 删除评论
    del() {
        let that = this
        // 提示框
        wx.showModal({
            title: '提示',
            content: '确定删除？',
            success: async function (res) {
                if (res.confirm) {
                    let delList = that.data.selList.map(el => {
                        return el.id
                    })

                    let ret = await getApp().globalData.$http({
                        url: '/comment/delete',
                        data: {
                            list: delList.join(',')
                        }
                    })
                    wx.showToast({
                      title: '删除成功',
                      icon:'success',
                      mask:true
                    })
                    let timer=setTimeout(()=>{
                        that.onLoad()
                        clearTimeout(timer)
                    },1600)

                } else {
                    console.log('取消')
                }
            }
        })
    },
    // 点击是否管理
    guanli() {
        this.setData({
            guanli: !this.data.guanli
        })
    },
    // 点击选中全部评论
    selectAll() {
        this.setData({
            select_all: !this.data.select_all
        })
        this.data.comments.forEach(el => {
            this.data.select_all ? (el.select = true) : (el.select = false)
        })
        let newList = this.data.comments
        this.setData({
            comments: newList,
            selList: newList
        })
        this.watchSel()
    },
    // 封装一个遍历查找selList的函数
    watchSel() {
        let newList = []
        this.data.selList.forEach(el => {
            el.select && newList.push(el)
        })
        this.setData({
            selList: newList
        })
    },
    // 点击选择单独的评论
    select(e) {
        let index = e.currentTarget.dataset.id
        let list = this.data.comments
        //  如果当前为TRUE,则应该改为FALSE
        list[index].select = !list[index].select
        if (list[index].select) {
            this.data.selList.push(list[index])
        }
        this.setData({
            comments: list
        })
        this.watchSel()
        this.setData({
            select_all: this.data.selList.length == this.data.comments.length ? true : false
        })

    },
    // 获取所有评论
    getComments(data) {
        return new Promise(async (resolve, reject) => {
            if (!this.data.notHave) {
                let ret = await getApp().globalData.$http({
                    url: '/comment',
                    data: data
                })
                if (ret.length) {
                    ret.forEach(ele => {
                        if (ele.photo) {
                            ele.imgs = ele.photo.split(',').map(img => getApp().globalData.serverUrl + '/' + img)
                        };
                        ele.avatar = getApp().globalData.serverUrl + '/' + ele.avatar
                        ele.select = false
                    })
                    this.data.comments.push(...ret)
                    this.setData({
                        comments: this.data.comments
                    })
                    // console.log(this.data.comments)
                } else {
                    this.setData({
                        notHave: true
                    })
                }
            }

        })
    },
    preview(e) {
        let current = e.currentTarget.dataset.photo
        let urls = this.data.comments.map(el => {
            return el.photo
        })
        wx.previewImage({
            current,
            urls // 需要预览的图片http链接列表
        })
    },
    // 下拉树新更多
    getMore() {
        // 触底增加页码
        let page = this.data.page + 1
        this.setData({
            page
        })
        let openId = wx.getStorageSync('openId')
        this.getComments({
            page: this.data.page,
            openId
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            comments: [],
            page: 1,
            notHave: false,
            guanli: false,
            selList: [],
            select_all: false
        })
        let openId = wx.getStorageSync('openId')
        this.getComments({
            page: this.data.page,
            openId
        })
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

    }
})
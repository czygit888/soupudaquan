// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatar: "/images/nothing.png",
        nickname: "点击登录"
    },
    // 点击客服聊天
    toConcat(){
        let url = '/pages/xiaopu/xiaopu'
        getApp().globalData.cantoPage(url)
    },
    // 用户授权
    givePower() {
        return new Promise((resolve, reject) => {
            wx.getUserProfile({
                desc: 'login',
                success(res) {
                    resolve(res)
                },
                fail(err) {
                    reject(err)
                }
            })
        })
    },
    // 获取用户是否授权
    async getPower() {
        let info = {}
        try {
            info = await this.givePower()
        } catch (e) {
            // 用户拒绝授权
            console.log(e)
        }
        // 用户授权后的信息存储到本地
        info.userInfo && wx.setStorageSync('info', info.userInfo)
    },
    // 获取用户数据后渲染页面
    getUsedata() {
        return new Promise(async (resolve, reject) => {
            let info = wx.getStorageSync('info')
            if (!info) {
                await this.getPower()
            }
            info = await this.setUserData()
            resolve(info)
        })
    },
    setUserData() {
        return new Promise((resolve, reject) => {
            let info = wx.getStorageSync('info')
            if (!info) {
                info = {}
                info.avatarUrl = getApp().globalData.defaultAvatar
                info.nickName = '用户' + new Date().getTime()
                wx.setStorageSync('info', info)
            }
            this.setData({
                avatar: info.avatarUrl,
                nickname: info.nickName
            })
            resolve(info)
        })
    },
    // 登录
    async login() {
        // 2.用户点击登录,获取用户code换取openId
        let openId = wx.getStorageSync('openId')
        if (!openId) {
            // 1.请求用户授权
            let info = await this.getUsedata()
            this.getOpenId(info)
        }
    },
    // 封装请求openId,上传数据库
    getOpenId(info) {
        wx.login({
            success(res) {
                if (res.code) {
                    //发起网络请求
                    wx.request({
                        url: 'http://192.168.0.183:8888/user',
                        method: 'post',
                        data: {
                            code: res.code,
                            info
                        },
                        success(res) {
                            wx.setStorageSync('openId', res.data.openId)
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    },

    // 去当前页的content
    toSet() {
        let url = '/pages/set/set'
        getApp().globalData.cantoPage(url)
    },
    toShoucang(){
        let url="/pages/shoucang/shoucang"
        getApp().globalData.cantoPage(url)

    },
    toMyjipu(){
        let url="/pages/myjipu/myjipu"
        getApp().globalData.cantoPage(url)

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
        let info = wx.getStorageSync('info')
        if (info) {
            this.setData({
                avatar: info.avatarUrl,
                nickname: info.nickName
            })
        } else {
            this.setData({
                avatar: "/images/nothing.png",
                nickname: "点击登录"
            })
        }
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
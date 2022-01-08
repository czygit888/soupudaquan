// 创建消息实例
function msgType(sendType, msg, me) {
    this.sendType = sendType;
    this.msg = msg
    this.isMe = me
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: '',
        socketTask: null,
        messages: [],
        top: ''
    },
    // 获取高度
    getHeight() {
        return new Promise((resolve, reject) => {
            //创建节点选择器
            var query = wx.createSelectorQuery();
            //选择id
            query.select('.chat-container').boundingClientRect()
            query.exec(function (res) {
                //res就是 所有标签为myText的元素的信息 的数组
                //取高度
                resolve(res[0].height);
            })
        })
    },
    // 发送消息
    sendText() {
        let that = this
        that.data.socketTask.send({
            data: that.data.value,
            success: async function (res) {
                if (res.errMsg == "sendSocketMessage:ok") {
                    let msg = new msgType(1, that.data.value, true)
                    that.data.messages.push(msg)
                    that.setData({
                        messages: that.data.messages,
                        value: ''
                    })
                    let height = await that.getHeight()
                    that.setData({
                        top: height
                    })
                }
            }
        })
    },
    // 输入消息
    inputText(e) {
        let value = e.detail.value
        this.setData({
            value
        })
    },
    // 选择图片
    chooseImg() {
        return new Promise((resolve, reject) => {
            wx.chooseImage({
                count: 1,
                success(res) {
                    resolve(res)
                }
            })
        })
    },
    async sendImg() {
        let that = this
        let res = await that.chooseImg()
        let path = res.tempFilePaths[0]
        let msg = new msgType(2, path, true)
        that.data.messages.push(msg)
        that.setData({
            messages: that.data.messages
        })
        let height = await that.getHeight()
        that.setData({
            top: height
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        // 刚开始打开页面如果没有消息就发送一条问候消息
        let messages = wx.getStorageSync('messages')
        if (!messages) {
            let msg = new msgType(1, '您好,我是小谱,请问有什么可以帮助您的吗?', false)
            that.data.messages.push(msg)
            that.setData({
                messages: that.data.messages
            })
        } else {
            this.setData({
                messages: messages
            })
        }
        // 一开始就连接
        const socketTask = wx.connectSocket({
            url: 'wss://192.168.0.183:3333',
            header: {
                'content-type': 'application/json'
            },
            method: "get"
        })
        that.setData({
            socketTask
        })
        // 监听服务器发送的消息
        socketTask.onMessage(async (data) => {
            let info = data.data
            let msg = new msgType(1, info, false)
            that.data.messages.push(msg)
            that.setData({
                messages: that.data.messages
            })
            wx.setStorageSync('messages', this.data.messages)
            let height = await that.getHeight()
            that.setData({
                top: height
            })
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
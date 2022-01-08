// pages/set/set.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: 0,
        sex: ['女', '男'],
        show: false,
        btnDisabled: true,
        avatar: '',
        nickname: ''
    },
    // 点击性别出现选择器
    showPicker() {
        this.setData({
            show: !this.data.show
        })
    },
    // 选择性别
    bindChange(e) {
        let value = e.detail.value[0]
        wx.setStorageSync('value', value)
    },
    // 取消
    cancle() {
        this.setData({
            show: !this.data.show
        })
    },
    // 确定
    confirm() {
        let timer=setTimeout(()=>{
            let value =wx.getStorageSync('value')
        this.setData({
            value,
            show: !this.data.show,
            btnDisabled: false
        })
        wx.setStorageSync('sex', value)
        clearTimeout(timer)
        },800)
    },
    // 输入框失焦
    inputValue(e) {
        let nickname = e.detail.value
        if (nickname != this.data.nickname) {
            this.setData({
                nickname,
                btnDisabled: false
            })
            wx.setStorageSync('nickname', nickname)
        }
    },
    // 切换头像
    async changeAvatar() {
        let res=await getApp().globalData.uploadImg(1)
         // tempFilePath可以作为img标签的src属性显示图片
         const tempFilePath = res.tempFilePaths[0]
         wx.setStorageSync('avatar', tempFilePath)
         this.setData({
             avatar:tempFilePath,
             btnDisabled: false
         })
    },
    // 上传文件
    unload() {
        let that=this
        if(!that.data.btnDisabled){
            const tempFilePath = wx.getStorageSync('avatar')
        let avatarUrl=wx.getStorageSync('avatar')
        let nickName=wx.getStorageSync('nickname')
        let gender=wx.getStorageSync('sex')
        let info=wx.getStorageSync('info')
        let openId=wx.getStorageSync('openId')
        avatarUrl&&(info["avatarUrl"]=avatarUrl)
        nickName&&(info["nickName"]=nickName)
        gender&&(info["gender"]=gender)
        openId&&(info["openId"]=openId)
        wx.setStorageSync('info', info)
        wx.uploadFile({
            url: getApp().globalData.serverUrl+'/user/info', 
            filePath: tempFilePath,
            name: 'file',
            formData: {
                'info': JSON.stringify(info)
            },
            success(res) {
                const data = res.data
                // console.log(data)
                wx.showToast({
                  title: '修改成功',
                })
                that.setData({
                    btnDisabled:!that.data.btnDisabled
                })
                let timer=setTimeout(()=>{
                    wx.navigateBack()
                    clearTimeout(timer)
                },1500)
            }
        })
        }
    },
    // 退出登录
    quit(){
        // 提示框
    wx.showModal({
        title: '提示',
        content: '确定删除？',
        success: function (res) {
          if (res.confirm) {
            wx.clearStorage({
              success: (res) => {
                  wx.navigateBack()
              },
            })
          } 
        }
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
        let info = wx.getStorageSync('info')
        this.setData({
            avatar: info ? info.avatarUrl : getApp().globalData.defaultAvatar,
            nickname: info ? info.nickName : '用户' + new Date().getTime(),
            value: info ? [info.gender] : [1]
        })
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
        try {
            wx.removeStorageSync('avatar')
            wx.removeStorageSync('nickname')
            wx.removeStorageSync('sex')
            wx.removeStorageSync('value')
          } catch (e) {
            console.log(e)
          }
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
let $http=getApp().globalData.$http
// pages/fapu/fapu.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content: '',
        countPic:9,
        action:getApp().globalData.serverUrl+'/comment/upload'
    },

    // 上传数据
    async upload(event){
        let imgFiles=event.detail.resStr
        let openId=wx.getStorageSync('openId') 
        let comment=this.data.content
        console.log
       let res=await $http({
           url:'/comment/uploadData',
           data:{
               imgFiles,
               comment,
               openId,
           },
           method:'post'
       })
       console.log(res)
       wx.showToast({
         title: '上传成功',
       })
       let timer=setTimeout(()=>{
           wx.navigateBack()
           clearTimeout(timer)
       },1500)
      },
    // 失去焦点时获取里面评论内容
    bindText(e) {
        this.setData({
            content: e.detail.value
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
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
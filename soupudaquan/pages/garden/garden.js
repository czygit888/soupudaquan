// pages/garden/garden.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        comments: [],
        page: 1,
        notHave:false,
        selected:0
    },
    // 获取所有评论
    getComments(data) {
        return new Promise(async (resolve, reject) => {
            if(!this.data.notHave){
                let ret = await getApp().globalData.$http({
                    url: '/comment',
                    data:data
                })
                if (ret.length) {
                    ret.forEach(ele=>{
                        if(ele.photo){
                            ele.imgs = ele.photo.split(',').map(img=>getApp().globalData.serverUrl+'/'+img)
                        };
                        ele.avatar=getApp().globalData.serverUrl+'/'+ele.avatar
                    })
                    this.data.comments.push(...ret)
                    this.setData({
                        comments: this.data.comments
                    })
                } else {
                    this.setData({
                        notHave: true
                    })
                }
            }
            
        })
},
// 预览大图
preview(e){
    let index=e.currentTarget.dataset.index;
    let current = e.currentTarget.dataset.photo;
    let urls=this.data.comments[index].imgs
    current = urls[current]
    wx.previewImage({
        current,
        urls // 需要预览的图片http链接列表
      })
},
// 切换导航栏
change(e){
    let id=e.currentTarget.dataset.id
    if(id!=this.data.selected){
        this.setData({
            selected:id,
            page:1,
            comments:[],
            notHave:false
        })
        this.chooseParams()
    }
},
// 跳转到添加记谱页
add(){
    let url='/pages/fapu/fapu'
    getApp().globalData.cantoPage(url)
    wx.navigateTo({
      url
    })
},
// 封装选择参数请求的函数
chooseParams(){
    let openId=wx.getStorageSync('openId')

    if(this.data.selected==0){
        this.getComments({page:this.data.page})
    }else{
        this.getComments({page:this.data.page,openId})
    }
},
// 下拉树新更多
getMore(){
    // 触底增加页码
    let page = this.data.page + 1
    this.setData({
        page
    })
    this.chooseParams()
},
/**
 * 生命周期函数--监听页面加载
 */
onLoad: async function (options) {

        // this.getComments({page:this.data.page})
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onShow:async function () {
        let selected = getApp().globalData.selected
    
        if (selected != null || selected != undefined || selected != '') {
            this.setData({
                selected,
                page:1,
                comments:[],
                notHave:false
            })
            this.chooseParams()
        }
        getApp().globalData.selected=''
    },

    /**
     * 生命周期函数--监听页面显示
     */
    // onShow: function () {

    // },

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

const app = getApp().globalData
Page({
  data: {
      lunboUrl:[],
      current:1,
      category:[],
      animated:false,

  },
  // 进入搜索页面
  toSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  // 轮播图变化实时更新当前current
  changeCurrent(e){
    let current=e.detail.current
    this.setData({
      current
    })
  },
  // 去详情页
  toList(e){
    let id=e.currentTarget.dataset.id
    let which=e.currentTarget.dataset.class
    wx.setStorageSync('which', which)
    wx.navigateTo({
      url: '/pages/list/list?id='+id
    })
  },


  async onLoad(options) {
    // 加载轮播图
    const lunboUrl = await app.$http({
      url:'/zhuanji',
    })
    // 加载分类
    const category = await app.$http({
      url:'/category',
    })
    this.setData({
      lunboUrl,
      category
    })

    // 分享之后从首页进入详情页
    if(options.url){
      let url=decodeURIComponent(options.url)
      wx.navigateTo({
        url
      })
    }
    
  },
  // 做个动画,每次页面显示就动一次
  onShow(){
    let timer=setTimeout(()=>{
      this.setData({
        animated:true
      })
      clearTimeout(timer)
    },50)
  },
  onHide(){
    this.setData({
      animated:false
    })
  },
  onReady(){
    
  }
})

export const serverUrl = 'https://192.168.0.183:8888';
const defaultAvatar = 'data:image/png;base64,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'

function $http(params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: serverUrl + params.url,
      method: params.method || "get",
      data: params.data,
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
// ???????????????????????????
function uploadImg(count) {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: count,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res){
        resolve(res)
      }
    })
  })
}
    // ??????????????????????????????????????????????????????
    function cantoPage(url) {
      // ????????????????????????openId???????????????,??????????????????????????????
      let openId = wx.getStorageSync('openId')
      if (!openId) {
          wx.showToast({
              title: '???????????????',
              icon: 'none'
          })
      } else {
          wx.navigateTo({
              url
          })
      }
  }
// app.js
App({
  onLaunch() {
    // ????????????????????????
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // ??????
    wx.login({
      success: res => {
        // ?????? res.code ??????????????? openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    $http,
    defaultAvatar,
    uploadImg,
    serverUrl,
    selected:'',
    cantoPage
  }
})
// pages/kefu/kefu.js
const notMy = {type:1,msg:'1111',img:'',isMy:false};
const my = {type:1,msg:'1111',img:'',isMy:true};
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg:'',
        top:0,
        //保存上下文
        socketTask:null,
        messages:[]
    },
    //获取高
    getHeight(){
        return new Promise((resolve,reject)=>{
            const query=wx.createSelectorQuery(this)
            query.select('.scroll-container').boundingClientRect();
            query.exec(res=>{
                resolve(res)
            })
        })
    },
    // type 为1就是消息 为2就是图片 
    createMsg(type,msgOrImg,isMy=false){
        let msg,messages=this.data.messages;
        if(isMy){
            msg = JSON.parse(JSON.stringify(my))
        }else{
            msg = JSON.parse(JSON.stringify(notMy))
        }
        msg.type=type;
        msg.msg=msgOrImg;
        msg.img=msgOrImg;
        messages.push(msg);
        this.setData({
            messages
        })
        wx.setStorageSync('messages',messages);
    },
    // 选图片
    promiseChoose(){
        return new Promise((resolve,reject)=>{
            wx.chooseImage({
              count: 1,
                success(res){
                    resolve(res)
                }
            })
        })
    },
    async addImg(){
        let path=await this.promiseChoose()
        // console.log(path)
        const tempFilePath = path.tempFilePaths[0]
        this.createMsg(2,tempFilePath,true)
        const height = await this.getHeight();
        this.setData({
            top:height[0].height
        })
    },
    // 存储输入的文字
    input(e){
        this.setData({
            msg:e.detail.value.trim()
        })
    },
   
    // 接收服务端传递到客户端的消息
    handleSocketMessage(){
        wx.onSocketMessage((result) => {
            console.log(result.data.toString())
        })
    },
    // 发送消息函数
    socketSend(data){
        return new Promise((resolve,reject)=>{
            const socketTask = this.data.socketTask;
            socketTask.send({
                data,
                success(res){
                    resolve(res)
                },
                fail(err){
                    reject(err)
                }
            })
        })
    },
    // 向服务端发送消息
    async handleSend(e){
        // 如果监听webSocket链接打开事件成功则发送消息
        this.createMsg(1,this.data.msg,true)
        const ret = await this.socketSend(this.data.msg);
        const height = await this.getHeight();
        // console.log(height,'height');
        this.setData({
            msg:'',
            top:height[0].height
        })
        console.log(ret,'ret');
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const mess = wx.getStorageSync('messages');
        console.log(mess,'mess');
        if(mess){
            this.setData({
                messages:mess
            })
        }else{
            const msg = 'Hello 你好请问有什么能帮到您的';
            this.createMsg(1,msg);
        }
        // 链接socket:
       const socketTask = wx.connectSocket({
          url: 'ws://192.168.0.183:8080',
          header:{
              'content-type':'application/json'
          },
          method:'get',
          success:(data)=>{
            //   如果连接成功,则监听websocket连接打开事件
            if(data.errMsg=='connectSocket:ok'){
                // 监听websocket连接打开事件
                // this.handleSocketOpen()
            }
          }
        })
        socketTask.onMessage((data)=>{
            // console.log(this.ab2str(data.data) ,'dataret');
            // console.log(data.data);
            this.createMsg(1,data.data)
            
        })
        this.setData({
            socketTask
        })
        // 接收服务器端传递到客户端的消息
        // this.handleSocketMessage()
    },
   
   ab2str(buf){
       return String.fromCharCode.apply(null,new Uint8Array(buf))
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
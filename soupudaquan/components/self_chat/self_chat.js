
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        sendType:{//发送消息的类型
            type:Number,
            value:1//默认为1就是文本消息
        },
        text:{
            type:String |Number,
            value:''
        },
        img:{
            type:String,
            value:''
        },
        avatar:{
            type:String,
            value:''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

    },
    lifetimes:{
        attached(){
            // 获取用户信息头像
            let userinfo=wx.getStorageSync('info')
            userinfo&&this.setData({
                avatar:userinfo.avatarUrl
            })
        }
    }
})

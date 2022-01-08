// components/chat/chat.js
let avatar=`data:image/png;base64,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`
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        avatarUrl:{
            type:String,
            value:avatar
        },
        img:{
            type:String,
            value:""
        },
        type:{
            type:Number|String,
            value:1
        },
        msg:{
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
        prev(){
            wx.previewImage({
              urls: [this.data.img]
            })
        }
    }
})

// components/uploadimgs/uploadimgs.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        count: {
            type: String | Number,
            value: 9
        },
        action: { //获取上传接口
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        imgList:[],
        resStr:''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 上传的异步函数
        promiseUpload(filePath){
            return new Promise((resolve,reject)=>{
                wx.uploadFile({
                    filePath: filePath,
                    name: 'file',
                    url:this.data.action ,
                    success(res){
                        resolve(JSON.parse(res.data).data.relative_path)
                    },
                    fail(err){
                        reject(err)
                    }
                  })
            })
        },
        // 点击上传
        async upload(){
            let waitList=this.data.imgList.map(el=>this.promiseUpload(el))
            let resList= await Promise.all(waitList)
            let resStr=resList.join()
            // 上传之后将返回的数据传给父组件
            this.triggerEvent('customEventHandler', {
              resStr:resStr
            })
        },
        
        // 预览大图
        prev(e){
            let index=e.currentTarget.dataset.id || e.target.dataset.id
            wx.previewImage({
              urls: this.data.imgList,
              current:this.data.imgList[index]
            })
        },
        // 删除图片
        close(e){
            let index=e.currentTarget.dataset.index 
            let newList=this.data.imgList
            newList.splice(index,1)
            this.setData({
                imgList:newList
            })
        },
        // 选择图片
        chooseImg() {
            return new Promise((resolve, reject) => {
                wx.chooseImage({
                    count: 9,
                    sizeType: ['original', 'compressed'],
                    sourceType: ['album', 'camera'],
                    success(res) {
                        // tempFilePath可以作为img标签的src属性显示图片
                        const tempFilePaths = res.tempFilePaths
                        resolve(tempFilePaths)
                    }
                })
            })
        },
        async addImg() {
            // 获取图片本地路径
            let paths=await this.chooseImg()
            let newList=this.data.imgList.concat(paths)
            // 如果总共选取的大于9张,只获取前面的9张
            if(newList.length>this.data.count){
                newList=newList.slice(0,this.data.count)
            }
            this.setData({
                imgList:newList
            })
        },
    }
})
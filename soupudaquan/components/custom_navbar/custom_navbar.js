// components/custom_navbar/custom_navbar.js
Component({
    options: {
        multipleSlots: true //在组件定义式的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        // 导航栏标题
        title: {
            type: String,
            value: ''
        },
        // 设置标题颜色
        title_color:{
            type:String,
            value:'#000'
        },
        // 设置字体大小
        font_size:{
            type: String,
            value:'30rpx'
        },
        // 设置背景颜色
        bg_color:{
            type:String,
            value:'transparent'
        },
        // 设置图标
        left_icon:{
            type:String,
            value:''
        },
        right_icon:{
            type:String,
            value:""
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // 尺寸
        navigationBarHeight: 40,
        menuButtonWidth: 87,
        menuButtonHeight: 30,
        statusBarHeight: 40,
        left: 20,
        top: 24,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //获取导航栏及胶囊的高宽
        getNavRect() {
            return new Promise((resolve, reject) => {
                wx.getSystemInfo({
                    success: res => {
                        let screenWidth = res.screenWidth

                        // 状态栏高度
                        let statusBarHeight = res.statusBarHeight;

                        let menuButtonRect = wx.getMenuButtonBoundingClientRect()
                        // 导航栏高度
                        let navigationBarHeight = (menuButtonRect.top - statusBarHeight) * 2 + menuButtonRect.height
                        let menuButtonWidth = menuButtonRect.width
                        let menuButtonHeight = menuButtonRect.height
                        let left = screenWidth - menuButtonWidth - menuButtonRect.left
                        let top = menuButtonRect.top
                        let rect = {
                            navigationBarHeight,
                            menuButtonWidth,
                            menuButtonHeight,
                            statusBarHeight,
                            left,
                            top
                        }
                        resolve(rect)
                    }
                });
            })
        },
        // 将数据放入data中,页面调用
        setNavRect(){
            this.getNavRect().then(res => {
                this.setData({
                    navigationBarHeight: res.navigationBarHeight,
                    menuButtonWidth: res.menuButtonWidth,
                    menuButtonHeight: res.menuButtonHeight,
                    statusBarHeight: res.statusBarHeight,
                    left: res.left,
                    top: res.top
                })
            })
        },
        // 内部私有方法
        // 点击胶囊右方
        _backtoLeft(){
            this.triggerEvent("backtoLeft")//自定义事件名,还可以传参
        },
        // 点击胶囊左方
        _backtoRight(){
            this.triggerEvent("backtoRight")//自定义事件名,还可以传参
        }
    },
    // 生命周期
    lifetimes:{
        ready(){
            // 在组件实例进入页面节点数时执行
            this.setNavRect()
        }
    }
})
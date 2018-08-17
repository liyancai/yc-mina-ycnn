const app = getApp()

Page({
    data: {
    },
    onLoad: function () {

    },
    onShareAppMessage: function (res) {
        return {
            title: '媳妇儿，七夕快乐！！！️',
            path: '/pages/index/index'
        }
    }
})

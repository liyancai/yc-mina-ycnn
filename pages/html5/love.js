Page({
    data: {
        cont: ''
    },
    onLoad() {
        this.showCont()
    },
    showCont() {
        var mylove = '从相识到相爱相知，3年多的时间里，你成了孩儿她妈，我成了孩儿她爸，很庆幸能够拥有你，生活才变得丰富多彩，永远爱你，媳妇儿，七夕快乐！！！'
        var length = 1

        var that = this
        var timer = setInterval(function(){
            if (length > mylove.length){
                clearInterval(timer)
                console.log('clear')
                return
            }
            that.setData({
                cont: mylove.substr(0, length)
            })
            length++
        }, 300)

    }
})
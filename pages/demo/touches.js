
Page({
    data: {
        open: false,
        pos: 0,
        transform: "transform: rotate(0deg) scale(1) translate(0%, 0%);",
        translate: "",
        startPosition: {
            x: 0,
            y: 0
        },
        movePosition: {
            x: 0,
            y: 0
        },
        endPosition: {
            x: 0,
            y: 0
        },
        sysInfo: null
    },
    onLoad: function (options) {
        try {
            var res = wx.getSystemInfoSync()
            this.setData({
                sysInfo: {
                    windowWidth: res.windowWidth
                }
            })
            console.log(res.model)
            console.log(res.pixelRatio)
            console.log(res.windowWidth)
            console.log(res.windowHeight)
            console.log(res.language)
            console.log(res.version)
            console.log(res.platform)
        } catch (e) {
            // Do something when catch error
        }
    },
    tap_ch: function (e) {
        if (this.data.open) {
            this.setData({
                open: false,
                transform: "transform: rotate(0deg) scale(1) translate(0%, 0%);"
            });
        } else {
            this.setData({
                open: true,
                transform: "transform: rotate(0deg) scale(1) translate(75%, 0%);"
            });
        }
    },
    touchStartFunc: function(e) {
        console.log("touchStart")
        console.log(e)
        this.setData({
            startPosition: {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY,
            }
        })
    },
    touchMoveFunc: function (e) {
        console.log("touchMove")
        // console.log(e)
        this.setData({
            movePosition: {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY,
            }
        })

        var dis = (this.data.movePosition.x - this.data.startPosition.x)

        var mx = this.data.movePosition.x
        var nowDis = Math.floor(this.data.pos * this.data.sysInfo.windowWidth / 100)


        dis = dis > 0 ? dis : (mx < nowDis ? mx : nowDis);
        console.log(dis)
        var pos = Math.floor(dis * 100 / this.data.sysInfo.windowWidth)
        

        this.setData({
            pos: pos,
            transform: "transform: rotate(0deg) scale(1) translate(" + pos + "%, 0%);",
            translate: "",
        })
    },
    touchEndFunc: function (e) {
        console.log("touchEnd")
        console.log(e)
        this.setData({
            endPosition: {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY,
            }
        })

        var dis = this.data.endPosition.x
        var pos = Math.floor(dis * 100 / this.data.sysInfo.windowWidth)
        pos = pos > 65 ? 75 : 0;
        

        this.setData({
            pos: pos,
            transform: "transform: rotate(0deg) scale(1) translate(" + pos + "%, 0%);",
            translate: "transition: all 200ms;",
        })
    },
    touchCancelFunc: function (e) {
        console.log("touchCancel")
        // console.log(e)
        this.setData({
            startPosition: {
                x: 0,
                y: 0,
            },
            movePosition: {
                x: 0,
                y: 0,
            },
            endPosition: {
                x: 0,
                y: 0,
            }
        })
    },
    longtapFunc: function (e) {
        // console.log(e)
        console.log("longtap")
    },


})
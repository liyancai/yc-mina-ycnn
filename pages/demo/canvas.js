const canvasUtil = require('../../utils/canvas.js')

Page({
    data: {
  
    },
    onLoad: function (options) {
        var that = this
        var ctx = wx.createCanvasContext('radiusRect')

        ctx.setFillStyle('skyblue')
        canvasUtil.fillRadiusRect(ctx, 30, 30, 300, 200, 10)

        ctx.setStrokeStyle('red')
        canvasUtil.strokeRadiusRect(ctx, 30, 30, 300, 200, 10)

        ctx.draw()
    },

})
const dateUtil = require('../../utils/date.js')

Page({
  data: {
    dayPercent: 0,
    monthPercent: 0,
    yearPercent: 0,
    lifePercent: 0,

  },
  onLoad: function (options) {
    let now = new Date()
    let born = new Date(1986, 5-1, 7)


    let that = this
    this.setData({
      dayPercent: that.getPercent(dateUtil.hasPassDay(now), dateUtil.totalDay()),
      monthPercent: that.getPercent(dateUtil.hasPassMonth(now), dateUtil.totalMonth()),
      yearPercent: that.getPercent(dateUtil.hasPassYear(now), dateUtil.totalYear()),
      lifePercent: that.getPercent(dateUtil.hasPassLife(now, born), dateUtil.totalLife()),
    })
  },
  getPercent(value, total) {
    return (value / total * 100).toFixed(2)
  },
  onShareAppMessage: function () {

  }
})
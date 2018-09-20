const app = getApp()
const util = require('../../utils/util.js')
const listUtil = require('../../utils/list.js')

Page({
  data: {
    pageInfo: {
      pno: 1,
      psize: 24,
      loadAll: false,
    },
    dataList: [],
    imageList: [],
  },
  onLoad: function (options) {
    this.getData(this.data.pageInfo.pno)
  },
  getData(pno) {

    if (pno == 1 && !this.data.pageInfo.loadAll) {
      this.setData({
        dataList: [],
        imageList: [],
        pageInfo: { loadAll: false }
      })
    }
    if (this.data.pageInfo.loadAll) {
      wx.stopPullDownRefresh()
      return
    }

    var that = this;
    app.doGet('https://admin.zhihuibian.com/api/wallpaper/list', {
      pno: pno,
    }, function (res) {
      var list = res.list;

      that.setData({
        dataList: that.data.dataList.concat(listUtil.splitList(list, 8)),
        imageList: that.data.imageList.concat(list)
      })

      if (that.data.dataList.length == 0) {
        console.log('empty list')
        return
      }
      if (list.length < that.data.pageInfo.psize) {
        that.data.pageInfo.loadAll = true;
        wx.showToast({ title: '已加载全部!', icon: 'success' })
      } else {
        that.setData({
          pageInfo: { pno: pno + 1 }
        })
      }
    })
  },
  bindImageError: function(e) {
    let dataset = e.currentTarget.dataset

    let dataList = this.data.dataList, imageList = this.data.imageList
    dataList[dataset.index][dataset.pos] = imageList[dataset.index * this.data.pageInfo.psize + dataset.pos] = dataset.src.replace(".jpg", ".png")
    
    this.setData({
      dataList: dataList,
      imageList: imageList
    })
  },
  previewImage: function (event) {
    util.previewImage(event)
  },
  onPullDownRefresh: function () {
    this.setData({
      pageInfo: {
        loadAll: false,
        pno: 1
      }
    })
    this.getData(this.data.pageInfo.pno)
  },
  onReachBottom: function () {
    this.getData(this.data.pageInfo.pno)
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'YC·高清壁纸',
      path: '/pages/wallpaper/index'
    }
  }
})
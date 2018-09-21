const app = getApp()
const util = require('../../utils/util.js')
const listUtil = require('../../utils/list.js')

Page({
  data: {
    showInfo: false,
    pageInfo: {
      pno: 1,
      psize: 24,
      loadAll: false,
    },
    dataList: [],
  },
  onLoad: function (options) {
    this.getData(this.data.pageInfo.pno)
  },
  getData(pno) {

    if (pno == 1 && !this.data.pageInfo.loadAll) {
      this.setData({
        dataList: [],
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

    let dataList = this.data.dataList
    dataList[dataset.index][dataset.pos] = dataset.src.replace(".jpg", ".png")
    
    this.setData({
      dataList: dataList,
    })
  },
  previewImage: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    //图片预览  //考虑图片较大，预览列表时，相应也较慢，所以只预览当前照片，不预览列表
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },
  toggleInfoView() {
    let that = this
    this.setData({
      showInfo: !that.data.showInfo
    })
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
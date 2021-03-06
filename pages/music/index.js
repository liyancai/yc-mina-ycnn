const app = getApp()
const music = app.globalData.music
const musicUtil = require('../../utils/music.js')

Page({
    data: {
        db: null,
        currentSong: {},
        songList: [],
        songStatus: ''
    },
    onLoad: function (options) {
        this.setData({
          db: wx.cloud.database()
        })
        this.getSongList()

        var that = this
        music.backgroundAudioManager = wx.getBackgroundAudioManager()
        music.backgroundAudioManager.onCanplay(function () {
            console.log('onCanplay........')
        });
        music.backgroundAudioManager.onPlay(function () {
            console.log('onPlay........')
            that.playSong()
        });
        music.backgroundAudioManager.onPause(function () {
            console.log('onPause........')
            that.pauseSong()
        });
        music.backgroundAudioManager.onStop(function () {
            console.log('onStop........')
            that.stopSong()
        });
        music.backgroundAudioManager.onEnded(function () {
            console.log('onEnded........')
            that.bindNextFunc()
        });
        // music.backgroundAudioManager.onTimeUpdate(function () {
        //     console.log('onTimeUpdate........')
        // });
        music.backgroundAudioManager.onError(function () {
            console.log('onError........')
            that.bindNextFunc()
        });
        music.backgroundAudioManager.onWaiting(function () {
            console.log('onWaiting........')
        });
        music.backgroundAudioManager.onPrev(function () {
            console.log('onPrev........')
            that.bindPrevFunc()
        });
        music.backgroundAudioManager.onNext(function () {
            console.log('onNext........')
            that.bindNextFunc()
        });
    },
    onShow: function () {
        if(music.currentSong != undefined){
            this.setData({
                currentSong: music.currentSong,
                songStatus: music.songStatus,
            })
            wx.setNavigationBarTitle({
                title: music.currentSong.title
            })
        }
    },
    getSongList: function() {

      var that = this

      const coll = this.data.db.collection('songsheet')
      coll.get().then(res => {
        let list = res.data
        let idList = list.map(it => {
          return it.m163id
        })

        app.doGet("https://music.163.com/api/song/detail/", {
          ids: idList
        }, function (res) {
          var songList = []
          for (let i = 0; i < res.songs.length; i++) {
            let s = res.songs[i]

            let singerArray = []
            for (let j = 0; j < s.artists.length; j++) {
              singerArray.push(s.artists[j].name)
            }

            songList.push({
              id: 'id-' + i,
              index: i,
              title: s.name,
              epname: s.album.name,
              singer: singerArray.join(' '),
              cover: s.album.picUrl,
              url: "https://api.hibai.cn/music/Music/Music?id=" + s.id + "&type=url"
            })
          }

          music.songSheet = songList
          that.setData({
            songList: music.songSheet
          })
        })

      })
    },
    bindPlayFunc: function (e) {
        var song = this.data.songList[e.currentTarget.dataset.index]
        this.playSong(song)
    },
    bindPauseFunc: function (e) {
        this.pauseSong()
    },
    bindPrevFunc: function (e) {
        //跳到歌单上一首
        var index = this.data.currentSong.index - 1
        //如果到了歌单最后,则不再继续播放
        if (index < 0) {
            return
        }
        wx.showToast({ title: '已切换到上一首...', icon: 'none' })
        var song = this.data.songList[index]
        this.playSong(song)
    },
    bindNextFunc: function (e) {
        //跳到歌单下一首
        var index = this.data.currentSong.index + 1
        //如果到了歌单最后,则不再继续播放
        if (index >= this.data.songList.length) {
            wx.showToast({ title: '已经是最后一首了！', icon: 'none' })
            return
        }
        wx.showToast({ title: '已切换到下一首...', icon: 'none' })
        var song = this.data.songList[index]
        this.playSong(song)
    },
    /** 维护歌曲播放时的页面状态，并播放歌曲 */
    playSong: function(song){
        if(song == undefined) {
            song = music.currentSong
        }
        music.currentSong = song
        music.songStatus = 'playing'
        this.setData({
            currentSong: music.currentSong,
            songStatus: music.songStatus
        })
        wx.setNavigationBarTitle({
            title: song.title
        })
        musicUtil.play(music.backgroundAudioManager, song)
    },
    /** 维护歌曲暂停时的页面状态，并暂停歌曲 */
    pauseSong: function () {
        music.songStatus = 'pause'
        this.setData({
            songStatus: music.songStatus
        })
        musicUtil.pause(music.backgroundAudioManager)
    },
    /** 维护歌曲stop时的页面状态 */
    stopSong: function () {
        music.songStatus = ''
        this.setData({
            songStatus: music.songStatus
        })
        wx.setNavigationBarTitle({
            title: 'YCNN',
        })
    },
    gotoPlayer: function(e) {
        var song = this.data.songList[e.currentTarget.dataset.index]

        music.currentSong = song
        music.songStatus = 'playing'
        this.setData({
            currentSong: music.currentSong,
            songStatus: music.songStatus
        })

        wx.navigateTo({
            url: '/pages/music/player',
        })
    },

})
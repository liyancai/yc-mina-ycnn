const app = getApp()
const music = app.globalData.music
const musicUtil = require('../../utils/music.js')

Page({
    data: {
        currentSong: {},
        songList: [],
        songStatus: ''
    },
    onLoad: function (options) {
        this.setData({
            songList: music.songSheet,
            songStatus: music.songStatus,
            currentSong: music.currentSong
        })

        var that = this
        music.backgroundAudioManager = wx.getBackgroundAudioManager()
        music.backgroundAudioManager.onCanplay(function () {
            console.log('onCanplay........')
        });
        music.backgroundAudioManager.onPlay(function () {
            console.log('onPlay........')
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
        music.backgroundAudioManager.onTimeUpdate(function () {
            console.log('onTimeUpdate........')
        });
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
        if (music.currentSong != undefined) {
            this.setData({ currentSong: music.currentSong })
            wx.setNavigationBarTitle({
                title: music.currentSong.title
            })
        }
    },
    bindPlayFunc: function (e) {
        var song = this.data.currentSong
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
            return
        }
        wx.showToast({ title: '已切换到下一首...', icon: 'none' })
        var song = this.data.songList[index]
        this.playSong(song)
    },
    /** 维护歌曲播放时的页面状态，并播放歌曲 */
    playSong: function (song) {
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

})
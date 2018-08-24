const app = getApp()
const music = app.globalData.music
const musicUtil = require('../../utils/music.js')

Page({
    data: {
        currentSong: {},
        songList: [],
        songStatus: '',
        songTime: 0,
        songCurrentTime: 0,
        songCurrentTimeStr: '0:00',
        songTimeStr: '0:00',
        timer: null,
    },
    onLoad: function (options) {
        this.setData({
            songList: music.songSheet,
            songStatus: music.songStatus,
            currentSong: music.currentSong
        })

        var that = this
        music.backgroundAudioManager = wx.getBackgroundAudioManager()
        music.backgroundAudioManager.onPlay(function () {
            console.log('player-onPlay........')
            that.playSong()

            var songCurrentTime = music.backgroundAudioManager.currentTime
            songCurrentTime = Math.floor(songCurrentTime == undefined ? 0 : songCurrentTime)

            if (that.data.timer != null && that.data.timer != undefined) {
                clearInterval(that.data.timer)
            }
            that.setData({
                songCurrentTime: songCurrentTime,
                songCurrentTimeStr: musicUtil.formatTime(songCurrentTime),
                timer: setInterval(function () {
                    var currentTime = that.data.songCurrentTime + 1
                    that.setData({
                        songCurrentTime: currentTime,
                        songCurrentTimeStr: musicUtil.formatTime(currentTime)
                    })
                    if (currentTime > that.data.songTime) {
                        clearInterval(that.data.timer)
                    }
                }, 1000)
            })
        });
        music.backgroundAudioManager.onCanplay(function () {
            console.log('player-onCanplay........')

            var songTime = Math.floor(music.backgroundAudioManager.duration)
            that.setData({
                songTime: Math.floor(songTime),
                songTimeStr: musicUtil.formatTime(songTime)
            })
        });
        music.backgroundAudioManager.onPause(function () {
            console.log('player-onPause........')
            that.pauseSong()
            if(that.data.timer != null && that.data.timer != undefined) {
                clearInterval(that.data.timer)
            }
        });
        music.backgroundAudioManager.onStop(function () {
            console.log('player-onStop........')
            that.stopSong()
        });
        music.backgroundAudioManager.onEnded(function () {
            console.log('player-onEnded........')
            that.bindNextFunc()
        });
        music.backgroundAudioManager.onTimeUpdate(function () {
            // console.log('player-onTimeUpdate........')
        });
        music.backgroundAudioManager.onError(function () {
            console.log('player-onError........')
            that.bindNextFunc()
        });
        music.backgroundAudioManager.onPrev(function () {
            console.log('player-onPrev........')
            that.bindPrevFunc()
        });
        music.backgroundAudioManager.onNext(function () {
            console.log('player-onNext........')
            that.bindNextFunc()
        });
    },
    onShow: function () {
        if (music.currentSong != undefined) {
            var that = this

            this.playSong(music.currentSong)

            var songTime = music.backgroundAudioManager.duration
            var songCurrentTime = music.backgroundAudioManager.currentTime
            songTime = Math.floor(songTime == undefined ? 0 : songTime)
            songCurrentTime = Math.floor(songCurrentTime == undefined ? 0 : songCurrentTime)


            if(that.data.timer != null && that.data.timer != undefined) {
                clearInterval(that.data.timer)
            }
            that.setData({
                songTime: songTime,
                songTimeStr: musicUtil.formatTime(songTime),
                songCurrentTime: songCurrentTime,
                songCurrentTimeStr: musicUtil.formatTime(songCurrentTime),
                timer: setInterval(function () {
                    var currentTime = that.data.songCurrentTime + 1
                    that.setData({
                        songCurrentTime: currentTime,
                        songCurrentTimeStr: musicUtil.formatTime(currentTime)
                    })
                    if (currentTime > that.data.songTime) {
                        clearInterval(that.data.timer)
                    }
                }, 1000)
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
            wx.showToast({ title: '已经是最后一首了！', icon: 'none' })
            return
        }
        wx.showToast({ title: '已切换到下一首...', icon: 'none' })
        var song = this.data.songList[index]
        this.playSong(song)
    },
    /** 维护歌曲播放时的页面状态，并播放歌曲 */
    playSong: function (song) {
        if (song == undefined) {
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

})
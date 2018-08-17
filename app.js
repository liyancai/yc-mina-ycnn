//app.js
App({
  onLaunch: function () {

  },
    globalData: {
        userInfo: null,
        music: {
            songSheet: [],
            currentSong: null,
            backgroundAudioManager: null,
            songStatus: null        // playing | pause | stop
        }
    }
})
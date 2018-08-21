/**
 *  song({
        id: 'a',
        title: '歌曲名称',
        epname: '专辑名称',
        singer: '歌手',
        cover: '歌曲封面https://y.gtimg.cn/music/photo_new/T002R300x300M000002JsU5q10jUBt.jpg',
        url: '音频文件链接地址http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    })
 */
const play = (backgroundAudioManager, song) => {

    if(song == undefined || song == null) {
        return
    }
    if (backgroundAudioManager == undefined || backgroundAudioManager == null) {
        return
    }

    if (backgroundAudioManager.src != song.url) {
        backgroundAudioManager.title = song.title
        backgroundAudioManager.epname = song.epname
        backgroundAudioManager.singer = song.singer
        backgroundAudioManager.coverImgUrl = song.cover
        backgroundAudioManager.src = song.url
        return
    }
    backgroundAudioManager.play()
}
const pause = backgroundAudioManager => {

    if (backgroundAudioManager == undefined || backgroundAudioManager == null) {
        return
    }
    backgroundAudioManager.pause()
}
const stop = backgroundAudioManager => {

    if (backgroundAudioManager == undefined || backgroundAudioManager == null) {
        return
    }
    backgroundAudioManager.stop()
}

const formatTime = time => {
    time = Math.floor(time)
    let m = Math.floor(time / 60)
    let s = Math.floor(time % 60)
    s = s > 9 ? s : ('0' + s)
    return  m  + ':' + s
}

module.exports = {
    play: play,
    pause: pause,
    stop: stop,
    formatTime: formatTime
}

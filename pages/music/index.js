const app = getApp()
const music = app.globalData.music
const musicUtil = require('../../utils/music.js')

Page({
    data: {
        bannerList: [
            '/images/yk/yk-1.jpeg',
            '/images/yk/yk-2.jpeg',
            '/images/yk/yk-3.jpeg',
            '/images/yk/yk-4.jpeg',
            '/images/yk/yk-5.jpeg'
        ],
        currentSong: {},
        songList: [],
        songStatus: ''
    },
    onLoad: function (options) {

        music.songSheet = this.getSongList()
        this.setData({
            songList : music.songSheet
        })

        console.log("currentSong:::" + this.data.currentSong)

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
        if(music.currentSong != undefined){
            this.setData({ currentSong: music.currentSong })
        }
    },
    getSongList: function() {
        var data = [
            {
                "title": "可能否",
                "author": "木小雅",
                "pic": "https://p1.music.126.net/SJYnDay7wgewU3O7tPfmOQ==/109951163322541581.jpg",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=569214126&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=569214126&type=lrc"
            },
            {
                "title": "魔鬼中的天使",
                "author": "田馥甄",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=296837&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=296837&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=296837&type=lrc"
            },
            {
                "title": "太陽と向日葵",
                "author": "FLOWER",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=28228004&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=28228004&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=28228004&type=lrc"
            },
            {
                "title": "Wonderful U",
                "author": "AGA",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=406475394&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=406475394&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=406475394&type=lrc"
            },
            {
                "title": "其实，我就在你方圆几里（Cover 薛之谦）",
                "author": "陈壹千",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=437387277&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=437387277&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=437387277&type=lrc"
            },
            {
                "title": "aLIEz",
                "author": "mizuki",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29307041&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29307041&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29307041&type=lrc"
            },
            {
                "title": "前前前世",
                "author": "そらる",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=438803182&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=438803182&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=438803182&type=lrc"
            },
            {
                "title": "Take me hand",
                "author": "DAISHI DANCE",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=26092806&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=26092806&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=26092806&type=lrc"
            },
            {
                "title": "打上花火",
                "author": "DAOKO",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=496869422&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=496869422&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=496869422&type=lrc"
            },
            {
                "title": "secret base ~君がくれたもの~",
                "author": "茅野愛衣",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=33911781&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=33911781&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=33911781&type=lrc"
            },
            {
                "title": "红色高跟鞋",
                "author": "蔡健雅",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=208902&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=208902&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=208902&type=lrc"
            },
            {
                "title": "易燃易爆炸",
                "author": "陈粒",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=30431376&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=30431376&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=30431376&type=lrc"
            },
            {
                "title": "龙卷风",
                "author": "G.E.M.邓紫棋",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29450548&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29450548&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29450548&type=lrc"
            },
            {
                "title": "喜欢",
                "author": "阿肆",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=526464145&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=526464145&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=526464145&type=lrc"
            },
            {
                "title": "ハルノユキ",
                "author": "リリィ、さよなら。",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=33233915&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=33233915&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=33233915&type=lrc"
            },
            {
                "title": "アイロニ",
                "author": "majiko",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=31421442&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=31421442&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=31421442&type=lrc"
            },
            {
                "title": "Euterpe",
                "author": "EGOIST",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=722932&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=722932&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=722932&type=lrc"
            },
            {
                "title": "眉间雪(纯歌版)",
                "author": "晴愔",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29572089&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29572089&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29572089&type=lrc"
            },
            {
                "title": "心拍数",
                "author": "H△G",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=472219448&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=472219448&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=472219448&type=lrc"
            },
            {
                "title": "SNS",
                "author": "sympathy",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=461518667&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=461518667&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=461518667&type=lrc"
            },
            {
                "title": "给自己的情书",
                "author": "王菲",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=299604&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=299604&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=299604&type=lrc"
            },
            {
                "title": "如风过境",
                "author": "哎哟蔚蔚",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=520460927&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=520460927&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=520460927&type=lrc"
            },
            {
                "title": "再来一杯",
                "author": "DMYoung",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=527629786&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=527629786&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=527629786&type=lrc"
            },
            {
                "title": "KISS OF DEATH (Produced by HYDE)",
                "author": "中島美嘉",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=531051597&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=531051597&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=531051597&type=lrc"
            },
            {
                "title": "旅行的意义",
                "author": "陈绮贞",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=209326&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=209326&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=209326&type=lrc"
            },
            {
                "title": "九九八十一",
                "author": "特曼",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=440353219&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=440353219&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=440353219&type=lrc"
            },
            {
                "title": "离人愁",
                "author": "李袁杰",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=536502758&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=536502758&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=536502758&type=lrc"
            },
            {
                "title": "The truth that you leave",
                "author": "Pianoboy高至豪",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=139774&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=139774&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=139774&type=lrc"
            },
            {
                "title": "最美的期待",
                "author": "周笔畅",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=531295576&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=531295576&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=531295576&type=lrc"
            },
            {
                "title": "僕が死のうと思ったのは",
                "author": "中島美嘉",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=26830207&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=26830207&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=26830207&type=lrc"
            },
            {
                "title": "Something Just Like This",
                "author": "The Chainsmokers",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=461347998&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=461347998&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=461347998&type=lrc"
            },
            {
                "title": "迷人的危险 _紫色迷情",
                "author": "dance flow",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=353066&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=353066&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=353066&type=lrc"
            },
            {
                "title": "PLANET",
                "author": "ラムジ",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=812400&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=812400&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=812400&type=lrc"
            },
            {
                "title": "保护色",
                "author": "赵钶",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=487190794&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=487190794&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=487190794&type=lrc"
            },
            {
                "title": "茜さす",
                "author": "Aimer",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=441116287&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=441116287&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=441116287&type=lrc"
            },
            {
                "title": "起风了（Cover 高橋優）",
                "author": "买辣椒也用券",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=461525011&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=461525011&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=461525011&type=lrc"
            },
            {
                "title": "桜色舞うころ",
                "author": "徳永英明",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=30284559&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=30284559&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=30284559&type=lrc"
            },
            {
                "title": "Nothing on you",
                "author": "邓福如",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=227724&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=227724&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=227724&type=lrc"
            },
            {
                "title": "外婆的话",
                "author": "不才",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=450424527&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=450424527&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=450424527&type=lrc"
            },
            {
                "title": "If You Feel My Love (Chaow Mix)",
                "author": "Blaxy Girls",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=16714264&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=16714264&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=16714264&type=lrc"
            },
            {
                "title": "世界上的另一个我",
                "author": "阿肆",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=514765154&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=514765154&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=514765154&type=lrc"
            },
            {
                "title": "风になる",
                "author": "Cana",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=563815&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=563815&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=563815&type=lrc"
            },
            {
                "title": "我知道",
                "author": "By2",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=344418&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=344418&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=344418&type=lrc"
            },
            {
                "title": "天使的翅膀",
                "author": "安琥",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=60102&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=60102&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=60102&type=lrc"
            },
            {
                "title": "大大世界",
                "author": "乔维怡",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=285012&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=285012&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=285012&type=lrc"
            },
            {
                "title": "Why Would I Ever",
                "author": "Paula DeAnda",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=3305969&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=3305969&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=3305969&type=lrc"
            },
            {
                "title": "迷梦",
                "author": "许亚童",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=497861301&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=497861301&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=497861301&type=lrc"
            },
            {
                "title": "六月的雨",
                "author": "胡歌",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=92774&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=92774&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=92774&type=lrc"
            },
            {
                "title": "日不落",
                "author": "蔡依林",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=209643&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=209643&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=209643&type=lrc"
            },
            {
                "title": "默",
                "author": "那英",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=31473269&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=31473269&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=31473269&type=lrc"
            },
            {
                "title": "煎熬",
                "author": "李佳薇",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=274686&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=274686&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=274686&type=lrc"
            },
            {
                "title": "山丘 (Live)",
                "author": "胡彦斌Tiger Hu",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=31877078&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=31877078&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=31877078&type=lrc"
            },
            {
                "title": "流着泪说分手",
                "author": "金志文",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=25657445&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=25657445&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=25657445&type=lrc"
            },
            {
                "title": "神的随波逐流",
                "author": "泠鸢yousa",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29753702&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29753702&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29753702&type=lrc"
            },
            {
                "title": "野子",
                "author": "苏运莹",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=401723037&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=401723037&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=401723037&type=lrc"
            },
            {
                "title": "你根本不懂",
                "author": "季彦霖",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=517009807&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=517009807&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=517009807&type=lrc"
            },
            {
                "title": "あっちゅ～ま青春!",
                "author": "七森中☆ごらく部",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=36271441&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=36271441&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=36271441&type=lrc"
            },
            {
                "title": "brave heart",
                "author": "宮崎歩",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29816860&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29816860&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29816860&type=lrc"
            },
            {
                "title": "东京不太热",
                "author": "封茗囧菌",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=34723470&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=34723470&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=34723470&type=lrc"
            },
            {
                "title": "梦的舞台",
                "author": "程欣",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=350749&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=350749&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=350749&type=lrc"
            },
            {
                "title": "我可以忘记你",
                "author": "张碧晨",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=416552313&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=416552313&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=416552313&type=lrc"
            },
            {
                "title": "觅香",
                "author": "栗先达",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=507815173&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=507815173&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=507815173&type=lrc"
            },
            {
                "title": "9420",
                "author": "麦小兜",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=515143305&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=515143305&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=515143305&type=lrc"
            },
            {
                "title": "顿啦 爱你",
                "author": "纣王老何",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=437311047&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=437311047&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=437311047&type=lrc"
            },
            {
                "title": "涩",
                "author": "纣王老胡",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=28310930&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=28310930&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=28310930&type=lrc"
            },
            {
                "title": "红昭愿",
                "author": "音阙诗听",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=452986458&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=452986458&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=452986458&type=lrc"
            },
            {
                "title": "化身孤岛的鲸",
                "author": "不才",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=448184048&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=448184048&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=448184048&type=lrc"
            },
            {
                "title": "安和桥",
                "author": "宋冬野",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=28053527&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=28053527&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=28053527&type=lrc"
            },
            {
                "title": "斑马，斑马",
                "author": "宋冬野",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=27646199&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=27646199&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=27646199&type=lrc"
            },
            {
                "title": "遇见你的时候所有星星都落到我头上",
                "author": "高姗",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=30089063&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=30089063&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=30089063&type=lrc"
            },
            {
                "title": "我的一个道姑朋友（Cover タイナカ彩智 \/ Lon）",
                "author": "纱琉璃Shelley",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=459723209&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=459723209&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=459723209&type=lrc"
            },
            {
                "title": "Despacito",
                "author": "Luis Fonsi",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=452613551&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=452613551&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=452613551&type=lrc"
            },
            {
                "title": "生命中的时光",
                "author": "齐一",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=500913929&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=500913929&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=500913929&type=lrc"
            },
            {
                "title": "不露声色",
                "author": "Jam",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=470759757&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=470759757&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=470759757&type=lrc"
            },
            {
                "title": "Wolves",
                "author": "Selena Gomez",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=515269424&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=515269424&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=515269424&type=lrc"
            },
            {
                "title": "桜ノ雨",
                "author": "伊東歌詞太郎",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=28830016&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=28830016&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=28830016&type=lrc"
            },
            {
                "title": "追光者",
                "author": "岑宁儿",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=483671599&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=483671599&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=483671599&type=lrc"
            },
            {
                "title": "我喜欢你胜过削好的水果周末的零食延后的死线冰镇西瓜正中间的那一口肆无忌惮的赖床和空调房里盖棉被的感觉但我就是不敢告诉你（Cover：魏如萱）",
                "author": "森冬",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=434070103&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=434070103&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=434070103&type=lrc"
            },
            {
                "title": "他不懂",
                "author": "张杰",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=28406532&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=28406532&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=28406532&type=lrc"
            },
            {
                "title": "空白格",
                "author": "蔡健雅",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=208938&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=208938&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=208938&type=lrc"
            },
            {
                "title": "最后的旅行——记《龙族》",
                "author": "绘梨衣",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=32408263&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=32408263&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=32408263&type=lrc"
            },
            {
                "title": "打上花火（Cover DAOKO \/ 米津玄师）",
                "author": "YUKIri",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=504155567&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=504155567&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=504155567&type=lrc"
            },
            {
                "title": "尽头",
                "author": "赵方婧",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=448393515&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=448393515&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=448393515&type=lrc"
            },
            {
                "title": "父亲写的散文诗(时光版)",
                "author": "许飞",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=417250673&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=417250673&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=417250673&type=lrc"
            },
            {
                "title": "天ノ弱",
                "author": "Akie秋绘",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=442016694&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=442016694&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=442016694&type=lrc"
            },
            {
                "title": "房间",
                "author": "刘瑞琦",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=27867140&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=27867140&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=27867140&type=lrc"
            },
            {
                "title": "「交织together」",
                "author": "DMYoung",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=460478768&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=460478768&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=460478768&type=lrc"
            },
            {
                "title": "我要你",
                "author": "任素汐",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=437292675&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=437292675&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=437292675&type=lrc"
            },
            {
                "title": "清明上河图",
                "author": "排骨教主",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=446945324&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=446945324&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=446945324&type=lrc"
            },
            {
                "title": "芊芊（Cover 回音哥）（Cover ）",
                "author": "宇西",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=411755819&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=411755819&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=411755819&type=lrc"
            },
            {
                "title": "霜雪千年",
                "author": "洛天依",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=34923862&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=34923862&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=34923862&type=lrc"
            },
            {
                "title": "普通DISCO",
                "author": "洛天依",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=31140522&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=31140522&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=31140522&type=lrc"
            },
            {
                "title": "我喜欢上你时的内心活动",
                "author": "陈绮贞",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=471403427&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=471403427&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=471403427&type=lrc"
            },
            {
                "title": "典狱司（cover：音频怪物）",
                "author": "特曼",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=440353265&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=440353265&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=440353265&type=lrc"
            },
            {
                "title": "Binarization 2014 Ft.GUMI",
                "author": "H.K.君(HEROAR)",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29498102&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29498102&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29498102&type=lrc"
            },
            {
                "title": "七月上",
                "author": "Jam",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=31445554&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=31445554&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=31445554&type=lrc"
            },
            {
                "title": "甜不辣",
                "author": "郑国锋",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=32897612&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=32897612&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=32897612&type=lrc"
            },
            {
                "title": "我的世界",
                "author": "女神",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=440240201&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=440240201&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=440240201&type=lrc"
            },
            {
                "title": "原谅",
                "author": "张玉华",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=329371&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=329371&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=329371&type=lrc"
            },
            {
                "title": "一个人的北京",
                "author": "好妹妹",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=26427662&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=26427662&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=26427662&type=lrc"
            },
            {
                "title": "恋爱サーキュレーション",
                "author": "花澤香菜",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=579954&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=579954&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=579954&type=lrc"
            },
            {
                "title": "我不愿让你一个人",
                "author": "品冠",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=28427763&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=28427763&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=28427763&type=lrc"
            },
            {
                "title": "追梦赤子心",
                "author": "GALA",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=355992&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=355992&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=355992&type=lrc"
            },
            {
                "title": "雪见—仙凡之旅",
                "author": "麦振鸿",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=86381&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=86381&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=86381&type=lrc"
            },
            {
                "title": "莫失莫忘",
                "author": "麦振鸿",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29999506&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29999506&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29999506&type=lrc"
            },
            {
                "title": "父亲",
                "author": "筷子兄弟",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=362996&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=362996&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=362996&type=lrc"
            },
            {
                "title": "北京东路的日子",
                "author": "刘千楚",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=5240550&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=5240550&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=5240550&type=lrc"
            },
            {
                "title": "没有什么不同",
                "author": "曲婉婷",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=25713024&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=25713024&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=25713024&type=lrc"
            },
            {
                "title": "迷梦",
                "author": "许亚童",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29803270&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29803270&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=29803270&type=lrc"
            },
            {
                "title": "天亮了",
                "author": "韩红",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=238855&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=238855&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=238855&type=lrc"
            },
            {
                "title": "丑八怪",
                "author": "薛之谦",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=27808044&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=27808044&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=27808044&type=lrc"
            },
            {
                "title": "泡沫",
                "author": "G.E.M.邓紫棋",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=26113988&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=26113988&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=26113988&type=lrc"
            },
            {
                "title": "你是我心内的一首歌",
                "author": "Selina",
                "pic": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=5239564&type=pic",
                "url": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=5239564&type=url",
                "lrc": "https:\/\/api.hibai.cn\/music\/Music\/Music?id=5239564&type=lrc"
            }
        ]

        var songList = []
        for(let i=0; i<data.length; i++){
            let s = data[i]
            songList.push({
                id: 'id-' + i,
                index: i,
                title: s.title,
                epname: s.title,
                singer: s.author,
                cover: s.pic,
                url: s.url
            })
        }

        return songList
    },
    bindPlayFunc: function (e) {
        var song = this.data.songList[e.target.dataset.index]
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
    playSong: function(song){
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
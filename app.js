//app.js
App({
    onLaunch: function () {

    },
    showToast: function (title) {
        wx.showToast({ title: title, icon: 'none' })
    },
    doRequest: function (_request, _callbackFunc) {
        wx.showNavigationBarLoading()

        var that = this
        wx.request({
            url: _request.url,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: _request.params,
            method: _request.method,
            success: function (result) {
                var _successFunc = _callbackFunc.successFunc
                var _failFunc = _callbackFunc.failFunc

                var res = result.data

                console.log(res)

                if (res.code == 200 || res.status == 200) {
                    if (_successFunc && (typeof _successFunc == 'function')) {
                        _successFunc(res);
                    }
                } else {
                    if (_failFunc && (typeof _failFunc == 'function')) {
                        _failFunc(res);
                    } else {
                        that.showToast(res.msg)
                    }
                }
            },
            fail: function (data) {
              if(data.errMsg) {
                that.showToast(data.errMsg.replace('request:fail timeout', '请求超时!'))
              }
            },
            complete: function (res) {
                wx.hideNavigationBarLoading()
                wx.stopPullDownRefresh()
                var _completeFunc = _callbackFunc.completeFunc
                if (_completeFunc && (typeof _completeFunc == 'function')) {
                    _completeFunc(res);
                }
            }
        })
    },
    doGet: function (_url, _params, _successFunc, _failFunc, _completeFunc) {
        this.doRequest({
            url: _url,
            params: _params,
            method: 'GET'
        }, {
            successFunc: _successFunc,
            failFunc: _failFunc,
            completeFunc: _completeFunc
        });
    },
    doPost: function (_url, _params, _successFunc, _failFunc, _completeFunc) {
        this.doRequest({
            url: _url,
            params: _params,
            method: 'POST'
        }, {
            successFunc: _successFunc,
            failFunc: _failFunc,
            completeFunc: _completeFunc
        });
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
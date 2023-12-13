// pages/hanziWrite/hanziWrite.js
//获取应用实例
const app = getApp()

const createHanziWriterContext = require('../../components/hanzi-writer-miniprogram/index');
// const cnchar = require('cnchar');
// const poly = require('cnchar-poly');
// const voice = require('cnchar-voice')
// const trad = require('cnchar-trad')
// const words = require('cnchar-words')
// const explain = require('cnchar-explain')
const {
  backgroundToSvg
} = require('../../utils/svgUtils')

// cnchar.setResourceBase('https://now.tingtalk.online/cnchar-data-master/')
// cnchar.use(poly);
// cnchar.use(voice);
// cnchar.use(trad);
// cnchar.use(words);
// cnchar.use(explain);

//引入插件：微信同声传译
//const plugin = requirePlugin('WechatSI');

Page({
  properties: {},
  data: {
    result: {},
    words: [],
    index: 0,
    spell: '',
    showCharacter: true,
    //showOutline: true,
    playStatus: -1
  },
  onLoad: function (options) {
    const {
      words
    } = options
    let wordList = JSON.parse(words)
    wordList = wordList.join('').split('')
    this.setData({
      words: wordList,
      backgroundToSvg: backgroundToSvg()
    }, () => {
      this.updateCharacter();
    })
  },

  onTapPrevious() {
    const {
      index
    } = this.data
    if (index > 0) {
      this.updateCharacter(index - 1)
    } else {
      wx.showToast({
        title: '已经是第一个',
      })
    }
  },
  onTapNext() {
    const {
      index,
      words
    } = this.data
    if (index < words.length - 1) {
      this.updateCharacter(index + 1)
    } else {
      wx.showToast({
        title: '已经是最后一个',
      })
    }
  },

  onSelectWord(e) {
    const {
      index
    } = e.currentTarget.dataset
    this.updateCharacter(parseInt(index))
  },

  pinyin(word) {
    const {
      pinyinCache
    } = app.globalData
    let that = this
    if (pinyinCache[word]) {
      const res = pinyinCache[word]
      that.dealPinyin(res)
    } else {
      wx.request({
        url: `https://hanyuapp.baidu.com/dictapp/v3/s?ptype=zici&source=wenzi&wd=${word}`,
        success(res) {
          pinyinCache[word] = res.data
          that.dealPinyin(pinyinCache[word])
        }
      })
    }
  },

  dealPinyin(res) {
    const ret_array = res.data.ret_array
    if (ret_array.length > 0) {
      const {
        mean_list,
      } = ret_array[0]
      const tone = mean_list.map(mean => {
        return {
          pinyin: mean.pinyin[0],
          tone: mean.tone_py[0]
        }
      })[0]
      this.setData({
        spell: tone.pinyin,
        audioUrl: tone.tone,
      })
    }
  },

  // 画出文字
  drawCharacter: function (word) {
    if (!this.writerCtx) {
      const {
        strokeCache
      } = app.globalData
      
      this.writerCtx = createHanziWriterContext({
        id: 'hz-writer',
        page: this,
        showCharacter: false,
        // character:this.data.inputCharacter,
        //radicalColor: '#1abc9c',//偏旁部首颜色
        charDataLoader: function (char, onComplete) {
          if (strokeCache[char]) {
            onComplete(strokeCache[char])
          } else {
            wx.request({
              url: `https://now.tingtalk.online/cnchar-data-master/draw/${encodeURIComponent(char)}.json`,
              success(res) {
                onComplete(res.data)
                strokeCache[char] = res.data
              }
            })
          }
        },
      });
      setTimeout(() => {
        this.writerCtx.setCharacter(word)
        this.copybook()
      }, 500)
    } else {
      this.writerCtx.setCharacter(word)
      this.copybook()
    }
  },

  //更新
  updateCharacter: function (index = 0) {
    // this.writerCtx.showCharacter();
    const {
      words
    } = this.data
    const word = words[index]
    this.setData({
      playStatus: -1,
      index
    })
    this.pinyin(word);
    this.drawCharacter(word);

    wx.createSelectorQuery()
      .select('#scrollview')
      .node()
      .exec((res) => {
        const dres = wx.getSystemInfoSync()
        const ratio = dres.windowWidth / 375
        const scrollView = res[0].node;
        scrollView.scrollTo({
          left: parseInt(ratio * 48) * index,
          duration: 1,
          animated: true
        });
      })
  },

  //显示笔画
  tangleCharacter: function (e) {
    if (this.data.showCharacter) {
      this.writerCtx.hideCharacter();
    } else {
      this.writerCtx.showCharacter();
    }
    this.setData({
      showCharacter: !this.data.showCharacter
    })
  },

  onTapFollow() {
    this.writerCtx.showOutline()
    this.copybook()
    this.setData({
      showCharacter: true
    })
  },
  onTapBlind() {
    this.writerCtx.hideOutline();
    this.copybook()
    this.setData({
      showCharacter: false
    })
  },
  //隐藏笔画
  // tangleOutline: function (e) {
  //   this.copybook()
  //   if (this.data.showOutline) {
  //     this.writerCtx.hideOutline();
  //   } else {
  //     this.writerCtx.showOutline();
  //   }
  //   this.setData({
  //     showOutline: !this.data.showOutline
  //   })
  // },

  //播放动画
  playAnimate: function (e) {
    let {
      playStatus
    } = this.data
    if (playStatus == -1) {
      this.writerCtx.loopCharacterAnimation()
      playStatus = 1
    } else if (playStatus == 1) {
      this.writerCtx.pauseAnimation()
      playStatus = 0
    } else if (playStatus == 0) {
      this.writerCtx.resumeAnimation()
      playStatus = 1
    }
    this.setData({
      playStatus
    })
  },

  //临摹
  copybook: function (e) {
    let that = this
    this.setData({
      playStatus: -1
    })
    this.writerCtx.quiz({
      onMistake: function (strokeData) {
        console.log('Oh no! you made a mistake on stroke ' + strokeData.strokeNum);
        console.log("You've made " + strokeData.mistakesOnStroke + " mistakes on this stroke so far");
        console.log("You've made " + strokeData.totalMistakes + " total mistakes on this quiz");
        console.log("There are " + strokeData.strokesRemaining + " strokes remaining in this character");
      },
      onCorrectStroke: function (strokeData) {
        console.log('Yes!!! You got stroke ' + strokeData.strokeNum + ' correct!');
        console.log('You made ' + strokeData.mistakesOnStroke + ' mistakes on this stroke');
        console.log("You've made " + strokeData.totalMistakes + ' total mistakes on this quiz');
        console.log('There are ' + strokeData.strokesRemaining + ' strokes remaining in this character');
      },
      onComplete: function (summaryData) {
        console.log('You did it! You finished drawing ' + summaryData.character);
        console.log('You made ' + summaryData.totalMistakes + ' total mistakes on this quiz');
        let {
          result
        } = that.data
        result[summaryData.character] = true
        that.setData({
          result
        })
        setTimeout(that.onTapNext, 500)
      }
    });
    // var colorName ='#ff0'
    // this.writerCtx.updateColor(colorName, colorVal, options);
  },

  // 文字转语音
  wordYun: function (e) {
    var that = this;
    var content = this.data.inputCharacter;
    //cnchar.voice(content,{autoStart:true})

    // plugin.textToSpeech({
    //   lang: "zh_CN",
    //   tts: true,
    //   content: content,
    //   success: function (res) {
    //     console.log(res);
    //     console.log("succ tts", res.filename);
    //     that.setData({
    //       src: res.filename
    //     })
    //     that.yuyinPlay();

    //   },
    //   fail: function (res) {
    //     console.log("fail tts", res)
    //   }
    // })
  },

  //播放语音
  yuyinPlay: function (e) {
    const {
      url
    } = e.currentTarget.dataset
    if (url == '') {
      console.log(暂无语音);
      return;
    }
    if (!this.innerAudioContext) {
      //创建内部 audio 上下文 InnerAudioContext 对象。
      this.innerAudioContext = wx.createInnerAudioContext({
        useWebAudioImplement: true
      });
      this.innerAudioContext.obeyMuteSwitch = false
      this.innerAudioContext.onError(function (res) {
        console.log(res);
        wx.showToast({
          title: '语音播放失败',
          icon: 'none',
        })
      })
    }
    this.innerAudioContext.src = url //设置音频地址
    this.innerAudioContext.play(); //播放音频
  },
});
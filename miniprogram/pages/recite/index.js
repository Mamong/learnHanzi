// pages/recite/index.js
const app = getApp()

const {
  backgroundToSvg
} = require('../../utils/svgUtils')

let touchs = []
let lines = []
let undos = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    signImage: '',
    showPanel: false,
    index:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let wordList = app.globalData.words
    this.setData({
      words: wordList,
      backgroundToSvg: backgroundToSvg()
    })
    touchs = []
    lines = []
    undos = []
    app.globalData.result = []
    this.loadReciteSettings()
    this.updateCharacter()
  },
  loadReciteSettings() {
    wx.getStorage({
      key: 'recite-settings',
      success: res => {
        if (res.data) {
          this.setData({
            formData: res.data
          })
        }
      },
      fail: err => {
        console.log(err)
        let formData = {
          autoRead: true,
          showPinyin: true,
          showTips: true,
          readNum: 3,
          switchInterval: 5,
        }
        this.setData({
          formData
        })
      }
    })
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
      const tones = mean_list.map(mean => {
        return {
          pinyin: mean.pinyin[0],
          tone: mean.tone_py[0]
        }
      })
      const means = mean_list.map(mean => mean.definition[0])
      this.setData({
        tones,
        means
      })
    }
  },

  config() {
    this.context.beginPath()
    this.context.strokeStyle = "#000000"
    this.context.lineWidth = 4
    this.context.lineCap = "round"
    this.context.lineJoin = "round"
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.createSelectorQuery()
      .select('#writer-canvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const info = res[0];
        const dpr = wx.getSystemInfoSync().pixelRatio;
        this.canvas = info.node;
        this.canvas.width = info.width * dpr;
        this.canvas.height = info.height * dpr;
        this.context = this.canvas.getContext('2d');
        this.context.scale(dpr, dpr);
        this.config()
      });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  // 画布的触摸移动开始手势响应
  start: function (event) {
    //获取触摸开始的 x,y
    let point = {
      x: event.changedTouches[0].x,
      y: event.changedTouches[0].y
    }
    touchs.push(point);
    this.context.moveTo(point.x, point.y);
  },
  // 画布的触摸移动手势响应
  move: function (e) {
    let point = {
      x: e.touches[0].x,
      y: e.touches[0].y
    }
    touchs.push(point);
    this.context.lineTo(point.x, point.y);
    this.context.stroke();
  },
  // 画布的触摸移动结束手势响应
  end: function (e) {
    console.log("触摸结束" + e);
    lines.push(touchs)
    touchs = []
  },
  // 画布的触摸取消响应
  cancel: function (e) {
    console.log("触摸取消" + e);
  },
  // 画布的长按手势响应
  tap: function (e) {
    console.log("长按手势" + e);
  },
  error: function (e) {
    console.log("画布触摸错误" + e);
  },

  redraw() {
    this.context.clearRect(0, 0, 600, 600);
    this.context.beginPath()
    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[i].length; j++) {
        let point = lines[i][j]
        if (j == 0) {
          console.log("move to " + point.x + ":" + point.y)
          this.context.moveTo(point.x, point.y);
        } else {
          this.context.lineTo(point.x, point.y);
          this.context.stroke();
        }
      }
    }
  },

  onTapUndo() {
    if (lines.length == 0) return
    undos.push(lines.pop())
    this.redraw()
  },
  onTapRedo() {
    if (undos.length == 0) return
    lines.push(undos.pop())
    this.redraw()
  },
  //清除操作
  onTapReset: function () {
    lines = []
    undos = []
    //清除画布
    this.context.clearRect(0, 0, 600, 600);
    this.context.beginPath()
  },
  onSelectLine() {

  },
  //保存图片
  saveHandwriting: function () {
    if(lines.length == 0) return

    const {index, result} = this.data
    const that = this;
    wx.canvasToTempFilePath({
      canvas: this.canvas,
      success: function (res) {
        //打印图片路径
        console.log(res.tempFilePath);
        //设置保存的图片
        if(!app.globalData.result){
          app.globalData.result = []
        }
        app.globalData.result[index] = res.tempFilePath
        that.onTapReset()
      },
      fail:err=>{
        console.log(err)
      }
    })
  },

  onShowPanel() {
    this.setData({
      showPanel: true,
    })

    let animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-out'
    })
    animation.bottom(0).step({
      duration: 300
    });
    this.setData({
      animationData: animation.export(),
    })
  },
  onHidePanel() {
    let animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-out'
    })
    animation.bottom(-250).step({
      duration: 300
    });
    this.setData({
      animationData: animation.export(),
    })
    this.setData({
      showPanel: false,
    })
  },

  onTapCheckbox(e) {
    const {
      field
    } = e.currentTarget.dataset
    const {
      formData
    } = this.data
    this.setData({
      [`formData.${field}`]: !formData[field]
    }, () => {
      this.saveReciteSettings()
    })
  },
  sliderChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    const value = e.detail.value
    this.setData({
      [`formData.${field}`]: value
    }, () => {
      this.saveReciteSettings()
    })
  },

  saveReciteSettings() {
    wx.setStorage({
      key: 'recite-settings',
      data: this.data.formData
    })
  },
  handleCatchtouchMove() {

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
      this.saveHandwriting()
      this.updateCharacter(index + 1)
    } else {
      wx.redirectTo({
        url: './result/index',
      })
    }
  },

  updateCharacter: function (index = 0) {
    // this.writerCtx.showCharacter();
    const {
      words
    } = this.data
    const word = words[index]
    this.setData({
      index
    })
    this.pinyin(word);
  },

  //播放语音
  onTapTone: function (e) {
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

})
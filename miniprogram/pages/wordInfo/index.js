// pages/wordInfo/index.js
const {characterToSvgSlices,soundIcon,backgroundToSvg} = require('../../utils/svgUtils')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {
      word
    } = options
    wx.setNavigationBarTitle({
      title: word,
    })

    const {
      pinyinCache
    } = app.globalData
    const that = this
    if(pinyinCache[word]){
      that.dealPinyin(pinyinCache[word],word)
    }else{
      wx.request({
        url: `https://hanyuapp.baidu.com/dictapp/v3/s?ptype=zici&source=wenzi&wd=${word}`,
        success(res) {
          console.log(res)
          pinyinCache[word] = res.data
          that.dealPinyin(pinyinCache[word],word)
        }
      })
    }
  },

  dealPinyin(res,word){
    const ret_array = res.data.ret_array
    if (ret_array.length > 0) {
      const {
        name,
        stroke_order,
        synonym,
        antonym,
        mean_list,
        traditional,
        word_wubi,
        word_stroke_count,
        word_radicals
      } = ret_array[0]
      const tones = mean_list.map(mean => {
        return {
          pinyin: mean.pinyin[0],
          tone: mean.tone_py[0]
        }
      })
      const means = mean_list.map(mean => {
        return {
          pinyin: mean.pinyin[0],
          definition: mean.definition,
        }
      })
      const related_terms = mean_list.map(mean => {
        return mean.related_term?{
          pinyin: mean.pinyin[0],
          related_term: mean.related_term,
        }:null
      }).filter(item=>item!=null)
      const strokes = stroke_order.map(order=>order.pic)
      const stroke_orders = characterToSvgSlices(strokes)
      this.setData({
        word,
        soundIcon:soundIcon(),
        backgroundToSvg:backgroundToSvg(),
        //stroke_word:stroke_orders[stroke_orders.length-1],
        tones,
        traditional,
        word_wubi,
        word_stroke_count,
        word_radicals,
        stroke_orders,
        means,
        related_terms,
        synonym,
        antonym,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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
  onTapTone(e){
    const {url} = e.currentTarget.dataset
    if(!this.innerAudioContext){
      this.innerAudioContext = wx.createInnerAudioContext({
        useWebAudioImplement: true // 是否使用 WebAudio 作为底层音频驱动，默认关闭。对于短音频、播放频繁的音频建议开启此选项，开启后将获得更优的性能表现。由于开启此选项后也会带来一定的内存增长，因此对于长音频建议关闭此选项
      })
      this.innerAudioContext.obeyMuteSwitch = false
    }
    this.innerAudioContext.src = url
    this.innerAudioContext.play() 
  },

  onTapItem(e){
    const {item} = e.currentTarget.dataset
    wx.navigateTo({
      url: `./index?word=${item}`,
    })
  }
})
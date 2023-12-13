// pages/textbook/index.js
import book0 from '../../../books/book0'
import book1 from '../../../books/book1'
import book2 from '../../../books/book2'
import book3 from '../../../books/book3'
import book4 from '../../../books/book4'
import book5 from '../../../books/book5'
import book6 from '../../../books/book6'
import book7 from '../../../books/book7'
import book8 from '../../../books/book8'
import book9 from '../../../books/book9'
import book10 from '../../../books/book10'
import book11 from '../../../books/book11'
// import book12 from '../../../books/book12'
// import book13 from '../../../books/book13'
// import book14 from '../../../books/book14'
// import book15 from '../../../books/book15'
// import book16 from '../../../books/book16'
// import book17 from '../../../books/book17'

const {backgroundToSvg,pencilIcon,dictationIcon} = require('../../../utils/svgUtils')
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
    const {bookId,title,cates} = options
    this.data.bookId = bookId

    const cateList = JSON.parse(cates)
    wx.setNavigationBarTitle({
      title: title,
    })
    const bookData = require(`../../../books/book${bookId}`)
    const {data:{retArray}} = bookData
    this.setData({
      list:retArray,
      cates: cateList,
      cate:cateList[0].key,
      wordbkg:backgroundToSvg(),
      pencilIcon:pencilIcon(),
      dictationIcon:dictationIcon()
    })
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

  onTapWord(e){
    const { word} = e.currentTarget.dataset
    wx.navigateTo({
      url: `../../wordInfo/index?word=${word}`,
    })
  },
  onTapWrite(e){
    const { index } = e.currentTarget.dataset
    const {cate,list} = this.data
    const lesson = list[index]
    const words = lesson[cate]
    app.globalData.words = words
    wx.navigateTo({
      url: `../../hanziWrite/hanziWrite?words=${JSON.stringify(words)}`,
    })
  },
  onTapRecite(e){
    const { index } = e.currentTarget.dataset
    const {cate,list} = this.data
    const lesson = list[index]
    const words = lesson[cate]
    app.globalData.words = words
    wx.navigateTo({
      url: `../../recite/index?words=${JSON.stringify(words)}`,
    })
  },
  onTapCate(e){
    const { cate } = e.currentTarget.dataset
    this.setData({
      cate
    })
  }
})
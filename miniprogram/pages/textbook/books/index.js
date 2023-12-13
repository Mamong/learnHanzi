// pages/textbook/books/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        id: '0',
        cover: '/images/books/rg_1-1.jpg',
        title: '一年级（上）',
        version: '人教版',
        subtitle: '小学语文一年级上册课本生字',
        cates:[{"key":"rwords","name":"识字表"},{"key":"wwords","name":"写字表"}]
      },
      {
        id: '1',
        cover: '/images/books/rg_1-2.jpg',
        title: '一年级（下）',
        version: '人教版',
        subtitle: '小学语文一年级下册课本生字',
        cates:[{"key":"rwords","name":"识字表"},{"key":"wwords","name":"写字表"}]

      },
      {
        id: '2',
        cover: '/images/books/rg_2-1.jpg',
        title: '二年级（上）',
        version: '人教版',
        subtitle: '小学语文二年级上册课本生字',
        cates:[{"key":"rwords","name":"识字表"},{"key":"wwords","name":"写字表"},{"key":"terms","name":"词语表"}]

      },
      {
        id: '3',
        cover: '/images/books/rg_2-2.jpg',
        title: '二年级（下）',
        version: '人教版',
        subtitle: '小学语文二年级下册课本生字',
        cates:[{"key":"rwords","name":"识字表"},{"key":"wwords","name":"写字表"},{"key":"terms","name":"词语表"}]

      },
      {
        id: '4',
        cover: '/images/books/rg_3-1.jpg',
        title: '三年级（上）',
        version: '人教版',
        subtitle: '小学语文三年级上册课本生字',
        cates:[{"key":"rwords","name":"识字表"},{"key":"wwords","name":"写字表"},{"key":"terms","name":"词语表"}]

      },
      {
        id: '5',
        cover: '/images/books/rg_3-2.jpg',
        title: '三年级（下）',
        version: '人教版',
        subtitle: '小学语文三年级下册课本生字',
        cates:[{"key":"rwords","name":"识字表"},{"key":"wwords","name":"写字表"},{"key":"terms","name":"词语表"}]

      },
      {
        id: '6',
        cover: '/images/books/rg_4-1.jpg',
        title: '四年级（上）',
        version: '人教版',
        subtitle: '小学语文四年级上册课本生字',
        cates:[{"key":"rwords","name":"识字表"},{"key":"wwords","name":"写字表"},{"key":"terms","name":"词语表"}]

      },
      {
        id: '7',
        cover: '/images/books/rg_4-2.jpg',
        title: '四年级（下）',
        version: '人教版',
        subtitle: '小学语文四年级下册课本生字',
        cates:[{"key":"rwords","name":"识字表"},{"key":"wwords","name":"写字表"},{"key":"terms","name":"词语表"}]

      },
      {
        id: '8',
        cover: '/images/books/rg_5-1.jpg',
        title: '五年级（上）',
        version: '人教版',
        subtitle: '小学语文五年级上册课本生字',
        cates:[{"key":"rwords","name":"识字表"},{"key":"wwords","name":"写字表"},{"key":"terms","name":"词语表"}]

      },
      {
        id: '9',
        cover: '/images/books/rg_5-2.jpg',
        title: '五年级（下）',
        version: '人教版',
        subtitle: '小学语文五年级下册课本生字',
        cates:[{"key":"rwords","name":"识字表"},{"key":"wwords","name":"写字表"},{"key":"terms","name":"词语表"}]

      },
      {
        id: '10',
        cover: '/images/books/rg_6-1.jpg',
        title: '六年级（上）',
        version: '人教版',
        subtitle: '小学语文六年级上册课本生字',
        cates:[{"key":"wwords","name":"写字表"},{"key":"terms","name":"词语表"}]

      },
      {
        id: '11',
        cover: '/images/books/rg_6-2.jpg',
        title: '六年级（下）',
        version: '人教版',
        subtitle: '小学语文六年级下册课本生字',
        cates:[{"key":"wwords","name":"写字表"},{"key":"terms","name":"词语表"}]
      },
      // {
      //   id: '12',
      //   cover: '/images/books/rg_7-1.jpg',
      //   title: '七年级（上）',
      //   version: '人教版',
      //   subtitle: '中学语文七年级上册课本生字'
      // },
      // {
      //   id: '13',
      //   cover: '/images/books/rg_7-2.jpg',
      //   title: '七年级（下）',
      //   version: '人教版',
      //   subtitle: '中学语文七年级下册课本生字'
      // },
      // {
      //   id: '14',
      //   cover: '/images/books/rg_8-1.jpg',
      //   title: '八年级（上）',
      //   version: '人教版',
      //   subtitle: '中学语文八年级上册课本生字'
      // },
      // {
      //   id: '15',
      //   cover: '/images/books/rg_8-2.jpg',
      //   title: '八年级（下）',
      //   version: '人教版',
      //   subtitle: '中学语文八年级下册课本生字'
      // },
      // {
      //   id: '16',
      //   cover: '/images/books/rg_9-1.jpg',
      //   title: '九年级（上）',
      //   version: '人教版',
      //   subtitle: '中学语文九年级上册课本生字'
      // },
      // {
      //   id: '17',
      //   cover: '/images/books/rg_9-2.jpg',
      //   title: '九年级（下）',
      //   version: '人教版',
      //   subtitle: '中学语文九年级下册课本生字'
      // }
    ],
    allpublication: [{
        name: "S版",
        books: [{
            class: "一年级上",
            cates: ["生字表1", "生字表2"]
          },
          {
            class: "一年级下",
            cates: ["生字表1", "生字表2"]
          },
          {
            class: "二年级上",
            cates: ["生字表1", "生字表2"]
          },
          {
            class: "二年级下",
            cates: ["生字表1", "生字表2"]
          },
          {
            class: "三年级上",
            cates: ["生字表1", "生字表2"]
          },
          {
            class: "三年级下",
            cates: ["生字表1", "生字表2"]
          },
          {
            class: "四年级上",
            cates: ["生字表1", "生字表2"]
          },
          {
            class: "四年级下",
            cates: ["生字表1", "生字表2"]
          },
          {
            class: "五年级上",
            cates: ["生字表1", "生字表2"]
          },
          {
            class: "五年级下",
            cates: ["生字表1", "生字表2"]
          },
          {
            class: "六年级上",
            cates: ["生字表1", "生字表2"]
          },
          {
            class: "六年级下",
            cates: ["生字表1", "生字表2"]
          }
        ]
      },
      {
        name: "人教版",
        books: [{
            class: "一年级上",
            cates: ["写字表", "识字表"]
          },
          {
            class: "一年级下",
            cates: ["写字表", "识字表"]
          },
          {
            class: "二年级上",
            cates: ["写字表", "识字表"]
          },
          {
            class: "二年级下",
            cates: ["写字表", "识字表"]
          },
          {
            class: "三年级上",
            cates: ["生字表1", "生字表2"]
          },
          {
            class: "三年级下",
            cates: ["生字表1", "生字表2"]
          },
          {
            class: "四年级上",
            cates: ["生字表1", "生字表2"]
          },
          {
            class: "四年级下",
            cates: ["生字表1", "生字表2"]
          },
          {
            class: "五年级上",
            cates: ["生字表1", "生字表2"]
          },
          {
            class: "五年级下",
            cates: ["生字表1", "生字表2"]
          },
          {
            class: "六年级上",
            cates: ["生字表2"]
          },
          {
            class: "六年级下",
            cates: ["生字表2"]
          }
        ]
      },
      {
        name: "北师大版",
        books: [{
            class: "一年级上",
            cates: ["写字表", "认字表"]
          },
          {
            class: "一年级下",
            cates: ["写字表", "认字表"]
          },
          {
            class: "二年级上",
            cates: ["写字表", "认字表"]
          },
          {
            class: "二年级下",
            cates: ["写字表", "认字表"]
          },
          {
            class: "三年级上",
            cates: ["写字表", "认字表"]
          },
          {
            class: "三年级下",
            cates: ["写字表", "认字表"]
          },
          {
            class: "四年级上",
            cates: ["写字表", "认字表"]
          },
          {
            class: "四年级下",
            cates: ["写字表", "认字表"]
          },
          {
            class: "五年级上",
            cates: ["写字表", "认字表"]
          }
        ]
      },
      {
        name: "沪教版",
        books: [{
            class: "一年级上",
            cates: ["生字表"]
          },
          {
            class: "一年级下",
            cates: ["生字表"]
          },
          {
            class: "二年级上",
            cates: ["生字表"]
          },
          {
            class: "二年级下",
            cates: ["写字表", "生字表"]
          },
          {
            class: "三年级上",
            cates: ["生字表"]
          },
          {
            class: "三年级下",
            cates: ["生字表"]
          }
        ]
      },
      {
        name: "苏教版",
        books: [{
            class: "一年级上",
            cates: ["生字表", "认字表"]
          },
          {
            class: "一年级下",
            cates: ["生字表"]
          },
          {
            class: "二年级上",
            cates: ["生字表"]
          },
          {
            class: "二年级下",
            cates: ["生字表"]
          },
          {
            class: "三年级上",
            cates: ["生字表"]
          },
          {
            class: "三年级下",
            cates: ["生字表"]
          },
          {
            class: "四年级上",
            cates: ["生字表"]
          },
          {
            class: "四年级下",
            cates: ["生字表"]
          },
          {
            class: "五年级上",
            cates: ["生字表"]
          },
          {
            class: "五年级下",
            cates: ["生字表"]
          },
          {
            class: "六年级上",
            cates: ["生字表"]
          },
          {
            class: "六年级下",
            cates: ["生字表"]
          }
        ]
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
  onSelectBook(e) {
    const {
      index
    } = e.currentTarget.dataset
    const book = this.data.list[index]
    wx.setStorage({
      key: "yuwen-learning",
      data: book
    })
    wx.navigateBack()
  },

  onTapBook(e) {
    const {
      index
    } = e.currentTarget.dataset
    const {
      id,
      title,
      cates,
    } = this.data.list[index]
    wx.navigateTo({
      url: `../words/index?bookId=${id}&title=${title}&cates=${JSON.stringify(cates)}`,
    })
  }
})
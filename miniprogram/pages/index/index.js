// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

// 请保证最先引入 cnchar 基础库，其他几个库顺序无所谓
// ... 其他插件请参考第二章 2. 功能及插件概览
// 插件请按需取用
// 注：cnchar-draw，cnchar-voice 在非浏览器环境下不可使用
//cnchar.use(poly);
//const wo = require('hanzi-writer-data/我');

Page({
  data: {
    showUploadTip: false,
    powerList: [{
      title: '云函数',
      tip: '安全、免鉴权运行业务代码',
      showItem: false,
      item: [{
        title: '获取OpenId',
        page: 'getOpenId'
      },
      //  {
      //   title: '微信支付'
      // },
       {
        title: '生成小程序码',
        page: 'getMiniProgramCode'
      },
      // {
      //   title: '发送订阅消息',
      // }
    ]
    }, {
      title: '数据库',
      tip: '安全稳定的文档型数据库',
      showItem: false,
      item: [{
        title: '创建集合',
        page: 'createCollection'
      }, {
        title: '更新记录',
        page: 'updateRecord'
      }, {
        title: '查询记录',
        page: 'selectRecord'
      }, {
        title: '聚合操作',
        page: 'sumRecord'
      }]
    }, {
      title: '云存储',
      tip: '自带CDN加速文件存储',
      showItem: false,
      item: [{
        title: '上传文件',
        page: 'uploadFile'
      }]
    }, {
      title: '云托管',
      tip: '不限语言的全托管容器服务',
      showItem: false,
      item: [{
        title: '部署服务',
        page: 'deployService'
      }]
    }],
    envList,
    selectedEnv: envList[0],
    haveCreateCollection: false
  },

  onShow(options){
    let that = this
    wx.getStorage({
      key: 'yuwen-learning',
      success (res) {
        console.log(res.data)
        if(!res.data){

        }else{
          that.setData({
            ...res.data
          })
        }
      }
    })
  },

  onClickChange(e){
    wx.navigateTo({
      url: '../textbook/books/index',
    })
  },

  onClickLearn(e) {
    const { id,title,cates } = this.data
    wx.navigateTo({
      url: `../textbook/words/index?bookId=${id}&title=${title}&cates=${JSON.stringify(cates)}`,
    })
  },


  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    });
  },

  onInputChange(e){
    const word = e.detail.value
    this.data.word = word
  },

  onTapSearch(){
    let {word} = this.data
    if(word == null || (word=word.trim()).length == 0){
      wx.showToast({
        icon:"error",
        title: '请输入汉字或词语',
      })
      return
    }

    wx.navigateTo({
      url: `../wordInfo/index?word=${word}`,
    })
  }

});

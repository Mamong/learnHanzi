// const bkg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBpZD0iZ3JpZC1iYWNrZ3JvdW5kLXRhcmdldCI+CiAgPGxpbmUgeDE9IjAiIHkxPSIwIiB4Mj0iMTAwIiB5Mj0iMTAwIiBzdHJva2U9IiNGOUY5RjkiLz4KICA8bGluZSB4MT0iMTAwIiB5MT0iMCIgeDI9IjAiIHkyPSIxMDAiIHN0cm9rZT0iI0Y5RjlGOSIvPgogIDxsaW5lIHgxPSI1MCIgeTE9IjAiIHgyPSI1MCIgeTI9IjEwMCIgc3Ryb2tlPSIjRjlGOUY5Ii8+CiAgPGxpbmUgeDE9IjAiIHkxPSI1MCIgeDI9IjEwMCIgeTI9IjUwIiBzdHJva2U9IiNGOUY5RjkiLz4KPC9zdmc+'

const bkg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96' style='width:96px; height:96px;'%3E %3Crect x='0' y='0' width='96' height='96' stroke='%23ff4242' fill='none' stroke-width='2'%3E%3C/rect%3E %3Cpath d='M96,0 L0,96 Z' fill='%23fff' stroke='%23ff4242' stroke-width='1' stroke-dasharray='2,6'%3E%3C/path%3E%3Cpath d='M0,0 L96,96 Z' fill='%23fff' stroke='%23ff4242' stroke-width='1' stroke-dasharray='2,6'%3E%3C/path%3E%3Cpath d='M0,48 L96,48 Z' fill='%23fff' stroke='%23ff4242' stroke-width='1' stroke-dasharray='2,5'%3E%3C/path%3E%3Cpath d='M48,0 L48,96 Z' fill='%23fff' stroke='%23ff4242' stroke-width='1' stroke-dasharray='2,5'%3E%3C/path%3E %3C/svg%3E"

//"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96' style='width:66px; height:66px;'%3E %3Crect x='0' y='0' width='96' height='96' stroke='%23ff4242' fill='none' stroke-width='2'%3E%3C/rect%3E %3Cpath d='M0,48 L96,48 Z' fill='%23fff' stroke='%23ff4242' stroke-width='1' stroke-dasharray='2,5'%3E%3C/path%3E%3Cpath d='M48,0 L48,96 Z' fill='%23fff' stroke='%23ff4242' stroke-width='1' stroke-dasharray='2,5'%3E%3C/path%3E %3C/svg%3E"

Component({
  properties: {
    height: {
      type: Number,
      value: 300,
    },
    width: {
      type: Number,
      value: 300,
    },
    type: {
      type: String,
      value: '2d',
    },
    disableScroll: {
      type: Boolean,
      value: false,
    },
    withBg: {
      type: Boolean,
      default: true
    }
  },
  data: {
    isQuizzing: false,
    backgroundImage: bkg
  },
  methods: {
    connectContext(ctx) {
      this.ctx = ctx;
    },
    disconnectContext() {
      if (this.ctx) {
        this.ctx = undefined;
      }
    },
    _touchStart(evt) {
      if (this.ctx) this.ctx.trigger('pointerStart', evt);
    },
    _touchMove(evt) {
      if (this.ctx) this.ctx.trigger('pointerMove', evt);
    },
    _touchEnd(evt) {
      if (this.ctx) this.ctx.trigger('pointerEnd', evt);
    },
    setIsQuizzing(isQuizzing) {
      this.setData({ isQuizzing });
    },
  },
  lifetimes: {
    detached() {
      if (this.ctx) {
        this.ctx.destroy();
      }
    },
  },
  observers:{
    "withBg":function(withBg){
      let backgroundImage
        if (withBg) {
          backgroundImage = bkg
        } else {
          backgroundImage = ''
        }
      this.setData({
        backgroundImage
      })
    }
  }
});

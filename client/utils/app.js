require("./wx")

//app.js
const {
  broadcast,
  defineApp
} = require("./util")

const systemInfo = wx.getSystemInfoSync()
const isAndroid = systemInfo.platform == "android"

module.exports = {
  onLaunch() {
    let that = this

    defineApp(that)

    that.has_req_location = true

  },
  globalData: {
    isAndroid,
    cur_page: "index"
  },
  setPage(page) {
    this.globalData.cur_page = page
  }
}
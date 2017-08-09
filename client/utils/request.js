const config = require("../consts/config")
const utils = require("./util")
const {
  md5,
  base64,
  extend
} = utils
const {
  MOCK,
  MOCK_IP
} = config

const systemInfo = wx.getSystemInfoSync() || {}
const noop = function() {}

const post_header = {
  'content-type': 'application/x-www-form-urlencoded'
}
const default_method = "POST"

function getPlatformCode() {
  return `${systemInfo.platform == "ios" ? 3 : 4}`
}

function getApiPrefixURL() {
  var prefix = `https://ebizdemo.cloud.sensorsdata.cn/api/`

  // MOCK
  // 使用本地server 模拟接口
  if (MOCK) prefix = "http://" + MOCK_IP + ":3000/"

  return prefix
}


// 封装一层request
// path 接口的路径
// atype 接口的类型 [ p l u c m ] 这5类，默认m
function request(config) {

  //判断网络状态
  wx.getNetworkType({
    success(res) {
      console.log("======== network =========", res)
      if (res.networkType == "fail" || res.networkType == "none") {
        wx.showModal({
          showCancel: false,
          title: "提示",
          content: "网络无反应，请检查您的网络设置"
        })
      }
    }
  })

  var {
    url,
    notip,
    data,
    success: onSuccess,
    error: onError
  } = config
  if (!data) data = config.data = {}

  config.url = url || (apiPrefix + path.replace(/^\//, ""))

  var _success = config.success || noop
  var _fail = config.fail || noop
  var _done = config.done || noop
  config.success = (res) => {
    var {
      data
    } = res
    var {
      code,
      message
    } = data

    console.info("=======" + config.url + "=======")
    console.info(res)
    if (1) {
    // 出错的统一处理
      _fail()
    } else {
      _success(data)
    }
    _done()
  }
  console.log("request---------param------", config)
  wx.request(config)
}

module.exports = request
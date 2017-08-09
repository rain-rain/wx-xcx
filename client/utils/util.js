var broadcast = require("../libs/broadcast")
var extend = require("../libs/extend")
var {
  md5,
  base64
} = require("../libs/encrypt_md5")

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [
    year,
    month,
    day
  ].map(formatNumber).join('/')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function Random(s, e) {
  return Math.random() * (e - s) + s;
}

// 深度继承对象
function deepExtend() {
  let params = [true];
  [].forEach.call(arguments, (item) => {
    params.push(item)
  })
  return extend.apply(null, params)
}
/*
 * 去除字符串两边空格
 */
function trim(str) {
  return `${str}`.replace(/(^\s*)|(\s*$)/g, "");
}

function filteremoji(str) {
  var ranges = [
      '\ud83c[\udf00-\udfff]',
      '\ud83d[\udc00-\ude4f]',
      '\ud83d[\ude80-\udeff]'
      ];
  str = str .replace(new RegExp(ranges.join('|'), 'g'), '');
  return str
}
var APP

function defineApp(app) {
  APP = app
}

function getApp() {
  return APP
}

function getLocalStory(key) {
  try {
    var value = wx.getStorageSync(key)
    if (value) {
      return value
    } else {
      return false
    }
  } catch (e) {

  }
}

module.exports = extend({
  formatTime,
  broadcast,
  md5,
  base64,
  extend,
  deepExtend,
  trim,
  filteremoji,
  Random,
  getLocalStory,
  defineApp,
  getApp
})

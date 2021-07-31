// 引入腾讯地图SDK
const QQMapWX = require('../lib/qqmap-wx.min.js')
const key = 'XUVBZ-VYBKP-7KKDP-L5YHA-74TFQ-7CFC5'

// 实例化腾讯地图
const QQmap = new QQMapWX({key})


// 导出Promise化后的接口
module.exports =  {
	 QQmap,
	 search: (params={}) => _Promisify("search", params),  // 地点搜索，搜索周边poi，比如：“酒店” “餐饮” “娱乐” “学校” 等等
	 reverseGeocoder: (params={}) => _Promisify("reverseGeocoder",params),  // 提供由坐标到坐标所在位置的文字描述的转换。
	 getSuggestion: (params={}) => _Promisify("getSuggestion", params),  // 用于获取输入关键字的补完与提示，帮助用户快速输入
 } 
	


// ***************  腾讯地图接口相关工具函数    ********************

// Promise化腾讯地图接口
function _Promisify(apiName, params){
	return new Promise((resolve, reject) => {
		let options = {
			success: data => resolve(data),
			fail: errInfo => _handleQQmapErr(errInfo)
		}
		if(params){
			Object.assign(options, params)
		}
		QQmap[apiName](options)
	})
}

// 腾讯地图接口错误统一处理函数
function _handleQQmapErr(errInfo){
	console.log(errInfo)
	uni.showToast({
		duration: 2000,
		title: errInfo.message,
		icon: 'none'
	})
}


const { request } = require("./config.js")

module.exports = {
		// 获取首页数据（除商品列表）
		getIndexData(){
			return request('get','/main', null, false)
		},
		// 获取商品列表
		getGoodList(){
			return request('get', '/main/spu', null, false)
		},
		// 获取商品详情
		getGoodDetail(id){
			return request('get', `/spu/id/${id}/detail`, null, false)
		},
		// 获取我的地址列表
		getMyLocationList(){
			return request('get', `/userAddress/all`, null, true)
		},
		// 新增收货地址
		newAddr(data){
			return request('post', '/userAddress',data, true)
		},
		// 删除一条收货地址
		deleteAddr(id){
			return request('delete', `/userAddress/id/${id}`,null, true)
		},
		// 获取促销商品页数据（轮播、活动列表、活动商品列表）
		getPromotionData(){
			return request('get', '/activity/activityPage', null, false)
		},
		// 获取搜索结果
		search(data){
			return request('get', '/spu/title/simplify', data, false)
		},
		// 获取配送费打包费的值
		getPackageAndDeliverFee(data){
			return request('get', '/order/otherFee', data, true)
		},
		// 创建订单
		newOrder(data){
			console.log(data)
			return request('post', '/order', data, true)
		},
		// 获取全部订单
		getAllOrders(data){
			return request('get', '/order/all', data, true)
		},
		// 获取进行中订单订单（全部）
		getOngoingOrders(data){
			return request('get', '/order/status/underWay', data, true)
		},
		// 获取已完成订单
		getCompletedOrders(data){
			return request('get', '/order/status/finished', data, true)
		},
		
		// 微信授权登录 接口 
		wxLogin(data){
			return request('post', '/token', data)
		},
		
		// 支付接口
		wxPay(id){
			return request("post",`/payment/pay/order/${id}`, null, true)
		}
}
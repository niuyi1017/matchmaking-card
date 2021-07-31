const TOKEN = "TOKEN"
const USER_INFO = "USER_INFO" 
const SEARCH_HISTORY = "SEARCH_HISTORY" 
const moment = require("../lib/moment.js")


// 设置token
function setToken(token) {
		try {
			  uni.setStorageSync(TOKEN, token)
		} catch (e) {
			_handleError(e)
		}
	}  
		
	// 取出Token
function getToken() {
		try {
				const value = uni.getStorageSync(TOKEN);
				if (value) {
						return value
				}else{
					return ''
				}
		} catch (e) {
			_handleError(e)
		}
	}
	
	// 清除Token
function removeToken() {
		try {
		  uni.removeStorageSync(TOKEN)
		} catch (e) {
		  _handleError(e)
		}
	}
		
	// 设置登录用户信息
function setUserInfo(userInfo) {
		try {
				uni.setStorageSync(USER_INFO, userInfo)
		} catch (e) {
			_handleError(e)
		}
	}
		
	// 取出用户信息
function getUserInfo() {
		try {
			return uni.getStorageSync(USER_INFO);
		} catch (e) {
			_handleError(e)
		}
	}
	
	// 清除用户信息
function removeUserInfo() {
		try {
		  uni.removeStorageSync(USER_INFO)
		} catch (e) {
		  _handleError(e)
		}
	}
	
	// 设置搜索历史
function setSearchHistory(searchHistory) {
		try {
				uni.setStorageSync(SEARCH_HISTORY, searchHistory)
		} catch (e) {
			_handleError(e)
		}
	}
		
	// 取出搜索历史
function getSearchHistory() {
		try {
			return uni.getStorageSync(SEARCH_HISTORY);
		} catch (e) {
			_handleError(e)
		}
	}
	
	// 清除搜索历史
function removeSearchHistory() {
		try {
		  uni.removeStorageSync(SEARCH_HISTORY)
		} catch (e) {
		  _handleError(e)
		}
	}
	
	// 判断是否是登录状态
function isLoggedIn() {
		if(getUserInfo() && getToken ()){
			return true
		}else{
			return false
		}
	}
	
	// 带登录校验的跳转
function navigateTo(param) {
		const { url, auth } = param
		if(auth){
			if(isLoggedIn()){
				uni.navigateTo({url})
			}else{
				// 提示去登录
				_handleNotLogin()
			}
		}else{
			uni.navigateTo({url})
		}
	}
	
	// 页面加载过一次后就设置为已加载过
	function setLoaded(page,data){
		try {
			return uni.setStorageSync(page, data);
		} catch (e) {
			_handleError(e)
		}
	}
	
	// 判断页面是否已被加载过
	function isLoaded(page){
		try {
			let data = uni.getStorageSync(page)
			return data ? data : false
		} catch (e) {
			_handleError(e)
		}
	}


module.exports = {
	
	setToken,
	getToken,
	removeToken,
	
	setUserInfo,
	getUserInfo,
	removeUserInfo,
	
	setSearchHistory,
	getSearchHistory,
	removeSearchHistory,
	
	
	isLoggedIn,
	navigateTo,
	
	setLoaded,
	isLoaded,
	
	moment
	
}


// 读取数据错误统一处理函数
function _handleError(e){
	uni.showToast({
		title:e,
		duration:2000,
		icon:'none'
	})
}

// 处理用户未登录就跳转的情况，提示去登录
function _handleNotLogin(){
	uni.showModal({
	    title: '温馨提示',
	    content: '您还未登录，是否现在去登录？',
	    success: function (res) {
	        if (res.confirm) {
								console.log("not login")
	            	uni.navigateTo({url:"/pages/login/login"})
	        } else if (res.cancel) {
	            
	        }
	    }
	})
}
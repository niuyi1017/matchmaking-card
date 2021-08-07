

const apiUrl = process.env.NODE_ENV === 'development' ? 'https://takeouttest.niuy.xyz/v1' : "https://takeouttest.niuy.xyz/v1"


/**
 * promise 化 uni.request
 */

function request(method, url ,params, withToken=false) {
    uni.showLoading({title: '加载中'})
    return new Promise(function (resolve, reject) {
        let header = {}
				if(withToken && _getToken() != ''){
					header.Authorization = `Bearer ${_getToken()}`
				}
				// console.log(params)
        uni.request({
            url: apiUrl + url,
            data: params,
            method,
            header,
            success: res => {
                if ( res.statusCode == 200 ) {
										resolve(res.data)
										uni.hideLoading()
                } else {
									 uni.hideLoading()
										_handleError(res) //自定义错误处理函数，类似响应拦截器
										// reject(res)
                }
            },
            fail: err => {
                reject(err)
								 uni.hideLoading()
            }
        })
    })
}



module.exports = {
		request
}





// ************************* 工具函数 ****************************





// 取出Token
function _getToken(){
	try {
	    // const value = uni.getStorageSync('TOKEN');
	    const value = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjIsInNjb3BlIjo4LCJleHAiOjE2ODAxOTI1MTksImlhdCI6MTU5Mzc5MjUxOX0.xhBuYkO6bCwJ1UesDDIvYeiQ3oCR2GWune7kHHx-eks";
	    if (value) {
	        return value
	    }else{
				return 'token'
			}
	} catch (e) {
	    // error
			console.log(e)
	}
}

// 自定义错误处理函数
function _handleError(res){
	
	if(res.statusCode != 200){
		uni.showToast({
		    title: '请求出错 错误码：' + res.statusCode,
		    duration: 2000,
				icon: 'none'
		});
	}else{
		uni.showToast({
			title: res.message,
			duration: 2000,
			icon: 'none'
		})
	}
	
}



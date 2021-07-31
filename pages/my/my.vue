<template name="my">
	<view>
		<scroll-view scroll-y class="page">
			<!-- 标题栏 -->
			<cu-custom bgColor="bg-cyan" >
				<block slot="content">我的</block>
			</cu-custom>
			<!-- userInfo -->
			<view class="userinfo" v-if="isLoggedIn">
				<view class="img-wrapper">
					<open-data type="userAvatarUrl"></open-data>
					
				</view>
				<view class="user-right">
					<open-data type="userNickName" class="username"></open-data>
					<!-- <text class="mobile">159****7925</text> -->
				</view>
			</view>
			
			<!-- 未登录，请先登录 -->
			<view class="userinfo" v-else>
				<view class="img-wrapper">
					<image src="../../static/avatar_default.png" class="avatar" mode=""></image>
					
				</view>
				<view class="user-right">
					<!-- <text class="username">WiLL</text>
					<text class="mobile">159****7925</text> -->
					<view class="login" @click="toLogin">登录 / 注册</view>
					<!-- <button class="login" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">登录 / 注册</button> -->
					
				</view>
			</view>
			
			<!-- 列表项 -->
			<view class="menu-wrapper">
				<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
					
					<view class="cu-item" :class="menuArrow?'arrow':''"  @click="gotoShopCenter">
						<view class="content">
							<text class="cuIcon-deliver text-orange"></text>
							<text class="text-grey">商户中心</text>
						</view>
						<text class="cuIcon-right text-grey"></text>
					</view>
					
					<view class="cu-item" :class="menuArrow?'arrow':''"  @click="gotoMyAddrs">
						<view class="content">
							<text class="cuIcon-deliver text-orange"></text>
							<text class="text-grey">我的收货地址</text>
						</view>
						<text class="cuIcon-right text-grey"></text>
					</view>
					
					<view class="cu-item" :class="menuArrow?'arrow':''">
						<button class="cu-btn content" open-type="contact">
							<text class="cuIcon-btn text-olive"></text>
							<text class="text-grey">在线客服</text>
						</button>
						<text class="cuIcon-right text-grey"></text>
					</view>
					
					<view class="cu-item" :class="menuArrow?'arrow':''">
						<view class="content">
							<text class="cuIcon-shop text-cyan"></text>
							<text class="text-grey">关于我们</text>
						</view>
						<text class="cuIcon-right text-grey"></text>
					</view>
					<view class="cu-item" :class="menuArrow?'arrow':''">
						<button class="cu-btn content" open-type="feedback">
							<text class="cuIcon-edit text-brown"></text>
							<text class="text-grey">反馈及建议</text>
						</button>
						<text class="cuIcon-right text-grey"></text>
					</view>
					<view class="cu-item" :class="menuArrow?'arrow':''" @click="call">
						<view class="content">
							<text class="cuIcon-mobile text-yellow"></text>
							<text class="text-grey">联系电话</text>
						</view>
						<text class="text-grey">18888213008</text>
						<text class="text-grey cuIcon-right"></text>
					</view>
					
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	import { wxLogin } from "../../api/api.js"
	import { setToken, getToken } from "../../utils/utils.js"
	export default {
		name: "my",
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				isLoggedIn: false
			};
		},
		mounted() {
			this._checkToken()
		},
		methods: {
			// 跳转到商户中心
			gotoShopCenter(){
				uni.navigateTo({
					url:'../location/myAddrs',
					fail(err) {
						console.log(err)
					}
				})
			},
				
			// 跳转到我的地址
			gotoMyAddrs(){
				uni.navigateTo({
					url:'../location/myAddrs',
					fail(err) {
						console.log(err)
					}
				})
			},
			
			// 打电话
			call(){
				uni.makePhoneCall({
					phoneNumber: '18888213008',
				})
			},
			// 微信登录
			toLogin(){
				let that = this
				uni.login({
				  success ( _res) {
				    if ( _res.code ) {
							let params = {
								account: _res.code,
								password: "123456",
								type: "USER_WX"
							}
							wxLogin(params).then( res => {
								const TOKEN = res.token
								setToken(TOKEN)
								that.isLoggedIn = true
							})
				      
				    } else {
				      console.log('登录失败！' + res.errMsg)
				    }
				  }
				})
			},
			
			_checkToken(){
				if(getToken() !== ""){
					this.isLoggedIn = true
				}else{
					this.isLoggedIn = false
				}
			},
			
			// 获取微信绑定手机号（已废弃，用不到）
			getPhoneNumber(e){
				uni.login({
					success(res) {
						console.log(e.detail.errMsg)
						console.log(e.detail.iv)
						console.log(e.detail.encryptedData)
						// 1.
						// 2.检查是否登录过期
						// 2.1 若登录未过期，将加密的数据发给后端进行解密，展示解密后手机号
						// 2.2 若登录已过期或尚未登录，去掉登录接口
					}
				})
				
				  
			}
		},
	}
</script>

<style lang="stylus" scoped>
@import "../../static/styles/var.styl"
	.page 
		// height: 100vh
		.userinfo
			height 200rpx
			background $cl-cyan
			display flex
			padding 20rpx
			align-items center
			.img-wrapper
				height 120rpx
				width 120rpx
				border-radius 50%
				overflow hidden
				margin 0 20rpx
				.avatar
					height 100%
					width 100%
			.user-right
				display flex
				flex-direction column
				color #FFFFFF
				.username
					margin-bottom 20rpx
					font-size $fs-l
					font-weight bold
				.login
					background none
					font-size $fs-m
					border none
					color #fff
					outline none
					
				
	

</style>

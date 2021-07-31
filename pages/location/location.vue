<template>
	<view class="location">
		<!-- 标题栏 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">选择地址</block>
		</cu-custom>
		
		<!-- 搜索 -->
		<view class="search-wrapper-wrapper ">
			<view class="search-wrapper radius">
				<icon type="search" size="16"/>
				<input class="search-palceholder" placeholder="请输入收货地址" v-model="keyword" />
			</view>
		</view>
		
		<!-- 页面主体内容 -->
		<view class="page-content">
			
			<!-- 当前地址 -->
			<view class="cur_loaction-wrapper">
				<text class="cur_location overflow-1">{{curLocation}}</text>
				<view class="re-located">
					<image class="icon-focus" src="../../static/focus.png" mode=""></image>
					<text class="re-located-text" @click="reLocated">重新定位</text>
				</view>
			</view>
			
			<!-- 搜索结果 -->
			<view class="my-addr-wrapper" v-if="isShowSearchResult">
				<view class="my-addr-title">
					<view class="my-addr-title-left">
						<image class="icon-home" src="../../static/addr.png" mode=""></image>
						<text class="my-addr-text">搜索结果</text>
					</view>
					
				</view>
				
				<addr-list  :addrList="searchResult" 
										:isFixed="true" 
										:isShowDetail="true"
										@addrCradClick="handleSearchCardClick"/>
				
			</view>
			
			<!-- 我的收货地址 -->
			<view class="my-addr-wrapper" v-if="myAddrs.length!=0">
				<view class="my-addr-title">
					<view class="my-addr-title-left">
						<image class="icon-home" src="../../static/addr.png" mode=""></image>
						<text class="my-addr-text">我的收货地址</text>
					</view>
					<text class="more-addr">更多</text>
				</view>
				
				<addr-list  :addrList="myAddrs" 
										:isFixed="true" 
										:isShowDetail="false"
										@addrCradClick="handleMyAddrCardClick"/>
				
			</view>
			
			<!-- 附近地址 -->
			<view class="my-addr-wrapper">
				<view class="my-addr-title">
					<view class="my-addr-title-left">
						<image class="icon-home" src="../../static/region.png" mode=""></image>
						<text class="my-addr-text">附近地址</text>
					</view>
					
				</view>
				
				<addr-list  :addrList="nearByAddr" 
										:isFixed="true" 
										:isShowDetail="true"
										@addrCradClick="handleNearByAddrCardClick"/>
				
			</view>
		</view>
		
	<!-- 新增地址按钮 -->
	<view class="add-addr-wrapper" @click="toNewLocation">
		<view class="add-addr">
			<image class="icon-add-addr" src="../../static/add-active.png" mode=""></image>
			<text class="add-addr-text">新增收货地址</text>
		</view>
	</view>
		
	</view>
</template>

<script>
	import { reverseGeocoder, search } from '../../utils/QQMapUtils.js'
	import addrList from "./components/addrList.vue"
	import { mapMutations, mapGetters } from 'vuex'
	import { getMyLocationList } from '../../api/api.js'
	export default {
		name: 'location',
		components:{
			addrList
		},
		props:{
			
		},
		data() {
			return {
				curLocation: "位置获取中...",
				keyword: "",
				searchResult:[],
				myAddrs: [],
				nearByAddr:[]
			}
		},
		computed:{
			...mapGetters(['location']),
			isShowSearchResult(){
				return this.keyword ? true :false
			}
		},
		watch:{
			keyword(newVal){
				if(newVal.length != 0){
					if(!this._isSearching){
						this._isSearching = true
						search({keyword:newVal}).then(data => {
							this.searchResult = data.data.map(item => {
								return {
									id: item.id,
									addr: item.title,
									detail: item.address
								}
							})
							this._isSearching = false
						})
					}
				}else{
					this.searchResult = []
				}
			}
		},
		
		mounted() {
			this._isSearching = false
			this._isLoacting = false
			this._getLocation()
			this._getMyLocationList()
		},
		onShow(){
			this._getMyLocationList()
		},
		methods: {
			...mapMutations(['setLocation']),
			
			// 搜索结果被点击
			handleSearchCardClick(id){
				let location =  this._getAddrById(this.searchResult, id)
				this.setLocation(location)
				this._goBackHome()
			},
			
			// 我的收货地址列表被点击
			handleMyAddrCardClick(id){
				let location = this._getAddrById(this.myAddrs, id)
				this.setLocation(location)
				this._goBackHome()
			},
			// 附近地址列表被点击
			handleNearByAddrCardClick(id){
				let location = this._getAddrById(this.nearByAddr, id)
				this.setLocation(location)
				this._goBackHome()
			},
			
			// 重新定位
			reLocated(){
				if(!this._isLoacting){
					this._isLoacting = true
					this.curLocation = '位置重新获取中...'
					this._getLocation()
					this._isLoacting = false
				}
			},
			
			// 跳转到新增地址页
			toNewLocation(){
				uni.navigateTo({
					url: '../location/newLocation'
				})
			},
			
			// 获取当前地址及附近地址
			_getLocation(){
				let that = this
				uni.authorize({
				    scope: 'scope.userLocation',
				    success() {
							uni.getLocation({
								success: function (res) {
									let params = {
										location: {
											longitude: res.longitude,
											latitude:res.latitude
										},
										get_poi: 1,
									}
									reverseGeocoder(params).then(data => {
										that.curLocation = data.result.formatted_addresses.recommend
										that.setLocation(that.curLocation)
										that.nearByAddr = data.result.pois.map(item => {
											return {
												id: item.id,
												addr: item.title,
												detail: item.address
											}
										})
									})
								}
							})
				    }
				})
			},
			
			// 根据地址id查找地址信息
			_getAddrById(addrs, id){
				let location = ''
				addrs.forEach((addr) => {
					if(addr.id == id){
						console.log(addr.addr)
						location = addr.addr
					}
				})
				return location
			},
			
			// 选中地址后回到首页
			_goBackHome(){
				uni.navigateTo({
					url: '../index/index'
				})
			},
			
			// 获取我的地址列表
			_getMyLocationList(){
				getMyLocationList().then( res => {
					this.myAddrs = res.map(item => {
						return {
							id: item.id,
							addr: item.name + " " + item.houseNumber,
							username: item.contactName,
							genderName: item.contactGender == null ? "" : (item.contactGender == 0 ? "先生" : "女士") ,
							mobile: item.contactMobile,
							detail: item.detailAddress
						}
					})
				})
			}
			
		}
	}
</script>

<style lang="stylus" scoped>
@import "../../static/styles/var.styl"
.location
	color $cl-content
	height 100vh
	background #FFFFFF
	.search-wrapper-wrapper
		position fixed
		width 100%
		background #FFFFFF
		z-index 2
		.search-wrapper
			margin-top 30rpx
			height 70rpx
			background $cl-darkback
			display flex
			align-items center
			padding 0 20rpx
			margin-left 20rpx
			margin-right 20rpx
			.search-palceholder
				margin-left 20rpx
				color #999
				font-size 26rpx
	.page-content
		margin-top 130rpx
		padding 0 20rpx
		background #fff
		padding-bottom 160rpx
		.cur_loaction-wrapper
			height 80rpx
			width 100%
			display flex
			justify-content space-between
			align-items center
			padding-bottom 20rpx
			border-bottom 1rpx solid #ddd
			.cur_location
				width 60%
				color $cl-title
			.re-located
				width 30%
				display flex
				justify-content flex-end
				.icon-focus
					height 40rpx
					width 40rpx
					margin-right 20rpx
				.re-located-text
					color $cl-yellow
		.my-addr-wrapper
			.my-addr-title
				height 80rpx
				width 100%
				display flex
				justify-content space-between
				align-items center
				margin-top 10rpx
				.my-addr-title-left
					.icon-home
						height 30rpx
						width 30rpx
						position relative
						top 7rpx
						margin-right 20rpx
	.add-addr-wrapper
		position fixed
		bottom -1rpx
		height 120rpx
		background #FFFFFF
		width 100%
		box-shadow -10rpx 0 10rpx #ddd
		.add-addr
			display flex
			align-items center
			justify-content center
			height 120rpx
			.icon-add-addr
				height 40rpx
				width 40rpx
				margin-right 20rpx
</style>

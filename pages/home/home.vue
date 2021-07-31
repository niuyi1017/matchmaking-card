<template name="home">
	<view>
		<view  class="page" >
			<!-- header -->
			<view class="home-header bg-cyan" :style="[{height:CustomBar + 'rpx'}]">
				<view class="loaction-wrapper " :style="[{top:StatusBar + 'px'}]" @click="gotoLocation">
					<image class="icon-location" src="../../static/location.png" mode=""></image>
					<text class="text-loaction overflow-1">{{ location || locationForShow }}</text> 
				</view>
			</view>
			
			<!-- page-wrapper -->
			<scroll-view scroll-y="true" class="page-wrapper-scroll" 
																	 @scroll="handleScroll($event)" 
																	 :scroll-top="scrollToTop">
				<view class="page-wrapper">
					<view class="content-top bg-cyan"></view>
					<view class="page-content">
						
						<!-- search -->
						
						<view class="search-wrapper radius" @click="gotoSearch">
							<icon type="search" size="16"/>
							<view class="search-palceholder"  >{{hotSearchList[0].title}}</view>
						</view>
						
						<!-- swiper -->
						<view class="swiper-wrapper ">
							<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" 
																						:indicator-dots="true" :circular="true"
																						:autoplay="true" interval="5000" duration="500">
								<swiper-item v-for="(item,index) in swiperList" :key="index">
									<image class="swiper-img" :src="item.url" mode="aspectFill"></image>
								</swiper-item>
							</swiper>
						</view>
						
						<!-- promotion -->
						<view class="promotion-wrapper" @click="toPromotion">
							<promotion :promotionList="promotionList"/>
						</view>
						
						<!-- all goods -->
						<view class="all-goods-wrapper">
							<all-goods :firstClassList="firstClassList"
												 :goodList="goodList"
												 :isShowFixedNav="isShowFixedNav"
												 :scrollDetail="scrollDetail"
												 @scrollTo="handleScrollTo"
												 @getNavBarPostion="getNavBarPostion"
												 @goodCradClick="handleCardClick"/>
						</view>
						
					</view>
				</view>
				<view class="cu-tabbar-height"></view>
			</scroll-view>
			
			<!-- 购物车悬浮按钮 -->
			<view class="shopping-cart-btn" @click="handleFloatBtnClick" v-if="getShoppingCartGoodsCount">
				<view class="img-wrapper" >
					<view class="cu-tag badge">{{getShoppingCartGoodsCount}}</view>
					<image class="icon-shopping-cart" src="../../static/shoppingCart.png" ></image>
				</view>
				<text class="price-wrapper">￥{{getShoppingCartGoodsTotalPrice}}</text>
			</view>
			
			<good-detail :isShow="isShowGoodDetail" :goodId="idShowGoodDetailId" @close="handleGoodDetailClose"/>
			<shopping-cart :isShow="isShowShoppingCartDetail" @close="handleShoppingCartDetailClose"/>
			<view class="cu-tabbar-height"></view>
		</view>
	</view>
</template>

<script>
	import promotion from './components/promotion.vue'
	import allGoods from './components/allGoods.vue'
	import allGoodsNav from './components/allGoodsNav.vue'
	import GoodDetail from './components/goodDetail.vue'
	import ShoppingCart from './components/shoppingCart.vue'
	import { reverseGeocoder } from '../../utils/QQMapUtils.js'
	import { mapMutations, mapGetters } from "vuex"
	import { getIndexData, getGoodList } from "../../api/api.js"
	export default {
		name: "home",
		components:{
			promotion,
			allGoods,
			allGoodsNav,
			GoodDetail,
			ShoppingCart
		},
		data() {
			return {
				StatusBar:  this.StatusBar+10,
				CustomBar: this.CustomBar+90,
				fixedNvaBarShowPonit:400,
				locationForShow: "位置获取中...",
				isShowGoodDetail: false,
				isShowShoppingCartDetail: false,
				idShowGoodDetailId:null,
				cardCur: 0,
				swiperList: [],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				scrollTop: 0,
				scrollToTop:0,
				scrollDetail:{},
				hotSearchList: [],
				promotionList: [],
				firstClassList:[],
				goodList:[]
			}
		},
		computed:{
			...mapGetters(['location',"getShoppingCartGoodsCount","getShoppingCartGoodsTotalPrice"]),
			
			// 是否展示位置固定的navbar
			isShowFixedNav(){
				return this.scrollTop >= this.fixedNvaBarShowPonit ? true : false
			},
			isAduilt(){
				this.age > 18 ? true : false
			}
		},
		mounted() {
			//1. 获取首页数据 （banner、促销商品、一级分类; 商品列表）
			this._getIndexData()
			//2. 获取位置信息
			if(this.location == ""){
				this._getLocation()
			}
			this._initFixedNavBarPostion()
			this._scrollTop = 0
			
		},
		onShow() {
			console.log("success")
			
		},
		methods:{
			...mapMutations(['setLocation']),
			
			toPromotion(){
				uni.navigateTo({
					url:"../promotion/promotion"
				})
			},
			// 商品列表中商品被点击
			handleCardClick(id){
				this.isShowGoodDetail = true
				this.idShowGoodDetailId = id
			},
			
			// 关闭商品详情
			handleGoodDetailClose(){
				this.isShowGoodDetail = false,
				this.idShowGoodDetailId = null
			},
			
			// 购物车悬浮按钮被点击
			handleFloatBtnClick(){
				this.isShowShoppingCartDetail = !this.isShowShoppingCartDetail
			},
			// 关闭购物车详情
			handleShoppingCartDetailClose(){
				this.isShowShoppingCartDetail = false
			},
			
			// 监听页面滚动
			handleScroll(e){
				this.scrollTop = e.detail.scrollTop
				// 节流 滑动距离较上次滑动超过200才进行下一步处理
				if(Math.abs(e.detail.scrollTop - this._scrollTop) >= 200 ){
					this.scrollDetail = e.detail
					this._scrollTop = e.detail.scrollTop
				}
			},
			
			// 响应nav点击，进行页面滚动
			handleScrollTo(delta){
				this.scrollToTop = delta
			},
			
			// 跳转到地址选择页
			gotoLocation(){
				uni.navigateTo({
					url: '../location/location'
				})
			},
			
			// 跳转到搜索页
			gotoSearch(){
				let hotSearchList = this.hotSearchList
				uni.navigateTo({
					url: `../search/search?hotSearchList=` + encodeURIComponent(JSON.stringify(hotSearchList))
				})
			},
			
			
			// 计算固定导航栏应显示为位置
			_initFixedNavBarPostion(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.all-goods-wrapper').boundingClientRect(data => {
					this.fixedNvaBarShowPonit = data.top + 80 -this.CustomBar
				}).exec()
			},
			
			// 获取配送地址
			_getLocation(){
				let that = this
				uni.authorize({
				    scope: 'scope.userLocation',
				    success() {
							reverseGeocoder().then(data => {
								that.locationForShow = data.result.formatted_addresses.recommend
							})
				    }
				})
			},
			_getIndexData(){
				getIndexData().then(res => {
					this.swiperList = res.swiperList.map(item => {
						return {
							id:item.id,
							url: item.titleImage
						}
					})
					this.hotSearchList = res.hotSearchList
					this.firstClassList = res.firstClassList.map(item => {
						return {
							id: item.id,
							name: item.categoryName,
							count: item.count
						}
					})
					this.promotionList = res.promotionList.map(item => {
						return {
							id: item.id,
							imgUrl: item.image,
							title: item.title,
							remain: item.stock,
							originalPrice: item.oriPrice,
							presentPrice:item.actPrice
						}
					}).slice(0,3)
				}).then(() => {
					getGoodList().then(res => {
						this.goodList = res.goodList.map(item => {
							return {
								firstClassId: item.id,
								goods: item.spuSimplifyVOList.map(innerItem => {
									return {
										id:innerItem.id,
										imgUrl: innerItem.image,
										tag: innerItem.tag,
										title: innerItem.title,
										rate: innerItem.score,
										sales: innerItem.salesVolume,
										evaluation:innerItem.evaluation,
										price:innerItem.actPrice
									}
								})
							}
						})
					})
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
@import "../../static/styles/var.styl"
	.page
		height: 100vh
		.home-header
			position fixed
			top 0
			width 100%
			z-index 99
			.loaction-wrapper
				position relative
				padding-left 5rpx
				display flex
				align-items center
				.icon-location
					height 48rpx
					width 48rpx
					margin 0 15rpx
				.text-loaction
					height 48rpx
					line-height 48rpx
					font-size 32rpx
					max-width 50%
		.page-wrapper-scroll
			height 96vh
			.cu-tabbar-height
				background $cl-background
			.page-wrapper
				min-height 1600rpx
				.content-top
					height 200rpx
					position absolute
					width 100%
					margin-top -80px
					z-index -1
				.page-content
					min-height 1600rpx
					background $cl-background
					border-radius 40rpx 40rpx 0 0 
					margin-top 175rpx
					padding 20rpx
					.search-wrapper
						margin-top 30rpx
						height 70rpx
						background $cl-darkback
						display flex
						align-items center
						padding 0 20rpx
						.search-palceholder
							margin-left 20rpx
							color #bbb
							font-size 26rpx
					.swiper-wrapper
						margin-top 30rpx
						height 200rpx
						overflow hidden
						border-radius 20rpx
						.swiper-img
							height 200rpx
					.promotion-wrapper
						margin-top 30rpx
					.all-goods-wrapper
						margin-top 30rpx
		.shopping-cart-btn
			height 90rpx
			width 250rpx
			display flex
			align-items center
			justify-content space-between
			padding-right 20rpx
			position fixed
			bottom 150rpx
			right 0
			background rgba(255,255,255,.7)
			box-shadow 10rpx 0px 40rpx #ddd
			border-radius 50rpx 0 0 50rpx
			.img-wrapper
				height 60rpx
				width 60rpx
				position relative
				left 20rpx
				.icon-shopping-cart
					height 60rpx
					width 60rpx
			.price-wrapper
				color $cl-cyan
				font-size 36rpx
				
</style>

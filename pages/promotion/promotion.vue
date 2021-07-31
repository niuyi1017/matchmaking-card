<template>
	<view class="promotion-page">
		<!-- 标题栏 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">神价格</block>
		</cu-custom>
		
		<!-- 页面主体 -->
		<scroll-view scroll-y="true" >
			<view class="page-wrapper">
				<!-- swiper -->
				<view class="swiper-wrapper ">
					<swiper class="screen-swiper" :autoplay="true" interval="5000" duration="500">
						<swiper-item v-for="(item,index) in swiperList" :key="index">
							<image class="swiper-img" :src="item.url" mode="aspectFill"></image>
						</swiper-item>
					</swiper>
				</view>
				
				<!--促销列表  -->
				<view class="promotion-list-wrapper" v-for="(promotion, index) in promotions" :key="index">
					<view class="promotion-title">
						<text class="tag">NOW</text>
						<text class="title">{{promotion.title}}</text>
					</view>
					<view class="promotion-list">
						<view class="promotion-card" v-for="production in promotion.productions" 
																				:key="production.id" @click="handleCardClick(production.id)">
							<view class="left">
								<view class="img-wrapper">
										<image class="img" :src="production.imgUrl" mode=""></image>
								</view>
								
							</view>
							<view class="right">
								<view class="title-wrapper overflow-1">
									<text class="title overflow-1"><text class="tag">{{production.tag}}</text> {{production.title}} </text>
								</view>
								<text class="desc">{{production.desc}}</text>
								<view class="progress-wrapper">
									<view class="cu-progress radius striped active sm">
										<view class="bg-cyan" :style="{ width: production.percent}"></view>
									</view>
								</view>
								<view class="count">
									<text class="remain">仅剩 <text class="num">{{production.remain}}</text>件</text>
									<text class="haveSale">已抢<text class="num">{{production.haveSold}}</text>件</text>
								</view>
								<view class="price-wrapper">
									<view class="price">
										<text class="real-price">￥{{production.realPrice}}</text>
										<text class="origin-price">￥{{production.originPrince}}</text>
									</view>
									<text class="buy">立即抢购</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
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
	</view>
</template>

<script>
	import { getPromotionData } from "../../api/api.js"
	import GoodDetail from '../home/components/goodDetail.vue'
	import ShoppingCart from '../home/components/shoppingCart.vue'
	import { mapMutations, mapGetters } from "vuex"
	export default {
		name:"promotion",
		components:{
			GoodDetail,
			ShoppingCart,
		},
		data() {
			return {
				swiperList: [],
				promotions: [],
				isShowGoodDetail: false,
				isShowShoppingCartDetail: false,
				idShowGoodDetailId: null,
			}
		},
		computed:{
			...mapGetters(["getShoppingCartGoodsCount","getShoppingCartGoodsTotalPrice"]),
		},
		mounted(){
			this._getPromotionData()
		},
		methods: {
			
			// 获取促销页数据
			async _getPromotionData(){
			 let _data = await getPromotionData()
			 this.swiperList = _data.banners.map(item => {
				 return {
					 id: item.id,
					 url: item.titleImage
				 }
			 })
			 this.promotions = _data.promotions.map(promotion => {
				 return {
					 title: promotion.title,
					 deadline: promotion.endTime,
					 productions: promotion.spuActivityVOList.map( production => {
						 return {
							 id: production.id,
							 imgUrl: production.image,
							 tag: production.tag,
							 title: production.title,
							 desc: production.description,
							 remain: production.stock,
							 haveSold: production.salesVolume,
							 percent:  (production.stock / (production.stock + production.salesVolume)).toFixed(2) *100 + "%", 
							 realPrice: production.actPrice,
							 originPrince: production.oriPrice,
						 }
					 })
				 }
			 })
			},
			
			handleCardClick(id){
				this.isShowGoodDetail = true,
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
		}
	}
</script>

<style lang="stylus" scoped>
@import "../../static/styles/var.styl";
.promotion-page
	.page-wrapper
		width 100vw
		background #f9f9f9
		padding-bottom 40rpx
		.swiper-wrapper
			height 300rpx
			margin-bottom 30rpx
			.swiper-img
				height 300rpx
		.promotion-list-wrapper
			padding 0 20rpx
			margin-bottom 40rpx
			.promotion-title
				height 60rpx
				display flex
				align-items center
				margin-bottom 30rpx
				.tag
					background $cl-red
					color #fff
					font-size $fs-s
					height 40rpx
					line-height 45rpx
					border-radius 10rpx
					width 80rpx
					text-align center
					margin-right 20rpx
				.title
					font-size $fs-l
					font-weight bold
			.promotion-list
				margin-bottom 40rpx
				.promotion-card
					display flex
					justify-content space-between
					margin-bottom 30rpx
					width 100%
					background #fff
					border-radius 10rpx 
					overflow hidden
					// box-shadow 5rpx 0 50rpx #ddd
					.left
						position relative
						margin-right 10rpx
						min-width 240rpx
						height 240rpx
						.img-wrapper
							height 240rpx
							width 240rpx
							background #0081FF
							.img
								height 240rpx
								width 100%
						.countdown-wrapper
							position absolute
							bottom 0rpx
							background #1CBBB4
							width 240rpx
							display flex
							justify-content space-between
							align-items center
							color #fff
							font-size 26rpx
							padding 0 10rpx
					.right
						padding-top 10rpx
						padding-right 10rpx
						.title-wrapper
							display flex
							width 460rpx
							min-height 30rpx
							margin-bottom 10rpx
							.tag
								background #1CBBB433
								color #1CBBB4
								font-size 24rpx
								padding 4rpx 10rpx
								border-radius 20rpx
								margin-right 10rpx
						.desc
							color $cl-gray
							font-size 26rpx
							margin 8rpx 0 
							display inline-block
						.progress-wrapper
						.count
							display flex
							justify-content space-between
							align-items center
							color $cl-gray
							font-size 26rpx
							margin-top 5rpx
							.num
								color $cl-cyan
								padding 0 5rpx
						.price-wrapper
							display flex
							justify-content space-between
							align-items center
							margin-top 8rpx
							.price
								.real-price
									color $cl-cyan
									font-size 36rpx
									margin-right 10rpx
								.origin-price
									color $cl-gray
									font-size 26rpx
									text-decoration line-through
							.buy
								padding 2rpx 20rpx
								color $cl-cyan
								border 1rpx solid $cl-cyan
								border-radius 30rpx
								font-size 24rpx
								margin-top 10rpx
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

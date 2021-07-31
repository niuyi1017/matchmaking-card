<template>
	<view class="search-page">
		<!-- 标题栏 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">搜索</block>
		</cu-custom>
		
		<!-- 搜索 -->
		<view class="search-wrapper-wrapper ">
			<view class="search-wrapper radius">
				<icon type="search" size="16"/>
				<input class="search-palceholder" :placeholder="hotSearchList[0].title" v-model="keyword" />
			</view>
		</view>
		
		<view class="page-content">
			<view class="search-tip-wrapper" v-if="searchResult.length==0">
				<view class="hot-search">
					<text class="search-title">热门搜索</text>
					<view class="search-list">
						<text class="search-item" v-for="item in hotSearchList " :key="item.id" 
																			@click="searchIt(item.title)">{{item.title}}</text>
					</view>
				</view>
				<view class="hot-search search-history" v-if="getSearchHistory.length>0">
					<text class="search-title">搜索历史</text>
					<view class="right" @click="handleClearSearchHistory">
						<text class="iconfont cuIcon-delete"></text>
						<text class="clear">清空</text>
					</view>
					<view class="search-list">
						<text class="search-item" v-for="(item, index) in getSearchHistory " :key="index"
																			@click="searchIt(item)">{{item}}</text>
					</view>
				</view>
			</view>
			
			<view class="search-result" v-else>
				<view class="search-result-item" v-for="(item, index) in searchResult" :key="item.id" 
																				@click="handleCardClick(item.id)">
					<text class="rank">{{index + 1}}</text>
					<view class="img-wrapper">
						<image class="img" :src="item.imgUrl" mode=""></image>
					</view>
					<view class="desc">
						<view class="row">
							<text class="good-title overflow-1">{{item.title}}</text> <text class="tag">{{item.tag}}</text>
						</view>
						<view class="row nums">
							<view class="left">
								<view class="sold-num">销量：<text class="num"> {{item.sold}} </text></view>
								<view class="price">￥ <text class="num">{{item.price}} </text></view>
							</view>
							<view class="right img-wrapper">
								<image class="img" src="../../static/add-active.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
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
	import { search } from "../../api/api.js"
	import { mapGetters, mapMutations } from "vuex"
	import GoodDetail from '../home/components/goodDetail.vue'
	import ShoppingCart from '../home/components/shoppingCart.vue'
	export default {
		name: "search",
		components:{
			GoodDetail,
			ShoppingCart
		},
		data() {
			return {
				hotSearchList: [],
				keyword:"",
				searchResult:[],
				isShowGoodDetail: false,
				isShowShoppingCartDetail: false,
				idShowGoodDetailId: null,
			}
		},
		computed:{
			...mapGetters(['getSearchHistory',"getShoppingCartGoodsCount","getShoppingCartGoodsTotalPrice"])
		},
		watch:{
			keyword(newVal){
				if(newVal!="" && newVal !=" "){
					let data = {
						title: newVal
					}
					// 节流防抖
					if(!this._isSearching){
						this._isSearching = true
						this.pushSearchHistory(data.title)
						search(data).then(res => {
							if(res.length == 0)
								uni.showToast({
									title:"暂无搜索结果，试试热搜词吧~",
									icon:"none",
									duration:2000
								})
							else
							this.searchResult = res.map(item => {
								return {
									id: item.id,
									imgUrl: item.image,
									title: item.title,
									sold: item.salesVolume,
									price: item.actPrice,
									tag: item.tag.split('')[0]
								}
							})
							this._isSearching = false
						}).catch(err => {
							this._isSearching = false
						})
					}
				}else{
					this.searchResult = []
				}
				if(newVal=""){
					this.searchResult = []
				}
			}
		},
		onLoad(option){
			this.hotSearchList = JSON.parse(decodeURIComponent(option.hotSearchList))
		},
		mounted() {
			this._isSearching = false
			this.initSearchHistory()
		},
		methods: {
			...mapMutations([ 'initSearchHistory', 'pushSearchHistory','clearSearchHistory']),
			// 根据热搜词、搜索历史去搜索
			searchIt(keyword){
				this.keyword = keyword
			},
			
			// 清除搜索历史
			handleClearSearchHistory(){
				this.clearSearchHistory()
			},
			
			// 点击搜索结果，召唤商品详情
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

<style lang="stylus"scoped>
@import "../../static/styles/var.styl"
.search-page
	color $cl-content
	height 100vh
	background #fdfdfd
	.search-wrapper-wrapper
		position fixed
		width 100%
		background $background
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
				width 100%
	.page-content
		margin-top 130rpx
		padding 0 20rpx
		padding-bottom 160rpx
		.search-tip-wrapper
			.hot-search
				margin-bottom 30rpx
				.search-title
					font-size 34rpx
				.search-list
					margin-top 20rpx
					display  flex
					flex-wrap wrap
					.search-item
						padding 10rpx 35rpx
						margin 0 20rpx 20rpx 0
						background #eee
						color $cl-content
						border-radius 30rpx
			.search-history
				position relative
				.right
					position absolute
					color $cl-content
					right 0
					top 0
					.iconfont
						margin-right 10rpx
		.search-result
			width 95vw
			margin auto
			background #fff
			border-radius 30rpx
			padding 30rpx 20rpx
			box-shadow 0 0 80rpx #eee
			.search-result-item
				display flex
				align-items center
				margin-bottom 20rpx
				&:last-child
					margin-bottom 0
				.rank
					color $cl-yellow
					display inline-block
					width 40rpx
					text-align center
					margin-right 10rpx
				.img-wrapper
					height 150rpx
					width 150rpx
					border-radius 10rpx
					margin-right 20rpx
					background #1CBBB4
					.img
						height 100%
						width 100%
				.desc
					display flex
					flex-direction column
					justify-content space-around
					.row
						display flex
						.good-title
							max-width 52vw
							font-size $fs-l
							margin-right 10rpx
						.tag
							width 40rpx
							height 40rpx
							display flex
							align-items center
							justify-content center
							background $cl-orange
							color #fff
							border-radius 10rpx
							font-size $fs-s
					.nums
						width 61vw
						margin-top 40rpx
						justify-content space-between
						color #aaa
						.left
							display flex
							.price
								margin-left 20rpx
							.num
								color $cl-orange
						.img-wrapper
							height 40rpx
							width 40rpx
							background #fff
							.img
								height 100%
								width 100%
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

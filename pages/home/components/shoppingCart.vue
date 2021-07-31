<template>
	<view class="shopping-cart">
		<!-- 购物车详情弹窗 -->
		<view class="cu-modal bottom-modal " :class="{'show': isShow}" @click.self="close">
			<view class="cu-dialog ">
				<!-- 弹窗内容 -->
				<view class="shopping-cart-detail">
					<view class="header">
						<text class="title">已选商品</text>
						<view class="right" @click.stop="clearAllgoods">
							<text class="iconfont cuIcon-delete"></text>
							<text class="clear">清空购物车</text>
						</view>
					</view>
					<!-- 商品列表 -->
					<view class="goods">
						<view class="good" v-for="(good, index) in shoppingCart" :key="index">
							<view class="img-wrapper">
								<image class="good-img" :src="good.goodDetail.imgUrl" mode=""></image>
							</view>
							<view class="good-desc">
								<text class="good-title">{{good.goodDetail.title}}</text>
								<view class="sku-tags" >
									<text class="sku-tag" v-for="(tag, innerIndex) in tags[index]" :key="innerIndex">{{tag}}</text>

								</view>
								<view class="price-wrapper">
										<text class="real-price">￥{{good.sku.realPrice}}</text>
										<text class="ori-price">￥{{good.sku.originPrice}}</text>
								</view>
								<view class="count-wrapper">
									<image class="icon-remove" src="../../../static/remove.png" @click.stop="handleRemoveClick(index)"></image>
									<text class="count-val">{{good.count}}</text>
									<text class="iconfont cuIcon-roundaddfill text-cyan" @click.stop="handleAddClick(index)"></text>
								</view>
							</view>
						</view>
						
					</view>
					<!-- 底部结算栏 -->
					<view class="total-btn-wrapper" @click.stop="toSettlement">
						<view class="left">
							<view class="img-wrapper">
								<view class="cu-tag badge">{{getShoppingCartGoodsCount}}</view>
								<image class="icon-shopping-cart" src="../../../static/shoppingCart.png" mode=""></image>
							</view>
							<view class="total-price">
								<view class="price">￥ {{getShoppingCartGoodsTotalPrice}}</view>
								<text class="desc">另需配送费￥2 | 支持自取</text>
							</view>
						</view>
						<view class="pay-btn">去结算</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default{
	name:"ShoppingCart",
	props:{
		isShow: {
			type: Boolean,
			default(){
				return true
			}
		}
	},
	data(){
		return {
			// isShow: true
		}
	},
	computed:{
		...mapGetters(['shoppingCart',"getShoppingCartGoodsCount","getShoppingCartGoodsTotalPrice"]),
		// 筛出商品sku标签
		tags(){
			let _selectedTags = []
			this.shoppingCart.forEach((good, index) => {
				let tags = good.sku.selectedTags.map(item => item.value)
				_selectedTags.push(tags)
			})
			return _selectedTags
		}
	},
	methods:{
		...mapMutations(['removeFromShoppingCart', 'addCount', 'removeCount', "clearAllGoodsInShoppingCart"]),
		// 关闭购物车弹窗
		close(){
			this.$emit('close')
		},
		// 删减某个商品数量
		handleRemoveClick(index){
			let that = this
			if(this.shoppingCart[index].count == 1){
				uni.showModal({
				    title: '温馨提示',
				    content: '确定要从购物车删除该商品吗',
				    success: function (res) {
				        if (res.confirm) {
				            that.removeFromShoppingCart(index)
				        } 
				    }
				})
			}else{
				this.removeCount(index)
			}
		},
		
		// 增加某个商品的数量
		handleAddClick(index){
			this.addCount(index)
		},
		
		// 清空购物车
		clearAllgoods(){
			let that = this
			uni.showModal({
					title: '温馨提示',
					content: '确定删除购物车内所有商品吗',
					success: function (res) {
							if (res.confirm) {
									that.clearAllGoodsInShoppingCart()
									that.close()
							} 
					}
			})
		},
		// 去结算
		toSettlement(){
			this.$emit('close')
			uni.navigateTo({
				url:'../order/settlement'
			})
			
		}
	}
}
</script>

<style lang="stylus" scoped>
@import "../../../static/styles/var.styl";
.shopping-cart
	.cu-dialog
		border-radius 30rpx 30rpx 0 0
		overflow hidden
		background #fff
		.shopping-cart-detail
			width 100vw
			padding 20rpx
			text-align left
			.header
				display flex
				justify-content space-between
				align-items center
				margin-bottom 20rpx
				margin-top 20rpx
				.title
					font-size 36rpx
				.right
					color $cl-content
					.iconfont
						margin-right 10rpx
			.goods
				margin-top 40rpx
				max-height 60vh
				overflow scroll
				.good
					display flex
					align-items center
					justify-content space-between
					width 100%
					padding-bottom 20rpx
					border-bottom 1rpx solid $cl-border
					margin-bottom 20rpx
					.img-wrapper
						height 170rpx
						width 170rpx
						background #1CBBB4
						border-radius 10rpx
						overflow hidden
						.good-img
							height 100%
							width 100%
					.good-desc
						width 73%
						display flex
						flex-direction column
						position relative
						.good-title
							font-size 32rpx
						.sku-tags
							display flex
							margin 15rpx 0
							.sku-tag
								padding 0 15px
								margin-right 20rpx
								color $cl-cyan
								text-align center
								border-radius 5rpx
								background-color #fff
								border 1rpx solid $cl-cyan
						.price-wrapper
							.real-price
								font-size 42rpx
								color $cl-cyan
								margin-right 10rpx
							.ori-price
								color $cl-content
								text-decoration line-through
						.count-wrapper
							position absolute
							right 0
							bottom 0
							display flex
							align-items center
							.icon-remove
								height 48rpx
								width 48rpx
							.iconfont
								font-size 46rpx
							.count-val
								margin 0 20rpx
			.total-btn-wrapper
				width 90vw
				margin 40rpx auto
				margin-top 60rpx
				background #FFFFFF
				height 100rpx
				display flex
				box-shadow 10rpx 0 50rpx #DDDDDD
				border-radius 50rpx
				.left
					padding-left 30rpx
					display flex
					width 65vw
					align-items center
					.img-wrapper
						height 70rpx
						width 70rpx
						margin-right 20rpx
						position relative
						.icon-shopping-cart
							height 100%
							width 100%
					.total-price
						display flex
						flex-direction column
						justify-content center
						.price
							font-size 42rpx
						.desc
							color $cl-content
							font-size 22rpx
				.pay-btn
					width 25vw
					background $cl-cyan
					color #FFFFFF
					border-radius 0 50rpx 50rpx 0
					text-align center
					line-height 100rpx
					font-size 32rpx
</style>

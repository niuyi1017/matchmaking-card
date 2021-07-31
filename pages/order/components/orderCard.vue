<template>
		<view class="card good-list-wrapper">
			
			<view class="shop-name">
				<text class="shopname">{{orderInfo.time}}</text>
				<text :class="[	'tag',
												{'tag--finished':orderInfo.status==5},
												{'tag--unpaid':orderInfo.status==1},
												{'tag--cancel':orderInfo.status==6}]">{{orderInfo.statusText}}</text>
			</view>
			
			<view class="goods">
				<view class="good" v-for="good in orderInfo.goods" :key="good.goodDetail.goodId">
					<view class="img-wrapper">
						<image class="img" :src="good.goodDetail.imgUrl" mode=""></image>
					</view>
					<view class="good-desc">
						<view class="row">
							<view class="row-left">
								<text class="good-name overflow-1">{{good.goodDetail.title}}</text>
							</view>
							<view class="row-right">
								<!-- <text class="ori-price">￥{{good.sku.originPrice}}</text> -->
								<text class="real-price">￥{{good.sku.realPrice}}</text>
							</view>
						</view>
						<view class="row skus">
							<view class="row-left">
								<text class="sku-tag" v-for="(tag,index) in good.sku.selectedTags" :key="index">{{tag}}</text>
							</view>
							<view class="row-right">
								<text>x {{good.count}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="rows">
				<text class="title package">打包费</text>
				<text class="value package-val">￥ {{orderInfo.packageFee}}</text>
			</view>
			<view class="rows">
				<text class="title package">配送费</text>
				<text class="value package-val">￥ {{orderInfo.deliverFee}}</text>
			</view>
			<view class="total">
				<view class="tip-text toPay" v-if="orderInfo.status==1">
					<text class="pay-btn">立即支付</text>
				</view>
				<view class="tip-text " v-else-if="orderInfo.status==6">
					<text class="">订单已失效</text>
				</view>
				<view class="tip-text" v-else>
					<!-- 已优惠<text class="discoount">￥{{getShoppingCartGoodsTotalDiscount}}</text> -->
					 实付款￥ <text class="summary">{{orderInfo.totalPrice}}</text>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		name: "OrderCard",
		props:{
			orderInfo: {
				type: Object,
				default(){
					return {
						time: "",
						status: "",
						statusText: "",
						goods: [],
						packageFee: "",
						deliverFee: "",
						// getShoppingCartGoodsTotalDiscount: "",
						totalPrice:""
					}
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
@import "../../../static/styles/var.styl"
.good-list-wrapper
	margin 10rpx
	margin-top 20rpx
	margin-bottom 30rpx
	background #fff
	padding 20rpx
	border-radius 20rpx
	box-shadow 0 20rpx 20rpx #eee
	color $cl-content
	.shop-name
		height 60rpx
		display flex
		justify-content space-between
		align-items center
		padding-bottom 20rpx
		border-bottom 1rpx solid $cl-border
		margin-bottom 20rpx
		.tag
			font-size $fs-s
			border 1px solid $cl-yellow
			padding 0 5rpx
			border-radius 5rpx
			color $cl-yellow
		.tag--finished
			color $cl-cyan
			border 1px solid $cl-cyan
		.tag--unpaid
			color $cl-red
			border 1px solid $cl-red
		.tag--cancel
			color #ccc
			border 1px solid #ccc
	.goods
		margin-top 20rpx
		margin-bottom 40rpx
		.good
			display flex
			align-items center
			justify-content space-between
			margin-top 20rpx
			.img-wrapper
				height 100rpx
				min-width 100rpx
				margin-right 20rpx
				background #ddd
				border-radius 10rpx
				overflow hidden
				.img
					height 100%
					width 100%
			.good-desc
				width 100%
				height 100rpx
				display flex
				flex-direction column
				justify-content space-between
				.row
					display flex
					align-items center
					justify-content space-between
					.row-left
						width 70%
						display flex
						background #fff
						align-items center
						.tag
							font-size $fs-s
							background $cl-yellow
							color #FFFFFF
							height 30rpx
							min-width 30rpx
							display flex
							align-items center
							justify-content center
							border-radius 5rpx
							margin-right 10rpx
					.row-right
						.ori-price
							font-size $fs-s
							text-decoration line-through
						.real-price
							color #444
							margin-left 10rpx
				.skus
					.sku-tag
						margin-right 10rpx
.rows
	display flex
	align-items center
	justify-content space-between
	height 40rpx
	margin-top 20rpx
	.value
		color #444
.total
	height 100rpx
	display flex
	align-items center
	border-top 1rpx solid $cl-border
	margin-top 40rpx
	justify-content flex-end
	.discoount
		color $cl-red
		margin-right 20rpx
	.summary
		font-size 46rpx
		color #444
	.toPay
		.pay-btn
			display inline-block
			height 50rpx
			line-height 50rpx
			width 180rpx
			background $cl-red
			color #fff
			text-align center
			border-radius 25rpx
			box-shadow 0 5rpx 20rpx $cl-red
</style>

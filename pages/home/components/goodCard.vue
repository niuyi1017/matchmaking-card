<template>
	<view class="good-card">
		<view class="img-wrapper">
			<image class="good-img" :src="goodInfo.imgUrl" mode=""></image>
			<text class="tag">{{goodInfo.tag}}</text>
		</view>
		<view class="good-info">
			<view class="good-title"><text class="overflow-1">{{goodInfo.title}}</text></view>
			<view class="row">
				<image class="icon-rate" src="../../../static/rate.png" mode=""></image>
				<text class="rate">{{goodInfo.rate}}</text>
				<text class="sales">销量 {{goodInfo.sales}}</text>
			</view>
			<view class="row">
				<text class="evaluation overflow-1">{{goodInfo.evaluation}}</text>
			</view>
			<view class="row bottom-row">
				<text class="price">￥{{goodInfo.price}}</text>
				<text class="choose">选规格</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'goodCard',
		props:{
			goodInfo:{
				type: Object,
				default(){
					return {}
				}
			},
			
		},
		data() {
			return {
				
			};
		},
		
		methods: {
			
		}
		
		
	}
</script>

<style lang="stylus" scoped>
@import "../../../static/styles/var.styl"
.good-card
	display flex
	height 250rpx
	background #fff
	border-radius 5rpx
	overflow hidden
	justify-content space-between
	margin-bottom 20rpx
	.img-wrapper
		height 250rpx
		width 33%
		background #EEEEEE
		position relative
		.good-img
			height 100%
			width 100%
		.tag
			padding 0 15rpx
			padding-top 3rpx
			background $cl-cyan
			color #FFFFFF
			font-size 24rpx
			height 30rpx
			line-height 30rpx
			display inline-block
			position absolute
			top 0
			left 0
	.good-info
		width 65%
		background #fff
		display flex
		flex-direction column
		.good-title
			font-size $fs-l
			padding-top 20rpx
			display inline-block
			width 95%
		.row
			display flex
			width 96%
			height 60rpx
			line-height 60rpx
			align-items center
			color $cl-subColor
			font-size $cl-m
			.icon-rate
				height 30rpx
				width 30rpx
				margin-right 10rpx
				margin-top -5rpx
			.sales
				margin-left 20rpx
			.evaluation
				background rgba(28,187,180,.5)
				height 40rpx
				padding 0 15rpx
				line-height 40rpx
				color #FFFFFF
				font-size 24rpx
				border-radius 5rpx
				max-width 96%
				margin-top -20rpx
		.bottom-row
			display flex
			justify-content space-between
			margin-top -10rpx
			.price
				font-size $fs-l
				color $cl-red
			.choose
				display inline-block
				height 45rpx
				line-height 45rpx
				background $cl-cyan
				color #fff
				padding 0 15rpx
				border-radius 25rpx
				font-size 24rpx
</style>

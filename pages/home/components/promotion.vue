<template>
	<view class="promotion-card">
		<view class="card-title">
			<text class="text-big">神价格</text>
			<text class="text-small">这么买更实惠</text>
		</view>
		<view class="items">
			<view class="item" v-for="(item,index) in promotionList" :key=index>
				<view class="img-wrapper">
					<image class="promottion-img" :src="item.imgUrl" mode=""></image>
					<text class="remain">仅剩 {{item.remain}} 份</text>
				</view>
				<view class="promotion-title overflow-1">{{item.title}}</view>
				<view class="bottom">
					<text class="tip">￥</text>
					<text class="present-price">{{item.presentPrice}}</text>
					<text class="tip tip-delete">￥</text>
					<text class="original-price">{{item.originalPrice}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'promotion',
		props:{
			promotionList:{
				type: Array,
				default(){
					return []
				}
		}
		}
		
		
	}
</script>

<style lang="stylus" scoped>
@import "../../../static/styles/var.styl";
.promotion-card
	height 370rpx
	background #FFFFFF
	border-radius 20rpx
	.card-title
		height 80rpx
		line-height 80rpx
		padding-left 20rpx
		.text-big
			font-size $fs-l
			color $cl-orange
			margin-right 10rpx
		.text-small
			font-size $fs-m
			color $cl-subColor
	.items
		display flex
		height 270rpx
		justify-content space-evenly
		align-items center
		.item
			height 265rpx
			width 30%
			background #fff
			border-radius 10rpx 10rpx 0 0 
			.img-wrapper
				height 170rpx
				width 100%
				background #efefef
				position relative
				border-radius 10rpx
				.promottion-img
					height 100%
					width 100%
					border-radius 10rpx
				.remain
					background linear-gradient(to right,  #e54d42, #f37b1d);
					height 30rpx
					line-height 30rpx
					padding 0rpx 20rpx
					border-radius 15rpx 15rpx 15rpx 5rpx
					color #fff
					position absolute
					bottom -10rpx
					left 10rpx
					font-size 24rpx
					padding-top 3rpx
			.promotion-title
				height 40rpx
				line-height 40rpx
				font-size 28rpx
				font-weight bold
				padding 0 5px
				margin-top 20rpx
			.bottom
				.tip
					font-size $fs-m
					color $cl-red
				.present-price
					font-size $fs-l
					color $cl-red
					margin-right 20rpx
				.original-price
					font-size $fs-m
					color $cl-gray
					text-decoration:line-through
				.tip-delete
					color $cl-gray
					text-decoration:line-through
					
				
				
		
</style>

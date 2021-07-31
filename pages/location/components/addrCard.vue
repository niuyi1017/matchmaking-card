<template>
	<view class="addr-card">
		<text class="addr overflow-1">{{addr.addr}}</text>
		<view class="addr-desc">
			<text class="addr-detail" v-if="isShowDetail" >{{addr.detail}}</text>
			<view  v-else>
				<text class="username">{{addr.username}} &nbsp; {{addr.genderName}}</text>
				<text class="mobile" >{{addr.mobile}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'addrCard',
		props:{
			addr: {
				type: Object,
				dafault(){
					return {}
				}
			},
			isShowDetail: {
				type: Boolean,
				default(){
					return false
				}
			},
		},
		mounted() {
			
		}
	}
</script>

<style lang="stylus" scoped>
.addr-card
	margin-left 40rpx
	display flex
	flex-direction column
	width 90vw
	height 140rpx
	display flex
	flex-direction column
	justify-content space-evenly
	border-bottom 1rpx solid #efefef
	.addr
		color $cl-title
		font-size 34rpx
	.addr-desc
		.username 
			margin-right 20rpx
</style>

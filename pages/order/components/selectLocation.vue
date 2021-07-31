<template>
	<view class="select-location">
		<!-- 我的地址列表弹窗 -->
		<view class="cu-modal bottom-modal " :class="{'show': isShow}" @click.self="close">
			<view class="cu-dialog ">
				<!-- 弹窗内容 -->
				<view class="shopping-cart-detail">
					<view class="header">
						<text class="title">请选择收货地址</text>
						<view class="right" @click.stop="clearAllgoods">
							
						</view>
					</view>
					
					<addr-list  :addrList="myAddrs"
											:isFixed="true" 
											:isShowDetail="false"
											@addrCradClick.stop="handleMyAddrCardClick"/>
					
				</view>
				
				<!-- 新增地址按钮 -->
				<view class="add-addr-wrapper" @click="toNewLocation">
					<view class="add-addr">
						<image class="icon-add-addr" src="../../../static/add-active.png" mode=""></image>
						<text class="add-addr-text">新增收货地址</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import addrList from "../../location/components/addrList.vue"
export default {
	name: "SelectLocation",
	components:{
		addrList
	},
	props:{
		isShow: {
			type: Boolean,
			default(){
				return false
			}
		},
		myAddrs: {
			type: Array,
			default(){
				return []
			}
		}
	},
	mounted() {
	},
	methods:{
		// 关闭弹窗
		close(){
			this.$emit('close')
		},
		
		// 通知父级组件被点击的地址的index
		handleMyAddrCardClick(id){
			let _index = 0
			for(let i = 0; i < this.myAddrs.length; i ++){
				if(this.myAddrs[i].id == id){
					_index = i
				}
			}
			this.$emit("selectAddrIndex", _index)
		},
		
		// 跳转到新增地址页
		toNewLocation(){
			uni.navigateTo({
				url:"../../location/newLocation"
			})
		}
	}
	
}
</script>

<style lang="stylus" scoped>
@import "../../../static/styles/var.styl"
.select-location
	.cu-dialog
		border-radius 30rpx 30rpx 0 0
		overflow hidden
		background #fff
		.shopping-cart-detail
			width 100vw
			padding 20rpx
			text-align left
			padding-bottom 140rpx
			.header
				display flex
				justify-content space-between
				align-items center
				margin-bottom 20rpx
				margin-top 20rpx
				.title
					font-size 28rpx
				.right
					color $cl-content
					.iconfont
						margin-right 10rpx
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

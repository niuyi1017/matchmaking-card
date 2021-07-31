<template>
	<view class="my-addrs-page">
		<!-- 标题栏 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">我的收货地址</block>
		</cu-custom>
		
		
		<!-- 我的收货地址 -->
		<view class="my-addr-wrapper" v-if="myAddrs.length!=0">
			<addr-list  :addrList="myAddrs" 
									:isFixed="false" 
									:isShowDetail="false"
									@addrCardDeleteClick="handleAddrCardDeleteClick"/>
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
import addrList from "./components/addrList.vue"
import { getMyLocationList, deleteAddr } from '../../api/api.js'

export default {
	name: "myAddrs",
	components:{
		addrList
	},
	data(){
		return {
			myAddrs: []
		}
	},
	mounted() {
		this._getMyLocationList()
	},
	onShow(){
		this._getMyLocationList()
	},
	methods:{
		// 删除地址
		handleAddrCardDeleteClick(id){
			let that = this
			uni.showModal({
			    title: '温馨提示',
			    content: '确定要从删除该条地址吗',
			    success: function (res) {
			        if (res.confirm) {
								deleteAddr(id).then(res => {
									that._getMyLocationList()
									uni.showToast({
										icon:"success",
										title:"删除成功"
									})
								})
			        } 
			    }
			})
		},
		
		// 跳转到新增地址页
		toNewLocation(){
			uni.navigateTo({
				url: '../location/newLocation'
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
@import "../../static/styles/var.styl";
.my-addrs-page
	width 100vw
	// height 100vh
	background #fff
	.my-addr-wrapper
		padding-top 20rpx
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
	// overflow-y scroll
</style>

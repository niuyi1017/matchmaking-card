<template>
	<view class="settlement-page">
		<!-- 标题栏 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">提交订单</block>
		</cu-custom>
		
		<view class="page-main">
			<!-- 地址和时间 -->
			<view class="card select-addr">
				<!-- 默认展示我的地址列表中的第一个地址 -->
				<view class="addr" v-if="myAddrs.length!=0" @click="openSelectLocation">
					<text class="addr-desc overflow-1">{{selectAddr.addr}}</text>
					<text class="addr-username">{{selectAddr.username}} {{selectAddr.genderName}} {{selectAddr.mobile}}</text>
					<image class="icon-arrow-right" src="../../static/arrow-right.png" mode=""></image>
				</view>
				<!--  没有地址时展示新增地址按钮 -->
				<view class="add-addr-wrapper" v-else @click="toNewLocation">
					<view class="add-addr-btn">+ 新增地址</view>
				</view>
				<view class="time">
					<text class="time-tip">立即送出</text>
					<text class="computed-time">大约 {{predictTime}} 送达</text>
				</view>
			</view>
			
			<!-- 商品列表 -->
			<view class="card good-list-wrapper">
				<view class="shop-name">
					<text class="shopname">优鼎优凉拌坊</text>
					<text class="tag">优快送</text>
				</view>
				<view class="goods">
					<view class="good" v-for="good in shoppingCart" :key="good.goodDetail.goodId">
						<view class="img-wrapper">
							<image class="img" :src="good.goodDetail.imgUrl" mode=""></image>
						</view>
						<view class="good-desc">
							<view class="row">
								<view class="row-left">
									<!-- <text class="tag">折</text> -->
									<text class="good-name overflow-1">{{good.goodDetail.title}}</text>
								</view>
								<view class="row-right">
									<text class="ori-price">￥{{good.sku.originPrice}}</text>
									<text class="real-price">￥{{good.sku.realPrice}}</text>
								</view>
							</view>
							<view class="row skus">
								<view class="row-left">
									<text class="sku-tag" v-for="tag in good.sku.selectedTags" :key="tag.valueId">{{tag.value}}</text>
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
					<text class="value package-val">￥ {{packageFee}}</text>
				</view>
				<view class="rows">
					<text class="title package">配送费</text>
					<text class="value package-val">￥ {{deliverFee}}</text>
				</view>
				<view class="total">
					<view class="tip-text">
						已优惠<text class="discoount">￥{{getShoppingCartGoodsTotalDiscount}}</text> 小计￥ <text class="summary">{{totalPrice}}</text>
					</view>
				</view>
			</view>
			
			<!-- 支付方式 、订单备注 -->
			<view class="card payment-wrapper">
				<view class="cu-form-group">
					<view class="title">支付方式</view>
					<text class="value">在线支付</text>
				</view>
				<view class="cu-form-group">
					<view class="title">订单备注</view>
					<input class="order-note" v-model="orderNote" placeholder="口味 、偏好等要求" name="input"></input>
					<!-- <text class='cuIcon-right text-orange'></text> -->
				</view>
				<view class="cu-form-group">
					<view class="title">餐具数量</view>
					<picker @change="PickerChange" :value="tablewareNum" :range="picker">
						<view class="picker">
							{{tablewareNum>-1?picker[tablewareNum]:'未选择'}}
						</view>
					</picker>
				</view>
			</view>
			
			
			<!-- 底部结算栏 -->
			<view class="total-btn-wrapper" @click.stop="toNewOrder">
				<view class="left">
					<view class="img-wrapper">
						<view class="cu-tag badge">{{getShoppingCartGoodsCount}}</view>
						<image class="icon-shopping-cart" src="../../static/shoppingCart.png" mode=""></image>
					</view>
					<view class="total-price">
						<view class="price">￥ {{totalPrice}}</view>
						<text class="desc">已优惠 ￥{{getShoppingCartGoodsTotalDiscount}}</text>
					</view>
				</view>
				<view class="pay-btn">去支付</view>
			</view>
			
			<!-- 我的地址列表 -->
			<select-loction :isShow="isShowSelectLocation" :myAddrs="myAddrs" 
											@close="closeSelectLocation"
											@selectAddrIndex="handleSelectAddr"/>
		</view>
	</view>
</template>

<script>
	import selectLoction from "./components/selectLocation.vue"
	import { mapGetters, mapMutations } from 'vuex'
	import { getMyLocationList, getPackageAndDeliverFee, newOrder, wxPay} from '../../api/api.js'
	export default {
		name:"settlement",
		components:{
			selectLoction
		},
		data() {
			return {
				myAddrs: [],
				selectAddrIndex:0,
				packageFee: 0,
				deliverFee: 0,
				orderNote:"",
				tablewareNum: 0,
				picker: ['不需要餐具', '1套餐具', '2套餐具',"3套餐具","4套餐具", "5套餐具" ],
				isShowSelectLocation: false
			}
		},
		computed:{
			...mapGetters([
										'shoppingCart',
										"getShoppingCartGoodsCount",
										"getShoppingCartGoodsTotalPrice",
										"getShoppingCartGoodsTotalDiscount",
										]),
										
				// 选中的地址信息
				selectAddr(){
					return this.myAddrs[this.selectAddrIndex]
				},
				// 预计送达时间（30 min 后）
				predictTime(){
					var now = new Date()
					var time = now.getTime() + 1000 * 60 * 30
					var after=`${new Date(time).getHours() < 10 ? '0' + new Date(time).getHours() : new Date(time).getHours() }:${new Date(time).getMinutes()}`
					console.log(after)
					return after
				},
				// 总价格 (包含配送费、打包费)
				totalPrice(){
					let _totalPrice = Number(this.getShoppingCartGoodsTotalPrice) + Number(this.packageFee) + Number(this.deliverFee)
					return  Number(_totalPrice).toFixed(2)
				}
				
		},
		mounted() {
			this._getMyLocationList()
			this._getPackageAndDeliverFee()
		},
		methods: {
			...mapMutations(["clearAllGoodsInShoppingCart"]),
			
			// 选择餐具数量
			PickerChange(e) {
				this.tablewareNum = e.detail.value
			},
			// 跳转到新增地址页
			toNewLocation(){
				uni.navigateTo({
					url:"../location/newLocation"
				})
			},
			// 打开地址选择弹窗
			openSelectLocation(){
				this.isShowSelectLocation = true
			},
			// 关闭地址选择弹窗
			closeSelectLocation(){
				this.isShowSelectLocation = false
			},
			// 选中的地址的index
			handleSelectAddr(index){
				console.log(index)
				this.selectAddrIndex = index
			},
			// 创建订单
			toNewOrder(){
				let _data = {
					oriTotalPrice: (Number(this.getShoppingCartGoodsTotalPrice) + Number(this.getShoppingCartGoodsTotalDiscount)).toFixed(2),
					actTotalPrice: Number(this.getShoppingCartGoodsTotalPrice )+ this.deliverFee + this.packageFee,
					shippingFee: this.deliverFee,
					packingFee: this.packageFee,
					remark: this.orderNote,
					tableWare: this.tablewareNum,
					skuInfoDTOList: this.shoppingCart.map(good => {
						return {
							id: good.sku.skuId,
							count: good.count,
						}
					}),
					userAddressId: this.selectAddr.id
				}
				console.log(_data)
				// let orderDTO = {
				// 	orderDTO: _data
				// }
				newOrder(_data).then(res => {
					console.log(res)
					
					let orderId = res.orderId
					wxPay(orderId).then( payRes => {
						console.log("payRes",payRes)
					})
					
					// wx.requestPayment({
					//   timeStamp: new Date(),
					//   nonceStr: "5K8264ILTKCH16CQ2502SI8ZNMTM67VS",
					//   package: '',
					//   signType: 'MD5',
					//   paySign: '',
					//   success (res) { },
					//   fail (res) { }
					// })
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
			},
			// 获取最新配送费打包费值
			_getPackageAndDeliverFee(){
				getPackageAndDeliverFee().then( res => {
					this.packageFee = Number(res.packingFee)
					this.deliverFee = Number(res.shippingFee)
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
@import "../../static/styles/var.styl";
.settlement-page
	width 100vw
	.page-main
		padding 10rpx
		.card
			margin 10rpx
			margin-bottom 20rpx
			background #fff
			padding 20rpx
			border-radius 20rpx
			box-shadow 0 20rpx 20rpx #eee
			color $cl-content
		.select-addr
			.addr
				display flex
				flex-direction column
				border-bottom 1rpx solid $cl-border
				padding-bottom 20rpx
				position relative
				.addr-desc
					font-size 40rpx
					margin-bottom 10rpx
					width 95%
				.icon-arrow-right
					position absolute
					right 0
					top 25%
					height 50rpx
					width 50rpx
			.add-addr-wrapper
				display flex
				justify-content center
				.add-addr-btn
					height 80rpx
					width 80%
					display flex
					justify-content center
					align-items center
					margin 40rpx auto
					border 1px solid $cl-yellow
					color $cl-yellow
					border-radius 40rpx
			.time
				height 40rpx
				display flex
				justify-content space-between
				align-items center
				margin-top 20rpx
				.computed-time
					color $cl-yellow
		.good-list-wrapper
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
							.good-name
								color #222
								font-weight bold
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
	.payment-wrapper
		margin-bottom 200rpx !important
		.order-note
			text-align right
			padding-right 0
	.total-btn-wrapper
		width 90vw
		margin 40rpx auto
		margin-top 60rpx
		background #FFFFFF
		height 100rpx
		display flex
		box-shadow 10rpx 0 50rpx #DDDDDD
		border-radius 50rpx
		position fixed
		bottom 20rpx
		left 5vw
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

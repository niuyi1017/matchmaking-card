<template>
	<view class="good-detail">
		<view class="cu-modal bottom-modal " :class="{'show': isShow}">
			<view class="cu-dialog">
				<!-- 关闭弹窗图标 -->
				<view class="close" @click="close">
					<text class="iconfont cuIcon-roundclosefill"></text>
				</view>
				
				<!-- 商品大图 -->
				<image class="good-detail-img" :src="goodDetail.imgUrl" mode=""></image>
				
				<view class="desc-wrapper">
					
					<!-- 标题 + 简介 + 价格 -->
					<view class="title-wrapper">
						<view class="title-desc">
							<text class="good-title overflow-1">{{goodDetail.title}} </text>
							<text class="good-desc overflow-1">{{goodDetail.desc}}</text>
						</view>
						<view class="price">
							<text class="real-price"><text class="rmb">￥</text>{{selectedSku.realPrice}}</text>
							<text class="origin-price">原价：{{selectedSku.originPrice}}</text>
						</view>
					</view>
					
					<!-- 数量 -->
					<view class="count-wrapper">
						<text class="count-name">数量</text>
						<view class="count-ctrl">
							<image class="icon-remove" src="../../../static/remove.png" @click="handleRemoveClick"></image>
							<text class="count-val">{{count}}</text>
							<text class="iconfont cuIcon-roundaddfill text-cyan" @click="handleAddClick"></text>
						</view>
					</view>
					
					<!-- sku -->
					<view class="sku-wrapper">
						<view class="sku-item" v-for="(skuGroup, index) in SKUs" :key="index">
							<text class="sku-name">{{skuGroup.name}}</text>
							<view class="sku-values">
								<text class="sku-tag" v-for="(sku,innerIndex) in skuGroup.skus" :key="innerIndex"
																			:class="{'sku-tag--active': sku.isChecked}"
																			@click="handleSkuTagClick(index, innerIndex)">{{sku.name}}</text>
								
							</view>
						</view>
						
					</view>
					
				</view>
				
				<!-- 加入购物车 -->
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-cyan margin-tb-sm lg" @click="addToShoppingCart">加入购物车</button>
				</view>
				
				
			</view>
		</view>
	</view>
</template>

<script>
import { getGoodDetail } from "../../../api/api.js"
import { mapMutations } from 'vuex'
export default {
	name: "GoodDetail",
	props:{
		isShow:{
			type: Boolean,
			default(){
				return true
			}
		},
		goodId: {
			type: Number,
			default(){
				return null
			}
		}
	},
	data(){
		return {
			count: 1,
			SKUs: [],
			skuList:[],
			goodDetail: {
				goodId: "",
				imgUrl: "",
				title: "",
				desc: "",
			}
		}
	},
	computed:{
		// 筛出格式化后的选中的sku
		selectedSku(){
			let SKUs = this.SKUs
			let selectedSkuIds = []
			SKUs.forEach((item,index) => {
				item.skus.forEach((innerItem, innerIndex) => {
					if(innerItem.isChecked){
						selectedSkuIds.push({
							keyId: item.specKeyId,
							valueId: innerItem.value
						})
					}
				})
			})
			let priceItems = this.skuList
			let _selectedSku = {}
			priceItems.forEach(item => {
				let flag = true
				for(let i = 0; i < selectedSkuIds.length; i ++){
					if(item.specs[i].keyId != selectedSkuIds[i].keyId || item.specs[i].valueId != selectedSkuIds[i].valueId ){
						flag = false
					}
				}
				if(flag){
					_selectedSku = item
				}
			})
			let formatedSelectedSku = {
				skuId: _selectedSku.id,
				realPrice: _selectedSku.discountPrice,
				originPrice: _selectedSku.price,
				selectedTags: _selectedSku.specs
			}
			return formatedSelectedSku
		} 
	},
	watch:{
		// 监听商品id变化，请求不同商品详情数据
		isShow(newVal){
			if(newVal){
				this._getGoodDetail(this.goodId)
			}
		}
	},
	
	methods:{
		...mapMutations(['pushToShoppingCart']),
		
		// 关闭弹窗
		close(){
			this.count = 1
			this.SKUs = [] 
			this.skuList = []
			this.goodDetail = {
					goodId: "",
					imgUrl: "",
					title: "",
					desc: "",
				}
			this.$emit('close')
		},
		
		// sku tag 被点击
		handleSkuTagClick(index, innerIndex){
			let skus = this.SKUs[index].skus
			this._singleChooseSKU(skus, innerIndex)
		},
		
		// 数量-1
		handleRemoveClick(){
			if(this.count > 1){
				this.count --
			}else{
				this.count = 1
			}
		},
		
		// 数量 +1
		handleAddClick(){
			this.count ++
		},
		// 加入购物车
		addToShoppingCart(){
			let shoppingCartItem = {
				goodDetail: this.goodDetail,
				sku:this.selectedSku,
				count:this.count
			}
			console.log(shoppingCartItem)
			this.pushToShoppingCart(shoppingCartItem)
			uni.showToast({
				title:"添加成功",
				icon:"success"
			})
			this.close()
		},
		// sku 单选
		_singleChooseSKU(skus,index){
			skus.forEach((tag, _index) => {
				if(_index == index)
					skus[index].isChecked = true
				else
					skus[_index].isChecked = false
			})
		},
		
		// 获取商品详情
	 async	_getGoodDetail(id){
			let res = await getGoodDetail(id)
			this.goodDetail = {
				goodId: res.spu.id,
				imgUrl: res.spu.image,
				title: res.spu.title,
				desc: res.spu.description,
			}
			this.SKUs = res.sku_specs.map(item => {
				return {
					specKeyId: item.specKeyId,
					name: item.specKey,
					skus: item.specValueList.map((innerItem, index) => {
						return {
							name: innerItem.value,
							value: innerItem.id,
							isChecked: index==0 ? true : false 
						}
					})
				}
			})
			this.skuList = res.spu.skuList	
		}
	}
	
}
</script>

<style lang="stylus" scoped>
@import "../../../static/styles/var.styl";
.good-detail
	.cu-dialog
		border-radius 30rpx 30rpx 0 0
		overflow hidden
		position relative
		.close
			position absolute
			right 5rpx
			top 5rpx
			z-index 99
			.iconfont
				font-size 56rpx
				color rgba(0,0,0,.6)
		.good-detail-img
			width 100vw
			height 70vw
		.desc-wrapper
			padding 10rpx
			padding-bottom 30rpx
			display flex
			flex-direction column
			align-items flex-start
			.title-wrapper
				display flex
				justify-content space-between
				margin-bottom 20rpx
				.title-desc
					display flex
					flex-direction column
					width 72vw
					text-align left
					.good-title
						font-size 42rpx
					.good-desc
						color $cl-content
				.price
					display flex
					flex-direction column
					width 28vw
					justify-content center
					align-items center
					.real-price
						font-size 56rpx
						color $cl-cyan
						.rmb
							font-size 26rpx
					.origin-price
						font-size 22rpx
						text-decoration line-through
						color $cl-content
			.count-wrapper
				display flex
				width 100%
				justify-content space-between
				margin-top 20rpx
				margin-bottom 20rpx
				.count-ctrl
					display flex
					align-items center
					margin-right 10rpx
					.icon-remove
						height 48rpx
						width 48rpx
					.iconfont
						font-size 48rpx
					.count-val
						margin 0 20rpx
			.sku-wrapper
				width 100%
				text-align left
				margin-top 20rpx
				display flex
				flex-direction column
				.sku-item
					width 100%
					margin-bottom 20rpx
					.sku-values
						width 100vw
						text-align center
						padding-left 30rpx
						.sku-tag
							float left
							width 200rpx
							height 50rpx
							line-height 55rpx
							background #ddd
							text-align center
							margin-right 40rpx
							margin-top 20rpx
							border-radius 10rpx
							color $cl-content
						.sku-tag--active
							background $cl-cyan
							color #fff
						
						
</style>

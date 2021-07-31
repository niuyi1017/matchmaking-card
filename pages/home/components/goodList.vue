<template>
	<view class="good-list">
		<view class="good-group" :id="'good-group-'+goods.firstClassId" v-for="goods in goodList" :key='goods.firstClassId'>
			<view class="good-card-wrapper" v-for="good in goods.goods" 
										:key="good.id" 
										@click="handleGoodClick(good.id)">
				<good-card :goodInfo="good"  />
			</view>
		</view>
	</view>
</template>
<script>
	import goodCard from './goodCard.vue'
	export default {
		name: 'goodList',
		components:{
			goodCard
		},
		props:{
			goodList:{
				type: Array,
				default(){
					return []
				}
			},
		},
		data() {
			return {
			};
		},
		mounted() {
			// this._computeCutOffPoints();
			// this._computeScrollToPoints()
		},
		watch:{
			goodList(){
				this._computeCutOffPoints();
				this._computeScrollToPoints()
			}
		},
		methods: {
			
			// 商品卡片被点击
			handleGoodClick(id){
				console.log(id)
				this.$emit('goodCardClick',id)
			},
			
			// 计算上滑导致tab切换 的分界点
			_computeCutOffPoints(){
				const query = uni.createSelectorQuery().in(this);
				query.selectAll('.good-group').boundingClientRect(data => {
					let cutOffPoints = [200]
					for(let i = 0; i< data.length; i++){
						let cutOffPoint = data[i].height + cutOffPoints[i]
						cutOffPoints.push(cutOffPoint)
					}
					this.$emit('initCutOffPoints', cutOffPoints)
				}).exec();
			},
			
			// 计算点击tab 导致屏幕滚动 的分界点
			_computeScrollToPoints(){
				const query = uni.createSelectorQuery().in(this);
				query.selectAll('.good-group').boundingClientRect(data => {
					let scrollToPoints = [400]
					for(let i = 0; i< data.length; i++){
						let scrollToPoint = data[i].height + scrollToPoints[i]
						scrollToPoints.push(scrollToPoint)
					}
					this.$emit('initScrollToPoints', scrollToPoints)
				}).exec();
			},
		}
	}
</script>

<style lang="stylus" scoped>
@import "../../../static/styles/var.styl"
.good-list
	padding-top 20rpx
</style>

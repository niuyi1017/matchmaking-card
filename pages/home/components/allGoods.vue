<template>
	<view class="all-goods">
		
		<!-- 顶部固定的navbar -->
		<fixed-nav-bar  v-if="isShowFixedNav"
										class="fixed-goods-nav-bar"
										:firstClassList="firstClassList"
										:navCur="navCur"
										@tabChange="handleTabChange"/>
		
		<!-- navbar -->
		<all-goods-nav class="all-goods-nav-bar"
									 :firstClassList="firstClassList"
									 :navCur="navCur"
										@tabChange="handleTabChange"/>
										
		<!-- goodlist -->
		<good-list :goodList="goodList"
								@initCutOffPoints="initCutOffPoints"
								@initScrollToPoints="initScrollToPoints"
								@goodCardClick="handleGoodCardClick"/>
	</view>
	
</template>

<script>
	import fixedNavBar from './fixedNavBar.vue'
	import allGoodsNav from './allGoodsNav.vue'
	import goodList from './goodList.vue'
	export default {
		name: 'allGoods',
		components:{
			fixedNavBar,
			allGoodsNav,
			goodList
		},
		props:{
			firstClassList:{
				type: Array,
				default(){
					return []
				}
			},
			goodList:{
				type: Array,
				default(){
					return []
				}
			},
			isShowFixedNav:{
				type: Boolean,
				default(){
					return false
				}
			},
			scrollDetail: {
				type: Object,
				default() {
					return {}
				}
			}
			
		},
		data(){
			return{
				navCur:0,
				cutOffPoints:[],
				scrollToPoints:[]
			}
		},
		
		watch:{
			// 监听页面滚动（ 来自 home.vue 中的 scroll-view 组件 ）
			scrollDetail(newVal){
				this._handleScroll(newVal)
			}
		},
		
		methods:{
			
			// 商品卡片被点击
			handleGoodCardClick(id){
				this.$emit('goodCradClick', id)
			},
			
			// 进行tab切换
			handleTabChange(index){
				this.navCur = index
				this.$emit('scrollTo', this.scrollToPoints[index])
			},
			
			// 初始化 上滑导致tab切换 的分界点
			initCutOffPoints(cutOffPoints){
				this.cutOffPoints = cutOffPoints
			},
			
			// 初始化 点击tab 导致屏幕滚动 的分界点
			initScrollToPoints(scrollToPoints){
				this.scrollToPoints = scrollToPoints
			},
			
			// 响应滑动事件，进行tab切换
			_handleScroll(scrollDetail){
				let index = this._computeIndex(scrollDetail.scrollTop)
				this.navCur = index
			},
			
			// 计算当前滑动的距离属于第几个一级分类
			_computeIndex(scrollTop){
				let cutOffPoints = this.cutOffPoints
				for(let i = 0; i < cutOffPoints.length-1;i++){
					if(scrollTop <= cutOffPoints[i+1] && scrollTop >  cutOffPoints[i] )
						return i ? i : 0
				}
			},
		}
		
	}
</script>

<style lang="stylus" scoped>

	
</style>

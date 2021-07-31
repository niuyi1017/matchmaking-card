<template>
	<view class="all-goods">
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-cyan cur':''" 
														v-for="(item,index) in firstClassList" :key="index" 
														@tap="tabSelect" :data-id="index">
						{{item.name}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'allGoods',
		props:{
			firstClassList:{
				type: Array,
				default(){
					return []
				}
			},
			navCur:{
				type: Number,
				default(){
					return 0
				}
			}
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0
			};
		},
		watch:{
			// 监听父组件传过来的 当前选中的nav的index
			navCur(newNavCurIndex){
				this.TabCur = newNavCurIndex
				this._chageTab(newNavCurIndex)
			}
		},
		mounted() {
			this._chageTab(this.TabCur)
		},
		methods: {
			// 点击切换tab
			tabSelect(e) {
				let index = e.currentTarget.dataset.id
				this.TabCur = index
				this.scrollLeft = (index - 1) * 60
				console.log(index)
				this.$emit('tabChange', index)
			},
			
			// 父组件要求切换tab的响应事件
			_chageTab(index){
				this.TabCur = index
				this.scrollLeft = (index - 1) * 60
			}
		}
		
		
	}
</script>

<style lang="stylus" scoped>
@import "../../../static/styles/var.styl"
.all-goods
	border-radius 15rpx 15rpx 0 0 
	overflow hidden
	padding-bottom 10rpx
	background #fff
	.cur
		font-size $fs-m
		font-weight bold
</style>

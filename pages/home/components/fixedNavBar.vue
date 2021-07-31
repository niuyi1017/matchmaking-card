<template>
	<view class="fixd-navbar"  :style="[{top:CustomBar+90 + 'rpx'}]">
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
		name: 'fixedNabBar',
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
				scrollLeft: 0,
				StatusBar:  this.StatusBar+10,
				CustomBar: this.CustomBar,
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
			this._chageTab(this.navCur)
		},
		methods: {
			// 点击切换tab
			tabSelect(e) {
				let index = e.currentTarget.dataset.id
				this.TabCur = index
				this.scrollLeft = (index - 1) * 60
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
.fixd-navbar
		position fixed
		z-index 100
		left 0rpx
		width 100%
		background #fff
		padding-bottom 10rpx
		box-shadow 30rpx 0 15rpx #ccc
	.cur
		font-size $fs-m
		font-weight bold
</style>

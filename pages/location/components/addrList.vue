<template>
	<view class="addr-list-wrapper">
		
		<!-- 不可左右滑动的地址列表 -->
		<view class="addr-list addr-list--fixed" v-if="isFixed">
			<view class="addr-card-wrapper"  v-for="(addr, index) in addrList" :key="index" 
																			 @click="handleAddrCardClick(addr.id)" >
				<addr-card  :addr="addr" 
										:isShowDetail="isShowDetail"/>
			</view>
		
		</view>
		
		<!-- 可左右滑动的地址列表 -->
		<view class="cu-list addr-list" v-else>
			<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" 
														v-for="(addr,index) in addrList " :key="index"
														@touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" 
														:data-target="'move-box-' + index" 	
														@click="handleAddrCardClick(addr.id)">
				<addr-card :addr="addr" :isShowDetail="isShowDetail" />
				<view class="move">
					<!-- <view class="bg-grey" @click="handleEditClick(addr.id)">编辑</view> -->
					<view class="bg-red" @click="handleDeleteClick(addr.id)">删除</view>
				</view>
			</view>
		</view>
			
	</view>
</template>

<script>
	import addrCard from './addrCard.vue'
	export default {
		name: 'addrList',
		components:{
			addrCard
		},
		props:{
			addrList: {
				type: Array,
				default(){
					return []
				}
			},
			isShowDetail: {
				type: Boolean,
				default(){
					return false
				}
			},
			isFixed: {
				type: Boolean,
				default(){
					return true
				}
			}
		},
		data() {
			return {
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
			}
		},
		
		methods: {
				
				// 当地址卡片被点击
				handleAddrCardClick(id){
					this.$emit('addrCradClick', id)
				},
				
				// 当地址卡片编辑按钮被点击
				handleEditClick(id){
					this.$emit('addrCardEditClick', id)
				},
				
				// 当地址卡片删除按钮被点击
				handleDeleteClick(id){
					this.$emit('addrCardDeleteClick', id)
				},
				
				// ListTouch触摸开始
				ListTouchStart(e) {
					this.listTouchStart = e.touches[0].pageX
				},
			
				// ListTouch计算方向
				ListTouchMove(e) {
					this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
				},
			
				// ListTouch计算滚动
				ListTouchEnd(e) {
					if (this.listTouchDirection == 'left') {
						this.modalName = e.currentTarget.dataset.target
					} else {
						this.modalName = null
					}
					this.listTouchDirection = null
				}
			}
		
	}
</script>

<style lang="stylus" scoped>
@import "../../../static/styles/var.styl"
.addr-list-wrapper
	width: 100vw
.cu-item
	display flex
	width 100vw
</style>

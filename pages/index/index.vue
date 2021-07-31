<template>
	<view>
		<home v-if="PageCur=='home'"></home>
		<order v-if="PageCur=='order'"></order>
		<my v-if="PageCur=='my'"></my>
		<!-- tab -->
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="home">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/home' + [PageCur=='home'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='home'?'text-cyan':'text-gray'">首页</view>
			</view>
			<view class="action" @click="NavChange" data-cur="order">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/order' + [PageCur == 'order'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='order'?'text-cyan':'text-gray'">订单</view>
			</view>
			<view class="action" @click="NavChange" data-cur="my">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/my' + [PageCur == 'my'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='my'?'text-cyan':'text-gray'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'home'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>

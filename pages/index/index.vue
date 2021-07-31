<template>
	<view>
		<showInfo v-if="PageCur=='showInfo'"></showInfo>
		<fillInfo v-if="PageCur=='fillInfo'"></fillInfo>
		
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'showInfo'
			}
		},
		methods: {
			// NavChange: function(e) {
			// 	this.PageCur = e.currentTarget.dataset.cur
			// }
		}
	}
</script>

<style>

</style>

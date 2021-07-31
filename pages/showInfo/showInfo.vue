<template name="home">
	<view>
		<view  class="page" >
			<!-- header -->
			<view class="home-header " :style="[{height:CustomBar + 'rpx'}]">
				<view class="loaction-wrapper " :style="[{top:StatusBar + 'px'}]" @click="gotoEdit">
					<view class="edit-btn">修改</view>
				</view>
			</view>
			
			<!-- page-wrapper -->
			<scroll-view scroll-y="true" class="page-wrapper-scroll" >
				<view class="page-wrapper">
					<view class="content-top"></view>
					<view class="page-content">
						<view class="avatar-wrapper bg-cord">
							<view class="img-wrapper">
								<image class="avatar-img" src="../../static/avatar_default.png" mode=""></image>
							</view>
							<view class="avatar-text">
								<text>用户名</text>
							</view>
						</view>
						 <!-- 基础信息 -->
						<view class="base-info-wrapper">
								<view class="info-item">
									<view class="info-item-key"><text>身</text><text>高:</text></view>
									<text class="info-item-value">170cm</text>
									<!-- <text class="info-item-fill">+点击填写</text> -->
								</view>
								<view class="info-item">
									<view class="info-item-key"><text>学</text><text>历:</text></view>
									<text class="info-item-value">本科</text>
									<!-- <text class="info-item-fill">+点击填写</text> -->
								</view>
								<view class="info-item">
									<view class="info-item-key"><text>户</text><text>籍:</text></view>
									<text class="info-item-value">山东省济南市</text>
									<!-- <text class="info-item-fill">+点击填写</text> -->
								</view>
								<view class="info-item">
									<view class="info-item-key"><text>现</text><text>居</text><text>地:</text></text></view>
									<text class="info-item-value">山东省济南市</text>
									<!-- <text class="info-item-fill">+点击填写</text> -->
								</view>
								<view class="info-item">
									<view class="info-item-key"><text>月</text><text>收</text><text>入:</text></view>
									<text class="info-item-value">1万到2万</text>
									<!-- <text class="info-item-fill">+点击填写</text> -->
								</view>
								<view class="info-item">
									<view class="info-item-key"><text>婚</text><text>姻</text><text>状</text><text>况:</text></view>
									<text class="info-item-value">1w到2万</text>
									<!-- <text class="info-item-fill">+点击填写</text> -->
								</view>
								<view class="info-item">
									<view class="info-item-key"><text>住</text><text>房:</text></view>
									<text class="info-item-value">以购房有贷款</text>
									<!-- <text class="info-item-fill">+点击填写</text> -->
								</view>
								<view class="info-item">
									<view class="info-item-key"><text>车</text><text>辆:</text></view>
									<!-- <text class="info-item-value">以购房有贷款</text> -->
									<text class="info-item-fill">+点击填写</text>
								</view>
								
						 </view>
						<!-- 生活照 -->
						<view class="section-wrapper life-pics-wrapper">
							<view class="section-title">
								生活照
							</view>
							<view class="life-pics-box">
								<text class="left-pic-add-icon">+</text>
							</view>
						</view>
						
						<!-- 详细描述 -->
						<view class="section-wrapper life-pics-wrapper">
							<view class="section-title">
								详细描述
							</view>
							<!-- <view class="detail-desc-text">
								<text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non ad commodi dolor saepe fugiat minus consequuntur similique modi illum blanditiis autem perspiciatis beatae odit quis placeat facere at officiis aliquid.</text>
							</view> -->
							<view class="no-data">
								<text class="not-fill">暂未填写</text>
								<text class="to-fill">+添加详细资料</text>
							</view>
						</view>
							
						<!-- 择偶标准 -->
						<view class="section-wrapper life-pics-wrapper">
							<view class="section-title">
								择偶标准
							</view>
							<!-- <view class="detail-desc-text">
								<text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non ad commodi dolor saepe fugiat minus consequuntur similique modi illum blanditiis autem perspiciatis beatae odit quis placeat facere at officiis aliquid.</text>
							</view> -->
							<view class="no-data">
								<text class="not-fill">暂未填写</text>
								<text class="to-fill">+添加详细资料</text>
							</view>
						</view>
							
					</view>
				</view>
				<view class="cu-tabbar-height"></view>
			</scroll-view>
			<view class="send-my-card-wrapper">
				发送我的名片
				
			</view>
			
			
		</view>
	</view>
</template>

<script>
	
	import { getIndexData, getGoodList } from "../../api/api.js"
	export default {
		name: "home",
		components:{
			
		},
		data() {
			return {
				StatusBar:  this.StatusBar+8,
				CustomBar: this.CustomBar+90,
				
			}
		},
		computed:{
			
		
			
		},
		mounted() {
			
			
			
		},
		onShow() {
			
		},
		methods:{
			
			toPromotion(){
				uni.navigateTo({
					url:"../promotion/promotion"
				})
			},
			
			
			
			// 跳转到地址选择页
			gotoLocation(){
				uni.navigateTo({
					url: '../location/location'
				})
			},
			
			// 跳转到搜索页
			gotoSearch(){
				let hotSearchList = this.hotSearchList
				uni.navigateTo({
					url: `../search/search?hotSearchList=` + encodeURIComponent(JSON.stringify(hotSearchList))
				})
			},
		
		}
	}
</script>

<style lang="stylus" scoped>
@import "../../static/styles/var.styl"
	.page
		height: 100vh
		.home-header
			position fixed
			top 0
			width 100%
			z-index 99
			// background #ccc
			.loaction-wrapper
				position relative
				padding-left 5rpx
				display flex
				align-items center
				.edit-btn
					margin-left 10rpx
					color #fff;
					background rgba(0,0,0,.2)
					padding 8rpx 40rpx
					border-radius 50rpx
		.page-wrapper-scroll
			height 96vh
			.cu-tabbar-height
				background $cl-background
			.page-wrapper
				min-height 1600rpx
				.content-top
					height 200rpx
					position absolute
					width 100%
					margin-top -100px
					// z-index 99
					background $cl-theme
				.page-content
					min-height 1600rpx
					background $cl-background
					// border-radius 40rpx 40rpx 0 0 
					margin-top 170rpx
					// padding 20rpx
					.bg-cord
						background-color $cl-theme
						width 100%
						height 300rpx
					.avatar-wrapper
						display flex
						flex-direction column
						justify-content center
						align-items center
						.img-wrapper
							min-height 140rpx
							min-width 140rpx
							.avatar-img
								height 100%
								width 100%
						.avatar-text
							margin 10rpx 0
							color #fff
							margin-bottom 160rpx
					.base-info-wrapper
						width 96%
						margin auto
						height 400rpx
						background #FFFFFF
						margin-top -80rpx
						border-radius 20rpx
						display flex
						flex-wrap wrap
						justify-content space-between
						padding 0 40rpx
						.info-item
							display flex
							align-items center
							color $cl-content
							width 45%
							height 80rpx
							.info-item-key
								display flex
								justify-content space-between
								width 120rpx
							.info-item-value
								color $cl-title
								font-weight bold
				.section-wrapper
					border-radius 20rpx
					width 96%
					margin auto
					background #FFFFFF
					margin-top 24rpx
					padding 16rpx
					.section-title
						color $cl-title
						margin-bottom 16rpx
					.no-data
						display flex
						justify-content space-between
						.not-fill
							font-weight bold
						.to-fill
							color $cl-content
					.life-pics-box
						height 160rpx
						width 160rpx
						display flex
						align-items center
						justify-content center
						border 1rpx solid #ccc
						border-radius 10rpx
						.left-pic-add-icon
							font-size 98rpx
							color #ccc
		.send-my-card-wrapper
				position fixed
				bottom 40rpx
				width 90%
				display flex
				align-items center
				justify-content center
				height 100rpx
				margin-left 5%
				background $cl-theme
				color #fff
				border-radius 20rpx
	</style>

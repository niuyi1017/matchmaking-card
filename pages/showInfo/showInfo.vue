<template name="home">
	<view>
		<view  class="page" >
			<!-- header -->
			<view class="home-header " :style="[{height:CustomBar + 'rpx'}]">
				<view class="loaction-wrapper " :style="[{top:StatusBar + 'px'}]" >
					<view v-if="isSelf" class="edit-btn" @click="toEdit">修改</view>
					<!-- 若不是本人，则点击返回去填报自己的信息 -->
					<view v-else class="edit-btn" @click="toEdit">返回</view>
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
								<text>{{username||"--"}}</text>
							</view>
						</view>
						 <!-- 基础信息 -->
						<view class="base-info-wrapper">
								<view class="info-item">
									<view class="info-item-key"><text>身</text><text>高:</text></view>
									<text class="info-item-value" v-if="height">{{height}}</text>
									<text class="info-item-fill" v-else-if="isSelf">+点击填写</text>
									<text class="info-item-fill" v-else>暂未填写</text>
								</view>
								<view class="info-item">
									<view class="info-item-key"><text>学</text><text>历:</text></view>
									<text class="info-item-value" v-if="eduBackground != -1">{{eduBackgroundOption[eduBackground]}}</text>
									<text class="info-item-fill" v-else-if="isSelf">+点击填写</text>
									<text class="info-item-fill" v-else>暂未填写</text>
								</view>
								<view class="info-item">
									<view class="info-item-key"><text>户</text><text>籍:</text></view>
									<text class="info-item-value" v-if="register">{{register}}</text>
									<text class="info-item-fill" v-else-if="isSelf">+点击填写</text>
									<text class="info-item-fill" v-else>暂未填写</text>
								</view>
								<view class="info-item">
									<view class="info-item-key"><text>现</text><text>居</text><text>地:</text></text></view>
									<text class="info-item-value" v-if="address">{{address}}</text>
									<text class="info-item-fill" v-else-if="isSelf">+点击填写</text>
									<text class="info-item-fill" v-else>暂未填写</text>
								</view>
								<view class="info-item">
									<view class="info-item-key"><text>月</text><text>收</text><text>入:</text></view>
									<text class="info-item-value" v-if="monthlyIncome != -1">{{mouthluIncomeOptions[monthlyIncome]}}</text>
									<text class="info-item-fill" v-else-if="isSelf">+点击填写</text>
									<text class="info-item-fill" v-else>暂未填写</text>
								</view>
								<view class="info-item">
									<view class="info-item-key"><text>婚</text><text>姻</text><text>状</text><text>况:</text></view>
									<text class="info-item-value" v-if="maritalStatus != -1">{{maritalStatusOptions[maritalStatus]}}</text>
									<text class="info-item-fill" v-else-if="isSelf">+点击填写</text>
									<text class="info-item-fill" v-else>暂未填写</text>
								</view>
								<view class="info-item">
									<view class="info-item-key"><text>住</text><text>房:</text></view>
									<text class="info-item-value" v-if="houseStatus != -1">{{houseStatusOptions[houseStatus]}}</text>
									<text class="info-item-fill" v-else-if="isSelf">+点击填写</text>
									<text class="info-item-fill" v-else>暂未填写</text>
								</view>
								<view class="info-item">
									<view class="info-item-key"><text>车</text><text>辆:</text></view>
									<text class="info-item-value" v-if="carStatus != -1">{{carStatusOptions[carStatus]}}</text>
									<text class="info-item-fill" v-else-if="isSelf">+点击填写</text>
									<text class="info-item-fill" v-else>暂未填写</text>
								</view>
								
						 </view>
						<!-- 生活照 -->
						<view class="section-wrapper life-pics-wrapper">
							<view class="section-title">
								生活照
							</view>
							
							<view class="life-pics-box" v-if="lifePhotoList.length==0">
								<text class="left-pic-add-icon">+</text>
							</view>
								<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img" v-for="(item,index) in lifePhotoList" :key="index"
								@tap="ViewImage" :data-url="lifePhotoList[index]">
								<image :src="lifePhotoList[index]" mode="aspectFill"></image>
							</view>
							</view>
						</view>
						
						<!-- 详细描述 -->
						<view class="section-wrapper life-pics-wrapper">
							<view class="section-title">
								详细描述
							</view>
							<view class="detail-desc-text" v-if="detailDesc">
								<text>{{detailDesc}}</text>
							</view>
							<view class="no-data" v-else>
								<text class="not-fill">暂未填写</text>
								<text class="to-fill" v-if="isSelf">+添加详细资料</text>
							</view>
						</view>
							
						<!-- 择偶标准 -->
						<view class="section-wrapper life-pics-wrapper">
							<view class="section-title">
								择偶标准
							</view>
							<view class="detail-desc-text" v-if="standard">
								<text>{{standard}}</text>
							</view>
							
							<view class="no-data" v-else>
								<text class="not-fill">暂未填写</text>
								<text class="to-fill" v-if="isSelf">+添加择偶标准</text>
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
	
	import { getIndexData } from "../../api/api.js"
	export default {
		name: "home",
		data() {
			return {
				StatusBar:  this.StatusBar+8,
				CustomBar: this.CustomBar+90,
				// 是在看自己的信息还是别人的信息
				isSelf: true,
				// 当前展示的信息的用户id
				userId:"",
				// 当前登录用户的id
				currentUserId: "",
				
				avatarUrl: "",
				height: "",
				weight: "",
				eduBackground: -1,
				register: "",
				address: "",
				monthlyIncome: -1,
				maritalStatus:-1,
				houseStatus: -1,
				carStatus: -1,
				lifePhotoList: ['https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'],
				detailDesc: "",
				standard: "",
				
				mouthluIncomeOptions:[""],
				maritalStatusOptions:[""],
				houseStatusOptions:[""],
				carStatusOptions:[""],
				
			}
		},
		
		mounted() {
			// this._getIndexData()
		},
		methods:{
			toEdit(){
				uni.navigateTo({
					url:"../fillInfo/fillInfo?userId=123"
				})
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.lifePhotoList,
					current: e.currentTarget.dataset.url
				});
			},
			_getIndexData(){
				getIndexData().then(res => {
					console.log(res.data)
				}).catch(err => console.log(err))
			}
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
						.life-pic
							height 100rpx
							width 100rpx
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

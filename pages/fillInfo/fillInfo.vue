<template name="home">
	<view>
		<view class="page">
			<!-- header -->
			<view class="home-header " :style="[{height:CustomBar + 'rpx'}]">
				<view class="loaction-wrapper " :style="[{top:StatusBar + 'px'}]" >
					<view class="edit-btn" @click="toShowPage">返回</view>
				</view>
			</view>

			<!-- page-wrapper -->
			<scroll-view scroll-y="true" class="page-wrapper-scroll">
				<view class="page-wrapper">
					<view class="content-top"></view>
					<view class="page-content">
						<view class="avatar-wrapper bg-cord">
							<view class="cu-avatar round lg margin-left img-wrapper"   
										:style="[{ backgroundImage:'url(' + avatarUrl + ')' }]"
										@tap="ChooseAvatar">
								<view class="cu-tag badge" :class="index==1?'cuIcon-female bg-pink':'cuIcon-male bg-blue'"></view>
							</view>
							<view class="avatar-text">
								<text>{{username||"请填写用户名"}}</text>
							</view>
							<view class="persent">
								<view class="cu-progress round sm striped active">
									<view class="bg-orange" :style="[{ width:'60%'}]">60%</view>
								</view>
							</view>
							<view class="persent-tip">
								资料越详细，找对象越容易
							</view>
						</view>
						<!-- 生活照 -->
						<form>
							<!-- 择偶标准 -->
							<view class="section-wrapper life-pics-wrapper">
								<view class="section-title">
									账号信息
								</view>
								<view class="cu-form-group">
									<view class="title">用户名</view>
									<input class="input" placeholder="请填写用户名" name="input" v-model="username"></input>
								</view>
								
							</view>
							<view class="section-wrapper life-pics-wrapper">
								<view class="section-title">
									生活照
								</view>

								<view class="cu-form-group">
									<view class="grid col-4 grid-square flex-sub">
										<view class="bg-img" v-for="(item,index) in lifePhotoList" :key="index"
											@tap="ViewImage" :data-url="lifePhotoList[index]">
											<image :src="lifePhotoList[index]" mode="aspectFill"></image>
											<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
												<text class='cuIcon-close'></text>
											</view>
										</view>
										<view class="solids" @tap="ChooseImage" v-if="lifePhotoList.length<4">
											<text class='cuIcon-cameraadd'></text>
										</view>
									</view>
								</view>
							</view>
							<!-- 基础信息 -->
							<view class="section-wrapper ">
								<view class="section-title">
									基本信息
								</view>
								<view class="cu-form-group ">
									<view class="title">性别：</view>
									<picker @change="PickerChange" :value="index" :range="picker">
										<view class="picker">
											{{index>-1?picker[index]:'请选择'}}
										</view>
									</picker>
								</view>
								<view class="cu-form-group">
									<view class="title">出生年月</view>
									<picker mode="date" :value="date" @change="DateChange">
										<view class="picker">
											{{date}}
										</view>
									</picker>
								</view>
								<view class="cu-form-group">
									<view class="title">学历</view>
									<picker @change="eduChange" :value="eduBackground" :range="eduBackgroundOptions">
										<view class="picker">
											{{eduBackground>-1?eduBackgroundOptions[eduBackground]:'请选择'}}
										</view>
									</picker>
								</view>
								<view class="cu-form-group">
									<view class="title">学校</view>
									<input class="input" placeholder="请填写学校" name="input" v-model="school"></input>
								</view>
								<view class="cu-form-group">
									<view class="title">身高</view>
									<input class="input" placeholder="请填写身高" name="input" v-model="height"></input>
								</view>
								<view class="cu-form-group">
									<view class="title">婚姻状况</view>
									<picker @change="maritalChange" :value="maritalStatus"
										:range="maritalStatusOptions">
										<view class="picker">
											{{maritalStatus>-1?maritalStatusOptions[maritalStatus]:'请选择'}}
										</view>
									</picker>
								</view>
								<view class="cu-form-group">
									<view class="title">居住地</view>
									<picker mode="region" @change="addressChange" :value="address">
										<view class="picker">
											{{address[0]}}{{address[1]}}
										</view>
									</picker>
								</view>
								<view class="cu-form-group">
									<view class="title">职业</view>
									<input class="input" placeholder="请填写职业" name="input" v-model="professional"></input>
								</view>
								<view class="cu-form-group">
									<view class="title">联系方式</view>
									<input class="input" placeholder="请填写联系方式" name="input" v-model="contact"></input>
								</view>
								<view class="cu-form-group">
									<view class="title">户籍</view>
									<picker mode="region" @change="registerChange" :value="register">
										<view class="picker">
											{{register[0]}}{{register[1]}}
										</view>
									</picker>
								</view>
								<view class="cu-form-group ">
									<view class="title">住房情况</view>
									<picker @change="houseChange" :value="houseStatus" :range="houseStatusOptions">
										<view class="picker">
											{{houseStatus>-1?houseStatusOptions[houseStatus]:'请选择'}}
										</view>
									</picker>
								</view>
								<view class="cu-form-group ">
									<view class="title">月收入</view>
									<picker @change="monthlyIncomeChange" :value="monthlyIncome"
										:range="monthlyIncomeOptions">
										<view class="picker">
											{{monthlyIncome>-1?monthlyIncomeOptions[monthlyIncome]:'请选择'}}
										</view>
									</picker>
								</view>
								<view class="cu-form-group ">
									<view class="title">车辆情况</view>
									<picker @change="Change" :value="carStatus" :range="carStatusOptions">
										<view class="picker">
											{{carStatus>-1?carStatusOptions[carStatus]:'请选择'}}
										</view>
									</picker>
								</view>
							</view>
							<!-- 详细描述 -->
							<view class="section-wrapper life-pics-wrapper">
								<view class="section-title">
									详细描述
								</view>
								<view class="cu-form-group margin-top">
									<textarea maxlength="-1"  v-model="detailDesc"
										placeholder="您可以在这里补充更多相亲信息.例如:亲家号/居住地/性格/体重/工作单位/父母工作情况/本人健康状况/爱好等等"></textarea>
								</view>

							</view>

							<!-- 择偶标准 -->
							<view class="section-wrapper life-pics-wrapper">
								<view class="section-title">
									择偶标准
								</view>
								<view class="cu-form-group margin-top">
									<textarea maxlength="-1" v-model="standard"
										placeholder="您可以在这里描述择偶要求.例如:身高/学历/收入/年龄/住房情况/户籍等等"></textarea>
								</view>
							</view>
						</form>

					</view>
				</view>
				<view class="cu-tabbar-height"></view>
			</scroll-view>
			<view class="send-my-card-wrapper" @click="toSave">
				保存
			</view>


		</view>
	</view>
</template>

<script>
	import {
		getIndexData,
		getGoodList
	} from "../../api/api.js"
	export default {
		name: "home",
		components: {

		},
		data() {
			return {
				StatusBar: this.StatusBar + 8,
				CustomBar: this.CustomBar + 90,
				
				avatarUrl: require("../../static/avatar_default.png"),
				username: "",
				// 生活照
				lifePhotoList: [],
				// 性别
				index: -1,
				picker: ['男', '女', '保密'],
				// 出生日期
				date: '2018-12-25',

				eduBackground: -1,
				eduBackgroundOptions: ["高中及以下", "大专", "本科", "硕士", "硕士以上"],

				school: "",
				height: "",

				maritalStatus: -1,
				maritalStatusOptions: ["未婚", "已婚", "离异", "丧偶"],

				houseStatus: -1,
				houseStatusOptions: ["已购房", "已购房有贷款", "未购房", "有能力购房", "和父母同住"],

				monthlyIncome: -1,
				monthlyIncomeOptions: ["5千以下", "5千到1万", "1万到2万", "2万到3万", "3万到5万", "5万以上"],

				carStatus: -1,
				carStatusOptions: ["有车", "无车"],

			

				register: "北京市朝阳区",
				address: "北京市朝阳区",
				professional: "",
				contact: "",


				detailDesc: "",
				standard: "",
			}
		},

		mounted() {

		},
		methods: {
			toShowPage(){
				uni.navigateTo({
					url:"../showInfo/showInfo"
				})
			},
			
			
			ChooseAvatar(){
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
							this.avatarUrl = res.tempFilePaths
						}
					
				})
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.lifePhotoList.length != 0) {
							this.lifePhotoList = this.lifePhotoList.concat(res.tempFilePaths)
						} else {
							this.lifePhotoList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.lifePhotoList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '温馨提示',
					content: '确定要删除这张照片吗？',
					cancelText: '再看看',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.lifePhotoList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			// 性别
			PickerChange(e) {
				this.index = e.detail.value
			},
			// 学历
			eduChange(e) {
				this.eduBackground = e.detail.value
			},
			// 婚姻
			maritalChange(e) {
				this.maritalStatus = e.detail.value
			},
			// 居住地
			addressChange(e) {
				this.address = e.detail.value
			},
			//户籍
			registerChange(e) {
				this.register = e.detail.value
			},
			// 住房情况
			houseChange(e) {
				this.houseStatus = e.detail.value
			},
			// 月收入
			monthlyIncomeChange(e) {
				this.monthlyIncome = e.detail.value
			},
			// 车辆情况
			carStatusChange(e) {
				this.carStatus = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			// 保存
			toSave(){
				let _data = {
					avatarUrl:this.avatarUrl,
					username:this.username,
					lifePhotoList:this.lifePhotoList,
					index:this.index,
					date:this.date,
					eduBackground:this.eduBackground,
					school:this.school,
					height:this.height,
					maritalStatus:this.maritalStatus,
					houseStatus:this.houseStatus,
					monthlyIncome:this.monthlyIncome,
					carStatus:this.carStatus,
					register: this.register,
					address: this.address,
					professional: this.professional,
					contact: this.contact,
					
					
					detailDesc: this.detailDesc,
					standard: this.standard,
					
				}
				console.log(_data)
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
						background $cl-theme
					.page-content
						min-height 1600rpx
						background $cl-background
						margin-top 170rpx
						.bg-cord
							background-color $cl-theme
							width 100%
							height 250rpx
						.avatar-wrapper
							display flex
							flex-direction column
							justify-content center
							align-items center
							
							.img-wrapper
								min-height 140rpx
								min-width 140rpx
								margin-top 60rpx
								.avatar-img
									height 100%
									width 100%
							.avatar-text
								margin 10rpx 0
								color #fff
								margin-bottom 0rpx
							.persent
								width 60%
								margin-top 10rpx
							.persent-tip
								margin-bottom 140rpx
								color #fff
								font-size 24rpx
						
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
						.input
							text-align right
						.life-pics-box
							height 160rpx
							width 160rpx
							margin-bottom 24rpx
							display flex
							align-items center
							justify-content center
							border 1rpx solid #ccc
							border-radius 10rpx
							
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

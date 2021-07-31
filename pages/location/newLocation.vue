<template>
	<view class="newLocation">

		<!-- 标题栏 -->
		<cu-custom bgColor="bg-white":isBack="true">
			<block slot="backText"></block>
			<block slot="content">新增收货地址</block>
		</cu-custom>
			
		<!-- 表单 -->
		<form>
			<!-- 收货地址 (默认，地图选点前) -->
			<view class="cu-form-group" @click="gotoMap" v-if="!chosenLocation">
				<view class="title">收货地址：</view>
				<text class='cuIcon-location text-gray'></text>
				<text class="click-for-location">点击选择收货地址</text>
				<input class="input" name="input" readonly></input>
				<text class='cuIcon-right text-gray'></text>
			</view>
			
				<!-- 收货地址 (地图选点后) -->
			<view class="cu-form-group" @click="gotoMap" v-else>
				<view class="title">收货地址：</view>
				<view class="cu-item">
					<view class="content padding-tb-sm">
						<view> {{chosenLocation.name}}</view>
						<view class="text-gray text-sm"> {{chosenLocation.address}}</view>
					</view>
				</view>
				<input class="input" name="input" readonly></input>
			</view>
			
			
			
			<!-- 详细地址 -->
			<view class="cu-form-group">
				<view class="title">详细地址：</view>
				<input placeholder="详细地址,例如1层101室" name="input" v-model="detailAddr" @blur="checkDetailAddr"></input>
			</view>
			
			<!-- 标签 -->
			<view class="cu-form-group">
				<view class="title">标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 签：</view>
				<view class="tags">
					<text class="tag" 
								v-for="(tag, index) in tags" :key="index" 
								:class="{'tag--active': tag.isChecked}"
								@click="handleCheckTag(index)">{{tag.name}}</text>
				</view>
				<input class="input" name="input" readonly></input>
			</view>
			
			<!-- 联系人 -->
			<view class="cu-form-group">
				<view class="title">联&nbsp;系&nbsp;人：</view>
				<input placeholder="请填写收货人的姓名" name="input" v-model="contactName"></input>
				<view class="gender" v-for="(gender, index) in genders" :key="index" @click="handleCheckGender(index)">
					<text class='cuIcon-radiobox text-cyan' v-if="gender.isChecked"></text>
					<text class='cuIcon-round text-gray ' v-else></text>
					<text class="radio-tip overflow-1">{{gender.name}}</text>
				</view>
			</view>
			
			<!-- 手机号 -->
			<view class="cu-form-group">
				<view class="title">手&nbsp;机&nbsp;号：</view>
				<input placeholder="请填写收货人手机号码" name="input" 
							 type="number" v-model="mobile"
							 @blur="checkMobile"></input>
			</view>
			
		</form>
		
		<!-- 按钮 -->
		<view class="padding flex flex-direction" @click="toNewAddr">
			<button class="cu-btn bg-cyan margin-tb-sm lg" >保存地址</button>
		</view>
	</view>
</template>

<script>
	const chooseLocation = requirePlugin('chooseLocation');
	import { newAddr } from "../../api/api.js"
	export default {
		name:"NewLocation",
		data(){
			return {
				chosenLocation: null,
				tags: [
					{
						name: "家",
						isChecked:false
					},{
						name: "公司",
						isChecked:false
					},{
						name: "学校",
						isChecked:false
					},
				],
				genders: [
					{
						name: "先生",
						isChecked: true
					},
					{
						name: "女士",
						isChecked:false
					}
				],
				detailAddr: '',
				mobile: '',
				contactName: ""
			}
		},
		computed:{
			selectedTag(){
				let result = null
				this.tags.forEach((tag, index) => {
					if(tag.isChecked){
						result = index
					}
				})
				return result
			},
			selectedGender(){
				let result = null
				this.genders.forEach((gender, index) => {
					if(gender.isChecked){
						result = index
					}
				})
				return result
			}
		},
		
		onShow() {
			 const location = chooseLocation.getLocation();
			 this.chosenLocation = location
		},
		methods:{
			
			// 选择地址标签
			handleCheckTag(index){
				this.tags.forEach((tag, _index) => {
					if(_index == index)
						this.tags[index].isChecked = !this.tags[index].isChecked
					else
						this.tags[_index].isChecked = false
				})
			},
			
			// 选择性别
			handleCheckGender(index){
				this.genders.forEach((tag, _index) => {
					if(_index == index)
						this.genders[index].isChecked = !this.genders[index].isChecked
					else
						this.genders[_index].isChecked = false
				})
			},
			
			// 校验手机号
			checkMobile(){
				if(!(/^1[3456789]\d{9}$/.test(this.mobile))){   
				  uni.showToast({
						icon:"none",
				  	duration:1500,
						title:"手机号格式有误，请重新填写"
				  })
					return false 
				 } 
			},
			
			// 校验详细地址
			checkDetailAddr(){
				if(this.detailAddr.length == 0){
					uni.showToast({
						icon:"none",
						duration:1500,
						title:"请填写详细地址"
					})
					return false 
				}
			},
			
			// 去腾讯地图插件选择地址
			gotoMap(){
				let plugin = requirePlugin('chooseLocation');
				let key = 'C7HBZ-QSTRP-L7DDV-VBH6A-5V6RF-BLBNU';  //使用在腾讯位置服务申请的key
				let referer = 'chooseLocation';   //调用插件的app的名称
				
				// const category = '生活服务,娱乐休闲';
				
				wx.navigateTo({
				  url: `plugin://chooseLocation/index?key=${key}&referer=${referer}`
				})
			},
			
			// 提交地址
			toNewAddr(){
				if(!this.chosenLocation){
					uni.showToast({
						title:"请选择收货地址",
						icon:"none"
					})
				}else if(this.contactName.length == 0){
					uni.showToast({
						title:"请填写联系人",
						icon:"none"
					})
				}else {
					let _data = {
						name: this.chosenLocation.name,
						detailAddress: this.chosenLocation.address,
						houseNumber: this.detailAddr,
						label: this.selectedTag,
						contactName: this.contactName,
						contactGender: this.selectedGender,
						contactMobile: this.mobile
					}
					newAddr(_data).then(res => {
						uni.showToast({
							title:"地址添加成功"
						})
						uni.navigateBack({
							delta: 1
						})
					})
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
@import "../../static/styles/var.styl"
.newLocation
	background #FFFFFF
	height 100vh
	.cu-form-group
		.click-for-location
			margin-right 150rpx
			color #777777
		.tags
			width 350rpx
			display flex
			justify-content space-between
			margin-right 100rpx
			.tag
				height 38rpx
				line-height 40rpx
				width 90rpx
				border 1rpx solid #ccc
				font-size 26rpx
				text-align center
				color #777
				border-radius 10rpx
			.tag--active
				border-color $cl-cyan
				color $cl-cyan
		.input
			height 0
			width 1rpx !important
			color #FFFFFF
		.gender
			margin-right 10rpx
			display flex
			align-items center
			&:last-child
				margin-right 0
			.radio-tip
				margin 0 15rpx
				margin-right 20rpx
				&:last-child
					margin-right 0
</style>

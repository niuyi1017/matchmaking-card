<template name="order">
	<view class="order-page">
		<!-- 标题栏 -->
		<cu-custom bgColor="bg-gradual-blue" >
			<block slot="content">订单</block>
		</cu-custom>
		<!-- 标签栏 -->
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-cyan cur':''" v-for="(item,index) in tabs" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<!-- 订单列表 -->
		<scroll-view scroll-y class="order-list-wrapper">
			<view v-if="TabCur==0">
				<order-card v-for="(order, index) in allOrders.orders" :key="index" :orderInfo="order"/>
			</view>
			<view v-else-if="TabCur==1">
				<order-card v-for="(order, index) in ongoingOrders.orders" :key="index" :orderInfo="order"/>
			</view>
			<view v-else>
				<order-card v-for="(order, index) in completedOrders.orders" :key="index" :orderInfo="order"/>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	import OrderCard from "./components/orderCard.vue"
	import { getAllOrders, getOngoingOrders, getCompletedOrders } from "../../api/api.js"
	import { moment } from "../../utils/utils.js"
	export default {
		name: "order",
		components:{
			OrderCard
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				tabs: ["全部", "进行中", "已完成"],
				allOrders: {
					total: 0,
					count: 0,
					page: 1,
					totalPage:1,
					orders:[
						{
							time: "",
							status: "",
							statusText: "",
							goods: [],
							packageFee: "",
							deliverFee: "",
							totalPrice:""
						},
					],
				},
				ongoingOrders: {
					total: 0,
					count: 0,
					page: 1,
					totalPage:1,
					orders:[
						{
							time: "",
							status: "",
							statusText: "",
							goods: [],
							packageFee: "",
							deliverFee: "",
							totalPrice:""
						},
					],
				},
				completedOrders: {
					total: 0,
					count: 0,
					page: 1,
					totalPage:1,
					orders:[
						{
							time: "",
							status: "",
							statusText: "",
							goods: [],
							packageFee: "",
							deliverFee: "",
							totalPrice:""
						},
					],
				}
			}
		},
		watch: {
			TabCur(newVal){
				if(newVal == 0) {
					this._getAllOrders()
				}else if( newVal == 1 ){
					this._getOngoingOrders()
				}else{
					this._getCompletedOrders()
				}
			}
		},
		mounted() {
			this._getAllOrders()
		},
		methods: {
			// 切换顶部标签栏
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			// 获取全部订单
			_getAllOrders(){
				getAllOrders().then(res => {
					this.allOrders = {
						total: res.total,
						count: res.count,
						page: res.page,
						totalPage:res.totalPage,
						orders: this._handleOrderData(res.items)
					}
				})
			},
			// 获取进行中订单
			_getOngoingOrders(){
				getOngoingOrders().then(res => {
					this.ongoingOrders = {
						total: res.total,
						count: res.count,
						page: res.page,
						totalPage:res.totalPage,
						orders: this._handleOrderData(res.items)
					}
				})
			},
			// 获取已完成订单
			_getCompletedOrders(){
				getCompletedOrders().then(res => {
					this.completedOrders = {
						total: res.total,
						count: res.count,
						page: res.page,
						totalPage:res.totalPage,
						orders: this._handleOrderData(res.items)
					}
				})
			},
			
			// 处理响应回来的订单数据
			_handleOrderData(orders){
				return orders.map(item => {
					return {
						id: item.id,
						orderNo: item.orderNo,
						time: moment(item.placedTime).format('YYYY-MM-DD H:mm'),
						// time: `${item.placedTime.split('T')[0]} ${item.placedTime.split('T')[1].split('.')[0]}`,
						status: item.status,
						statusText: item.statusText,
						packageFee: item.packingFee,
						deliverFee: item.shippingFee,
						totalPrice: 12.84,
						goods: item.snapItems.map(good => {
							return {
								goodDetail: {
									id: good.spuid,
									imgUrl: good.img,
									title: good.title,
								},
								sku: {
									skuid: good.id,
									originPrice: good.finalPrice,
									realPrice: good.singlePrice,
									selectedTags: good.specValues
								},
								count: good.count
							}
						})
					}
				})
				
			}
		}
	}
</script>

<style lang="stylus" scoped>
.order-page
	.order-list-wrapper
		height 80vh
</style>

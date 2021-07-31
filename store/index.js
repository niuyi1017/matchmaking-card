import Vue from 'vue'
import Vuex from 'vuex'
import { setSearchHistory, getSearchHistory, removeSearchHistory } from "../utils/utils.js"
Vue.use(Vuex)

const store = new Vuex.Store({
		state: {
			location: "",
			shoppingCart:[],
			searchHistory:[],
		},
		mutations: {
			// 存储获取的定位信息
			setLocation(state, newLocation){
				state.location = newLocation
			},
			
			// 将商品添加到购物车
			pushToShoppingCart(state, item){
				// state.shoppingCart.push(item)
				state.shoppingCart.unshift(item)
			},
			
			// 从购物车删除商品
			removeFromShoppingCart(state, index){
				state.shoppingCart.splice(index, 1)
			},
			
			// 增加某个商品的数量
			addCount(state, index){
				state.shoppingCart[index].count ++
			},
			// 减少某个商品的数量
			removeCount(state, index){
				state.shoppingCart[index].count --
			},
			// 清空购物车内所有商品
			clearAllGoodsInShoppingCart(state){
				state.shoppingCart = []
			},
			
			// 初始化搜索历史，读取本地存储的搜索历史同步到vuex
			initSearchHistory(state){
				let searchHistory =  getSearchHistory()
				if(searchHistory)
					state.searchHistory = searchHistory
				else
					state.searchHistory = []
			},
			// 加入搜索历史
			pushSearchHistory(state, item){
				console.log(item)
				if(item){
					let index = state.searchHistory.indexOf(item)
					if(index != -1)
						state.searchHistory.splice(index)
					if(state.searchHistory.length > 10){
						state.searchHistory.pop()
					}
					state.searchHistory.unshift(item)
					setSearchHistory(state.searchHistory)
				}
				
			},
			
			// 清空搜索历史
			clearSearchHistory(state){
				state.searchHistory = []
				setSearchHistory(state.searchHistory)
			}
			
		},
		
		getters:{
			// 获取缓存的位置信息
			location: state => {
				return state.location
			},
			// 获取购物车所有商品数据
			shoppingCart: state => {
				return state.shoppingCart
			},
			// 获取购物车商品数量
			getShoppingCartGoodsCount: state => {
				let count = 0
				for(let i=0; i<state.shoppingCart.length; i++){
					count +=state.shoppingCart[i].count
				}
				return count
			},
			// 获取购物车商品总价格
			getShoppingCartGoodsTotalPrice: state => {
				let totalPrice = 0
				for(let i=0; i<state.shoppingCart.length; i++){
					totalPrice += (state.shoppingCart[i].sku.realPrice * state.shoppingCart[i].count )
				}
				return totalPrice.toFixed(2)
			},
			// 获取购物车商品种总优惠
			getShoppingCartGoodsTotalDiscount: state => {
				let totalPrice = 0
				for(let i=0; i<state.shoppingCart.length; i++){
					totalPrice += ((state.shoppingCart[i].sku.originPrice - state.shoppingCart[i].sku.realPrice) * state.shoppingCart[i].count )
				}
				return totalPrice.toFixed(2)
			},
			// 获取搜索历史
			getSearchHistory: state => {
				return state.searchHistory
			}
		}
})
export default store
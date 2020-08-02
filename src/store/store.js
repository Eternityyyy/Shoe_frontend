import Vue from 'vue'
import Vuex from 'vuex'
import cookie from 'vue-cookies'
import { getCart } from 'network/Api.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		userinfo:{
			name:cookie.get('name'),
			token:cookie.get('token'),
		},
		shopcarts:{
			shoe_list:[],
			totalprice:0
		}
	},
	mutations:{
		setUser(state){
			// console.log(this)
			state.userinfo = {
				name:cookie.get('name'),
				token: cookie.get('token')
			}
			// console.log(state.userinfo)
		},
		setShoeList(state){
			getCart().then(res =>{
				// console.log(res)
				state.shopcarts.shoe_list = res.results
				res.results.forEach(item =>{
					let total = 0;
					total += item.Cart_shoe.price*item.Shoe_num;
					state.shopcarts.totalprice = total
				})
			}).catch(err =>{
				console.log(err)
			})
		},
		deleteShoeList(state){
			state.shopcarts ={
				shoe_list:[],
				totalprice:0
			}
		}
	}
})

export default store
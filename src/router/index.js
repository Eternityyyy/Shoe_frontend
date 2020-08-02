import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/home/Home.vue'
import ShoeByCategory from 'views/CategoryShoe/ShoeByCategory.vue'
import BrandList from 'views/brand/BrandList.vue'
import ShoeInfo from 'views/shoe/ShoeInfo.vue'
import Login from 'views/user/Login.vue'
import Register from 'views/user/Register.vue'
import Customer from 'views/customer/Customer.vue'
import CustomerInfo from 'views/customer/CustomerInfo.vue'
import ShopCart from 'views/customer/ShopCart.vue'
import Comment from 'views/customer/Comment.vue'
import CommentList from 'views/customer/CommentList.vue'
import Address from 'views/customer/Address.vue'
import CreateAddress from 'views/customer/CreateAddress.vue'
import Order from 'views/pay/Order.vue'
import OrderList from 'views/pay/OrderList.vue'
import Pay from 'views/pay/Pay.vue'
import SearchShoeList from 'views/shoe/SearchShoeList.vue'

// import ShoeList from 'views/CategoryShoe/ShoeList.vue'
// import ShoeDesc from 'views/shoe/ShoeDesc.vue'

Vue.use(VueRouter)

const routes = [
	{
		path:'/',
		redirect:'/home',
		
	},
	{
		path:'/login',
		component:Login
	},
	{
		path:'/register',
		component:Register
	},
	{
		path:'/Home',
		component: Home
	},
	{
		path:'/:sex/shoes',
		component: ShoeByCategory
		
	},
	{
		path:'/brands',
		component: BrandList
	},
	{
		path:'/shoes/:id',
		name:'shoes',
		component:ShoeInfo,
	},
	{
		path:'/user',
		name:'user',
		component:Customer,
		children:[
		{
			path:'/',
			redirect:'info',
		},
		{
			path:'info',
			component:CustomerInfo
		},
		{
			path:'cart',
			component:ShopCart
		},
		{
			path:'address',
			component:Address,
			
		},
		{
			path:'add',
			component:CreateAddress
		},
		{
			path:'orders',
			component:OrderList
		},
		{
			path:'comments',
			component:CommentList
		},
		
		]
	},
	{
		path:'/order/:index',
		component:Order,
	},
	{
		path:'/pay/:num',
		name:'pay',
		component:Pay
	},
	{
		path:'/comment/:orderid',
		component:Comment
	},
	{
		path:'/search',
		component:SearchShoeList
	}
]

const router = new VueRouter({
	routes,
	mode:'history'
})

export default router
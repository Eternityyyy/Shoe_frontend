<template>
	<div class="order">
		<!-- 提交订单界面 -->
		<h3>请确认商品信息</h3>
		<div class="shoe-message">
			<img :src="cart.Cart_shoe.shoe_img">
			<div>
				<h3>{{ cart.Cart_shoe.shoe_name }}</h3>
				<p>颜色：{{ cart.shoe_color.color }}</p>
				<p>尺码：{{ cart.shoe_size.size }}</p>
				<p>数量：{{ cart.Shoe_num }}</p>
				<p>金额：<i style="color: red;">￥{{ cart.Cart_shoe.price }}</i></p>
				<p>邮费：<i style="color: red;">￥{{ cart.Cart_shoe.postage }}</i></p>
				<p>折扣：{{ cart.Cart_shoe.now_price}}</p>
				<p v-if="cart.Cart_shoe.shoe_topic.length>0">活动：<i style="color: red;">满{{ cart.Cart_shoe.shoe_topic[0].full }}减{{ cart.Cart_shoe.shoe_topic[0].reduction }}</i></p>

			</div>
			<!-- <span>{{ shopcarts.shoe_list[index].Cart_price * }}</span> -->
			<!-- {{ cart }} -->
		</div>
		<!-- {{ shopcarts.shoe_list[index] }} -->
		<!-- {{ address }}  -->
		<h3>请选择收货地址</h3>
		<router-link to="/user/add" v-if="address.length<=0">添加收货地址</router-link>
		<div class="select-address" v-else>
			<div class="select-address-item" v-for="item in address" :key="item.id" @click="selectAddress(item.id)" :class="{'cur':iscur == item.id}" >
				<h4>{{ item.area }}{{ item.address_detail }}</h4>
				<p>收件人：{{ item.address_user }}</p>
				<p>电话：{{ item.address_phone }}</p>
			</div>
		</div>
		<button @click="submitOrder">提交订单</button>
	</div>

</template>

<script>
	import { mapState } from 'vuex'
	import { getAddress,addOrder } from 'network/Api.js'
	export default {
		name:"Order",
		data(){
			return{
				index:0,
				address:[],
				selectaddressid:0,
				cart:{},
				iscur: 0
			} 
		},
		computed:{
			...mapState(['shopcarts'])
		},
		methods:{
			computed_amout(){
				// 折后价
				let discount_price = (this.cart.Cart_shoe.price*this.cart.Cart_shoe.now_price*0.1).toFixed(2)
				// 单个商品满减
				if (this.cart.Cart_shoe.shoe_topic.length>0) {
					this.cart.Cart_shoe.shoe_topic[0].full - discount_price <=0 ? discount_price - this.cart.Cart_shoe.shoe_topic[0].reduction: discount_price
				}
				// console.log(typeof parseInt(discount_price))
				// console.log(parseFloat(discount_price)*this.cart.Shoe_num + parseFloat(this.cart.Cart_shoe.postage))
				return parseFloat(discount_price)*this.cart.Shoe_num + parseFloat(this.cart.Cart_shoe.postage)
			},
			submitOrder(){
				if (this.cart.Cart_shoe.stock - this.cart.Shoe_num <0) {
					this.$my_message({
						content:'库存不足，看看别的吧',
						time:1000,
						type:'error',
						hasClose:true,
					});
				}
				else if(this.selectaddressid){
					addOrder({
						order_count:this.cart.Shoe_num,
						total_amount:this.computed_amout(),
						order_shoe:this.cart.Cart_shoe.id,
						adress:this.selectaddressid,
						shoe_color:this.cart.shoe_color.id,
						shoe_size:this.cart.shoe_size.id,
					}).then(res=>{
						// deleteCart(this.cart.id).then(()=>{
						// })
						this.$router.push({name:'pay',params:{num:res.id}})
					})
				}
				else {
					this.$my_message({
						content:'请选择收货地址',
						time:1000,
						type:'error',
						hasClose:true,
					});
				}
			},
			selectAddress(id){
				this.selectaddressid = id
				this.iscur = id
			}
		},
		created(){
			this.index = this.$route.params.index
			// console.log(this.shopcarts.shoe_list)
			// console.log(this.index)
			this.cart = this.shopcarts.shoe_list[this.index]
			// console.log(this.cart)
			getAddress().then(res=>{
				// console.log(res)
				this.address = res.results
			})
		}
	}

</script>

<style>
.order{
	width: 80%;
	margin: 20px auto;
	background: white;
	padding: 20px;
}
.shoe-message{
	display: flex;
	margin-bottom: 20px;
}
.shoe-message img{
	width: 150px;
	height: 150px;
	border: 1px solid var(--border-color);
	margin-right: 30px;
}
.shoe-message h3{
	margin-bottom: 20px;
}
.order h3{
	padding: 10px;
	border-bottom: 1px solid var(--border-deep-color);
}
.select-address-item{
	margin: 20px 0;
	padding: 10px;
	border: 1px solid var(--border-deep-color);
}
.select-address .cur{
	border: 1px solid var(--color-red);
}
.order button{
	background: var(--color-red);
	padding: 10px 1rem;
	border-radius: 3px;
	color: white;
}
</style>
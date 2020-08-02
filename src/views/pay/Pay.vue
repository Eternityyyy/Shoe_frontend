<template>
	<div class="pay-info w80">
		<!-- 支付界面 -->
		<!-- <p>{{ $route.params.num.order_num }}</p> -->
		<!-- < -->
		<!-- <a :href="$route.params.num.aplipay_url">确认支付</a> -->
		<!-- {{ $route.params.num }} -->
		<!-- {{ orderinfo }} -->
		<h3 class="part-title"><span>商品</span></h3>
		<div class="pay-shoe">
			<img :src="orderinfo.order_shoe.shoe_img">
			<div>
				<h3>{{ orderinfo.order_shoe.shoe_name }}</h3>
				<p>金额：{{ orderinfo.order_shoe.price }}</p>
				<p>颜色：{{ orderinfo.shoe_color.color }}</p>
				<p>尺码：{{ orderinfo.shoe_size.size }}</p>
				<p>购买数量：{{ orderinfo.order_count }}</p>
			</div>
		</div>
		<h3 class="part-title"><span>地址</span></h3>
		<div class="pay-address">
			<p>地区：{{ orderinfo.adress.area }}</p>
			<p>详细地址：{{ orderinfo.adress.address_detail }}</p>
			<p>收件人：{{ orderinfo.adress.address_user }}</p>
			<p>联系电话：{{ orderinfo.adress.address_phone }}</p>
		</div>
		<h3 class="part-title"><span>订单详情</span></h3>
		<div class="order-message">
			<p>商家订单号：{{ orderinfo.order_num }}</p>
			<p>支付宝订单号：{{ orderinfo.trade_no }}</p>
			<p>实付金额：<i>￥{{ orderinfo.total_amount }}</i></p>
			<p>商品状态：{{ orderinfo.logistics_state }}</p>
			<p>支付状态：{{ orderinfo.order_state }}</p>
			<p v-show="orderinfo.post_name">快递公司：{{ orderinfo.post_name }}</p>
			<p v-show="orderinfo.post_sn">快递单号：{{ orderinfo.post_sn }}</p>
		</div>
		<div v-if="orderinfo.order_state == '待支付'" class="pay-opreation">
			<a :href="orderinfo.alipay_url">支付</a>
		</div>
		<div v-else-if="orderinfo.order_state == '支付成功'" class="pay-opreation">
			<a v-if="orderinfo.logistics_state =='已发货'" @click="isLogistics(orderinfo.id,orderinfo.order_shoe.id,orderinfo.order_shoe.sale_num)">确认收货</a>
			<router-link v-else-if="orderinfo.logistics_state =='确认收货'" :to="`/comment/${orderinfo.id}`">去评价</router-link>
			<a v-else>交易完成</a>
		</div>
		<div v-else class="pay-opreation">交易关闭</div>
	</div>

</template>

<script>
	// import { getOrderInfo,updateShoe } from 'network/Api.js'
	import { getOrderInfo,updateOrder,updateShoe } from 'network/Api.js'
	export default {
		name:"Pay",
		data(){
			return{
				orderinfo:{}
			}
		},
		methods:{
			isLogistics(id,shoeid,sale){
				updateOrder(id,{logistics_state:'SEND_SUCCESS'}).then(res=>{
					console.log(res)
					this.$set(this.orderinfo,'logistics_state','确认收货')
					// updateShoe(shoeid,{ sale_num : sale+1 })
					updateShoe(shoeid,{ sale_num: sale+1 }).then(res=>{
						console.log(res)
					})
				})
			}
		},
		created(){
			console.log(this.$route.params.num)
			getOrderInfo(this.$route.params.num).then(res =>{
				console.log(res)
				this.orderinfo = res
			})
		}
	}

</script>

<style>
.pay-info{
	margin: 20px auto;
	background: white;
	padding: 20px;
	position: relative;
}
.pay-shoe{
	display: flex;
	margin-bottom: 20px;
	/*border: 1px solid var(--border-deep-color);*/
}
.pay-shoe img{
	width: 150px;
	height: 150px;
	border: 1px solid var(--border-deep-color);
	margin-right: 30px;
}
.pay-address{
	padding: 20px;
	border: 1px solid var(--border-deep-color);
}
.pay-info .part-title{
	margin: 10px 0;
	color: var(--color-red);
	border-bottom: 1px solid var(--border-deep-color);
	padding-bottom: 10px;
	position: relative;
}
.pay-info a{
	display: inline-block;
	background: var(--color-red);
	padding: 10px 1rem;
	color: white;
	border-radius: 3px;
}
.pay-info .part-title::before{
	content: "";
	width: 6px;
	height: 20px;
	background: var(--color-black);
	border-radius: 2px;
	position: absolute;
	top: 2px;
}
.pay-opreation{
	position: absolute;
	top: 10px;
	right: 20px;
}

</style>
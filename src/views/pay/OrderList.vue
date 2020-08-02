<template>
	<div class="orderlist">
		<table>
			<tr>
				<th>订单号</th>
				<th>支付状态</th>
				<th>提交时间</th>
				<th>金额</th>
				<th>操作</th>
			</tr>
			<tr v-for="(item,index) in orderlist" :key="item.id">
				<td>{{ item.order_num }}</td>
				<td>{{ item.order_state }}</td>
				<td>{{ item.order_time.slice(0,19).replace('T',' ') }}</td>
				<td>￥{{ item.total_amount }}</td>
				<!-- <td v-if="item.order_state == '待支付'">
					<button><a :href="item.alipay_url">支付</a></button>
					<button @click="deleteorder($event,item.id,index)">取消订单</button>
				</td>
				<td v-else>
					<button>交易结束</button>
					<router-link v-if="item.logistics_state == 'TOKE_SUCCESS'" :to="`/commet/${item.id}`">{{ item.logistics }}评论</router-link>
					<button v-else @click="isLogistics(item.id,index)">
						确认收货
					</button>
				</td> -->
				<td>
					<router-link :to="`/pay/${item.id}`" tag="button">查看</router-link>
					<button @click="deleteorder($event,item.id,index)" v-show="item.order_state == '待支付'">取消订单</button>
				</td>
			</tr>
		</table>
	</div>

</template>

<script>
	import { getOrder,deleteOrder } from 'network/Api.js'
	export default {
		name:"OrderList",
		data(){
			return {
				orderlist:[]
			}
		},
		methods:{
			deleteorder(e,id,index){
				console.log(e,index)
				deleteOrder(id).then(res =>{
					console.log(res)
					this.orderlist.splice(index,1)
				})
			},
			// isLogistics(id,index){
			// 	updateOrder(id,{logistics_state:'TOKE_SUCCESS'}).then(res=>{
			// 		console.log(res)
			// 		this.$set(this.orderlist[index],'logistics_state','TOKE_SUCCESS')
			// 	})
			// }
		},
		created(){
			getOrder().then(res=>{
				console.log(res.results)
				this.orderlist = res.results
			})
		}
	}

</script>

<style>
.orderlist {
	width: calc(100% - 230px);
}
.orderlist table{
	width: 100%;
	text-align: left;
	border-collapse: collapse;
}
.orderlist table th,.orderlist table td{
	border: 1px solid var(--border-deep-color);
	padding: 10px 5px;
}
.orderlist table td button{
	padding: 5px;
	margin-right: 10px;
	background: var(--border-deep-color);
	border-radius: 3px;
}

</style>
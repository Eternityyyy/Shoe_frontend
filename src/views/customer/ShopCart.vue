<template>
	<table class="shop-cart">
		<thead>
			<tr>
				<!-- <th></th> -->
				<th>商品名称</th>
				<th>单价</th>
				<th>数量</th>
				<th>小计</th>
				<th>操作</th>
			</tr>
		</thead>
		<tr v-show="shopcarts.shoe_list.length<=0">
			<td>快去逛逛吧</td>
		</tr>
		<tr v-for="(item,index) in shopcarts.shoe_list" :key="item.id">
			<!-- <td class="checkbox"> -->
				<!-- <span @click="checked(item.Cart_shoe.id)" :class="[checkshoes.id ? 'ischeck':'' ]"> -->
				<!-- <span @click="checked(item.Cart_shoe.id)" :class="{'ischecked':ischeck }"> -->
					<!-- {{ checkshoes }} -->
				<!-- </span> -->
			<!-- </td> -->
			<td class="shoecart-shoename">
				<img :src="item.Cart_shoe.shoe_img">
				<router-link :to="`/shoes/${item.Cart_shoe.id}`" class="shop-cart-detail">
				<!-- <router-link :to="{path:'/shoes',params:{id:item.Cart_shoe.id}}" class="shop-cart-detail"> -->
					<h4>{{ item.Cart_shoe.shoe_name}}儿童休闲鞋JSTM-CD6892-001</h4>
					<p v-if="item.Cart_shoe.shoe_topic.length>0">满{{ item.Cart_shoe.shoe_topic[0].full }}减{{ item.Cart_shoe.shoe_topic[0].reduction }}</p>
					<span style="margin-right: 10px;">颜色：{{ item.shoe_color.color }}</span>
					<span>尺码：{{ item.shoe_size.size }}</span>
				</router-link>
			</td>
			<td class="shoe-cart-price">{{ item.Cart_shoe.price }}</td>
			<td :data-shopcartid="item.id">
				<NumButton :num="item.Shoe_num" @changenum="changenum" :id="item.id"></NumButton>
			</td>
			<td class="shoe-cart-price">{{ (item.Cart_shoe.price*item.Shoe_num).toFixed(2) }}</td>
			<td class="operation">
				<span @click="deletecart(item.id)">删除</span>
				<router-link :to="`/order/${index}`" tag="span">购买</router-link>
			</td>
		</tr>
	</table>

</template>

<script>
	// import ShopCartItem from './ShopCartItem.vue'
	import { deleteCart,updateCart } from 'network/Api.js'
	import NumButton from 'components/common/button/NumButton.vue'
  import { mapState } from 'vuex'

	export default {
		name:"ShopCart",
		components:{
			// ShopCartItem,
			NumButton
		},
		computed:{
      ...mapState(['shopcarts'])
    },
		data(){
			return{
				carts:[],
				// ischeck:false,
				// checkshoes:{}
			}
		},
		methods:{
			changenum(num,id){
				console.log(num,id)
				updateCart(id,{ 'Shoe_num': num }).then(res=>{
					console.log(res)
					this.$store.commit('setShoeList')
				})
			},
			deletecart(id){
				deleteCart(id).then(res =>{
					this.$store.commit('setShoeList')
					console.log(res)
				})
			},
			// checked(id){
			// 	this.ischeck = !this.ischeck
			// 	console.log(id)
			// 	if (this.checkshoes[id]) {
			// 		this.$delete(this.checkshoes,id)
			// 	}
			// 	else{
			// 		this.$set(this.checkshoes,id,id)
			// 	}
			// 	console.log(this.checkshoes)
			// }
		},
	}

</script>

<style>
.shop-cart{
	width: calc(100% - 220px);
	text-align: left;
}
.shop-cart th{
	border-bottom: 1px solid var(--border-deep-color);
	padding-bottom: 20px;
}

.checkbox span{
	display: inline-block;
	width: 20px;
	height: 20px;
	background: url('~assets/img/checkbox.png') no-repeat;
}
.checkbox .ischecked{
	background: url('~assets/img/checkbox.png') -20px 0 no-repeat;
}
.shoecart-shoename{
	display: flex;
	align-items: center;
}
.shop-cart-detail h4{
	margin-bottom: 20px;
	max-width: 23rem;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
.shop-cart img{
	width: 100px;
	height: 100px;
	margin-right: 20px;
}
.shoe-cart-price{
	color: var(--color-red);
}
.shop-cart-detail span,.operation span{
	font-size: 12px;
	color: var(--color-text);
}
.operation span{
	padding: 5px;
	margin-right: 3px;
	background: var(--border-deep-color);
}


</style>
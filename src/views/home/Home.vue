<template>
	<div id="home">
		<Swiper :banaers="banaers"></Swiper>
		<Brand :brands="brands"></Brand>
		<h3 class="part-title"><span>热卖商品</span></h3>
		<div class="hot-shoes">
			<div class="hot-shoes-item" v-for="item in hot_shoes" :key="item.id">
				<router-link :to="`/shoes/${item.id}`">
					<img :src="item.shoe_img">
					<div class="hot-shoe-desc">
						<h3>{{ item.shoe_name }}</h3>
						<p>{{ item.now_price }}折</p>
						<p>销量:{{ item.sale_num }}</p>
						<p>￥{{ item.postage }}</p>
						<p>库存：{{ item.stock}}</p>
					</div>
				</router-link>
			</div>
		</div>
		<h3 class="part-title"><span>新品上市</span></h3>
		<div class="hot-shoes">
			<div class="hot-shoes-item" v-for="item in now_shoes" :key="item.id">
				<router-link :to="`/shoes/${item.id}`">
					<img :src="item.shoe_img">
					<div class="hot-shoe-desc">
						<h3>{{ item.shoe_name }}</h3>
						<p>{{ item.now_price }}折</p>
						<p>销量:{{ item.sale_num }}</p>
						<p>￥{{ item.postage }}</p>
						<p>库存{{ item.stock}}</p>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import { getBanaer,getBrand,getShoes } from 'network/Api.js'
	import Swiper from 'components/common/swiper/Swiper.vue'
	import Brand from './Brand.vue'

	export default {
		name:"Home",
		components: {
			Swiper,
			Brand,
		},
		data(){
			return {
				banaers:null,
				brands:null,
				hot_shoes:[],
				now_shoes:[]

			}
		},
		created(){
			getBanaer().then(res =>{
				this.banaers = res.results;
			});
			getBrand().then(res =>{
				this.brands = res.results;
				// console.log(res)
			});
			getShoes().then(res =>{
				this.hot_shoes = res.results.sort((a,b)=>{
					return b.sale_num - a.sale_num
				}).slice(0,4)
				this.now_shoes = res.results.sort((a,b)=>{
					// return b.shoe_time - a.shoe_time
					return a.shoe_time > b.shoe_time ? -1 : a.shoe_tiem < b.shoe_time ? 1 : 0;
				}).slice(0,4)
			});
			// console.log(this.$cookies.get('name'))
			
		}
	}

</script>

<style>
#home{
	background: white;
}
#home .part-title{
	color: var(--color-red);
	border-bottom: 1px solid var(--border-deep-color);
	padding-bottom: 10px;
	position: relative;
}
#home .part-title::before{
	content: "";
	width: 6px;
	height: 20px;
	background: var(--color-black);
	border-radius: 2px;
	position: absolute;
	top: 2px;
}
.part-title span{
	margin-left: 10px;
}
.hot-shoes,#home .part-title{
	width: 90%;
	margin: 20px auto;
}
.hot-shoes{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 20px;
}
.hot-shoes-item{
	width: 45%;
	border: 1px solid var(--border-deep-color);
	margin-bottom: 20px;
}
.hot-shoes-item a{
	display: flex;
}
.hot-shoes-item img{
	width: 200px;
	height: 200px;
	margin-right: 20px;
}
.hot-shoe-desc{
	margin-top: 20px; 
}

</style>
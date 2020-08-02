<template>
	<div class="brand-list">
		<!-- <h3>品牌导购</h3> -->
		<div class="brand-list-item" v-for="(item,index) in brands" :key="index">
			<div class="brand-img">
				<img :src="item.Brand_img">
				<h3>{{ item.Brand_name }}</h3>
			</div>
			<div class="brand-shoes">
				<div class="brand-shoe-item" v-for="shoe_item in shoelist[item.id]" :key="`shoe${shoe_item.id}`">
					<router-link :to="`/shoes/${shoe_item.id}`">
						<img :src="shoe_item.shoe_img">
					<!-- <img :src="shoe_item.shoe_img">
					<img :src="shoe_item.shoe_img">
					<img :src="shoe_item.shoe_img"> -->
						<h3 :title="shoe_item.shoe_name">{{ shoe_item.shoe_name }}</h3>
					</router-link>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import { getBrand,getShoesByCon } from 'network/Api.js'
	export default {
		name:"BrandList",
		data(){
			return {
				brands:null,
				shoelist:{}
			}
		},
		created(){
			getBrand().then(res =>{
				console.log(res)
				this.brands = res.results.slice(0,6);
				// console.log(res)
				this.brands.forEach(item=>{
					getShoesByCon({shoe_brand:item.id}).then(res=>{
						// this.shoelist[item.id] = res.results.slice(0,4)
						// shoelist会先渲染{},再给shoelist通过shoelist[item.id]方式赋值，不会重新渲染界面
						this.$set(this.shoelist,item.id,res.results.slice(0,4))
					})
				})
				console.log(this.shoelist)
			});
		}
	}

</script>

<style>
.brand-list{
	width: 90%;
	margin: 20px auto;
	padding: 10px;
}
.brand-list-item{
	border: 1px solid var(--border-deep-color);
	margin-bottom: 20px;
	padding: 20px;
	display: flex;
}
.brand-img{
	width: 19%;
	margin-right: 1%;
}
.brand-img img{
	width: 100%;
	height: 200px;
}
.brand-shoes{
	width: calc(100% - 220px);
	display: flex;
	justify-content: space-between;
}
.brand-shoe-item{
	width: 24%;
}
.brand-shoe-item img{
	width: 100%;
	height: 200px;
}
.brand-shoe-item h3{
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}

</style> 
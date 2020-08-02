<template>
	<div class="w80 crumb-nav">
		<div class="nav-order">
			<button v-for="(item,index) in order_text" :key="index" @click="changeOrder(item.text)" :class="{'active':activeIndex == item.text}">{{ item.name }}</button>
		</div>
	</div>

</template>

<script>
	// import { getShoes } from 'network/Api.js'
	export default {
		name:"ShoeOrder",
		props:['query'],
		data(){
			return {
				order_text:[
				{
					name:'默认',
					text:''
				},
				{
					name:'价格',
					text:'price'
				},
				{
					name:'销量',
					text:'-sale_num'
				},
				{
					name:'最新',
					text:'shoe_time'
				}
				],
				activeIndex:''
			}
		},
		methods:{
			changeOrder(orderway){
				this.activeIndex = orderway
				this.$emit('changeorder',orderway)
			}
		},

	}

</script>

<style>
.crumb-nav{
	margin-top: 20px;
	border: 1px solid #d9d9d9;
	border-bottom: 0px;
}
.crumb-nav button{
	background: #f5f5f5;
	display: inline-block;
	padding: 10px 20px;
	border: 0;
	border-right: 1px solid #d9d9d9;
}
.nav-order .active{
	background: white;
	border-bottom: 1px solid white;
}
</style>
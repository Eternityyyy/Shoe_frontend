<template>
	<div class="address" >
		<div class="add-address">
			<router-link to="/user/add">添加地址</router-link>
		</div>
		<h1 style="" v-if="address.length <= 0">暂无创建地址</h1>
		<div v-else class="address-item" v-for="item in address" :key="item.id">
			<div class="address-info">
				<h3>{{ item.area}}{{ item.address_detail }}</h3>
				<!-- <p></p> -->
				<p>姓名：{{ item.address_user }}</p>
				<p>电话：{{ item.address_phone }}</p>
			</div>
			<!-- <button @click="deleteaddress(item.id)">删除</button> -->
		</div>
		<router-view></router-view>
	</div>

</template>

<script>
	import { getAddress,deleteAddress } from 'network/Api.js'
	export default {
		name:"Address",
		data(){
			return {
				address:[]
			}
		},
		methods:{
			deleteaddress(id){
				deleteAddress(id).then(()=>{
					this.$my_message({
						content:'删除成功',
						time:1000,
						type:'success',
						hasClose:true,
					});
				})
			}
		},
		created(){
			getAddress().then(res=>{
				this.address = res.results
			})
		}
	}

</script>

<style>
.address{
	width: calc(100% - 220px);
}
.add-address{
	/*padding-bottom: 20px;*/
	height: 3rem;
	border-bottom: 1px solid var(--border-deep-color);
	position: relative;
}
.add-address a{
	/*display: inline-block;*/
	background: var(--color-red);
	color: white;
	padding: 0.5rem 20px;
	border-radius: 3px;
	position: absolute;
	right: 20px;
}
.address h1{
	text-align: center;
	color: var(--color-text);
}
.address-item{
	display: flex;
	justify-content: space-between;
	padding: 20px;
}
.address-item button{
	padding: 0 20px;
	display: inline-block;
	height: 2rem;
	line-height: 2rem;	
}

</style>
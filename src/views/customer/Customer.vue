<template>
	<div class="customer">
		<CustomerMenu></CustomerMenu>
		<router-view></router-view>
	</div>
</template>

<script>
	// import {getuser} from 'network/Api.js'
	import CustomerMenu from 'views/customer/CustomerMenu.vue'

	export default {
		name:"Customer",
		components:{
			CustomerMenu,
		},
		// created(){
		// 	getuser(this.$cookies.get('name')).then(res=>{
		// 		console.log(res)
		// 	})
		// }
	}

</script>

<style>
.customer{
	background: white;
	width: 90%;
	padding: 20px;
	margin: 20px auto;
	display: flex;
}

</style>
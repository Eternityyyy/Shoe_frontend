<template>
	<div class="customer-menu">
		<h1 class="customer-menu-header">个人中心</h1>
		<router-link to="/user/info" class="customer-menu-item" active-class="menu-active">我的信息</router-link>
		<router-link to="/user/cart" class="customer-menu-item" active-class="menu-active">购物车</router-link>
		<router-link to="/user/address" class="customer-menu-item" active-class="menu-active">收货地址</router-link>
		<router-link to="/user/orders" class="customer-menu-item" active-class="menu-active">我的订单</router-link>
		<router-link to="/user/comments" class="customer-menu-item" active-class="menu-active">评论记录</router-link>
	</div>

</template>

<script>
	export default {
		name:"CustomerMenu"
	}

</script>

<style>

.customer-menu{
	margin-right: 50px;
	width: 200px;
	text-align: center;
	border: 1px solid var(--border-deep-color);
}
.customer-menu .customer-menu-item:nth-child(2){
	/**/
	border-top: 1px solid var(--border-deep-color);
}
.customer-menu .customer-menu-item{
	display: block;
	padding: 10px 0;
	border-bottom: 1px solid var(--border-deep-color);

}
.menu-active{
	background: var(--color-red);
	color: white;
}
</style>
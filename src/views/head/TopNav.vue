<template>
	<div class="top-nav" v-if="$store.state.userinfo.name">
		<router-link :to="{path:'/user'}" class="user-name"><i>{{ $store.state.userinfo.name }}</i></router-link>
		<span @click="loginout">退出</span>
	</div>
	<div class="top-nav" v-else>
		<router-link to="/login">登录</router-link>
		<router-link to="/register">注册</router-link>
	</div>

</template>

<script>
	export default {
		name:"TopNav",
		methods:{
			loginout(){
				// console.log(1)
				this.$cookies.remove('name')
				this.$cookies.remove('token')
				this.$store.commit('setUser')
				this.$store.commit('deleteShoeList')
				this.$router.push('/home')
			}
		},
		created(){
			console.log(this.$cookies.get('name'))
			if (this.$cookies.get('name')) {
				this.$store.commit('setShoeList')
			}
		}
	}

</script>

<style>
.top-nav{
	text-align: right;
	border-bottom: 1px solid var(--border-deep-color);
	padding: 5px 20px;
}
.top-nav a{
	display: inline-block;
	font-size: 12px;
	padding: 5px;
}
.top-nav a:first-child{
	border-right: 1px solid var(--border-deep-color);
}
.user-name{
	margin-right: 10px;
	color: var(--color-red);
}
.top-nav span:last-child{
	color: var(--color-text);
}

</style>
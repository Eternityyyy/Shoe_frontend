<template>
	<div class="login login-reg">
		<h1>欢迎登录</h1>
		<div class="form">
			<div class="login-reg-input"><input type="phone" name="username" placeholder="请输入手机号" v-model="username"></div>
			<div class="login-reg-input"><input type="password" name="password" placeholder="请输入密码" v-model="password"></div>
			<div class="err">{{ errormsg }}</div>
			<!-- <div><input type="text" name="code" placeholder="验证码"></div> -->
			<button @click="login" class="login-reg-button">立即登录</button>
		</div>
	</div>

</template>

<script>
	import { Login } from 'network/Api.js'
	export default {
		name:"Login",
		data(){
			return {
				username:'',
				password:'',
				errormsg:''
			}
		},
		watch:{
			username(){
				this.errormsg = ''
			}
		},
		methods:{
			login(){
				Login({username:this.username,password:this.password})
				.then(res =>{
					console.log(res)
					this.$cookies.set('name',this.username);
					this.$cookies.set('token',res.token);
					this.$store.commit('setUser');
					this.$store.commit('setShoeList');
					this.$router.go(-1);
				})
				.catch(() =>{
					this.errormsg = "用户名或密码错误"
				})
			}
		}
	}

</script>

<style>

</style>
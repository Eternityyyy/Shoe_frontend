<template>
	<div class="login login-reg">
		<h1>欢迎注册</h1>
		<div class="form">
			<!-- <div class="login-reg-input"><input type="phone" name="username" placeholder="请输入用户名" v-model="username"></div> -->
			<div class="login-reg-input"><input type="phone" name="usermobile" placeholder="请输入手机号" v-model="usermobile"></div>
			<div class="err">{{ usererr }}</div>
			<div class="login-reg-input"><input type="password" name="password" placeholder="请设置密码" v-model="password"></div>
			<div class="err"></div>
			<div class="code">
				<input type="text" name="code" placeholder="验证码" v-model="code" required="true">
				<canvas @click="createCode" id="code" width="100px" height="50px">{{ initcode }}</canvas>
			</div>
			<button @click="Register" class="login-reg-button">立即注册</button>
		</div>
	</div>

</template>

<script>
	import { register } from 'network/Api.js'
	export default {
		name:"Register",
		data(){
			return {
				// username:'',
				usermobile:'',
				password:'',
				code:'',
				usererr:'',
				initcode:''
			}
		},
		methods:{
			createCode(){
				var codeStr = 'abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
				this.initcode = '';

				for (var i = 0;i < 4;i ++) {
					var ran = Math.floor(Math.random()*(codeStr.length-1));
					this.initcode += codeStr.charAt(ran);
				}
				var c=document.getElementById("code");
				var ctx=c.getContext("2d");
				ctx.clearRect(0,0,100,50);
				ctx.font="oblique small-caps bold 30px arial";
				var gradient=ctx.createLinearGradient(0,0,c.width,0);
				gradient.addColorStop("0","magenta");
				gradient.addColorStop("0.5","blue");
				gradient.addColorStop("1.0","red");
				// Fill with gradient
				ctx.fillStyle=gradient;
				ctx.fillText(this.initcode,10,40);
			},
			Register(){
				if (this.code.toUpperCase() === this.initcode.toUpperCase()) {
					register({
						username:this.usermobile,
						password:this.password,
						phone:this.usermobile,
						gender:'male'})
					.then(res =>{
						this.$cookies.set('name',res.username)
						this.$cookies.set('token',res.token)
						this.$store.commit('setUser')
						this.$router.go(-1)

					})
					.catch(err =>{
						if (err.response.data.username) {
							this.usererr = err.response.data.username[0]
							this.createCode()
						}
					})
				}
				else{
					this.$my_message({
						content:'验证码不正确',
						time:1000,
						type:'error',
						hasClose:true,
					})
					return false
				}
			}
		},
		mounted(){
			this.createCode()
		}
	}

</script>

<style>
.login-reg{
	width: 400px;
	margin: 30px auto;
	border: 1px solid #c8c8c8;
	border-radius: 10px;
}
.login-reg h1{
	text-align: center;
	margin: 0px;
	padding: 10px 0px;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	background: var(--color-red);
	color: var(--border-deep-color);
}
.login-reg .form{
	padding: 10px;
	text-align: center;
}
.login-reg .form div{
	width: 300px;
	margin-bottom: 20px;
	margin: 20px auto;
}
.login-reg .form .login-reg-input{
	border: 1px solid #c8c8c8;
	border-radius: 3px;
}
.login-reg .form .login-reg-input input{
	padding: 12px 5px;
	width: 300px;
}

.code{
	display: flex;
	justify-content: space-between;
}
.code input{
	border: 1px solid #c8c8c8;
	padding: 12px 5px;
}
.code canvas{
	/*padding: 10px 1rem;*/
	background: #c8c8c8;
}
.login-reg .form .login-reg-button{
	margin-bottom: 30px;
	display: inline-block;
	padding:15px 2rem;
	background: var(--color-black);
	color: white;
	border-radius: 3px;
}
.err{
	font-size: 12px;
	color: var(--color-red);
}

</style>
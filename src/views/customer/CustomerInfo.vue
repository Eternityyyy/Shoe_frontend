<template>
	<div class="customer-info">
		<div class="user-avtar">
			<img :src="userinfo.avtar">
			<input type="file" name="avtar" id="avtar" @change="editAvtar">
		</div>
		<div class="customer-info-detail">
			<table>
				<tr>
					<td>用户名：</td>
					<td>
						<input type="text" name="username" v-model="userinfo.username">
					</td>
				</tr>
				
				<tr>
					<td>手机号：</td>
					<td>
						{{ userinfo.phone }}
					</td>
				</tr>
				<tr>
					<td>加入时间：</td>
					<td>{{ userinfo.add_time.slice(0,10) }}</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	import {getuser,editUser} from 'network/Api.js'

	export default {
		name:"CustomerInfo",
		data(){
			return {
				userinfo:{},
				hasBorder:false
			}
		},
		methods:{
			editAvtar(){
				let url = URL.createObjectURL(document.getElementById('avtar').files[0]);
				this.userinfo.avtar = url
				var data = new FormData();
				var image =document.getElementById('avtar').files[0];
				data.append('avtar',image);
				editUser(this.userinfo.id,data).then(()=>{
					this.$my_message({
						content:'修改成功',
						time:1000,
						type:'success',
						hasClose:true,
					})
                })
			}
		},
		created(){
			getuser(this.$cookies.get('name')).then(res=>{
				console.log(res)
				this.userinfo = res
			}).catch(err =>{
				console.log(err.response);
				this.$router.push('/login')
			})
		}
	}

</script>

<style>
.customer-info img{
	width: 100px;
	height: 100px;
}
.customer-info-detail{
	margin-top: 30px;
}
.customer-info-detail table{
	width: 100%;
}
.customer-info-detail table tr td{
	padding: 10px 20px;
}
.customer-info-detail table tr td:first-child{
	text-align: right;
}
.user-avtar{
	position: relative;
}
.user-avtar input{
	position: absolute;
	/*visibility: hidden; */
	opacity: 0;
	left: 0px;
	top: 0px;
	height: 100px;
}

</style>
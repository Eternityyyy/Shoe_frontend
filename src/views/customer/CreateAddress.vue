<template>
	<div class="create-address">
		<input type="text" name="name" v-model="name" placeholder="收货人" required="true"><span>*必填</span>
		<v-distpicker province="广东省" city="广州市" area="海珠区" @selected="onSelected"></v-distpicker>
		<input type="text" name="address-detail" v-model="address_detail" placeholder="详细地址，必填" required="true"><span>*必填</span>
		<input type="phone" name="phone" v-model="phone" required="true" placeholder="电话号码,请填写正确号码"><span>{{ phoneerr}}</span>
		<div>
			<button @click="add">提交</button>
		</div>
	</div>

</template>

<script>
	import VDistpicker from 'v-distpicker'
	import { addAddress } from 'network/Api.js'
	export default {
		name:"CreateAddress",
		components:{
			VDistpicker
		},
		data(){
			return {
				name:'',
				area:'广东省广州市珠海区',
				address_detail:'',
				phone:'',
				phoneerr:'*必填',
			}
		},
		watch:{
			name(val){
				this.name = val
			},
			address_detail(val){
				console.log(val)
				this.address_detail = val
			},
			phone(val){
				let re = /(^(\d{3,4}-)\d{8}$)|^(\d{11}$)/;
				// let re = /^(\d{3,4}-?)?\d{8}$/;

				if (re.test(val)) {
					console.log(val)
					this.phone = val
					this.phoneerr = 'ok'
				}
				else{
					// this.phone = ''
					this.phoneerr = '*号码有误'
				}
				// console.log(val)
				
			}
		},
		methods:{
			onSelected(data){
				this.area = data.province.value + data.city.value + data.area.value
			},
			add(){
				if (this.area.length>=9&&this.name!=''&&this.phoneerr =='ok'&&this.address_detail!='') {
					addAddress({
						address_user:this.name,
						area:this.area,
						address_detail:this.address_detail,
						address_phone:this.phone
					}).then(res=>{
						console.log(res)
						this.$router.push('/user/address')
					})
				}
				else{
					// alert('信息填写不完整')
					this.$my_message({
						content:'信息填些不完整',
						time:1000,
						type:'error',
						hasClose:true,
					});
				}
			}
		}
	}

</script>

<style>
.create-address{

}
.create-address input{
	border: 1px solid var(--border-deep-color);
	padding: 10px 5px;
	width: 30rem;
	margin: 20px 0px;
}
.create-address span{
	color: var(--color-red);
	margin-left: 20px;
	font-size: 12px;
}
.create-address button{
	background: var(--color-red);
	color: white;
	padding: 0.5rem 10px;
	border-radius: 3px;
}

</style>
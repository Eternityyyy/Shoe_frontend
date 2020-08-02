<template>
	<div class="comment">
		<div class="comment-shoeinfo">
			<img :src="orderinfo.order_shoe.shoe_img">
			<div class="comment-shoeinfo-desc">
				<h3>{{ orderinfo.order_shoe.shoe_name }}</h3>
				<p>颜色：{{ orderinfo.shoe_color.color}}</p>
				<p>尺码：{{ orderinfo.shoe_size.size}}</p>
				<p>付款：￥{{ orderinfo.order_shoe.price}}</p>
			</div>
		</div>
		<div class="give-start">
			满意就来个五分吧
			<Start :grade="grade" isclick="ture" @giveStart="changeStart"></Start>
		</div>
		<textarea placeholder="说说你的感受吧，暂不支持图片" v-model="comment_text" rows="10"></textarea>
		<button @click="postComment">提交</button>
	</div>

</template>

<script>
	import { getOrderInfo,addComment,updateOrder } from 'network/Api.js'
	import Start from 'components/common/start/Start.vue'
	export default {
		name:"Comment",
		components:{
			Start
		},
		data(){
			return {
				orderinfo:{},
				grade:5,
				comment_text:'好评',
				allowclick:true

			}
		},
		methods:{
			changeStart(n){
				this.grade = n
				this.allowclick = !this.allowclick
			},
			postComment(){
				addComment({
					Comment_grade:this.grade,
					Comment_text:this.comment_text,
					Comment_shoe:this.orderinfo.order_shoe.id
				}).then(res=>{
					console.log(res)
					updateOrder(this.orderinfo.id,{logistics_state:'TOKE_SUCCESS'}).then(response=>{
						console.log(response)
						this.$router.push('/user/orders')
					})

				}).catch(err=>{
					// console.log(err.response)
					this.$my_message({
						content:err.response.data.detail,
						time:1000,
						type:'error',
						hasClose:true,
					});
				})
			}
		},
		created(){
			getOrderInfo(this.$route.params.orderid).then(res=>{
				console.log(res)
				this.orderinfo = res
			})
		}
	}

</script>

<style>
.comment{
	width: 90%;
	margin: 20px auto;
	padding: 20px;
	background: white;
}
.comment-shoeinfo{
	display: flex;
	margin-bottom: 30px;
}
.comment-shoeinfo img{
	width: 200px;
	height: 200px;
	margin-right: 30px;
	border: 1px solid var(--border-deep-color);
}
.comment-shoeinfo h3{
	margin-bottom: 20px;
}
.give-start{
	margin-bottom: 20px;
}
.comment textarea{
	width: 100%;
}
.comment button{
	padding: 10px 1rem;
	background: var(--color-red);
	color: white;
	border-radius: 3px;
	margin-top: 20px;
}

</style>
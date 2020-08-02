<template>
	<div class="shoeinfo">
		<div class="shoe-info">
			<div class="shoe-info-img">
				<img :src="display_shoeimg" class="big-img">
				<div class="shoe-info-imgs">
					<img v-for="item in shoeinfo.shoeinfoimg_set" :key="item.id" :src="item.shoeinfo_img" class="roll-img" @click="isDisplay" :data-id="item.id" :class="{'isactive':isActive == item.id }">
				</div>
			</div>
			<div class="shoe-info-detail">
				<h1 class="shoe-name">
					<span>{{ Brand_name }}&nbsp;</span>{{ shoeinfo.shoe_name }}
				</h1>
				<div class="shoe-money detail-div">
					<div class="shoe-price">
						<span class="shoedetail-label">售价</span>
						<i>￥{{ (shoeinfo.price*shoeinfo.now_price*0.1).toFixed(2) }}</i>
						<s>￥{{ shoeinfo.price }}</s>
						<span> {{ shoeinfo.now_price }}折</span>
					</div>
					<div class="shoe-topic">
						<span class="shoedetail-label">活动</span>
						<span class="shoe-topic-info" v-for="item in shoeinfo.shoe_topic" :key="item.id">满{{ item.full }}减{{ item.reduction }}</span>
					</div>
				</div>
				<div class="shoe-color detail-div">
					<span class="shoedetail-label">颜色</span>
					<span class="size-color" v-for="item in shoeinfo.color" :key="item.id" @click="checkColor(item.id)" :class="{'ischeck':isColorCheck == item.id}">{{ item.color }}</span>
				</div>
				<div class="shoe-size detail-div">
					<span class="shoedetail-label">尺码</span>
					<span class="size-color" v-for="item in shoeinfo.size" :key="item.id" @click="checkSize(item.id)" :class="{'ischeck':isSizeCheck == item.id}">{{ item.size }}</span>
				</div>
				<div class="shoe-size detail-div">
					<span class="shoedetail-label">邮费</span>
					<span class="size-color">￥{{ shoeinfo.postage }}</span>
				</div>
				<div class="detail-div">
					<NumButton :num="shoe_num" @changenum="changeNum"></NumButton>
				</div>
				<div class="add-cart">
					<span @click="addcart">加入购物车</span>
					<!-- <span @click="buyshoe">购买</span> -->
				</div>
			</div>
		</div>
		<div class="shoeinfo-nav">
			<span @click="displayMsg" :class="{'isactive': desc_type == '商品详情'}">商品详情</span>
			<span @click="displayMsg" :class="{'isactive': desc_type == '评论'}">评论</span>
		</div>
		<ShoeDesc :desc="shoeinfo.shoe_desc" v-show="desc_type == '商品详情'"></ShoeDesc>
		<ShoeComment v-show="desc_type == '评论'" :comments="shoeinfo.comment_set"></ShoeComment>
	</div>

</template>

<script>
	import { getShoeById,addCart } from 'network/Api.js'
	import ShoeDesc from 'views/shoe/ShoeDesc.vue'
	import ShoeComment from 'views/shoe/ShoeComment.vue'
	import NumButton from 'components/common/button/NumButton.vue'

	export default {
		name:"ShoeInfo",
		components:{
			ShoeDesc,
			ShoeComment,
			NumButton
		},
		data(){
			return {
				shoeinfo:{},
				display_shoeimg:'',
				isActive:0,
				desc_type:'商品详情',
				Brand_name:'',
				shoe_num:1,
				color:'',
				size:'',
				isColorCheck:0,
				isSizeCheck:0
			}
		},
		methods:{
			changeNum(num){
				this.shoe_num = num
			},
			checkColor(colorid){
				this.color = colorid;
				this.isColorCheck = colorid
			},
			checkSize(sizeid){
				this.size = sizeid;
				this.isSizeCheck = sizeid
			},
			isDisplay(e){
				this.isActive = e.target.dataset.id
				this.display_shoeimg = e.target.src
			},
			displayMsg(e){
				this.desc_type = e.target.innerHTML
			},
			addcart(){
				if (this.color&&this.size) {
					addCart({Shoe_num:this.shoe_num,Cart_shoe:this.shoeinfo.id,shoe_color:this.color,shoe_size:this.size}).then(()=>{
						this.$my_message({
							content:'添加成功',
							time:1000,
							type:'success',
							hasClose:true,
						});
						this.$store.commit('setShoeList')
					}).catch(err =>{
						console.log(err.response.data)
					})
				}
				else{
					// alert("请选择颜色和尺寸")
					this.$my_message({
						content:'请选择颜色和尺寸',
						time:1000,
						type:'error',
						hasClose:true,
					});
				}				
			},
			// buyshoe(){
			// 	this.addcart()
			// }
		},
		created(){
			getShoeById(this.$route.params.id).then(res=>{
				// console.log(res)
				this.shoeinfo = res
				this.display_shoeimg = res.shoe_img
				this.Brand_name = res.shoe_brand.Brand_name
			})
		}
	}

</script>

<style>
.shoeinfo{
	width: 90%;
	margin: 20px auto;
	background: white;
}
.shoe-info{
	display: flex;
}
.shoe-info-img{
	width: 450px;
	/*height: 450px;*/
}
.shoe-info-img .big-img{
	width: 450px;
	height: 450px;
	border: 1px solid var(--border-deep-color);
}
.shoe-info-imgs{
	display: flex;
	flex-wrap: wrap;
}
.shoe-info-imgs img{
	width: 100px;
	height: 100px;
	margin-right: 10px;
	border: 1px solid var(--border-deep-color);
}
.shoe-info-imgs .isactive{
	border: 1px solid var(--color-red);
}

.shoe-info-detail{
	margin-left: 50px;
}
.shoe-name{
	padding: 10px 0;
	border-bottom: 1px solid var(--border-deep-color);
}
.shoe-money{
	background: #c8c8c8;
	margin-right: 20px;
	border-radius: 3px;
	padding: 20px;
}
.shoe-price{
	margin-bottom: 20px;
}
.shoe-price i{
	font-size: 20px;
	color: var(--color-red);
	margin-right: 20px;
}
.shoe-price s{
	color: var(--color-text);
}
.shoe-topic .shoe-topic-info{
	padding: 5px 10px;
	background: var(--color-red);
	font-size: 12px;
	color: white;
}
.detail-div{
	margin-bottom: 20px;
}
.shoedetail-label{
	margin-right: 20px;
}
.size-color{
	font-size: 12px;
	color: var(--color-text);
	padding: 5px 10px;
	border: 1px solid var(--border-deep-color);
	margin-right: 10px;
}

.add-cart{
	/*width: 50%;*/
	margin: 40px auto;
}
.add-cart span{
	background: var(--color-red);
	padding: 10px 30px;
	color: white;
}
.shoeinfo-nav{
	margin-top: 20px;
	height: 48px;
	line-height: 48px;
	border: 1px solid #c8c8c8;
	background: var(--border-color);
}
.shoeinfo-nav span{
	display: inline-block;
	padding: 0 2rem;
	height: 48px;
	border-right: 1px solid #c8c8c8;
}
.isactive{
	background: var(--color-red);
	color: white;
}
.ischeck{
	border: 1px solid var(--color-red);
}

</style>
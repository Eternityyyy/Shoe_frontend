<template>
	<div class="shoelist w80">
		<div class="shoe-item" v-for="item in shoelist.results" :key="item.id">
			<router-link :to="{name:'shoes',params:{id: item.id}}">
				<img :src="item.shoe_img">
				<div class="shoe-item-info">
					<p>{{ item.shoe_name}}</p>
					<p class="shoe-item-price">￥<i>{{ item.price}}</i></p>
				</div>
			</router-link>
		</div>
	</div>

</template>

<script>
	// import ShoeOrder from './ShoeOrder.vue'
	export default {
		name:"ShoeList",
		components:{
			// ShoeOrder
		},
		props:{
			shoelist:{
				default:() =>[]
			}
		},
	}

</script>

<style>
.shoelist{
	background: white;
	display: flex;
	flex-wrap: wrap;
	/*justify-content: space-between;*/
	margin-bottom: 20px;
}
.shoe-item{
	width: 33%;
	padding: 20px 0px;
	margin-right: 0.3%
}
.shoe-item img{
	width: 100%;
}
.shoe-item p{
	width: 100%;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.shoe-item-price{
	color: var(--color-red);
}
.shoe-item-price i{
	font-size: 20px;
}
</style>
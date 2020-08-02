<template>
	<div class="brands" :style="{width:width}">
		<BrandItem v-for="brand in brands" :key="brand.id">
			<img :src="brand.Brand_img">
		</BrandItem>
	</div>

</template>

<script>
	import BrandItem from './BrandItem.vue'

	export default {
		name:"Brand",
		props:{
			brands:{},
			width:{
				default:'80%'
			}
		},
		components:{
			BrandItem,
		}
	}

</script>

<style>
.brands{
	margin: auto;
}
.brands img{
	width: 100%;
	height: 100px;
}

</style>

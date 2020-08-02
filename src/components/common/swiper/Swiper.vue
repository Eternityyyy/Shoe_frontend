<template>
	<div id="swiper">
		<ul class="swiper_img">
			<li class="swiper_item" v-for="item in banaers" :key="item.id" :class="{'display': item.id == activeIndex,'undisplay': item.id != activeIndex}">
				<!-- <router-link :to="`/shoes/${item.Banaer_shoe}`"> -->
				<img :src="item.Banaer_img">
				<!-- </router-link> -->
			</li>
		</ul>
		<ul class="swiper_ul">
			<li v-for="n in banaersnum" :key="n" :class="{ 'isLiActive': activeIndex == n }" @click="goImg(n)"></li>
		</ul>
	</div>

</template>

<script>
	export default {
		name:"Swiper",
		props:{
			banaers: {},
			time:{
				type:Number,
				default: 3000
			}
		},
		data(){
			return {
				activeIndex: 1,
				banaersnum: 0,
			}
		},
		watch: {
			banaers: function(val){
				this.banaersnum = val.length
			}
		},
		methods:{
			goImg(index){
				this.activeIndex = index
			}
		},
		created(){
			setInterval(() => {
				if (this.activeIndex>=4) {
					this.activeIndex = 0;
				}
        this.activeIndex++
      }, this.time)
		}
	}

</script>

<style>
#swiper{
	position: relative;
	width: 100%;
	height: 350px;
}
.swiper_item{
	position: absolute;
}

.swiper_item img{
	width: 100%;
	height: 350px;
}
#swiper .display{
	display: block;
}
#swiper .undisplay{
	display: none;
}
.swiper_ul{
	width: 100%;
	display: flex;
	justify-content: center;
	position: absolute;
	bottom: 20px;
}
.swiper_ul li{
	float: left;
	width: 20px;
	height: 20px;
	border-radius: 10px;
	background: rgba(50,50,50,0.5);
	margin-right: 20px;
}
.swiper_ul .isLiActive{
	background: var(--color-red);
}
</style>
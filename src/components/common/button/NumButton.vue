<template>
	<div class="shoe-num">
		<button class="size-color" @click="addNum">+</button>
		<span>{{ nums }}</span>
		<button class="size-color" @click="subNum">-</button>
	</div>
</template>

<script>
	export default {
		name:"NumButtom",
		props:['num','id'],
		data(){
			return {
				nums:this.num,
			}
		},
		methods:{
			addNum(){
				if (this.nums <1000) {
					this.nums ++;
					if (this.id) {
						this.$emit('changenum',this.nums,this.id)
					}else{
						this.$emit('changenum',this.nums)
					}
				}
			},
			subNum(){
				if (this.nums >1 ) {
					this.nums --;
					if (this.id) {
						this.$emit('changenum',this.nums,this.id)
					}else{
						this.$emit('changenum',this.nums)
					}
				}
			}
		},
		// created(){
		// 	this.nums = num
		// }
	}

</script>

<style>
.shoe-num span{
	margin-right: 10px;
}
.shoe-num button{
	font-size: 16px;
}

</style>
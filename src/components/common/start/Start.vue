<template>
	<div class="start">
		<span v-for="n in 5" :key="n" @click="giveStart(n)">
			<img v-if="n <= grade" src="~assets/img/start_all.svg">
			<img v-else-if="n <= (grade + 1)&&(grade % 1 != 0)" src="~assets/img/start_half.svg">
			<img v-else src="assets/img/start_null.svg">

		</span>
		<span>{{ grade }}分</span>
	</div>

</template>

<script>
	export default {
		name:"Start",
		props:{
			grade:{},
			isclick:{
				default:false
			}
		},
		data(){
			return {
				ishalf:''
			}
		},
		methods:{
			giveStart(n){
				if (this.isclick) {
					this.$emit('giveStart',n)
				}
				else{
					return false
				}
			}
		}
	}

</script>

<style>

</style>
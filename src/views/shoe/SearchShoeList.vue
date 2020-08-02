<template>
	<div class="search-list">
		<h3 class="w80">搜索结果</h3>
		<ShoeList :shoelist="shoelist"></ShoeList>
	</div>

</template>

<script>
  import {getShoesByCon} from 'network/Api.js'
  import ShoeList from 'views/shoe/ShoeList.vue'

	export default {
		name:"SearchShoeList",
		components:{
			ShoeList
		},
		data(){
			return {
				shoelist:[]
			}
		},
		created(){
			getShoesByCon({search:this.$route.query.key}).then(res=>{
				console.log(res)
			this.shoelist = res
			})
		}

	}

</script>

<style>
.search-list h3{
	margin-top: 20px;
	margin-bottom: 20px;
	padding-bottom: 20px;
	border-bottom: 1px solid var(--border-deep-color);
}

</style>
<template>
	<div class="selector-item">
		<span class="filter-label">
			{{ condition.name }}
		</span>
		<div class="filter-con">
			<span @click="changeQuery" data-id="0" :class="{'active-con':active_index == 0}">不限</span>
			<span v-for="condition_item in condition.value" :key="condition_item.id" @click="changeQuery" :data-id="condition_item.id" :class="{'active-con': active_index == condition_item.id}">
				{{ condition_item.name }}
			</span>
		</div>
	</div>

</template>

<script>
	// import { getBrand,getCategory } from 'network/Api.js'
	// import SelectorItem from './SelectorItem.vue'
	export default {
		name:"Selector",
		props:['query','condition'],
		components:{
			// SelectorItem,
		},
		data(){
			return {
				childquery:this.query,
				active_index:0
			}
		},
		watch:{
		},
		methods:{
			changeQuery(e){
				this.active_index = e.target.dataset.id
				if (e.target.dataset.id == 0) {
					this.childquery = null
				}else{
					this.childquery=e.target.dataset.id
				}
				this.$emit('changequery',this.childquery)
			}
		},
		created(){
			
		}
	}

</script>

<style>

.selector-item{
	display: flex;
	border-top: 1px dotted var(--border-color);
	border-bottom: 1px dotted var(--border-color);
}
.filter-label{
	width: 4rem;
	padding: 10px 0px;
}
.filter-con{
	width: calc(100% - 4rem);
}
.filter-con span{
	display: inline-block;
	padding: 5px;
	margin: 10px 20px;
}
.active-con{
	color: white;
	background: var(--color-red);
}

</style>
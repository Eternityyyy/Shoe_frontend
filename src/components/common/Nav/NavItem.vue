<template>
	<span class="nav-item" @mouseover="ishover = !ishover" @mouseout="ishover = !ishover">
	<slot></slot>
	<div class="category-info" v-show="categorys&&ishover">
		<s class="trigle">◆</s>
		<p class="big-category">{{ category.type_name }}</p>
		<div v-for="item in category.child_type" :key="item.id">
			<p class="two_category">{{ item.type_name }}</p>
			<div v-if="item.child_type.length > 0" class="three_category">
				<span v-for="three_category in item.child_type" :key="three_category.id">
					{{ three_category.type_name }}
				</span>
			</div>
		</div>
	</div>
	</span>
</template>

<script>
	export default {
		name:"NavItem",
		props:['categorys'],
		data(){
			return {
				category:[],
				ishover:false
			}
		},
		methods:{
		},
		watch:{
			categorys(val){
				this.category = val
			}
		}
	}

</script>

<style>
.nav-item{
	display: inline-block;
	position: relative;
}
.category-info{
	width: max-content;
	padding: 10px;
	background: white;
	position: absolute;
	z-index: 2;
	font-size: var(--font-size);
}
.trigle{
	left: 30px;
	width: 16px;
	height: 16px;
	line-height: 16px;
	position: absolute;
	top: -7px;
	font-size: 16px;
	text-align: center;
	color: white;
	font-family: "\5b8b\4f53";
	text-decoration: none;
}
.big-category{
	color: var(--color-red);
	font-weight: 900;
	margin-bottom: 10px;
}
.two_category{
	font-weight: bold;
	margin-bottom: 20px;
}
.three_category{
	margin-bottom: 20px;
}
.three_category span{
	margin-right: 10px;
}
</style>
<template>
	<div class="showcategory">
		<div class="selector w80">
			<Selector :query="query.shoe_brand" :condition="brands" @changequery="changebrand"></Selector>
			<Selector :query="query.shoe_category" :condition="season" @changequery="changetopcategory"></Selector>
			<Selector :query="query.shoe_category" :condition="categorys" @changequery="changecategory"></Selector>
		</div>
		<ShoeOrder :query="query.ordering" @changeorder="changeOrder"></ShoeOrder>
		<ShoeList :shoelist="shoeList"></ShoeList>
		<ul class="page">
			<li v-if="shoeList.previous" @click="getshoepage(shoeList.previous)">上一页</li>
			<li v-if="shoeList.next" @click="getshoepage(shoeList.next)">下一页</li>
		</ul>
	</div>

</template>

<script>
	import ShoeList from 'views/shoe/ShoeList.vue'
	import Selector from './Selector.vue'
	import ShoeOrder from './ShoeOrder.vue'
	import { getShoesByCon,getBrand,getCategoryBysex,getShoeByPage } from 'network/Api.js'
	export default {
		name:"App",
		data(){
			return {
				sex:this.$route.params.sex,
				shoeList:null,
				query:{
					shoe_brand:null,
					shoe_category:null,
					ordering:null,
					top_category:null
				},
				brands:{
					name:'品牌',
					value:[]
				},
				categorys:{
					name:'类型',
					value:[]
				},
				season:{
					name:'季节',
					value:[]
				},
			}
		},
		components:{
			Selector,
			ShoeList,
			ShoeOrder
		},
		created(){
			// this.query.top_category = this.sex
			// console.log(this.sex)
			getBrand().then(res =>{
				res.results.map(item =>{
					let itemjson = {
						name:'',
						id:0,
						active:false
					}
					itemjson.name = item.Brand_name
					itemjson.id = item.id
					this.brands.value.push(itemjson)
				})
			});
			this.getCategoryBySex(this.sex)
			// this.getShoeList()
		},
		watch:{
			// '$route':`getCategoryBySex(${this.$route.params.sex})`
			'$route':"changeSex"

		},
		methods:{
			changeSex(){
				this.categorys.value = []
				this.season.value = []
				this.getCategoryBySex(this.$route.params.sex)
			},
			getShoeList(){
				getShoesByCon(this.query).then(res =>{
				this.shoeList = res
			})
			},
			getshoepage(str){
				getShoeByPage(str.replace('http://127.0.0.1:8000/api/','')).then(res =>{
					this.shoeList = res
				})
			},
			getCategoryBySex(sex){
				getCategoryBysex({type_name:sex}).then(res =>{
					// 通过类别来获取鞋列表
					this.query.top_category = res.results[0].id
					this.getShoeList()
					// 根据性别循环的把类别遍历出来
					res.results[0].child_type.map(item =>{
						let seasonjson = {
							name:'',
							id:0,
							active:false
						}
						seasonjson.name = item.type_name
						seasonjson.id = item.id
						this.season.value.push(seasonjson)
						item.child_type.map(categoryitem =>{
							let categoryjson = {
								name:'',
								id:0,
								active:false
							}
							categoryjson.name = categoryitem.type_name
							categoryjson.id = categoryitem.id
							this.categorys.value.push(categoryjson)
							})
					})
				})
			},
			changebrand(val){
				this.query.shoe_brand = val
				this.getShoeList()
			},
			changecategory(val){
				this.query.shoe_category = val
				this.getShoeList()
			},
			changetopcategory(val){
				this.query.top_category = val
				this.getShoeList()
			},
			changeOrder(order){
				this.query.ordering = order
				this.getShoeList()
			}
		},
	}

</script>

<style>
.selector{
	background: white;
	margin-top: 20px;
}
.page{
	padding: 20px;
	margin: 20px;
	text-align: center;
}
.page li{
	display: inline-block;
	padding: 10px;
	border: 1px solid var(--border-deep-color);
}

</style>
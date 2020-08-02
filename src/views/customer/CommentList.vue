<template>
	<div class="comment-list">
		<div class="comment-list-item" v-for="(item,index) in commentlist " :key="index">
			<h3>
				<span>{{ item.Comment_shoe.shoe_name}}</span>
				<Start :grade="item.Comment_grade"></Start>
			</h3>
			<p>{{item.Comment_text}}</p>
			<p class="comment-time">{{ item.Comment_time.slice(0,10) }}</p>
		</div>
	</div>

</template>

<script>
	import { getComment } from 'network/Api.js'
	import Start from 'components/common/start/Start.vue'
	export default {
		name:"CommentList",
		components:{
			Start,
		},
		data(){
			return {
				commentlist:[]
			}
		},
		created(){
			getComment().then(res=>{
				this.commentlist = res.results
			})
		}
	}

</script>

<style>
.comment-list{
	width: calc(100% - 230px);
}
.comment-list-item{
	padding: 20px;
	border: 1px solid var(--border-deep-color);
	margin-bottom: 20px;
}
.comment-list-item h3{
	/*text-align: right;*/
	padding-bottom: 10px;
	margin-bottom: 10px;
	border-bottom: 1px solid var(--border-deep-color);
	display: flex;
	justify-content: space-between;
}
.comment-time{
	text-align: right;
}
</style>
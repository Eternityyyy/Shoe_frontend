<template>
	<div v-if="comments.length<=0" class="shoe-comments">
		暂无任何评价
	</div>
	<div class="shoe-comments" v-else>
		<div class="shoe-comments-item" v-for="(item,index) in comments" :key="index">
			<div class="comment-user">
				<img :src="item.user.avtar">
				<p>{{item.user.username}}</p>
			</div>
			<div class="comment-info">
				<p class="title">
					{{ item.Comment_text}}
					<Start :grade="item.Comment_grade"></Start>
				</p>
				<p class="time">{{item.Comment_time.slice(0,10)}}</p>
			</div>
		</div>
	</div>

</template>

<script>
	import Start from 'components/common/start/Start.vue'
	export default {
		name:"ShoeComment",
		components:{
			Start,
		},
		props:{
			comments:{
				type:Array,
				default:() =>[]
			}
		},

	}

</script>

<style>
.shoe-comments{
	margin: 20px 0px;
	padding: 20px;
}
.shoe-comments-item{
	display: flex;
	margin-bottom: 20px;
}
.comment-user{
	margin-right: 30px;
}
.comment-user img{
	width: 80px;
	height: 80px;
}
.comment-user p{
	text-align: center;
}
.comment-info{
	width: calc(100% - 120px);
	padding: 20px;
	border: 1px solid var(--border-deep-color);
}
.comment-info .title{
	padding-bottom: 10px;
	margin-bottom: 10px;
	border-bottom: 1px solid var(--border-deep-color);
	display: flex;
	justify-content: space-between; 
}
.comment-info .time{
	text-align: right;
}

</style>
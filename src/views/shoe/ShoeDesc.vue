<template>
	<div class="shoe-desc" v-html="desc">
		{{ desc }}
	</div>
</template>

<script>
	export default {
		name:"ShoeDesc",
		props:['desc']
	}

</script>

<style>

.shoe-desc{
	margin-top: 20px;
}

</style>
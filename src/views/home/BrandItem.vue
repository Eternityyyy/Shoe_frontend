<template>
	<a class="brand-item">
		<slot></slot>
	</a>

</template>

<script>
	export default {
		name:"BrandItem"
	}

</script>

<style>
.brand-item{
	display: inline-block;
	width: 10%;
	text-align: center;
	padding: 10px 0;
	border-right: 1px solid var(--border-color);
	border-bottom: 1px solid var(--border-color);
}

</style>
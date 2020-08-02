<template>
	<div id="nav">
		<slot></slot>
	</div>

</template>

<script>
	// import api from 'network/request.js'
	export default {
		name:"Nav",
	}

</script>

<style>
#nav{
	width: 100%;
	background: #242424;
}
#nav a{
	display: inline-block;
	padding: 10px 30px;
	color: white;
}
#nav a:hover{
	background: var(--color-red);
}
#nav .router-link-active{
  background: var(--color-red);
}

</style>
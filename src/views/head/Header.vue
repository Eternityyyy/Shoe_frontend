<template>
	<header class="w80">
      <img src="~assets/img/logo.png">
      <div class="form">
        <input type="text" name="search" id="search" placeholder="输入关键字" v-model="key_word" required="true">
        <button @click="search">搜索</button>
      </div>
      <router-link to="/user/cart" class="shopcart">
        <span >购物车</span><b>({{ shopcarts.shoe_list.length }})</b>
      </router-link>
    </header>

</template>

<script>
  import { mapState } from 'vuex'
	export default {
		name:"Header",
    data(){
      return {
        key_word:''
      }
    },
    methods:{
      search(){
        this.$router.push({path:'/search',query:{ 'key': this.key_word}})
      }
    },
    computed:{
      ...mapState(['shopcarts'])
    },
    // created(){
    //   if (this.$this.$cookies.get('name')) {
    //     console.log('登录了');
    //     this.$store.commmit('setShoeList');
    //   }
    // }
	}

</script>

<style>
header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header .form{
  border: 3px solid var(--color-red);
}
header input{
  width: 300px;
}
header button{
  width: 4rem;
  background: var(--color-red);
  border: 0;
  color: white;
  height: 35px;
}
.shopcart{
  border: 3px solid var(--color-red);
  background: white;
}
.shopcart span{
  color: white;
  background: var(--color-red);
  padding: 0 5px;
  display: inline-block;
  line-height: 30px;
}
.shopcart b{
  text-align: center;
  display: inline-block;
  width: 100px;
}

</style>
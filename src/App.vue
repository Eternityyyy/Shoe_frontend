<template>
  <!-- <span>文字</span>   -->
  <div>
    <TopNav></TopNav>
    <Header></Header>
    <Nav>
      <div class="nav-left w80">
        <NavItem><router-link to="/home">首页</router-link></NavItem>
        <NavItem :categorys="category_male"><router-link to="/男鞋/shoes">男鞋</router-link></NavItem>
        <NavItem :categorys="category_female"><router-link to="/女鞋/shoes">女鞋</router-link></NavItem>
        <NavItem><router-link to="/brands">品牌导购</router-link></NavItem>
        <!-- <NavItem><router-link to="/shoe/1">鞋</router-link></NavItem> -->
      </div>
    </Nav>
    <router-view></router-view>
    <footer>
      <p>关于我们：我们是一家专业卖鞋很多年的老店，如果你有除了购买的问题想联系我们，编辑邮箱到123457@qq.com</p>
      <p>备案信息</p>
    </footer>
  </div>
 
</template> 

<script>
  import { Nav,NavItem } from 'components/common/Nav/index.js'
  import { getCategory } from 'network/Api.js'
  import Header from 'views/head/Header.vue'
  import TopNav from 'views/head/TopNav.vue'

export default {
  name: 'App',
  components:{
    Nav,
    NavItem,
    Header,
    TopNav
  },
  data(){
    return {
      category_male:null,
      category_female:null,
      brands:null
    }
  },
  created(){
    getCategory().then(res =>{
      res = res.results
      this.category_male = res[0]
      this.category_female = res[1]
    });
  },
}
</script>

<style>
@import "assets/css/base.css"
</style>
<style>
footer{
  margin-top: 50px;
  background: #242424;
  padding: 30px;
}
footer p{
  color: #d9d9d9;
  font-size: 12px;
  text-align: center;
}
footer p:first-child{
  padding-bottom: 20px;
}

</style>

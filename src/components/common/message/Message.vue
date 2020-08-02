<template>
  <transition name="fade">
    <div class="message" v-if="visible">
      <i class="icon-type iconfont" :class="'icon-'+type"></i>
      <div class="content" :class="type" >{{content}}
        <i v-if="hasClose" class="btn-close iconfont icon-close" @click="visible=false"></i>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "MyMessage",
    data() {
      return {
        content: '',
        time: 3000,
        visible: false,
        type:'info',//'success','warning','error'
        hasClose:false,
      }
    },
    mounted() {
      this.close()
    },
    methods: {
      close() {
        window.setTimeout(() =>{
          this.visible = false
        }, this.time);
      }
    }
  }
</script>
<style>
.message{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: rgba(250,250,250,0.9);
}
.content{
  position: fixed;
  top: 50%;
  padding: 10px 20px;
  left: 50%;
  border-radius: 3px;
}
.error{
  border: 1px solid var(--color-red);
  color: var(--color-red);
}
.success{
  border: 1px solid #5CD068;
  color: #5CD068;
}

</style>
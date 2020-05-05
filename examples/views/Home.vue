<template>
  <div class="home">
    <qdm-button type="primary" @click="test">按钮</qdm-button>
  </div>
</template>

<script>
// @ is an alias to /src
// import QdmButton from '../../packages/button/index.vue'

export default {
  name: 'Home',
  data(){
	return {
		name:'测试'
	}
  },
  components: {
    // QdmButton
  },
  created(){
    // this.$qdmMessage({
    //   type:'success',
    //   message:'这是一个测试弹窗'
    // })
    
  },
  methods:{
	  test(){
		  this.$qdmMsgbox();
	  }
  }

}
</script>

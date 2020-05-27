<template>
  <div class="home">
    <qdm-button type="primary" size="mini" @click="clickFn">primary</qdm-button>
    <qdm-button type="danger" size="small" @click="clickFn">danger</qdm-button>
    <qdm-button type="default" @click="message">default</qdm-button>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {

      }
    },
    created() {

    },
    methods: {
      message(){
        this.$qdmMessage({
            message:'这是一个文案提示',
            type:'success'
        });
      },
      clickFn() {
        // this.$qdmMessage({
        //     message:'测试',
        //     type:'success',
        //     showClose:true
        //   });
        // this.$qdmNotify({
        //   title: '提交成功',
        //   message: '这还少一个测试，真的是一个测试',
        //   type: 'success'
        // })

        this.$qdmConfirm('是否删除信息','提示',{
          type:'success'}).then(()=>{
            console.log('点击确定')
          }).catch(()=>{
            console.log('点击取消')
          })
      }
    }

  }
</script>

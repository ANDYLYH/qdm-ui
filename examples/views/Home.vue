<template>
  <div class="home">
    <qdm-button type="primary" @click="clickFn">primary</qdm-button>
    <qdm-button type="danger" @click="clickFn">danger</qdm-button>
    <qdm-button type="default" @click="clickFn">default</qdm-button>
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
          type:'success',
          callback:function(){
            console.log('点击了确定')
          }
        })
      }
    }

  }
</script>

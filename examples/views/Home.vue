<template>
  <div class="home">
    <qdm-button type="primary" size="mini" @click="show">show dialog</qdm-button>
    <qdm-button type="danger" size="small" @click="clickFn">danger</qdm-button>
    <qdm-button type="default" @click="message">default</qdm-button>

    <qdm-button type="primary">主要按钮</qdm-button>
      <qdm-button type="success">成功按钮</qdm-button>
      <qdm-button type="info">信息按钮</qdm-button>
      <qdm-button type="warning">警告按钮</qdm-button>
      <qdm-button type="danger">危险按钮</qdm-button>

    <qdm-dialog title="dialog标题" :close-on-click-modal="false" custom-class="setdialog" width="900px" top="20px" :visible.sync="dialogVisible">

      <div style="height: 300px;">
          body 内容
      </div>
      <div slot="footer" style="text-align: left;">
         footer 内容
      </div>
    </qdm-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        dialogVisible:false
      }
    },
    created() {

    },
    methods: {
      show(){
        this.dialogVisible = true;
      },
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
        // this.$qdmNotify.info({
        //   title: '提交成功',
        //   message: '这还少一个测试，真的是一个测试',
        // })
        this.$qdmNotify.success({
          title: '提交成功',
          message: '这还少一个测试，真的是一个测试',
          position: 'bottom-left'
        })
//         this.$qdmAlert('是否删除信息','提示',{}).then(()=>{
//             console.log('点击确定')
//         }).catch(()=>{
//
//         })
      //   this.$qdmConfirm('是否删除信息','提示',{
      //     type:'success'}).then(()=>{
      //       console.log('点击确定')
      //     }).catch(()=>{
      //       console.log('点击取消')
      //     })
      }
    }

  }
</script>

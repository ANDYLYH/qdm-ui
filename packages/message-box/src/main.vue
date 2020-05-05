<template>
  <transition name="qdm-message-fade">
      <div class="qdm-message-box__wrapper">
          <div class="qdm-message-box">
            这是一个测试 
          </div>
      </div>
  </transition>
</template>

<script>
  export default {
    data(){
      return {

      }
    }
  }
</script>

<style lang="scss">
  .qdm-message-box__wrapper{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    justify-content: center;
    align-items: center;
    display: flex;
    .qdm-message-box{
      display: inline-block;
      width: 420px;
      min-height: 100px;
      padding-bottom: 10px;
      vertical-align: middle;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #ebeef5;
      font-size: 18px;
      -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      text-align: left;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden
    }
  }
</style>

<template>
  <button class="qdm-button">
    <span>
      <slot></slot>
    </span>
  </button>
</template>
<script>
  export default {
    name:'QdmButton',
    data(){
      return {

      }
    }
  }
</script>

<style>
  .qdm-button {
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
</style>

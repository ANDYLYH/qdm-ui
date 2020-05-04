<template>
  <button class="qdm-button"
    @click="handleClick"
    :disabled="loading"
    :type="nativeType"
    :class="[
      type ? 'qdm-button--' + type : '',
      {
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
    >
    <span>
      <slot></slot>
    </span>
  </button>
</template>
<script>
  export default {
    name:'QdmButton',
    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      icon: {
        type: String,
        default: ''
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      autofocus: Boolean,
      round: Boolean,
      circle: Boolean
    },
    methods:{
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  }
</script>

<style>
  @import "../../styleLib/theme-chalk/button.css";
</style>

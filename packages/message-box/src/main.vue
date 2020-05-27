<template>
  <transition name="msgbox-fade">
    <div
      class="qdm-message-box__wrapper"
      tabindex="-1"
      v-show="visible"
      @click.self="handleWrapperClick"
      role="dialog"
      aria-modal="true"
      :aria-label="title || 'dialog'">
      <div class="qdm-message-box" :class="[customClass, center && 'qdm-message-box--center']">
        <div class="qdm-message-box__header" v-if="title !== null">
          <div class="qdm-message-box__title">
            <div
              :class="['qdm-message-box__status qdm-font', icon]"
              v-if="icon && center">
            </div>
            <span>{{ title }}</span>
          </div>
          <button
            type="button"
            class="qdm-message-box__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
            @keydown.enter="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')">
            <i class="qdm-message-box__close qdm-font qdm-icon-close"></i>
          </button>
        </div>
        <div class="qdm-message-box__content">
          <div
            :class="['qdm-message-box__status qdm-font', icon]"
            v-if="icon && !center && message !== ''">
          </div>
          <div class="qdm-message-box__message" v-if="message !== ''">
            <slot>
              <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
              <p v-else v-html="message"></p>
            </slot>
          </div>
        </div>
        <div class="qdm-message-box__btns">
          <qdm-button
            :loading="cancelButtonLoading"
            :class="[ cancelButtonClasses ]"
            v-if="showCancelButton"
            :round="roundButton"
            size="small"
            @click.native="handleAction('cancel')"
            @keydown.enter="handleAction('cancel')">
            {{ cancelButtonText  || '取消'}}
          </qdm-button>
          <qdm-button
            :loading="confirmButtonLoading"
            ref="confirm"
            :class="[ confirmButtonClasses ]"
            v-show="showConfirmButton"
            :round="roundButton"
            size="small"
            @click.native="handleAction('confirm')"
            @keydown.enter="handleAction('confirm')">
            {{ confirmButtonText || '确定' }}
          </qdm-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import Popup from '../../../src/utils/popup';
  import QdmButton from '../../button';
  import { addClass, removeClass } from '../../../src/utils/dom';
  import Dialog from '../../../src/utils/aria-dialog';

  let messageBox;
  let typeMap = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error'
  };

  export default {
    mixins: [Popup],
    data() {
      return {
        uid: 1,
        title: undefined,
        message: '',
        type: '',
        iconClass: '',
        customClass: '',
        showInput: false,
        inputValue: null,
        inputPlaceholder: '',
        inputType: 'text',
        inputPattern: null,
        inputValidator: null,
        inputErrorMessage: '',
        showConfirmButton: true,
        showCancelButton: false,
        action: '',
        confirmButtonText: '',
        cancelButtonText: '',
        confirmButtonLoading: false,
        cancelButtonLoading: false,
        confirmButtonClass: '',
        confirmButtonDisabled: false,
        cancelButtonClass: '',
        editorErrorMessage: null,
        callback: null,
        dangerouslyUseHTMLString: false,
        focusAfterClosed: null,
        isOnComposition: false,
        distinguishCancelAndClose: false
      };
    },
    props: {
      modal: {
        default: true
      },
      lockScroll: {
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      closeOnClickModal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      },
      closeOnHashChange: {
        default: true
      },
      center: {
        default: false,
        type: Boolean
      },
      roundButton: {
        default: false,
        type: Boolean
      }
    },

    components: {
      QdmButton
    },

    computed: {
      icon() {
        const { type, iconClass } = this;
        return iconClass || (type && typeMap[type] ? `qdm-icon-${ typeMap[type] }` : '');
      },

      confirmButtonClasses() {
        return `qdm-button--primary ${ this.confirmButtonClass }`;
      },
      cancelButtonClasses() {
        return `${ this.cancelButtonClass }`;
      }
    },

    methods: {
      getSafeClose() {
        const currentId = this.uid;
        return () => {
          this.$nextTick(() => {
            if (currentId === this.uid) this.doClose();
          });
        };
      },
      doClose() {
        if (!this.visible) return;
        this.visible = false;
        this._closing = true;

        this.onClose && this.onClose();
        messageBox.closeDialog(); // 解绑
        if (this.lockScroll) {
          setTimeout(this.restoreBodyStyle, 200);
        }
        this.opened = false;
        this.doAfterClose();
        setTimeout(() => {
          if (this.action) this.callback(this.action, this);
        });
      },

      handleWrapperClick() {
        if (this.closeOnClickModal) {
          this.handleAction(this.distinguishCancelAndClose ? 'close' : 'cancel');
        }
      },

      handleInputEnter() {
        if (this.inputType !== 'textarea') {
          return this.handleAction('confirm');
        }
      },

      handleAction(action) {
        this.action = action;
        if (typeof this.beforeClose === 'function') {
          this.close = this.getSafeClose();
          this.beforeClose(action, this, this.close);
        } else {
          this.doClose();
        }
      },

      validate() {
        // if (this.$type === 'prompt') {
        //   const inputPattern = this.inputPattern;
        //   if (inputPattern && !inputPattern.test(this.inputValue || '')) {
        //     this.editorErrorMessage = this.inputErrorMessage || t('el.messagebox.error');
        //     addClass(this.getInputElement(), 'invalid');
        //     return false;
        //   }
        //   const inputValidator = this.inputValidator;
        //   if (typeof inputValidator === 'function') {
        //     const validateResult = inputValidator(this.inputValue);
        //     if (validateResult === false) {
        //       this.editorErrorMessage = this.inputErrorMessage || t('el.messagebox.error');
        //       addClass(this.getInputElement(), 'invalid');
        //       return false;
        //     }
        //     if (typeof validateResult === 'string') {
        //       this.editorErrorMessage = validateResult;
        //       addClass(this.getInputElement(), 'invalid');
        //       return false;
        //     }
        //   }
        // }
        this.editorErrorMessage = '';
        removeClass(this.getInputElement(), 'invalid');
        return true;
      },
      getFirstFocus() {
        const btn = this.$el.querySelector('.qdm-message-box__btns .qdm-button');
        const title = this.$el.querySelector('.qdm-message-box__btns .qdm-message-box__title');
        return btn || title;
      },
      getInputElement() {
        const inputRefs = this.$refs.input.$refs;
        return inputRefs.input || inputRefs.textarea;
      }
    },

    watch: {
      inputValue: {
        immediate: true,
        handler(val) {
          this.$nextTick(_ => {
            if (this.$type === 'prompt' && val !== null) {
              this.validate();
            }
          });
        }
      },

      visible(val) {
        if (val) {
          this.uid++;
          if (this.$type === 'alert' || this.$type === 'confirm') {
            this.$nextTick(() => {
              this.$refs.confirm.$el.focus();
            });
          }
          this.focusAfterClosed = document.activeElement;
          messageBox = new Dialog(this.$el, this.focusAfterClosed, this.getFirstFocus());
        }
      }
    },

    mounted() {
      this.$nextTick(() => {
        if (this.closeOnHashChange) {
          window.addEventListener('hashchange', this.close);
        }
      });
    },

    beforeDestroy() {
      if (this.closeOnHashChange) {
        window.removeEventListener('hashchange', this.close);
      }
      setTimeout(() => {
        messageBox.closeDialog();
      });
    },


  };
</script>
<style>
  @import "../../../styleLib/theme-chalk/message-box.css";
</style>

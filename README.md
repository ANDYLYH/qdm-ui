## install
- $ npm install qdm-ui -S

## Quick Start

```
import Vue from 'vue'
import qdmUi from 'qdm-ui'
<!--样式-->
import "qdm-ui/lib/qdm-ui.css";
Vue.use(qdmUi)

// or
import {
  QdmButton
  // ...
} from 'qdm-ui'

Vue.component(QdmButton.name, QdmButton)
```

# components usage
##  一、按钮 （button)
#### 基本用法
```
<template>
  <qdm-button>按钮</qdm-button>
  <qdm-button type="primary">主要按钮</qdm-button>
  <qdm-button type="success">成功按钮</qdm-button>
  <qdm-button type="info">信息按钮</qdm-button>
  <qdm-button type="warning">警告按钮</qdm-button>
  <qdm-button type="danger">危险按钮</qdm-button>
</template>
```
#### 不同尺寸

```
  <qdm-button>默认按钮</qdm-button>
  <qdm-button size="medium">中等按钮</qdm-button>
  <qdm-button size="small">小型按钮</qdm-button>
  <qdm-button size="mini">超小按钮</qdm-button>
```
#### options

参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
size | 尺寸 | string | medium / small / mini | --
type | 类型 | string | primary / success / warning / danger / info / text | --

---

## 二、message 消息提醒

```
<template>
  <qdm-button :plain="true" @click="open">打开消息提示</qdm-button>
</template>

<script>
  export default {
    methods: {
      open() {
        <!--传 String 字符串-->
        <!--this.$qdmMessage('这是一条消息提示');-->
        <!--传 对象object-->
        this.$qdmMessage({
            message:'这是一条消息提示',
            type:'success'
        })
      }
    }
  }
</script>
```
#### options

参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
message | 消息文字 | string | -- | --
type|	主题 | string	| success / info / warning / error | info
showClose|	MessageBox 是否显示右上角关闭按钮|	boolean|	—|	true
duration|显示时间, 毫秒。设为 0 则不会自动关闭|	number|	—|	3000

---

## 三、MessageBox 弹框
模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。

#### 消息提示
当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭

```
<template>
  <qdm-button type="text" @click="open">点击打开 Message Box</qdm-button>
</template>

<script>
  export default {
    methods: {
      open() {
        this.$qdmAlert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            console.log(action)
          }
        });
      }
    }
  }
</script>
```
#### 确认消息
提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框

```
<template>
  <el-button type="text" @click="open">点击打开 Message Box</el-button>
</template>

<script>
  export default {
    methods: {
      open() {
        this.$qdmConfirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('删除成功')
        }).catch(() => {
         console.log('已取消删除')       
        });
      }
    }
  }
</script>
```
#### options

参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
title | MessageBox 标题 | string | -- | --
message | MessageBox 消息正文内容 | string | -- | --
type|	消息类型，用于显示图标 | string	| success / info / warning / error | —
showClose|	MessageBox 是否显示右上角关闭按钮|	boolean|	—|	true
cancelButtonText|	取消按钮的文本内容|	string|	—|	取消
confirmButtonText|	确定按钮的文本内容|	string|	—|	确定

---

## 四、Notification 通知
悬浮出现在页面角落，显示全局的通知提醒消息

#### 基本用法

```
<template>
  <qdm-button  @click="open1">
    可自动关闭
  </qdm-button>
  <qdm-button  @click="open2">
    不会自动关闭
  </qdm-button>
</template>

<script>
  export default {
    methods: {
      open1() {
        this.$qdmNotify({
          title: '标题名称',
          message: '这是一条不会自动关闭的消息'
        });
      },

      open2() {
        this.$qdmNotify({
          title: '提示',
          message: '这是一条不会自动关闭的消息',
          duration: 0
        });
      }
    }
  }
</script>
```
#### 带有倾向性
带有 icon，常用来显示「成功、警告、消息、错误」类的系统消息
```
<template>
  <qdm-button  @click="open1">
    成功
  </qdm-button>
  <qdm-button @click="open2">
    警告
  </qdm-button>
  <qdm-button @click="open3">
    消息
  </qdm-button>
  <qdm-button @click="open4">
    错误
  </qdm-button>
</template>

<script>
  export default {
    methods: {
      open1() {
        this.$qdmNotify({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
        });
      },

      open2() {
        this.$qdmNotify({
          title: '警告',
          message: '这是一条警告的提示消息',
          type: 'warning'
        });
      },

      open3() {
        this.$qdmNotify.info({
          title: '消息',
          message: '这是一条消息的提示消息'
        });
      },

      open4() {
        this.$qdmNotify.error({
          title: '错误',
          message: '这是一条错误的提示消息'
        });
      }
    }
  }
</script>
```
#### 自定义弹出位置
可以让 Notification 从屏幕四角中的任意一角弹出

```
<template>
  <qdm-button @click="open1">
    右上角
  </qdm-button>
  <qdm-button @click="open2">
    右下角
  </qdm-button>
  <qdm-button @click="open3">
    左下角
  </qdm-button>
  <qdm-button @click="open4">
    左上角
  </qdm-button>
</template>

<script>
  export default {
    methods: {
      open1() {
        this.$qdmNotify({
          title: '自定义位置',
          message: '右上角弹出的消息'
        });
      },

      open2() {
        this.$qdmNotify({
          title: '自定义位置',
          message: '右下角弹出的消息',
          position: 'bottom-right'
        });
      },

      open3() {
        this.$qdmNotify({
          title: '自定义位置',
          message: '左下角弹出的消息',
          position: 'bottom-left'
        });
      },

      open4() {
        this.$qdmNotify({
          title: '自定义位置',
          message: '左上角弹出的消息',
          position: 'top-left'
        });
      }
    }
  }
</script>
```
#### 单独引用

```
import { Notification } from 'qdm-ui';
```

#### options

参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
title | 标题 | string | -- | --
message | 说明文字 | string | -- | --
type | 主题样式，如果没有值将被忽略 | string | success/warning/info/error | --
duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | -- | --
position | 自定义弹出位置 | string | op-right/top-left/bottom-right/bottom-left | op-right
showClose | 是否显示关闭按钮 | boolean | -- | true

---

## 五、Dialog 对话框

#### 基本用法
Dialog 弹出一个对话框，适合需要定制性更大的场景。

```
<qdm-button type="text" @click="dialogVisible = true">点击打开 Dialog</qdm-button>

<qdm-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <qdm-button @click="dialogVisible = false">取 消</qdm-button>
    <qdm-button type="primary" @click="dialogVisible = false">确 定</qdm-button>
  </span>
</qdm-dialog>

<script>
  export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$qdmConfirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {});
      }
    }
  };
</script>
```
#### options

参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
visible | 是否显示 Dialog，支持 .sync 修饰符 | boolean | -- | false
title | Dialog 的标题，也可通过具名 slot 传入 | string | -- | --
width|	Dialog 的宽度	|string|	—|	50%
top	|Dialog CSS 中的 margin-top 值|	string|	—|	15vh
modal|	是否需要遮罩层|	boolean	|—|	true
close-on-click-modal|	是否可以通过点击 modal 关闭 Dialog|	boolean	|—|	true
show-close|	是否显示关闭按钮|	boolean|	—|	true



**。。。。。。。。。。。。。 更多组件敬请期待。。。。。。。。。。。。。。。**

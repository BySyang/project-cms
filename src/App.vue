<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

body,
html {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
}

.el-alert--error .el-alert__description {
  display: inline;
}

.el-dialog__body > div {
  display: inline-block;
}
.el-rate__icon {
  font-size: 14px;
}
/* 图片上传框 */
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
</style>

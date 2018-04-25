<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
body,html{
  width: 100%;
  height: 100%;
  
}
#app{
  height: 100%;
}
.el-alert--error .el-alert__description{
  display: inline
}
</style>

<template>
  <div class="pays_section">
    <div class="pays_content">
      <div class="top_btnBox">
        <el-button type="primary">主要按钮</el-button>
      </div>
    </div>
  </div>
  
</template>
<script>
export default {
  data() {
    return {
      tableData: [{}]
    };
  }
};
</script>
<style lang="scss" scoped>
.pays_section {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #fefefe;
  .pays_content {
    margin: 1% auto;
    width: 98%;
    height: 95%;
    background-color: white;
    box-shadow: 0 -3px 0 0 #59ace2;
    outline: 1px solid red;
    .top_btnBox {
      height: 30px;
      padding-left: 1%;
      margin: 1% auto;
      background-color: white;
      border: 1px solid #f0f0f0;
      .el-button {
        padding: 10px 10px;
        margin: auto 0；;
      }
    }
  }
}
</style>
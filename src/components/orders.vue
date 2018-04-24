<template>
  <div class="orders">
    <div class="orders_main">
      <div class="main_top">
        <div>订单管理</div>
        <el-button type="danger"><i class=""></i> 删除</el-button>
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.orders {
  width: 100%;
  height: 100%;
  background-color: #e5e6e6;
  overflow: hidden;
  .orders_main {
    margin: 1% auto;
    width: 98%;
    height: 95%;
    background-color: white;
    box-shadow: 0 -3px 0 0 #59ace2;
    .main_top {
      div {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #59ace2;
      }
      .el-button {
        float: left;
        padding: 10px 20px;
        border-radius: 5px;
      }
    }
  }
}
</style>
<template>
  <div id="afterSales">
    <div id="afterSales_body">
      <div class="main_top">
        <div class="afterSales_text">售后服务</div>

        <div class="demo-input-suffix" style="height:30px">
          <el-input
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            v-model="input21">
         </el-input>
        </div>


      </div>
    </div>
    <div id="form"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    };
  }
};
</script>
<style lang="less" scoped>
#afterSales {
  width: 100%;
  height: 100%;
  background-color: #e5e6e6;
  overflow: hidden;
  #afterSales_body {
    background-color: white;
    // height: 60px;
    width: 98%;
    margin: 1% auto;
    height: 95%;
    box-shadow: 0 -3px 0 0 #59ace2;
    .main_top {
      position: relative;
      height: 30px;
      border-bottom: 1px solid #e5e6e6;
      .afterSales_text {
        position: absolute;
        top: 0;
        left: 40px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #59ace2;
      }
      .demo-input-suffix{
        margin-left: 100px;
        width: 150px;
        height: 30px;
        .el-input{
          width: 100%;
          height: 100%;
          span{
             height: 100%;
          }
          .el-input__inner{
             height: 100%;
          }
        }
      }
    }
  }
}
</style>
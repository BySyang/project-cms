<template>
  <div class="wuliu">
    <div class="wuliu_main">
      <div class="wuliu_top">
        <div>物流管理</div>
      </div>
      <div class="search">
        <div>
          下单时间:
          <el-date-picker v-model="xiadandata" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
        <div>
          用户名:
          <el-input placeholder="请输入用户名" prefix-icon="el-icon-search" v-model="userName">
          </el-input>
        </div>
        <div>
          订单号:
          <el-input placeholder="请输入订单号" prefix-icon="el-icon-search" v-model="ordersId">
          </el-input>
        </div>
      </div>
      <div class=""></div>
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
.wuliu {
  width: 100%;
  height: 100%;
  .wuliu_main {
    margin: 1% auto;
    width: 98%;
    height: 95%;
    background-color: white;
    box-shadow: 0 -3px 0 0 #59ace2;
    .wuliu_top {
      position: relative;
      height: 30px;
      border-bottom: 1px solid #e5e6e6;
      div {
        position: absolute;
        top: 0;
        left: 22px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: white;
        background-color: #59ace2;
      }
    }
    .search {
      padding: 10px 0 0 22px;
      > div {
        width: 28%;
        display: inline-block;
        .el-range-editor.el-input__inner {
          width: 72%;
        }
        .el-input {
          width: 70%;
        }
      }
      div:nth-of-type(2),
      div:nth-of-type(3) {
        width: 20%;
      }
    }
  }
}
</style>
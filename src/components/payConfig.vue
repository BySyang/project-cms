<template>
  <div class="pays_section">
    <div class="pays_content">
      <div class="topBox">
        <div>支付配置</div>
      </div>
      <div class="pays_centerBox">
        <div class="centerTop">
          <span>商城用户支付配置</span>
        </div>
        <div class="centerContent">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </div>
        <div class="centerTop">
          <span>其他配置信息</span>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.pays_section {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  .pays_content {
    margin: 1% auto;
    width: 98%;
    height: 96%;
    background-color: white;
    box-shadow: 0 -3px 0 0 #59ace2;
    // outline: 1px solid red;
    .topBox {
      position: relative;
      height: 30px;
      padding-left: 22px;
      margin: 1% auto;
      background-color: white;
      border-bottom: 1px solid #e5e6e6;
      div {
        color: white;
        position: absolute;
        top: 0;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #59ace2;
      }
    }
    .pays_centerBox {
      margin-top: 1%;
      height: 92%;
      // border:1px solid #e5e6e6;
      .centerTop {
        height: 30px;
        padding-left: 22px;
        background: linear-gradient(#fefefe, #f1f1f1);
        span {
          line-height: 30px;
        }
      }
    }
    .centerContent {
      padding: 10px 22px;
    }
  }
}
</style>
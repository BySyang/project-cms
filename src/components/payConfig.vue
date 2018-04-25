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
            <el-table-column prop="date" label="支付名称" width="180">
            </el-table-column>
            <el-table-column prop="name" label="状态" width="180" align="center">
              <!-- <template scope="scope">
                <el-radio-group v-model="radio3">
                  <el-radio v-model="radio" :label="scope.$index">备选项</el-radio>
                  <el-radio v-model="radio2" :label="scope.$index">备选项</el-radio>
                </el-radio-group>
              </template> -->
            </el-table-column>
            <el-table-column prop="address" label="描述">
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
      // radio: "",
      // radio2: "",
      // radio3: "",
      tableData: [
        {
          date: "支付宝支付",
          name: "",
          address:
            "在线支付是指卖方与买方通过因特网上的电子商务网站进行交易时，银行为其提供网上资金结算服务的一种业务。它为企业和个人提供了一个安全、快捷、方便的电子商务应用环境和网上资金结算工具。在线支付不仅帮助企业实现了销售款项的快速归集，缩短收款周期，同时也为个人网上银行客户提供了网上消费支付结算方式，使客户真正做到足不出户，网上购物。"
        },
        {
          date: "2016-05-04",
          name: "",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "",
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
      .el-radio + .el-radio {
        margin-left: 0;
      }
    }
  }
}
</style>
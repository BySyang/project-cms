<template>
  <div class="pays_section">
    <div class="pays_content">
      <div class="topBox">
        <div>支付管理</div>
      </div>
      <div class="pays_centerBox">
        <div class="centerTop">
          <span>在线支付方式</span>
        </div>
        <div class="centerContent">
          <el-alert title="提示：" description="该支付方式启用并不能正常使用，需要开通支付功能才能使用相应的支付方式。" type="error"></el-alert>
          <div class="paymentBox">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="payName" label="支付方式" width="180" align="center">
              </el-table-column>
              <el-table-column prop="payImg" label="图片" width="180" align="center">
                <template slot-scope="scope">
                  <img :src="scope.row.image" height="60" />
                </template>
              </el-table-column>
              <el-table-column prop="payInfo" label="简介" align="center">
              </el-table-column>
              <el-table-column prop="isOn" label="状态" width='140' align="center">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.isOn" active-text="启用" inactive-text="禁用">
                  </el-switch>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // value1: true,
      // value2: true,
      multipleSelection: [],
      payName: "",
      payImg: "",
      payInfo: "",
      isOn: 1
      // tableData: [
      //   {
      //     payName: "支付宝",
      //     image: require("../assets/zhifb.jpg"),
      //     introduce:
      //       "支付宝（中国）网络技术有限公司是国内领先的第三方支付平台，致力于提供“简单、安全、快速”的支付解决方案。",
      //     judge: ""
      //   },
      //   {
      //     name: "微信支付",
      //     image: require("../assets/weixin.jpg"),
      //     introduce:
      //       "微信支付是集成在微信客户端的支付功能，用户可以通过手机完成快速的支付流程。",
      //     judge: ""
      //   },
      //   {
      //     name: "银联支付",
      //     image: require("../assets/yinlian.jpg"),
      //     introduce:
      //       "中国银联是通过银联跨行交易清算系统实现商业银行系统间的互联互通和资源共享，保证银行卡跨行、跨地区和跨境使用。",
      //     judge: ""
      //   }
      // ]
    };
  },
  //获取数据
  methods: {
    getData(a) {
      this.$http.get("/pays").then(res => {
        this.data = res.data.data;
        a("");
      });
    }
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
    box-shadow: 0 -3px 0 0 #59ace2; // outline: 1px solid red;
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
      height: 92%; // border:1px solid #e5e6e6;
      .centerTop {
        height: 30px;
        padding-left: 22px;
        background: linear-gradient(#fefefe, #f1f1f1);
        span {
          line-height: 30px;
        }
      }
      .centerContent {
        padding: 10px 22px 0;
        .paymentBox {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>

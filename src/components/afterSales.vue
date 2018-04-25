<template>
  <div id="afterSales">
    <div id="afterSales_body">
      <div class="main_top">
        <div class="afterSales_text">售后服务</div>
      </div>
      <div class="search">
        <div>
          下单时间:
          <el-date-picker v-model="xiadandata" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
        <div>
          订单号:
          <el-input placeholder="请输入订单号" suffix-icon="el-icon-search" v-model="ordersId">
          </el-input>
        </div>
        <div>
          商品名称:
          <el-input placeholder="请输入商品名" suffix-icon="el-icon-search" v-model="goodsName">
          </el-input>
        </div>
      </div>
      <div class="tableData">
        <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" header-align="center" align="center" width="55">
          </el-table-column>
          <el-table-column prop="orderId" header-align="center" align="center" label="订单id" width="100">
          </el-table-column>
          </el-table-column>
          <el-table-column prop="orderunique" header-align="center" align="center" label="订单号" width="100">
          </el-table-column>
          <el-table-column prop="goodsInfo[0].goodsName" align="center" header-align="center" label="商品名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="deliverMoney" align="center" header-align="center" label="商品价格" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="deliverMoney" align="center" header-align="center" label="退款金额" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="goodsInfo[0].goodsNum" align="center" header-align="center" label="数量" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="refunInstruction" align="center" header-align="center" label="退款说明" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="State" align="center" header-align="center" label="订单状态" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="refunState" align="center" header-align="center" label="退款状态" show-overflow-tooltip>
        
          </el-table-column>
          <el-table-column prop="newTime" label="下单日期" align="center" header-align="center" width="120">
          </el-table-column>
          <el-table-column label="操作" header-align="center" align="center">
            <template slot-scope="scope">
              <el-row>
                <el-button size="mini" type="primary" @click="refund(scope.$index, scope.row)">退款</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      multipleSelection: [],
      xiadandata: "",
      tableData: [],
      goodsName: "",
      ordersId: "",
      //时间插件
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      refund:"未付款"
    };
  },
  created() {
    new Promise((resolve, reject) => {
      this.TableDataList(resolve);
    }).then(() => {
      this.getOrderGoods();
    });
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    TableDataList(resolve) {
      var that = this;
      this.$http.get("ordersList").then(
        resp => {
          if (resp.data.data) {
            resp.data.data.forEach(item => {
              item.newTime = that.formatDate(item.createTime);
              // item.refunState = that.refunStates(item.orderStatus);
            });
            this.tableData = resp.data.data;
            resolve("ok");
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    formatDate(dateStr) {
      var iDate = new Date(dateStr);

      function addZreo(num) {
        return num < 10 ? "0" + num : num;
      }
      return (
        iDate.getFullYear() +
        "-" +
        addZreo(iDate.getMonth() + 1) +
        "-" +
        addZreo(iDate.getDate())
      );
    },
    refunStates(status) {
      var newst = "";
      switch (status) {
        case 0:
          newst = "未退款";
          break;
        case 1:
          newst = "已退款";
          break;
        default:
          break;
      }
      return newst;
    },
    getOrderGoods() {
      this.tableData.forEach(item => {
        this.$http
          .get(`/orderGoods?orderId=${item.orderId}`)
          .then(res => {
            this.$set(item,'goodsInfo',res.data.data)
          })
          .catch(err => {
            console.log(err);
          });
      });
      console.log(this.tableData)
    }
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
        left: 2 2px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
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
      // div:nth-of-type(3),
      // div:nth-of-type(4) {
      //   width: 28%;
      // }
    }
    .tableData {
      padding-left: 22px;
      margin-top: 10px;
    }
    // el-picker-panel el-date-range-picker el-popper has-sidebar
    .el-date-range-picker {
      position: absolute !important;
      top: 200px;
    }
  }
}
</style>
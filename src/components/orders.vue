<template>
  <div class="orders">
    <div class="orders_main">
      <div class="main_top">
        <div>订单管理</div>
      </div>
      <div class="search">
        <div>
          下单时间:
          <el-date-picker
            v-model="xiadandata"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
        <div>
          交易状态:
          <el-select v-model="jiaoyistats" filterable placeholder="请选择">
            <el-option
              v-for="item in jiaoyilist"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          商品名:
          <el-input
            placeholder="请输入商品名"
            prefix-icon="el-icon-search"
            v-model="goodsName">
          </el-input>
        </div>
        <div>
          订单号:
          <el-input
            placeholder="请输入订单号"
            prefix-icon="el-icon-search"
            v-model="ordersId">
          </el-input>
        </div>
      </div>
      <div class="table">
        <el-table
        border
        ref="multipleTable"
        :data="orsersTable"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
          <el-table-column
            prop="orderunique"
            header-align="center"
            align="center"
            label="订单号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="userId"
            align="center"
            header-align="center"
            label="用户ID"
            width="65"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="totalMoney"
            align="center"
            header-align="center"
            label="订单总价"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="orderRemarks"
            align="center"
            header-align="center"
            label="用户备注"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="adminRemarks"
            align="center"
            header-align="center"
            label="修改备注"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="newstatus"
            align="center"
            header-align="center"
            label="订单状态"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="orderScore"
            align="center"
            header-align="center"
            label="获得积分"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="newTime"
            label="下单日期"
            align="center"
            header-align="center"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
      jiaoyistats: "",
      goodsName: "",
      ordersId: "",
      xiadandata: "",
      //时间选择插件
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
      //交易状态
      jiaoyilist: [
        {
          value: "0",
          label: "待付款"
        },
        {
          value: "1",
          label: "待发货"
        },
        {
          value: "2",
          label: "已发货"
        },
        {
          value: "3",
          label: "已取消"
        },
        {
          value: "4",
          label: "已完成"
        }
      ],
      //表格数据
      orsersTable: []
    };
  },
  created() {
    this.orsersTableList();
    this.orsersTable;
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      // console.log(index, row);
    },
    orsersTableList() {
      var that = this;
      this.$http.get("ordersList").then(
        resp => {
          if (resp.data.data) {
            resp.data.data.forEach(item => {
              item.newTime = that.formatDate(item.createTime);
              // console.log(item.orderStatus);
              item.newstatus = that.ordersStatus(item.orderStatus);
            });
            this.orsersTable = resp.data.data;
          }
        },
        err => {
          consolo.log(err);
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
    ordersStatus(status) {
      var newst = "";
      switch (status) {
        case 0:
          newst = "待付款"
          break;
        case 1:
          newst = "待发货";
          break;
        case 2:
          newst = "已发货";
          break;
        case 3:
          newst = "已取消";
          break;
        case 4:
          newst = "已完成";
          break;
        default:
          break;
      }
      return newst;
    }
  }
};
</script>
<style lang="scss" scoped>
.orders {
  width: 100%;
  height: 100%;
  .orders_main {
    margin: 1% auto;
    width: 98%;
    height: 95%;
    background-color: white;
    box-shadow: 0 -3px 0 0 #59ace2;
    .main_top {
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
      div:nth-of-type(3),
      div:nth-of-type(4) {
        width: 20%;
      }
    }
    .table {
      width: 96%;
      margin: 10px auto;
    }
  }
}
</style>
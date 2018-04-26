<template>
  <div class="wuliu">
    <div class="wuliu_main">
      <div class="wuliu_top">
        <div>物流管理</div>
      </div>
      <div class="search">
        <div>
          下单时间:
          <el-date-picker v-model="xiadandata" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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
      <div class="table">
        <el-table :data="wuliuTable" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="订单号">
                  <span>{{ props.row.orderunique }}</span>
                </el-form-item>
                <el-form-item label="用户ID">
                  <span>{{ props.row.userId }}</span>
                </el-form-item>
                <el-form-item label="订单总价">
                  <span>{{ props.row.totalMoney }}</span>
                </el-form-item>
                <el-form-item label="用户备注">
                  <span>{{ props.row.orderRemarks }}</span>
                </el-form-item>
                <el-form-item label="修改备注">
                  <span>{{ props.row.adminRemarks }}</span>
                </el-form-item>
                <el-form-item label="获得积分">
                  <span>{{ props.row.orderScore }}</span>
                </el-form-item>
                <el-form-item label="下单日期">
                  <span>{{ props.row.newTime }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="订单号" prop="orderunique">
          </el-table-column>
          <el-table-column label="用户ID" prop="userId">
          </el-table-column>
          <el-table-column label="下单日期" prop="newTime">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">发货</el-button>
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
      xiadandata: "",
      userName: "",
      ordersId: "",
      wuliuTable: []
    };
  },
  created() {
    this.wuliuTableList();
  },
  computed: {},
  methods: {
    wuliuTableList() {
      var that = this;
      this.$http.get("ordersList").then(
        resp => {
          if (resp.data.data) {
            resp.data.data.forEach(item => {
              item.newTime = that.formatDate(item.createTime);
            });
            this.wuliuTable = resp.data.data;
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
    }
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
    .table {
      width: 96%;
      margin: 10px auto;
      .demo-table-expand {
        font-size: 0;
      }
      .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
      }
      .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
      }
    }
  }
}
</style>
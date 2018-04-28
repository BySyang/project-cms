<template>
  <div class="orders">
    <div class="orders_main">
      <div class="main_top">
        <div>订单管理</div>
      </div>
      <div class="search">
        <div>
          下单时间:
          <el-date-picker v-model="searchArr.time" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div>
          交易状态:
          <el-select v-model="searchArr.jiaoyi" filterable placeholder="请选择">
            <el-option label="全部" value="全部"></el-option>
            <el-option v-for="item in jiaoyilist" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          用户名:
          <el-input placeholder="请输入用户名" prefix-icon="el-icon-search" v-model="searchArr.username">
          </el-input>
        </div>
        <div>
          订单号:
          <el-input placeholder="请输入订单号" prefix-icon="el-icon-search" v-model="searchArr.ordersId">
          </el-input>
        </div>
      </div>
      <div class="table">
        <el-table border ref="multipleTable" :data="orsersTable1" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column prop="orderunique" header-align="center" align="center" label="订单号" width="150">
          </el-table-column>
          <el-table-column prop="userId" align="center" header-align="center" label="用户ID" width="100" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="totalMoney" align="center" header-align="center" label="订单总价" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="orderRemarks" align="center" header-align="center" label="用户备注" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="adminRemarks" align="center" header-align="center" label="修改备注" show-overflow-tooltip>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="订单状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>{{ordersStatus(scope.row.orderStatus)}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="orderScore" align="center" header-align="center" label="获得积分" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="下单日期" align="center" header-align="center" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>{{formatDate(scope.row.createTime)}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination ref="pages" layout="prev, pager, next" :total="total" :page-size="size" @current-change="setCurrent">
          </el-pagination>
        </div>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="下单日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.createTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="修改备注">
          <el-input v-model="form.adminRemarks"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="form.orderStatus" filterable>
            <el-option v-for="item in jiaoyilist" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="获得积分">
          <el-input v-model="form.orderScore"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      multipleSelection: [],
      editVisible: false,
      jiaoyistats: "",
      current: 1,
      size: 5,
      form: {},
      searchArr: {
        username: "",
        jiaoyi: "全部",
        ordersId: "",
        time: null
      },
      //交易状态
      jiaoyilist: [
        {
          value: 0,
          label: "待付款"
        },
        {
          value: 1,
          label: "待发货"
        },
        {
          value: 2,
          label: "已发货"
        },
        {
          value: 3,
          label: "已取消"
        },
        {
          value: 4,
          label: "已完成"
        }
      ],
      //表格数据
      orsersTable: [],
      data: []
    };
  },
  created() {
    this.orsersTableList();
  },
  computed: {
    orsersTable1() {
      var arr = [];
      var current = this.current;
      var size = this.size;
      for (var i = (current - 1) * size; i < (current - 1) * size + size; i++) {
        if (this.orsersTable[i]) arr.push(this.orsersTable[i]);
      }
      return arr;
    },
    total() {
      return this.orsersTable.length;
    }
  },
  watch: {
    searchArr: {
      handler() {
        let time = this.searchArr.time || null;
        let jiaoyist = this.searchArr.jiaoyi;
        let ordersId = this.searchArr.ordersId.trim() || "";
        let username = this.searchArr.username.trim() || "";
        let arr = [];
        console.log(username);
        if (jiaoyist === "全部") {
          arr.push(...this.data);
        } else {
          this.data.forEach(item => {
            if (item.orderStatus == jiaoyist) arr.push(item);
          });
        }
        if (username !== "") {
          let i = arr;
          arr = [];
          i.forEach(item => {
            if (item.userId == username) arr.push(item);
          });
        }
        if (ordersId !== "") {
          let i = arr;
          arr = [];
          i.forEach(item => {
            if (item.orderunique.indexOf(ordersId) > -1) arr.push(item);
          });
        }
        if (time) {
          let i = arr;
          let start = new Date(time[0]);
          let end = new Date(time[1]);
          arr = [];
          i.forEach(item => {
            let inow = new Date(item.newTime);
            if (inow >= start && inow <= end) arr.push(item);
          });
        }
        this.orsersTable = arr;
      },
      deep: true
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      this.form = {
        orderId: row.orderId,
        createTime: row.createTime,
        adminRemarks: row.adminRemarks,
        orderStatus: row.orderStatus,
        orderScore: row.orderScore
      };
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.orsersTable.forEach((item, index) => {
        if (item.orderId === this.form.orderId) {
          for (let [key, val] of Object.entries(this.form)) {
            item[key] = val;
          }
        }
      });
      this.editVisible = false;
      this.$http.post("orderModify", qs.stringify(this.form)).then(res => {
        if (res.data.code == 2) {
          this.$message.success(`编辑成功`);
        }else{
          this.$message.error(`编辑错误，请重新尝试`);
        }
      });
    },
    orsersTableList() {
      var that = this;
      this.$http.get("ordersList").then(
        resp => {
          if (resp.data.data) {
            this.data = resp.data.data;
            this.orsersTable = [...this.data];
          }
        },
        err => {
          consolo.log(err);
        }
      );
    },
    setCurrent(val) {
      this.current = val;
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
      switch (parseInt(status)) {
        case 0:
          newst = "待付款";
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

<template>
  <div class="wuliu">
    <div class="wuliu_main">
      <div class="wuliu_top">
        <div>物流管理</div>
      </div>
      <div class="search">
        <div>
          下单时间:
          <el-date-picker v-model="searchArr.time" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
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
        <el-table :data="wuliuTable1" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="订单号：">
                  <span>{{ props.row.orderunique }}</span>
                </el-form-item>
                <el-form-item label="用户ID：">
                  <span>{{ props.row.userId }}</span>
                </el-form-item>
                <el-form-item label="订单总价：">
                  <span>{{ props.row.totalMoney }}</span>
                </el-form-item>
                <el-form-item label="用户备注：">
                  <span>{{ props.row.orderRemarks }}</span>
                </el-form-item>
                <el-form-item label="修改备注：">
                  <span>{{ props.row.adminRemarks }}</span>
                </el-form-item>
                <el-form-item label="获得积分：">
                  <span>{{ props.row.orderScore }}</span>
                </el-form-item>
                <el-form-item label="下单日期：">
                  <span>{{ props.row.newTime }}</span>
                </el-form-item>
                <el-form-item label="付款方式：">
                  <span>{{props.row.payName }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="订单号" prop="orderunique">
          </el-table-column>
          <el-table-column label="快递单号" prop="">
          </el-table-column>
          <el-table-column label="下单日期" prop="newTime">
          </el-table-column>
          <el-table-column label="快递方式" prop="">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">发货</el-button>
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
    <!--         <el-dialog title="发货" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="快递单号">
                    <el-input v-model="kuaididanhao"></el-input>
                </el-form-item>
                <el-form-item label="选择快递">
                    <!-- <el-input v-model="form.newstatus"></el-input>
                    <el-select v-model="fahuos" filterable placeholder="请选择快递">
                        <el-option v-for="item in fahuo" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      editVisible: false,
      current: 1,
      size: 5,
      fahuos: "",
      wuliuTable: [],
      data: [],
      fahuo: [
        {
          value: "0",
          label: "邮政EMS"
        },
        {
          value: "1",
          label: "邮政小包"
        },
        {
          value: "2",
          label: "申通快递"
        },
        {
          value: "3",
          label: "圆通快递"
        },
        {
          value: "4",
          label: "中通快递"
        },
        {
          value: "5",
          label: "韵达快递"
        },
        {
          value: "6",
          label: "天天快递"
        },
        {
          value: "7",
          label: "顺丰快递"
        },
        {
          value: "8",
          label: "百世汇通快递"
        },
        {
          value: "9",
          label: "德邦快递"
        }
      ],
      searchArr: {
        username: "",
        ordersId: "",
        time: null
      }
    };
  },
  created() {
    this.wuliuTableList();
  },
  computed: {
    wuliuTable1() {
      var arr = [];
      var current = this.current;
      var size = this.size;
      for (var i = (current - 1) * size; i < (current - 1) * size + size; i++) {
        if (this.wuliuTable[i]) arr.push(this.wuliuTable[i]);
      }
      return arr;
    },
    total() {
      return this.wuliuTable.length;
    }
  },
  watch: {
    searchArr: {
      handler() {
        let time = this.searchArr.time || null;
        let ordersId = this.searchArr.ordersId.trim() || "";
        let username = this.searchArr.username.trim() || "";
        let arr = [];
        if (username === "") {
          arr.push(...this.data);
        } else {
          this.data.forEach(item => {
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
        this.wuliuTable = arr;
      },
      deep: true
    }
  },
  methods: {
    wuliuTableList() {
      var that = this;
      this.$http.get("ordersList").then(
        resp => {
          var yuan = this;
          if (resp.data.data) {
            resp.data.data.forEach(item => {
              item.newTime = that.formatDate(item.createTime);
            });
          }
          this.data = resp.data.data;
          this.wuliuTable = [...this.data];
          console.log(this.data)
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
    handleEdit(index, row) {
      this.editVisible = true;
    },
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`保存快递信息成功`);
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

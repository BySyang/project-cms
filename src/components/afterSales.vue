<template>
  <div id="afterSales">
    <div id="afterSales_body">
      <div class="main_top">
        <div class="afterSales_text">售后服务</div>
      </div>
      <!-- 搜索 -->
      <div class="search">
        <div>
          下单时间:
          <el-date-picker size="small" v-model="searshArr.xiadanTime" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div>
          订单号:
          <el-input size="small" placeholder="请输入订单号" suffix-icon="el-icon-search" v-model="searshArr.ordersNum">
          </el-input>
        </div>
        <div>
          商品名称:
          <el-input size="small" placeholder="请输入商品名" suffix-icon="el-icon-search" v-model="searshArr.goodsName">
          </el-input>
        </div>
      </div>

      <!-- 表格 -->
      <div class="tableData">
        <el-table border ref="multipleTable" :data="data1" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column prop="orderId" header-align="center" align="center" label="订单id" width="100">
          </el-table-column>
          <el-table-column prop="orderunique" header-align="center" align="center" label="订单号" width="150">
          </el-table-column>
          <el-table-column prop="goodsInfo[0].goodsName" align="center" header-align="center" label="商品名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="商品详情" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button type="info" plain size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>

          <!-- <el-table-column width="100px" align="center" header-align="center" label="商品图片" show-overflow-tooltip>
            <template slot-scope="scope">
              <img style="width:60px;height:60px" :src="'../static/series/'+scope.row.imgSrc" alt="">
            </template>
          </el-table-column> -->
          <!-- <el-table-column prop="goodsInfo[0].goodsPrice" align="center" header-align="center" label="商品价格" show-overflow-tooltip>
          </el-table-column> -->
          <!-- <el-table-column prop="goodsInfo[0].goodsPrice" align="center" header-align="center" label="退款金额" show-overflow-tooltip>
          </el-table-column> -->
          <!-- <el-table-column prop="goodsInfo[0].goodsNum" align="center" header-align="center" label="数量" show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column prop="refunInstruction" align="center" header-align="center" label="退款说明" show-overflow-tooltip>
          </el-table-column>
          <!-- <el-table-column prop="orderStatus" align="center" header-align="center" label="订单状态" show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column prop="refunState1" align="center" header-align="center" label="退款状态" show-overflow-tooltip>

          </el-table-column>
          <el-table-column prop="newTime" label="下单日期" align="center" header-align="center" width="120">
          </el-table-column>
          <el-table-column label="操作" header-align="center" align="center">
            <template slot-scope="scope">
              <el-row>
                <el-button size="mini" type="primary" @click="refund(scope.row)" :disabled="scope.row.disabled">退款</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pages">
          <el-pagination ref="pages" layout="prev, pager, next" :total="total" :page-size="size" @current-change="setCurrent">
          </el-pagination>
        </div>

        <!-- 查看详情弹出框 -->
        <el-dialog title="订单详情" :visible.sync="editVisible" width="30%">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="商品图片:">
              <img style="width:60px;height:60px" :src="'../static/series/'+form.goodLargeImg" alt="">
            </el-form-item>
            <el-form-item label="商品名称:">
              <span>{{form.goodsName}}</span>
            </el-form-item>
            <el-form-item label="商品总价:">
              <span>{{form.totalMoney}}</span>
            </el-form-item>
            <el-form-item label="实际金额:">
              <span>{{form.realTotalMoney}}</span>
            </el-form-item>
            <el-form-item label="退款金额:">
              <span>{{form.realTotalMoney}}</span>
            </el-form-item>
            <el-form-item label="订单状态:">
              <span>{{form.orderStatus}}</span>
            </el-form-item>
            <el-form-item label="下单时间:">
              <span>{{form.newTime}}</span>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" size='mini' @click="confirm">确 定</el-button>
          </span>
        </el-dialog>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      multipleSelection: [],
      tableData: [],
      data: [],
      refst: false,
      current: 1, //当前页
      size: 5,
      form: {},
      editVisible: false,
      searshArr: {
        xiadanTime: null, //下单时间
        goodsName: "", //商品名
        ordersNum: ""
      }
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
    // 订单表表格数据
    TableDataList(resolve) {
      var that = this;
      this.$http.get("ordersList").then(
        resp => {
          if (resp.data.data) {
            var newArr = [];
            resp.data.data.forEach(item => {
              if (item.orderStatus == 1 || item.orderStatus == 2) {
                item.newTime = that.formatDate(item.createTime);
                item.orderStatus = that.orderStatus(item.orderStatus);
                item.refunState1 = that.refunState(0);
                item.disabled = false;
                newArr.push(item);
              }
            });
           
            this.tableData = newArr;
            this.data = newArr;
            resolve("ok");
            // console.log(resp.data.data);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    // ----年月日的拼接-------
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
    // 退款状态
    refunState(refst) {
      var refunStatetext = " ";
      if (refst) {
        refunStatetext = "已退款";
      } else {
        refunStatetext = "未退款";
      }
      return refunStatetext;
    },
    //订单状态-------------
    orderStatus(status) {
      var newst = "";
      switch (status) {
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
    //goods-order表请求的数据
    getOrderGoods() {
      this.tableData.forEach(item => {
        this.$http
          .get(`/orderGoods?orderId=${item.orderId}`)
          .then(res => {
            this.$set(item, "goodsInfo", res.data.data);
            this.$set(item, "imgSrc", res.data.data[0].goodLargeImg);
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    setCurrent(val) {
      this.current = val;
    },
    refund(row) {
      this.open4(row);
    },

    // 退款模态框------------

    open4(row) {
      const h = this.$createElement;
      this.$msgbox({
        title: "退款确认",
        message: h("p", null, [
          h("span", null, "是否确认"),
          h("i", { style: "color: teal" }, "退款")
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            // instance.confirmButtonText = '执行中...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 100);
            }, 500);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: "success",
          message: "退款成功"
        });
        row.refundState = "1";
        console.log(this.data)
        this.$http.post("orderModify", qs.stringify({
          orderId:row.orderId,//传入订单id
          refundState:row.refundState //传入索要更改的字段
        }));

        row.disabled = true;
      });
    },
    // 查看弹出框
    handleEdit(index, row) {
      this.form = {
        orderId: row.orderId,
        newTime: row.newTime,
        totalMoney: row.totalMoney,
        orderStatus: row.orderStatus,
        realTotalMoney:row.realTotalMoney,
        goodsName: row.goodsInfo[0].goodsName,
        goodLargeImg: row.imgSrc
      };
      this.editVisible = true;
    },
    confirm() {
      this.editVisible = false;
    }
  },

  //分页---------
  computed: {
    data1() {
      var arr = [];
      var current = this.current;
      var size = this.size;
      for (var i = (current - 1) * size; i < (current - 1) * size + size; i++) {
        if (this.tableData[i]) arr.push(this.tableData[i]);
      }
      return arr;
    },
    total() {
      return this.tableData.length;
    }
  },
  watch: {
    searshArr: {
      handler() {
        let xiadanTime = this.searshArr.xiadanTime || null;
        let goodsName = this.searshArr.goodsName.trim() || "";
        let ordersNum = this.searshArr.ordersNum.trim() || "";
        let newArr = [];
        if (ordersNum === "") {
          console.log(this);
          newArr.push(...this.data); //注意数据中转，不能陷入死循环
        } else {
          this.tableData.forEach(item => {
            if (item.orderunique.indexOf(ordersNum) > -1) newArr.push(item);
          });
        }
        if (goodsName !== "") {
          let i = newArr;
          newArr = [];
          i.forEach(item => {
            if (item.goodsInfo[0].goodsName.indexOf(goodsName) > -1)
              newArr.push(item);
          });
        }
        if (xiadanTime) {
          let i = newArr;
          let start = new Date(xiadanTime[0]);
          let end = new Date(xiadanTime[1]);
          newArr = [];
          i.forEach(item => {
            let now = new Date(item.newTime);
            if (start >= now && now <= end) newArr.push(item);
          });
        }
        this.tableData = newArr;
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
#afterSales {
  width: 100%;
  height: 100%;
  overflow: hidden;
  #afterSales_body {
    background-color: white; // height: 60px;
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
    }
    .tableData {
      padding-left: 22px;
      margin-top: 10px;
    } // el-picker-panel el-date-range-picker el-popper has-sidebar
    .el-date-range-picker {
      position: absolute !important;
      top: 200px;
    }
  }
  .pages {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 20px 0;
  }
}
</style>

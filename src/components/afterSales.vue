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
          <el-date-picker size="small" v-model="xiadandata" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
        <!-- 搜索 -->
        <div class="search">
            <div>
                下单时间:
                <el-date-picker v-model="xiadandata" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                </el-date-picker>
            </div>

        <div>
          订单号:
          <el-input size="small" placeholder="请输入订单号" suffix-icon="el-icon-search" v-model="ordersId">
          </el-input>
        </div>
        <div>
          商品名称:
          <el-input size="small"placeholder="请输入商品名" suffix-icon="el-icon-search" v-model="goodsName">
          </el-input>
        </div>
      </div>

      <!-- 表格 -->
      <div class="tableData">
        <el-table border ref="multipleTable" :data="tables" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column prop="orderId" header-align="center" align="center" label="订单id" width="100">
          </el-table-column>
          </el-table-column>
          <el-table-column prop="orderunique" header-align="center" align="center" label="订单号" width="200">
          </el-table-column>
          <el-table-column prop="goodsInfo[0].goodsName" align="center" header-align="center" label="商品名称" show-overflow-tooltip>
          </el-table-column>
          <!-- </el-table-column>
          <el-table-column prop="goodsInfo[0].goodsImg" align="center" header-align="center" label="商品图片" show-overflow-tooltip>
          </el-table-column> -->
                <el-table-column prop="goodsInfo[0].goodsPrice" align="center" header-align="center" label="商品价格" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="goodsInfo[0].goodsPrice" align="center" header-align="center" label="退款金额" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="goodsInfo[0].goodsNum" align="center" header-align="center" label="数量" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="refunInstruction" align="center" header-align="center" label="退款说明" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="orderStatus" align="center" header-align="center" label="订单状态" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="refunState1" align="center" header-align="center" label="退款状态" show-overflow-tooltip>

                </el-table-column>
                <el-table-column prop="newTime" label="下单日期" align="center" header-align="center" width="120">
                </el-table-column>
                <el-table-column label="操作" header-align="center" align="center">
                    <template slot-scope="scope">
              <el-row>
                <el-button size="mini" type="primary" @click="refund(scope.row)">退款</el-button>
              </el-row>
            </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="pages">
                <el-pagination ref="pages" layout="prev, pager, next" :total="total" :page-size="size" @current-change="setCurrent">
                </el-pagination>
            </div>
            <div class="modal">
            </div>
        </div>
        <div class="modal">
        </div>
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
      goodsName: "", //商品名
      ordersId: "",
      refst: false,
      current: 1, //当前页
      size: 5,
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
            resp.data.data.forEach(item => {
              item.newTime = that.formatDate(item.createTime);
              this.tableData = resp.data.data;
              item.orderStatus = that.orderStatus(item.orderStatus);
              item.refunState1 = that.refunState(0);
              // console.log(that.orderStatus(item.orderStatus))
            });
            this.tableData = resp.data.data;
            resolve("ok");
            // console.log(resp.data.data);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    refunState(refst) {
      var refunStatetext = " ";
      if (refst) {
        refunStatetext = "已退款";
      } else {
        refunStatetext = "未退款";
      }
      return refunStatetext;
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
                        resp.data.data.forEach(item => {
                            item.newTime = that.formatDate(item.createTime);
                            this.tableData = resp.data.data;
                            item.orderStatus = that.orderStatus(item.orderStatus);
                            item.refunState1 = that.refunState();
                            // console.log(that.orderStatus(item.orderStatus))
                        });
                        this.tableData = resp.data.data;
                        resolve("ok");
                        // console.log(resp.data.data);
                    }
                },
                err => {
                    console.log(err);
                }
            );
        },
        refunState(refst) {
            var refunStatetext = " ";
            if (refst) {
                refunStatetext = "已退款";

            } else {
                refunStatetext = "未退款";
            }
            return refunStatetext;
        },

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

    // 模态框------------
    
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
        row.refunState1 = "已退款";
      });
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
    // 搜索-------------
    tables: function() {
      if (this.goodsName == "") {
        return this.data1;
      } else {
        var newArr = [];
        for (var i = 0; i < this.tableData.length; i++) {
          if (
            this.tableData[i].goodsInfo[0].goodsName.indexOf(this.goodsName) > -1) {
            newArr.push(this.tableData[i]);
          }
        }
        return newArr;
      }
      if (this.ordersId == "") {
        return this.data1;
      } else {
        var orderArr = [];
        for (var j = 0; j < this.tableData.length; j++) {
          if (this.tableData[j].orderunique.indexOf(this.ordersId) > -1) {
            orderArr.push(this.tableData[j]);
          }
        }
        return orderArr;
      }
    },
    total() {
      // console.log(this.tableData.length)
      return this.tableData.length;
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
            >div {
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
      width: 17%;
      margin-top: 30px;
      position: absolute;
      right: 7%;
      // top: 25%;
    }
  }
}
</style>

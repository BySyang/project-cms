<template>
  <div class="orders">
    <div class="orders_main">
      <div class="main_top">
        <div>评论管理</div>
      </div>
      <div class="search">
        <div>
          评论时间:
          <el-date-picker v-model="searchData.commentDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" 
              type="daterange" align="left" unlink-panels range-separator="至" 
              start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>

        <div>
          商品名称:
          <el-input v-model="searchData.goodsName" placeholder="请输入商品名称" prefix-icon="el-icon-search">
          </el-input>
        </div>


        <div>
          用户名:
          <el-input v-model="searchData.username" placeholder="请输入用户名" prefix-icon="el-icon-search">
          </el-input>
        </div>

      </div>
      <div class="table">
        <el-table border ref="multipleTable" :data="tableDate" tooltip-effect="dark" style="width: 100%">

            <el-table-column prop="username" header-align="center" align="center" label="用户名" width="153">
            </el-table-column>

            <el-table-column prop="goodsName" align="center" header-align="center" label="商品名称" show-overflow-tooltip width="153">
            </el-table-column>

            <el-table-column prop="scoreText" align="center" header-align="center" label="评论内容" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="createTime" align="center" header-align="center" label="评论时间" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="orderScore" align="center" header-align="center" label="评分" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-rate size="small" v-model="scope.row.orderScore" disabled text-color="#ff9900">
                </el-rate>
              </template>
            </el-table-column>

            <el-table-column prop="reply" align="center" header-align="center" label="回复详情" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="isShow" align="center" header-align="center" label="是否显示" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.isShow" :active-value="1" :inactive-value="0" active-color="#409eff" inactive-color="#dcdfe6" @change="openJudge(scope.row)"></el-switch>
                </template>
            </el-table-column>
          
            <el-table-column align="center" header-align="center" label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button type="text" @click="huifu(scope.row)">回复</el-button>
              </template>
            </el-table-column>

        </el-table>

        <!-- 分页 -->
        <div class="block">
          <el-pagination ref="pages" layout="prev, pager, next" :total="total" :page-size="size" @current-change="setCurrent">
          </el-pagination>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      data: [],
      date2: [],
      searchData: {
        commentDate: [],
        goodsName: "",
        username: ""
      },
      current: 1,
      size: 5
    };
  },
  //获取用户名
  created() {
    this.getData();
  },
  watch: {
    //搜索
    searchData: {
      handler(curVal, oldVal) {
        // console.log(curVal);
        var arr1 = [];
        let commentDate = curVal.commentDate;
        if (commentDate != null && commentDate.length > 0) {
          let beginDate = commentDate[0].replace(/-/g, "");
          let endDate = commentDate[1].replace(/-/g, "");
          // console.log("beginDate:" + beginDate + ",endDate:" + endDate);
          this.data.forEach(item => {
            let createDate = item.createTime.replace(/-/g, "");
            if (createDate >= beginDate && createDate <= endDate) {
              arr1.push(item);
            }
          });
        } else {
          arr1 = this.data;
        }
        var arr2 = [];
        if (curVal.goodsName != null && curVal.goodsName != "") {
          arr1.forEach(item => {
            if (item.goodsName.indexOf(curVal.goodsName) > -1) {
              arr2.push(item);
            }
          });
        } else {
          arr2 = arr1;
        }
        var arr3 = [];
        if (curVal.username != null && curVal.username != "") {
          arr2.forEach(item => {
            if (item.username.indexOf(curVal.username) > -1) {
              arr3.push(item);
            }
          });
        } else {
          arr3 = arr2;
        }
        return (this.date2 = arr3);
      },
      deep: true
    }
  },
  //获取数据
  methods: {
    getData() {
      this.$http.get("/goodScoreList").then(res => {
        //开关按钮
        res.data.data.forEach(item => {
          item.createTime = item.createTime.substr(0, 10);
        });
        this.data = res.data.data;
        this.date2 = res.data.data;
      });
    },
    //回复弹框
    huifu(row) {
      this.$prompt("请输入回复内容", "提示", {})
        .then(ele => {
          let param = {
            value: ele.value,
            scoreId: row.scoreId
          };
          this.$http
            .post("/updateGoodScoreReplyInfo", qs.stringify(param))
            .then(res => {
              // console.log(res);
              row.reply = param.value;
              this.getData();
              this.$message({
                type: "success",
                message: "提交成功"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    //设置选中
    setCurrent(val) {
      this.current = val;
    },
    //开关状态
    openJudge(row) {
      let isShow = row.isShow;
      let param = {
        isShow: isShow,
        scoreId: row.scoreId
      };
      this.$confirm("是否确定改变状态", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(param);
          this.$http.post("/updateGoodScoreIsShow", param).then(res => {
            console.log(res);
            this.$message({
              type: "success",
              message: "改变成功!"
            });
          });
        })
        .catch(() => {
          row.isShow = isShow == 1 ? 0 : 1;
          this.$message({
            type: "info",
            message: "已取消改变"
          });
        });
    }
  },
  //分页
  computed: {
    tableDate() {
      var arr = [];
      var current = this.current;
      var size = this.size;
      for (var i = (current - 1) * size; i < (current - 1) * size + size; i++) {
        if (this.date2[i]) arr.push(this.date2[i]);
      }
      return arr;
    },
    total() {
      return this.date2.length;
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
      color: white;
      border-bottom: 1px solid #e5e6e6;
      div {
        position: absolute;
        top: 0;
        left: 22px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #59ace2;
      }
    }
    .search {
      padding: 10px 0 0 10px;
      > div {
        width: 28%;
        display: inline-block;
        margin-left: 11px;
        .el-range-editor.el-input__inner {
          width: 75%;
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
    .block {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin: 20px 0;
    }
  }
}
</style>
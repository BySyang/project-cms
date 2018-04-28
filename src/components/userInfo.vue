<template>
  <div class="orders">
    <div class="orders_main">
      <div class="main_top">
        <div>会员信息</div>
      </div>
      <div class="search">
        <div>
          注册时间:
          <el-date-picker v-model="xiadandata" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div>
          用户名:
          <el-input placeholder="请输入用户名" prefix-icon="el-icon-search" v-model="select_word">
          </el-input>
        </div>
        <!--<div>-->
        <!--<el-button type="primary" icon="el-icon-search">搜索</el-button>-->
        <!--</div>-->
      </div>
      <div class="table">
        <el-table border ref="multipleTable" :data="data1" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="userId" header-align="center" align="center" label="用户id" width="65">
          </el-table-column>
          <el-table-column prop="userName" align="center" header-align="center" label="用户名" width="150" show-overflow-tooltip>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="头像" show-overflow-tooltip>
            <template slot-scope="scope">
              <img style="width:80%;height:80%" :src="'../static/'+scope.row.imgsrc" alt="" />
            </template>
          </el-table-column>
          <el-table-column prop="userSex" align="center" header-align="center" label="性别" width="65" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="userPhone" align="center" header-align="center" label="联系号码" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="userEmail" align="center" header-align="center" label="邮箱" width="170" show-overflow-tooltip>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="生日" width="190" show-overflow-tooltip>
            <template slot-scope="scope">
              {{(scope.row.userBirthday.substr(0,10))+"---"+(scope.row.userBirthday.substr(11,8))}}
            </template>
          </el-table-column>
          <el-table-column prop="rankId" label="会员等级" align="center" header-align="center" width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作" header-align="center" align="center">
            <template slot-scope="scope">
              <el-row>
                <el-button size="mini" type="primary" @click="refund(scope.row)">禁用</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination ref="pages" layout="prev, pager, next" :total="total" :page-size="size" @current-change="setCurrent">
          </el-pagination>
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
      jiaoyistats: "",
      goodsName: "",
      select_word: "",
      ordersId: "",
      // userId: "",
      xiadandata: "",
      current: 1,
      size: 5,
      is_search: false,
      data: []
    };
  },
  //分页
  computed: {
    data1() {
      var arr = [];
      var current = this.current;
      var size = this.size;
      for (var i = (current - 1) * size; i < (current - 1) * size + size; i++) {
        if (this.data[i]) arr.push(this.data[i]);
      }
      return arr;
    },
    //搜索
    tables: function() {
      if (this.select_word == "") {
        return this.data1;
      } else {
        var newArr = [];
        for (var i = 0; i < this.data.length; i++) {
          if (this.data[i].userName.indexOf(this.select_word) > -1) {
            newArr.push(this.data[i]);
          }
        }
        return newArr;
      }
    },
    total() {
      return this.data.length;
    }
  },
  created() {
    this.getData();
  },
  //获取数据
  methods: {
    getData() {
      var that = this;
      this.$http
        .get("/userInfo")
        .then(res => {
          var newArr = [];
          this.data = res.data.data;
          this.data.forEach(item => {
            item.imgsrc = that.slic(item.userPhoto);
            newArr.push(item);
          });
          this.data = newArr;
        })
        .catch(err => {
          console.log(err);
        });
    },
    setCurrent(val) {
      this.current = val;
    },
    slic(str) {
      var long = str.slice(9);
      return long;
    },
    refund(row) {
      this.open4(row);
    },

    // 模态框------------

    open4(row) {
      const h = this.$createElement;
      this.$msgbox({
        title: "禁用确认",
        message: h("p", null, [
          h("span", null, "是否确认"),
          h("i", { style: "color: teal" }, "禁用")
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
          message: "禁用成功"
        });
        row.refunState1 = "已禁用";
      });
    }
    //    getName() {
    //      this.data.forEach(item => {
    //        this.$http.get("/userInfo?" + "userId=" + item.userId).then(res => {
    //          this.$set(item, "username", res.data.data[0].userName);
    //        });
    //      });
    //    },
  }

  //
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
  .block {
    width: 17%;
    margin-top: 30px;
    position: absolute;
    right: 7%;
  }
  .pagination {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 20px 0;
  }
}
</style>

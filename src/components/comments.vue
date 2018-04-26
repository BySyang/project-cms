<template>
  <div class="orders">
    <div class="orders_main">
      <div class="main_top">
        <div>评论管理</div>
      </div>
      <div class="search">
        <div>
          评论时间:
          <el-date-picker v-model="xiadandata" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
          </el-date-picker>
        </div>

        <div>
          评论人:
          <el-input v-model="select_word" placeholder="请输入姓名" prefix-icon="el-icon-search">
          </el-input>
        </div>

        <div>
          <el-button type="primary" @click="searchpl" icon="el-icon-search">搜索</el-button>
        </div>

      </div>
      <div class="table">
        <el-table border ref="multipleTable" :data="tables" tooltip-effect="dark" style="width: 100%">
          <!-- <el-table-column prop="userId" header-align="center" align="center" label="用户名" width="100">
          </el-table-column> -->

          <el-table-column prop="username" header-align="center" align="center" label="用户名" width="100">
          </el-table-column>

          <el-table-column prop="scoreText" align="center" header-align="center" label="评论内容" show-overflow-tooltip>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="评论时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.createTime.substr(0,10) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderScore" align="center" header-align="center" label="评分" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="isShow" align="center" header-align="center" label="是否显示" show-overflow-tooltip>
          </el-table-column>
        </el-table>

        <div class="block">
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
     tables:function(){
        if(this.select_word==""){
          return this.data1
        }else{
          var newArr=[];
          for(var i=0;i<this.data1.length;i++){
            if(this.data1[i].username.indexOf(this.select_word)>-1){
              newArr.push(this.data1[i])
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
    new Promise((a, b) => {
      this.getData(a);
    }).then(() => {
      this.getName();
    });
  },
  //获取数据
  methods: {
    getData(a) {
      this.$http.get("/goodScoreList").then(res => {
        this.data = res.data.data;
        a("");
      });
    },
    setCurrent(val) {
      this.current = val;
    },
    getName() {
      this.data.forEach(item => {
        this.$http.get("/userInfo?" + "userId=" + item.userId).then(res => {
          this.$set(item, "username", res.data.data[0].userName);
        });
      });
    },
    // searchpl() {
    //   this.$http.get("/goodScoreList").then(res => {
    //     this.data = res.data.data;
    //   })
    // }
},

//
}

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
        background-color: #59ace2;
      }
    }
    .search {
      padding: 10px 0 0 10px;

      > div {
        width: 28%;
        display: inline-block;
        .el-range-editor.el-input__inner {
          width: 70%;
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
<template>
  <div class="orders">
    <div class="orders_main">
      <div class="main_top">
        <div>评论管理</div>
      </div>
      <div class="search">
        <div>
          评论时间:
          <el-date-picker v-model="comment_date" @change="dateFilter" format="yyyy-MM-dd" value-format="yyyy-MM-dd" 
              type="daterange" align="left" unlink-panels range-separator="至" 
              start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>

        <div>
          商品名称:
          <el-input v-model="goodsName" @input="goodsNameFilter" placeholder="请输入商品名称" prefix-icon="el-icon-search">
          </el-input>
        </div>


        <div>
          评论人:
          <el-input v-model="username" placeholder="请输入姓名" prefix-icon="el-icon-search">
          </el-input>
        </div>

        <!-- <div>
          <el-button type="primary" @click="searchpl" icon="el-icon-search">搜索</el-button>
        </div> -->
      </div>
      <div class="table">
        <el-table border ref="multipleTable" :data="tables" tooltip-effect="dark" style="width: 100%">
          <!-- <el-table-column prop="userId" header-align="center" align="center" label="用户名" width="100">
          </el-table-column> -->

          <el-table-column prop="username" header-align="center" align="center" label="用户名" width="153">
          </el-table-column>

           <el-table-column prop="goodsName" align="center" header-align="center" label="商品名称" show-overflow-tooltip width="153">
          </el-table-column>

          <el-table-column prop="scoreText" align="center" header-align="center" label="评论内容" show-overflow-tooltip>
          </el-table-column>

          <el-table-column align="center" header-align="center" label="评论时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.createTime.substr(0,10) }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="orderScore" align="center" header-align="center" label="评分" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-rate size="small" v-model="scope.row.orderScore" disabled text-color="#ff9900">
              </el-rate>
            </template>
          </el-table-column>

           <!-- <el-table-column prop="orderScore" align="center" header-align="center" label="回复" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-rate size="small" v-model="scope.row.orderScore" disabled text-color="#ff9900">
              </el-rate>
            </template>
          </el-table-column> -->

          <el-table-column prop="isShow" align="center" header-align="center" label="是否显示" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-switch v-model="scope.row.isShow" active-color="#409eff" inactive-color="#dcdfe6"></el-switch>
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
export default {
  data() {
    return {
      multipleSelection: [],
      goodsName: "",
      username: "",
      ordersId: "",
      userId: "",
      comment_date: "",
      current: 1,
      size: 5,
      is_search: false,
      data: []
    };
  },
  //获取用户名
  created() {
    new Promise((a, b) => {
      this.getData(a);
    }).then(() => {
      // this.getName();
    });
  },
  //获取数据
  methods: {
    getData() {
      this.$http.get("/goodScoreList").then(res => {
        //开关
        res.data.data.forEach(item=>{
          item.isShow = item.isShow==1?true:false;
        })
        this.data = res.data.data;
        // console.log(this.data)
      });
    },
    //设置选中
    setCurrent(val) {
      this.current = val;
    },
    dateFilter(val){
      console.log(val)
    },
    goodsNameFilter(val){
      debugger;
      var data2 = [];
      for(var i=0;i<this.data.length;i++){
        if(val.indexOf(this.data[i].goodsName) == -1){
          data2.push(this.data[i]);
        }
      }
      console.log(data2);
      return data2;
    }
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
      return this.data1;
    },
    total() {
      return this.data.length;
    }
  },
  created() {
    this.getData();
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
      color:white;
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
  }}
</style>

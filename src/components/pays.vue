<template>
  <div class="pays_section">
    <div class="pays_content">
      <div class="topBox">
        <div>支付管理</div>
      </div>
      <div class="pays_centerBox">
        <div class="centerContent">
          <!-- 提示区域 -->
          <el-alert title="提示：" description="该支付方式启用并不能正常使用，需要开通支付功能才能使用相应的支付方式。" type="error" :closable="false"></el-alert>
          <!-- 添加支付区域 -->
          <div class="centerTop">
            <!-- <span>在线支付方式</span> -->
            <el-button type="primary">添加支付</el-button>
          </div>
          <!-- 表格展示支付方式 -->
          <div class="paymentBox">
            <el-table ref="multipleSelection" :data="tableData" border style="width: 100%">
              <el-table-column prop="payName" label="支付方式" width="180" align="center">
              </el-table-column>
              <el-table-column prop="payImg" label="图片" width="180" align="center">
                <template slot-scope="scope">
                  <img :src="'../static/'+scope.row.payImg" height="60" />
                </template>
              </el-table-column>
              <el-table-column prop="payInfo" label="简介" align="center">
              </el-table-column>
              <el-table-column prop="isOn" label="状态" width='140' align="center">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.isOn" active-text="启用" inactive-text="禁用" :active-value="1" :sinactive-value="0">
                  </el-switch>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
      size: 5,
      multipleSelection: [],
      tableData: []
    };
  },
  // 调用创建后的实例
  created() {
    this.getData();
  },
  // 计算分页
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
    total() {
      return this.tableData.length;
    }
  },
  methods: {
    //获取数据
    getData() {
      this.$http
        .get("/pays")
        .then(res => {
          var newArr = [];
          this.tableData = res.data.data;
          this.data.forEach(item => {
            item.imgsrc = that.slic(item.payImg);
            newArr.push(item);
          });
          this.data = newArr;
        })
        .catch(err => {
          console.log(err);
        });
    },
    slic(str) {
      var cc = str.slice(9);
      return cc;
    },
    setCurrent(val) {
      this.current = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.pays_section {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  .pays_content {
    margin: 1% auto;
    width: 98%;
    height: 96%;
    background-color: white;
    box-shadow: 0 -3px 0 0 #59ace2; // outline: 1px solid red;
    .topBox {
      position: relative;
      height: 30px;
      padding-left: 22px;
      margin: 1% auto;
      background-color: white;
      border-bottom: 1px solid #e5e6e6;
      div {
        color: white;
        position: absolute;
        top: 0;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #59ace2;
      }
    }
    .pays_centerBox {
      margin-top: 1%;
      height: 92%; // border:1px solid #e5e6e6;

      .centerContent {
        padding: 0px 22px;
        .centerTop {
          height: 50px;
          padding-top: 10px;
          // background: linear-gradient(#fefefe, #f1f1f1);
          span {
            line-height: 40px;
          }
          .el-button {
            width: 10%;
            display: inline-block;
            float: right;
          }
        }
        .paymentBox {
          margin-top: 5px;
        }
        .pagination {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          margin: 20px 0;
        }
      }
    }
  }
}
</style>

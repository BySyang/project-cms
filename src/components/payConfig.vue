<template>
<div class="pays_section">
  <div class="pays_content">
    <div class="topBox">
      <div>支付配置</div>
    </div>
    <div class="other_pays">
      <div class="otherInfo">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="配置其他" width="180" align="center">
          </el-table-column>
          <el-table-column prop="introduce" label="介绍" align="center">
          </el-table-column>
          <el-table-column prop="judge" label="状态" width='140' align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.judge" active-text="启用" inactive-text="禁用" :active-value="1" :inactive-value="0" @change="openJudge(scope.row)">              
              <!-- <el-switch v-model="scope.row.judge" active-text="启用" inactive-text="禁用"> -->
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
</template>

<script>
export default {
  data() {
    return {
      value1: true,
      value2: true,
      current: 1,
      size: 5,
      tableData: [{
          name: "发票",
          introduce: "发票是指一切单位和个人在购销商品、提供或接受服务以及从事其他经营活动中，所开具和收取的业务凭证，是会计核算的原始依据，也是审计机关、税务机关执法检查的重要依据。收据才是收付款凭证，发票只能证明业务发生了，不能证明款项是否收付。",
          judge: "",
          isOn:1
        },
        {
          name: "优惠券",
          introduce: "优惠券可降低产品的价格，是一种常见的消费者营业推广工具。优惠券可以印在杂志的插页上、或夹在报纸中随报附送、或附在产品的包装上、或放置在商店中让人索取，有时甚至可以派人在街上分送。",
          judge: "",
          isOn:1
        },
        {
          name: "代收人",
          introduce: "不是用户自己收货,委托别人替为代收。该人就称为“代收人”",
          judge: "",
          isOn:1
        }
      ]
    };
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
  methods:{
    setCurrent(val) {
      this.current = val;
    }
  },
  // switch提示弹框
    openJudge(row) {
      let isOn = row.isOn;
      this.$confirm("是否确定改变状态", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "改变成功!"
          });
        })
        .catch(() => {
          row.isOn = isOn == 1 ? 0 : 1;
          this.$message({
            type: "info",
            message: "已取消改变"
          });
        });
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
    .other_pays {
      margin-top: 1%;
      height: 92%; // border:1px solid #e5e6e6;
    }
    .otherInfo {
      padding: 10px 22px 0;
    }
  }
  .pagination {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 20px 0;
  }
}
</style>

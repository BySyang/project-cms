<template>
  <div id="afterSales">
    <div id="afterSales_body">
      <div class="main_top">
        <div class="afterSales_text">售后服务</div>
      </div>
      <div class="search">
        <div>
          下单时间:
          <el-date-picker
            v-model="xiadandata"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
        <div>
          订单号:
          <el-input
            placeholder="请输入订单号"
            suffix-icon="el-icon-search"
            v-model="ordersId">
          </el-input>
        </div>
        <div>
          商品名称:
          <el-input
            placeholder="请输入商品名"
            suffix-icon="el-icon-search"
            v-model="goodsName">
          </el-input>
        </div>
      </div>
      <div class="tableData">
        <el-table
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            header-align="center"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            prop="ordersId"
            header-align="center"
            align="center"
            label="订单号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="goosdName"
            align="center"
            header-align="center"
            label="商品名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="goodsPrice"
            align="center"
            header-align="center"
            label="商品价格"
            show-overflow-tooltip>
          </el-table-column>
         
          <el-table-column
            prop="refundPrice"
            align="center"
            header-align="center"
            label="退款金额"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="goodsCount"
            align="center"
            header-align="center"
            label="数量"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="refunInstruction"
            align="center"
            header-align="center"
            label="退款说明"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="ordersState"
            align="center"
            header-align="center"
            label="订单状态"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="refunState"
            align="center"
            header-align="center"
            label="退款状态"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="下单日期"
            align="center"
            header-align="center"
            width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="操作" header-align="center" align="center">
            <template slot-scope="scope">
              <el-row>
                    
                <el-button size="mini" type="primary" @click="refund(scope.$index, scope.row)">退款</el-button>
              </el-row>
             
              
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      multipleSelection: [],
      tableData:[
        {date:"2016.3.9"},
        {data:"2017.5.8"},
        {data:"2017.5.9"}
      ]




    };
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
    background-color: white;
    // height: 60px;
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
        background-color: #59ace2;
      }
    }
    .search{
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
      // div:nth-of-type(3),
      // div:nth-of-type(4) {
      //   width: 28%;
      // }
    }
    .tableData{
      padding-left: 22px;
      margin-top: 10px
    }
  }
}
</style>
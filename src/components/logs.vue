<template>
    <div class="logs_section">
        <div class="logs_content">
            <div class="topBox">
                <div>系统日志</div>
            </div>
            <div class="logs_centerBox">
                <el-table border ref="multipleTable" :data="orsersTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column prop="orderunique" header-align="center" align="center" label="登录名" width="150">
                    </el-table-column>
                    <el-table-column prop="userId" align="center" header-align="center" label="状态" width="100" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="totalMoney" align="center" header-align="center" label="IP地址" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="orderRemarks" align="center" header-align="center" label="访问地址" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="adminRemarks" align="center" header-align="center" label="开始时间" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="newstatus" align="center" header-align="center" label="结束时间" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.logs_section {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  .logs_content {
    margin: 1% auto;
    width: 98%;
    height: 96%;
    background-color: white;
    box-shadow: 0 -3px 0 0 #59ace2;
    // outline: 1px solid red;
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
    .logs_centerBox {
      margin-top: 1%;
      height: 92%;
      // border:1px solid #e5e6e6;
      width: 96%;
      margin: 10px auto;
    }
  }
}
</style>
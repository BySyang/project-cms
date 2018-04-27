<template>
  <div class="logs_section">
    <div class="logs_content">
      <div class="topBox">
        <div>系统日志</div>
      </div>
      <div class="logs_centerBox">
        <el-table border  :data="tableData" tooltip-effect="dark" style="width: 100%" >
          <el-table-column prop="adminName" header-align="center" align="center" label="登录名" width="150">
          </el-table-column>
          <el-table-column prop="state" align="center" header-align="center" label="状态" width="100" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="IPaddress" align="center" header-align="center" label="IP地址" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="accessAddress" align="center" header-align="center" label="访问地址" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="startTime" align="center" header-align="center" label="开始时间" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="endTime" align="center" header-align="center" label="结束时间" show-overflow-tooltip>
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
      current: 1,
      size: 5,
      tableData: [
        {
          adminName: "admin",
          state: "1",
          IPaddress: "172.16.13.9",
          accessAddress:"172.16.13.19",
          startTime:"2018-04-27 18:55:51",
          endTime:"2018-04-27 18:58:51"
        },
        {
          adminName: "admin",
          state: "1",
          IPaddress: "172.16.13.20",
          accessAddress:"172.16.13.19",
          startTime:"2018-04-27 11:45:42",
          endTime:"2018-04-27 11:55:51"
        },
        {
          adminName: "admin",
          state: "1",
          IPaddress: "172.16.13.16",
          accessAddress:"172.16.13.19",
          startTime:"2018-04-26 13:15:21",
          endTime:"2018-04-26 13:23:51"
        },
        {
          adminName: "admin",
          state: "1",
          IPaddress: "172.16.13.3",
          accessAddress:"172.16.13.19",
          startTime:"2018-04-24 18:55:51",
          endTime:"2018-04-24 19:00:00"
        },
        {
          adminName: "admin",
          state: "1",
          IPaddress: "172.16.13.21",
          accessAddress:"172.16.13.19",
          startTime:"2018-04-23 10:55:51",
          endTime:"2018-04-23 11:55:01"
        }
      ]
    };
  },
  computed:{
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
    .logs_centerBox {
      margin-top: 1%;
      height: 92%; // border:1px solid #e5e6e6;
      width: 96%;
      margin: 10px auto;
      .pagination{
        
      }
    }
  }
}
</style>

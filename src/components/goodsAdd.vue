<template>
  <div id="goods">
    <div class="main">
      <div class="main_top">
        <div>商品管理</div>
      </div>
      <div class="search">
        <el-row>
          <el-col :span="2" class="span1">上架时间:</el-col>
          <el-col :span="4">
            <el-date-picker size="small" v-model="searchArr.time" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-col>
          <el-col :span="2" class="span1 style1">商品名称:</el-col>
          <el-col :span="3">
            <el-input size="small" v-model="searchArr.goodsName" placeholder="请输入商品名" prefix-icon="el-icon-search"></el-input>
          </el-col>
          <el-col :span="2" class="span1">商品系列:</el-col>
          <el-col :span="3">
            <el-select size="small" v-model="searchArr.goodsType" placeholder="请选择">
              <el-option label="全部" value="全部"></el-option>
              <el-option v-for="item in types" :key="item.typeId" :label="item.typeName" :value="item.typeName"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" class="span1">商品价格:</el-col>
          <el-col :span="3">
            <el-input size="small" v-model="searchArr.goodSvg" placeholder="请输入商品价格" prefix-icon="el-icon-search"></el-input>
          </el-col>
          <el-col :span="2" :push="1">
            <el-button size="small" type="primary">添加商品</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table-wrap">
        <el-table :data="data1" border style="width: 100%" stripe show-header tooltip-effect="dark" align="center">
          <el-table-column type="selection" width="30" label="批量删除"></el-table-column>
          <el-table-column prop="goodsId" sortable label="商品ID" show-overflow-tooltip width="90" align="center"> </el-table-column>
          <el-table-column prop="goodsName" label="商品名" show-overflow-tooltip align="center" width="120"> </el-table-column>
          <el-table-column prop="typeName" label="商品系列" show-overflow-tooltip align="center" width="90"> </el-table-column>
          <el-table-column prop="goodsDesc" label="商品描述" show-overflow-tooltip align="center" width="90"></el-table-column>
          <el-table-column prop="goodSvg" label="商品价格" show-overflow-tooltip align="center" width="80"></el-table-column>
          <el-table-column prop="goodStock" label="商品库存" show-overflow-tooltip align="center" width="80"></el-table-column>
          <el-table-column prop="goodscore" label="商品评价" show-overflow-tooltip align="center" width="130">
            <template slot-scope="scope">
              <el-rate size="small" v-model="scope.row.goodscore" disabled text-color="#ff9900">
              </el-rate>
            </template>
          </el-table-column>
          <el-table-column prop="isSale" label="是否上架" show-overflow-tooltip align="center" width="100">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.isSale" active-color="#409eff" inactive-color="#dcdfe6"></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="isHot" label="是否热销" align="center" width="100">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.isHot" active-color="#409eff" inactive-color="#dcdfe6"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="上架时间" align="center">
            <template slot-scope="scope">
              {{scope.row.createTime.substr(0,10)}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row class="page">
        <el-col :span="3" :push="16">
          <el-pagination ref="pages" layout="prev, pager, next" :total="total" :page-size="size" @current-change="setCurrent">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      data: [],
      data2: [],
      types: [],
      current: 1,
      size: 5,
      searchArr: {
        goodsName: "",
        goodsType: "全部",
        goodSvg: "",
        time: null
      }
    };
  },
  computed: {
    total() {
      return this.data2.length;
    },
    data1() {
      var arr = [];
      var current = this.current;
      var size = this.size;
      for (var i = (current - 1) * size; i < (current - 1) * size + size; i++) {
        if (this.data2[i]) arr.push(this.data2[i]);
      }
      return arr;
    }
  },
  created() {
    this.getData();
    this.getTypes();
  },
  watch: {
    searchArr: {
      handler() {
        let time = this.searchArr.time || null; //开始时间
        let goodsType = this.searchArr.goodsType; //商品类型
        let goodSvg = this.searchArr.goodSvg.trim() || ""; //商品价格
        let goodsName = this.searchArr.goodsName.trim() || ""; //商品名
        let arr = [];
        if (goodsType === "全部") {
          arr.push(...this.data);
        } else {
          this.data.forEach(item => {
            if (item.typeName.indexOf(goodsType) > -1) arr.push(item);
          });
        }
        if (goodsName !== "") {
          let i = arr;
          arr = [];
          i.forEach(item => {
            if (item.goodsName.indexOf(goodsName) > -1) arr.push(item);
          });
        }
        if (goodSvg !== "") {
          let i = arr;
          arr = [];
          i.forEach(item => {
            if (item.goodSvg == goodSvg) arr.push(item);
          });
        }
        if (time) {
          let i = arr;
          let start = new Date(time[0]);
          let end = new Date(time[1]);
          arr = [];
          i.forEach(item => {
            let iNow = new Date(item.createTime);
            if (iNow >= start && iNow <= end) arr.push(item);
          });
        }
        this.data2 = arr;
      },
      deep: true
    }
  },
  methods: {
    setCurrent(val) {
      this.current = val;
    },
    getData() {
      this.$http
        .get("/goodsList")
        .then(res => {
          res.data.data.forEach(item => {
            item.isSale = item.isSale == 1 ? true : false;
            item.isHot = item.isHot == 1 ? true : false;
            item.isNew = item.isNew == 1 ? true : false;
          });
          this.data = res.data.data;
          this.data2 = [...this.data];
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTypes() {
      this.$http.get("goodsTypeList").then(res => {
        this.types = res.data.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#goods {
  width: 100%;
  height: 100%;
  .main {
    background: #fff;
    width: 98%;
    margin: 1% auto;
  }
  .el-range-editor.el-input__inner {
    width: 100%;
  }
  .main_top {
    padding-left: 2%;
    border-top: 3px solid #59ace2;
    color: #fff;
    border-bottom: 1px solid #eee;
    div {
      height: 30px;
      width: 100px;
      line-height: 30px;
      text-align: center;
      background: #59ace2;
    }
  }
  .search {
    .span1 {
      margin-left: 20px;
      height: 32px;
      width: 80px;
      line-height: 32px;
    }
  }
  .table-wrap {
    padding-left: 2%;
    height: 350px;
  }
}
.el-row {
  padding: 20px 0;
}
.block {
  padding-left: 20px;
}
.page {
  background: #fff;
  padding: 10px 0;
  background-clip: padding-box;
}
.el-dialog__body {
  overflow: hidden;
}
.largImg {
  width: 600px;
  height: 300px;
}
.smallImg {
  width: 200px;
}
</style>

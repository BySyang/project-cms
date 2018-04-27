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
            <el-date-picker size="small" v-model="time" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-col>
          <el-col :span="2" class="span1 style1">商品名称:</el-col>
          <el-col :span="3">
            <el-input size="small" v-model="goodsName" placeholder="请输入商品名" prefix-icon="el-icon-search"></el-input>
          </el-col>
          <el-col :span="2" class="span1">商品类型:</el-col>
          <el-col :span="3">
            <el-select size="small" v-model="goodsType" placeholder="请选择">
              <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
            </el-select>
          </el-col>
          <el-col :span="2" class="span1">商品价格:</el-col>
          <el-col :span="3">
            <el-input size="small" v-model="goodSvg" placeholder="请输入商品价格" prefix-icon="el-icon-search"></el-input>
          </el-col>
          <el-col :span="2" :push="1">
            <el-button size="small" type="primary">添加商品</el-button>
          </el-col><el-col :span="2" :push="1">
            <el-button size="small" type="primary">添加商品</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="data1" border style="width: 100%" stripe show-header tooltip-effect="dark" align="center">
        <el-table-column prop="goodsId" sortable label="商品ID" show-overflow-tooltip width="90" align="center"> </el-table-column>
        <el-table-column prop="goodsName" label="商品名" show-overflow-tooltip align="center"> </el-table-column>
        <el-table-column prop="typeName" label="商品类型" show-overflow-tooltip align="center"> </el-table-column>
        <el-table-column prop="goodsDesc" label="商品描述" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="goodSvg" label="商品价格" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="goodStock" label="商品库存" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="goodscore" label="商品评价" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-rate size="small" v-model="scope.row.goodscore" disabled text-color="#ff9900">
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column prop="isSale" label="是否上架" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isSale" active-color="#409eff" inactive-color="#dcdfe6" active-text="启用" inactive-text="禁用"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="isHot" label="是否热销" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isHot" active-color="#409eff" inactive-color="#dcdfe6" active-text="启用" inactive-text="禁用"></el-switch>
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
      <el-row class="page">
        <el-col :span="3" :push="16">
          <div class="block">
            <el-pagination ref="pages" layout="prev, pager, next" :total="total" :page-size="size" @current-change="setCurrent">
            </el-pagination>
          </div>
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
      current: 1,
      size: 5,
      time:'',
      goodsName:'',
      goodsType:'',
      goodSvg:''
    };
  },
  computed: {
    total() {
      return this.data.length;
    },
    data1() {
      var arr = [];
      var current = this.current;
      var size = this.size;
      for (var i = (current - 1) * size; i < (current - 1) * size + size; i++) {
        if (this.data[i]) arr.push(this.data[i]);
      }
      return arr;
    },
    types() {}
  },
  created() {
    new Promise((a, b) => {
      this.getData(a, b);
    })
      .then(() => {
        this.getTypes();
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    setCurrent(val) {
      this.current = val;
    },
    getData(a, b) {
      this.$http
        .get("/goodsList")
        .then(res => {
          res.data.data.forEach(item => {
            item.isSale = item.isSale == 1 ? true : false;
            item.isHot = item.isHot == 1 ? true : false;
            item.isNew = item.isNew == 1 ? true : false;
          });
          this.data = res.data.data;
          a();
        })
        .catch(err => {
          console.log(err);
          b(err);
        });
    },
    getTypes() {
      var data = this.data;
      data.forEach(item => {
        this.$http.get(`/goodsTypeList?typeId=${item.typeId}`).then(res => {
          this.$set(item, "typeName", res.data.data[0].typeName);
        });
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

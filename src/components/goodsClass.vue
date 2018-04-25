<template>
<div id="goodsClass">
  <el-row>
    <el-col :span="4">
      <el-input size="small" v-model="chooseData.name" placeholder="请输入商品分类名"></el-input>
    </el-col>
    <el-col :span="10">
      <div class="block">
        <el-date-picker  type="datetimerange" v-model="chooseData.time"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right" size="small"></el-date-picker>
      </div>
    </el-col>
    <el-col :span="6" :push="2">
      <el-button size="small"><i class="el-icon-search"></i></el-button>
    </el-col>
  </el-row>
 <el-table :data="data" border show-summary style="width: 100%">
    <el-table-column prop="typeId" sortable label="分类ID" width="100"> </el-table-column>
    <el-table-column prop="typeDes" label="分类描述"></el-table-column>
    <el-table-column prop="typeImg" sortable label="分类大图"></el-table-column>
    <el-table-column prop="typeBannerImg" sortable label="分类轮播图"></el-table-column>
    <el-table-column prop="idShow" label="是否显示"></el-table-column>
    <el-table-column label="操作">
      <el-button type="text" size="mini">修改</el-button>
      <el-button type="danger" size="mini">删除</el-button>
    </el-table-column>
  </el-table>
</div>
 
</template>
<script>
export default {
  data() {
    return {
      data: [],
      chooseData: {
        time: "",
        name: ""
      }
    };
  }
};
</script>
<style lang="scss" scoped>
#goodsClass{
  padding: 10px;
}
.el-row {
  padding: 20px 0;
}
.block {
  padding-left: 20px;
}
</style>
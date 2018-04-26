<template>
  <div id="goodsClass">
    <el-row>
      <el-col :span="4">
        <el-input size="small" v-model="chooseData.name" placeholder="请输入商品分类名"></el-input>
      </el-col>
      <el-col :span="10">
        <div class="block">
          <el-date-picker type="datetimerange" v-model="chooseData.time" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right" size="small"></el-date-picker>
        </div>
      </el-col>
      <el-col :span="6" :push="2">
        <el-button size="small">
          <i class="el-icon-search"></i>
        </el-button>
      </el-col>
    </el-row>
    <el-table :data="data" border style="width: 100%" stripe show-header>
      <el-table-column prop="typeId" sortable label="分类ID"> </el-table-column>
      <el-table-column prop="typeName" label="分类名"> </el-table-column>
      <el-table-column prop="newDesc" label="分类描述">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>第一句: {{ scope.row.newDesc[0] }}</p>
            <p>第二句: {{ scope.row.newDesc[1] }}</p>
            <p>第三句: {{ scope.row.newDesc[2] }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.newDesc.name}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="typeImg" label="分类大图">
        <template slot-scope="scope">
          <el-popover trigger="click" placement="top">
            <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeUpload" title="点击修改">
              <img :src="imgSrc||'../static/series/'+scope.row.typeBannerImg" class="avatar img">
            </el-upload>
            <p>
              <el-button size="mini">取消</el-button>
              <el-button size="mini">保存</el-button>
            </p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">查看</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="typeBannerImg" sortable label="分类轮播图">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="idShow" sortable label="是否显示"></el-table-column>
      <el-table-column prop="newTime" sortable label="创建时间"></el-table-column>
    </el-table>
    <el-row class="page">
      <el-col :span="3" :push="18">
        <div class="block">
          <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      autoUpload: true,
      imgSrc: "",
      chooseData: {
        time: "",
        name: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http
        .get("/goodsTypeList")
        .then(res => {
          res.data.data.forEach(item => {
            item.newDesc = this.editDes(item.typeDes);
            item.newDesc.name = "查看描述";
            item.newTime = this.formatDate(item.createime);
          });
          this.data = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    editDes(str) {
      return str.split("<br/>");
    },
    formatDate(dateStr) {
      var iDate = new Date(dateStr);

      function addZreo(num) {
        return num < 10 ? "0" + num : num;
      }
      return (
        iDate.getFullYear() +
        "-" +
        addZreo(iDate.getMonth() + 1) +
        "-" +
        addZreo(iDate.getDate())
      );
    },
    beforeUpload(file) {
      const isImg = file.type.startsWith("image");
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImg) this.$message.error("图片啊,我只要图片!");
      if (!isLt2M) {
        this.$message.error("上传的图片大小不能超过 2MB!");
      }
      return isLt2M && isImg;
    }
  }
};
</script>
<style lang="scss" scoped>
#goodsClass {
  padding: 10px;
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
.img {
  width: 200px;
}
</style>
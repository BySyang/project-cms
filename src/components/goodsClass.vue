<template>
  <div id="goods">
    <div class="main">
      <div class="main_top">
        <div>商品系列</div>
      </div>
      <div class="search">
        <el-row>
          <el-col :span="2" class="span1">上架时间:</el-col>
          <el-col :span="4">
            <el-date-picker size="small" v-model="time" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-col>
          <el-col :span="4" class="span1">系列名:</el-col>
          <el-col :span="3">
            <el-select size="small" placeholder="请选择系列" v-model="types">
              <el-option label="全部" value="全部"></el-option>
              <el-option v-for="item in data" :key="item.typeId" :label="item.typeName" :value="item.typeName"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" :push="10">
            <el-button size="small" type="primary">添加系列</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table-wrap">
        <el-table :data="data1" border style="width: 100%" show-header @row-click="getImg">
          <el-table-column type="selection" width="30"></el-table-column>
          <el-table-column prop="typeId" label="系列ID" align="center"> </el-table-column>
          <el-table-column prop="typeName" label="系列名" align="center"> </el-table-column>
          <el-table-column prop="newDesc" label="系列描述" align="center">
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
          <el-table-column label="系列轮播图" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="dialogVisible = true">点击查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="系列小图" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="dialogVisible = true">点击查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="是否展示" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.idShow" active-color="#409eff" inactive-color="#dcdfe6"></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="newTime" label="创建时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row class="page">
        <el-col :span="3" :push="18">
          <div class="block">
            <el-pagination layout="prev, pager, next" :total="total" :page-size="size" @current-change="setCurrent">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
      <el-dialog :title="title" :visible.sync="dialogVisible" width="50%" :lock-scroll="false">
        <el-upload list-type="picture" ref="upload0" action="/uploadImg" :auto-upload="false" :on-change="imgChange" :show-file-list="false">
          <img :src="imgSrc[0]" :class="[className?'largImg':'smallImg']">
        </el-upload>
        <el-upload ref="upload1" action="" v-if="imgSrc[1]" :on-change="imgChange" :auto-upload="false" :show-file-list="false">
          <img :src="imgSrc[1]" :class="[className?'largImg':'smallImg']">
        </el-upload>
        <el-upload ref="upload2" v-if="imgSrc[2]" action="" :on-change="imgChange" :auto-upload="false" :show-file-list="false">
          <img :src="imgSrc[2]" :class="[className?'largImg':'smallImg']">
        </el-upload>
        <el-upload ref="upload3" v-if="imgSrc[3]" action="" :on-change="imgChange" :auto-upload="false" :show-file-list="false">
          <img :src="imgSrc[3]" :class="[className?'largImg':'smallImg']">
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="uploadImg" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      data: [],
      size: 3,
      data2: [],
      current: 1,
      autoUpload: true,
      imgSrc: [],
      dialogVisible: false,
      modalOpt: true,
      title: "",
      className: true,
      index: 0,
      time: null,
      types: "全部"
    };
  },
  computed: {
    total() {
      return this.data2.length;
    },
    data1: {
      get() {
        var arr = [];
        var current = this.current;
        var size = this.size;
        for (
          var i = (current - 1) * size;
          i < (current - 1) * size + size;
          i++
        ) {
          if (this.data2[i]) arr.push(this.data2[i]);
        }
        console.log(1);
        return arr;
      }
    }
  },
  watch: {
    types: function() {
      if (this.types === "全部") {
        this.data2 = this.data;
      } else {
        var newArr = [];
        this.data.forEach(item => {
          if (item.typeName.indexOf(this.types) > -1) newArr.push(item);
        });
        this.data2 = newArr;
      }
    },
    time() {
      if (this.time == null) {
        this.data2 = this.data;
      } else {
        var newArr = [];
        var flag = false;
        this.data.forEach(item => {
          if (
            new Date(item.createime) >= new Date(this.time[0]) &&
            new Date(item.createime) <= new Date(this.time[1])
          )
            newArr.push(item);
        });
        this.data2 = newArr;
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    setCurrent(val) {
      this.current = val;
    },
    getData() {
      this.$http
        .get("/goodsTypeList")
        .then(res => {
          res.data.data.forEach(item => {
            item.newDesc = this.editDes(item.typeDes);
            item.newDesc.name = "查看描述";
            item.newTime = this.formatDate(item.createime);
            item.idShow = item.idShow == 1 ? true : false;
          });
          this.data = res.data.data;
          this.data2 = [...this.data];
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
    imgChange(file) {
      const isImg = file.raw.type.startsWith("image");
      const isLt5K = file.size / 1024 / 500 <= 1;
      var reader = new FileReader();
      var that = this;
      if (!isImg) this.$message.error("图片啊,我只要图片!");
      if (!isLt5K) {
        this.$message.error("上传的图片大小不能超过 500k!");
      }
      if (isLt5K && isImg) {
        for (var item in this.$refs) {
          if (this.$refs[item] && this.$refs[item].uploadFiles[0]) {
            this.index = item.charAt(6);
          }
        }
        that.imgSrc.splice(this.index, 1, file.url);
        if (this.$refs["upload0"]) this.$refs["upload0"].clearFiles();
        if (this.$refs["upload1"]) this.$refs["upload1"].clearFiles();
        if (this.$refs["upload2"]) this.$refs["upload2"].clearFiles();
        if (this.$refs["upload3"]) this.$refs["upload3"].clearFiles();
      }
      return isLt5K && isImg;
    },
    getImg(data, event, col) {
      if (col.id.endsWith("4")) {
        this.imgSrc = ["/static/series/" + data.typeBannerImg];
        this.className = true;
        this.title = col.label;
      } else if (col.id.endsWith("5")) {
        let arr = [];
        let prev = data.typeImg.split("?")[0];
        let str = data.typeImg.split("?")[1];
        str.split("|").forEach(item => {
          arr.push("/static/series/" + prev + item);
        });
        this.imgSrc = arr;
        this.title = col.label;
        this.className = false;
      }
    },
    uploadImg() {
      this.dialogVisible = false;
      // this.$refs["upload0"].submit();
    }
  }
};
</script>
<style lang="scss" scoped>
.el-table-column {
  margin-top: 5px;
}
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
    .el-table {
      height: 264px;
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
  width: 500px;
  height: 300px;
}
.smallImg {
  width: 200px;
}
</style>

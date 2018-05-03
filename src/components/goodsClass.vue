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
            <el-button size="small" type="primary" @click="onoff=true">添加系列</el-button>
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
              <el-switch v-model="scope.row.idShow" :active-value="1" :inactive-value="0" active-color="#409eff" inactive-color="#dcdfe6" @change="modfiyState(scope)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="newTime" label="创建时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
          <img :src="imgSrc.newSrc[0]&&imgSrc.newSrc[0].url||imgSrc.oldSrc[0]" :class="[className?'largImg':'smallImg']">
        </el-upload>
        <el-upload ref="upload1" action="" v-if="imgSrc.oldSrc[1]" :on-change="imgChange" :auto-upload="false" :show-file-list="false">
          <img :src="imgSrc.newSrc[1]&&imgSrc.newSrc[1].url||imgSrc.oldSrc[1]" :class="[className?'largImg':'smallImg']">
        </el-upload>
        <el-upload ref="upload2" v-if="imgSrc.oldSrc[2]" action="" :on-change="imgChange" :auto-upload="false" :show-file-list="false">
          <img :src="imgSrc.newSrc[2]&&imgSrc.newSrc[2].url||imgSrc.oldSrc[2]" :class="[className?'largImg':'smallImg']">
        </el-upload>
        <el-upload ref="upload3" v-if="imgSrc.oldSrc[3]" action="" :on-change="imgChange" :auto-upload="false" :show-file-list="false">
          <img :src="imgSrc.newSrc[3]&&imgSrc.newSrc[3].url||imgSrc.oldSrc[3]" :class="[className?'largImg':'smallImg']">
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="uploadImg" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="添加系列" :visible.sync="onoff" width="50%">
        <el-form ref="form" label-position="right">
          <el-form-item label="系列名称" label-width="100px">
            <el-col :span="15">
              <el-input auto-complete="on" v-model="formData.typeName" autofocus></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="系列描述" label-width="100px">
            <el-col :span="15">
              <el-input type="textarea" v-model="formData.typeDes" auto-complete="on"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="系列轮播图" label-width="100px">
            <el-col :span="15">
              <el-upload ref="upload" action="" :auto-upload="false" :on-change="setLargeImg" :on-remove="setLargeImg" list-type="picture" :limit="1" accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">图片大小不超过500kb,限制为一张</div>
              </el-upload>
            </el-col>
          </el-form-item>
          <el-form-item label="系列展示图" label-width="100px">
            <el-col :span="15">
              <el-upload ref="upload" action="" :auto-upload="false" :on-change="setSmallImg" :on-remove="setSmallImg" list-type="picture" :limit="5" accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">图片大小不超过500kb,固定4张</div>
              </el-upload>
            </el-col>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onoff=false">取 消</el-button>
          <el-button type="primary" @click="addClass">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="编辑商品系列" :visible.sync="editVisible" width="30%">
        <el-form ref="form" label-width="100px">
          <el-form-item label="系列名">
            <el-input v-model="editData.typeName"></el-input>
          </el-form-item>
          <el-form-item label="系列描述">
            <el-input v-model="editData.typeDes[0]"></el-input>
            <el-input v-model="editData.typeDes[1]"></el-input>
            <el-input v-model="editData.typeDes[2]"></el-input>
          </el-form-item>
          <el-form-item label="是否展示">
            <el-radio v-model="editData.idShow" :label="1">是</el-radio>
            <el-radio v-model="editData.idShow" :label="0">否</el-radio>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible=false" size="small">取 消</el-button>
          <el-button type="primary" size="small" @click="saveEdit">确 定</el-button>
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
      onoff: false,
      editVisible: false,
      imgSrc: {
        oldSrc: [],
        newSrc: [],
        typeId: ""
      },
      dialogVisible: false,
      modalOpt: true,
      title: "",
      className: true,
      index: 0,
      time: null,
      types: "全部",
      formData: {
        typeName: "",
        typeDes: "",
        typeImg: [],
        typeBannerImg: []
      },
      editData: {
        typeName: "",
        typeDes: [],
        idShow: ""
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
        this.$set(this.imgSrc.newSrc, this.index, file);
        if (this.$refs["upload0"]) this.$refs["upload0"].clearFiles();
        if (this.$refs["upload1"]) this.$refs["upload1"].clearFiles();
        if (this.$refs["upload2"]) this.$refs["upload2"].clearFiles();
        if (this.$refs["upload3"]) this.$refs["upload3"].clearFiles();
      }
      return isLt5K && isImg;
    },
    getImg(data, event, col) {
      this.imgSrc.newSrc = [];
      this.imgSrc.typeId = data.typeId;
      if (col.label.indexOf("轮播") > -1) {
        this.imgSrc.oldSrc = ["/static/images/series/" + data.typeBannerImg];
        this.className = true;
        this.title = col.label;
      } else if (col.label.indexOf("小图") > -1) {
        let arr = [];
        let prev = data.typeImg.split("?")[0];
        let str = data.typeImg.split("?")[1];
        str.split("|").forEach(item => {
          arr.push("/static/images/series/" + prev + item);
        });
        this.imgSrc.oldSrc = arr;
        this.title = col.label;
        this.className = false;
      }
    },
    uploadImg() {
      var fd = new FormData();
      this.imgSrc.newSrc.forEach((item, i) => {
        if (item !== undefined) {
          fd.append("newImg" + i, item.raw);
        }
      });
      fd.append("tableName", "goods_types");
      fd.append("typeId", this.imgSrc.typeId);
      fd.append("oldImg", this.imgSrc.oldSrc.join("|"));
      this.$http.post("/imgModify", fd).then(res => {
        console.log(res.data);
      });
      this.dialogVisible = false;
    },
    //添加分类
    addClass() {
      this.onoff = false;
      var fd = new FormData();
      var largImg = this.formData.typeBannerImg;
      var smallImg = this.formData.typeImg;
      for (let [key, val] of Object.entries(this.formData)) {
        if (!(val instanceof Array)) fd.append(key, val);
      }
      largImg.forEach(item => {
        fd.append("typeBannerImg", item);
      });
      smallImg.forEach((item, i) => {
        fd.append("typeImg" + i, item);
      });
      this.$http.post("/addGoodsType", fd).then(res => {
        if (res.data.code == 2) {
          this.$message.success("添加成功");
          this.getData();
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    //封面图
    setLargeImg(file, files) {
      const isImg = file.raw.type.startsWith("image");
      const is05k = file.size / 1024 / 500 <= 1;
      if (!isImg) this.$message.error("不是图片!");
      if (!is05k) this.$message.error("图片不能超过500k");
      if (isImg && is05k) {
        var arr = [];
        for (var i in files) {
          arr.push(files[i].raw);
        }
        this.formData.typeBannerImg = arr;
      } else {
      }
      return false;
    },
    //展示图
    setSmallImg(file, files) {
      const isImg = file.raw.type.startsWith("image");
      const is05k = file.size / 1024 / 500 <= 1;
      if (!isImg) this.$message.error("不是图片!");
      if (!is05k) this.$message.error("图片不能超过500k");
      if (isImg && is05k) {
        var arr = [];
        for (var i in files) {
          arr.push(files[i].raw);
        }
        this.formData.typeImg = arr;
      } else {
      }
      return false;
    },
    handleEdit(index, row) {
      this.editVisible = true;
      this.editData.typeId = row.typeId;
      this.editData.typeName = row.typeName;
      this.editData.typeDes = row.typeDes.split("<br/>");
      this.editData.idShow = row.idShow;
    },
    saveEdit() {
      let sendData = {};
      sendData.typeId = this.editData.typeId;
      sendData.typeDes = this.editData.typeDes.join("<br/>");
      sendData.typeName = this.editData.typeName;
      sendData.idShow = this.editData.idShow;
      this.$http
        .post("/typeModify", qs.stringify(sendData))
        .then(res => {
          if (res.data.code == 2) {
            this.getData();
            this.$message.success("修改成功");
            this.editData = {
              typeName: "",
              typeDes: [],
              idShow: ""
            };
            this.editVisible = false;
          }
        })
        .catch(err => {
          // console.log(err)
          this.$message.error("修改失败");
        });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该系列, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post(
              "/delete",
              qs.stringify({
                tableName: "goods_types",
                typeId: row.typeId
              })
            )
            .then(res => {
              if (res.data.code == 2) {
                this.$message.success("删除成功");
                this.getData();
              }
            });
        })
        .catch(() => {
          this.$message.info("删除取消");
        });
    },
    //是否上架
    modfiyState(scope) {
      let idShow = scope.row.idShow;
      let typeId = scope.row.typeId;
      let str = "";
      if (idShow == 1) {
        str = "确认显示此系列商品?";
      } else {
        str = "确认不显示此系列商品?";
      }
      this.$confirm(str, "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("/typeModify", qs.stringify({ idShow, typeId }))
            .then(res => {
              if (res.data.code == 2) {
                this.$message.success("修改成功");
              } else {
                this.$message.error("修改失败");
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          if (scope.column.label == "是否上架") {
            scope.row.isSale = 0;
          } else {
            scope.row.isHot = 0;
          }
          this.$message.info("取消修改");
        });
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
© 2018 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
API
Training
Shop
Blog
About
Press h to open a hovercard with more details. 

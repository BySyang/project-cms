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
            <el-input size="small" v-model="searchArr.goodsName" placeholder="请输入商品名" prefix-icon="el-icon-search" clearable></el-input>
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
            <el-input size="small" v-model="searchArr.goodSvg" placeholder="请输入商品价格" prefix-icon="el-icon-search" clearable></el-input>
          </el-col>
          <el-col :span="2" :push="1" style="left:2.16666%">
            <el-button size="small" type="primary" @click="onoff = true">添加商品</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table-wrap">
        <el-table :data="data1" border style="width: 100%" stripe show-header tooltip-effect="dark" align="center">
          <el-table-column type="selection" width="30" label="批量删除"></el-table-column>
          <el-table-column prop="goodsId" sortable label="商品ID" show-overflow-tooltip width="90" align="center"> </el-table-column>
          <el-table-column prop="goodsName" label="商品名" show-overflow-tooltip align="center" width="100"> </el-table-column>
          <el-table-column prop="typeName" label="商品系列" show-overflow-tooltip align="center" width="90"> </el-table-column>
          <el-table-column prop="goodsDesc" label="商品描述" show-overflow-tooltip align="center" width="90"></el-table-column>
          <el-table-column prop="goodSvg" label="商品价格" align="center" width="80">
            <template slot-scope="scope">
              <p>{{'¥'+scope.row.goodSvg}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="goodStock" label="商品库存" align="center" width="80"></el-table-column>
          <el-table-column prop="goodscore" label="商品评价" align="center" width="130">
            <template slot-scope="scope">
              <el-rate size="small" v-model="scope.row.goodscore" disabled text-color="#ff9900"></el-rate>
            </template>
          </el-table-column>
          <el-table-column prop="isSale" label="是否上架" show-overflow-tooltip align="center" width="80">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.isSale" :active-value="1" :inactive-value="0" active-color="#409eff" inactive-color="#dcdfe6" @change="modfiyState(scope)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="isHot" label="是否热销" align="center" width="80">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.isHot" :active-value="1" :inactive-value="0" active-color="#409eff" inactive-color="#dcdfe6" @change="modfiyState(scope)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="上架时间" align="center" width="100">
            <template slot-scope="scope">
              {{scope.row.createTime.substr(0,10)}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
      <el-dialog title="添加商品" :visible.sync="onoff" width="50%" center>
        <el-form ref="form" :model="addGoods" label-position="right">
          <el-form-item label="商品名称" label-width="80px">
            <el-col :span="15">
              <el-input auto-complete="on" v-model="addGoods.goodsName" autofocus></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="所属系列" label-width="80px">
            <el-col :span="15">
              <el-select placeholder="请选择所属系列" v-model="addGoods.goodsType">
                <el-option v-for="item in types" :key="item.typeId" :label="item.typeName" :value="item.typeId"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="商品价格" label-width="80px">
            <el-col :span="15">
              <el-input auto-complete="on" v-model="addGoods.goodSvg"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="商品库存" label-width="80px">
            <el-col :span="15">
              <el-input auto-complete="on" v-model="addGoods.goodStock"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="商品描述" label-width="80px">
            <el-col :span="15">
              <el-input type="textarea" v-model="addGoods.goodsDesc" auto-complete="on"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="封面图" label-width="80px">
            <el-col :span="15">
              <el-upload ref="upload" action="" :auto-upload="false" :on-change="setLargeImg" :on-remove="setLargeImg" list-type="picture" :limit="1" accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">图片大小不超过500kb,限制为一张</div>
              </el-upload>
            </el-col>
          </el-form-item>
          <el-form-item label="展示图" label-width="80px">
            <el-col :span="15">
              <el-upload ref="upload" action="" :auto-upload="false" :on-change="setSmallImg" :on-remove="setSmallImg" list-type="picture" :limit="5" accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">图片大小不超过500kb,不超过5张</div>
              </el-upload>
            </el-col>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onoff = false">取 消</el-button>
          <el-button type="primary" @click="addOneGood">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="编辑商品" :visible.sync="editVisible" width="30%">
        <el-form ref="form" label-width="100px">
          <el-form-item label="商品名">
            <el-input v-model="editData.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="商品类型">
            <el-select v-model="editData.typeId">
              <el-option v-for="item in types" :key="item.typeId" :label="item.typeName" :value="item.typeId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input v-model="editData.goodsDesc"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="editData.goodSvg"></el-input>
          </el-form-item>
          <el-form-item label="商品库存">
            <el-input v-model="editData.goodStock"></el-input>
          </el-form-item>
          <el-form-item label="商品评价">
            <el-rate class="score" v-model="editData.goodscore" show-score text-color="#ff9900"></el-rate>
          </el-form-item>
          <el-form-item label="是否上架">
            <el-radio v-model="editData.isSale" :label="1">上架</el-radio>
            <el-radio v-model="editData.isSale" :label="0">下架</el-radio>
          </el-form-item>
          <el-form-item label="是否热销">
            <el-radio v-model="editData.isHot" :label="1">热销</el-radio>
            <el-radio v-model="editData.isHot" :label="0">普销</el-radio>
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
      data2: [],
      types: [],
      current: 1,
      size: 5,
      onoff: false,
      editVisible: false,
      searchArr: {
        goodsName: "",
        goodsType: "全部",
        goodSvg: "",
        time: null
      },
      addGoods: {
        goodsName: "",
        goodsType: "",
        goodSvg: "",
        goodLargeImg: [],
        goodsImg: [], //展示图
        goodsDesc: "", //描述
        goodStock: "", //库存
        isHot: "" //是否热销
      },
      editData: {
        goodsName: "",
        typeId: "",
        goodsDesc: "",
        goodStock: "",
        goodSvg: "",
        goodscore: 0,
        isSale: "",
        isHot: ""
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
    //搜索
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
    },
    //是否上架
    modfiyState(scope) {
      let goodsId = scope.row.goodsId;
      let isSale = scope.row.isSale;
      let isHot = scope.row.isHot;
      let str = "";
      if (scope.column.label == "是否上架") {
        str = `确认${isSale == 1 ? "上" : "下"}架此商品?`;
      } else {
        str = `${
          isHot == 1 ? "请确认把此商品设为热销商品?" : "请确认取消此商品的热销"
        }`;
      }
      this.$confirm(str, "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("/goodsModify", qs.stringify({ goodsId, isSale, isHot }))
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
    },
    addOneGood() {
      this.onoff = false;
      var fd = new FormData();
      var largImg = this.addGoods.goodLargeImg;
      var smallImg = this.addGoods.goodsImg;
      for (let [key, val] of Object.entries(this.addGoods)) {
        if (!(val instanceof Array)) fd.append(key, val);
      }
      largImg.forEach(item => {
        fd.append("goodLargeImg", item);
      });
      smallImg.forEach((item, i) => {
        fd.append("goodsImg" + i, item);
      });
      this.$http
        .post("/addGoods", fd)
        .then(res => {
          if (res.data.code == 2) {
            this.$message.success("添加成功");
            this.getData();
          }
        })
        .catch(err => {
          this.$message.error("添加失败");
          console.log(err);
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
        this.addGoods.goodLargeImg = arr;
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
        this.addGoods.goodsImg = arr;
      } else {
      }
      return false;
    },
    handleEdit(index, row) {
      this.editVisible = true;
      this.editData.goodsId = row.goodsId;
      this.editData.goodsName = row.goodsName;
      this.editData.typeId = row.typeId;
      this.editData.goodsDesc = row.goodsDesc;
      this.editData.goodStock = row.goodStock;
      this.editData.goodSvg = row.goodSvg;
      this.editData.goodscore = row.goodscore;
      this.editData.isSale = row.isSale;
      this.editData.isHot = row.isHot;
    },
    saveEdit() {
      this.$http
        .post("/goodsModify", qs.stringify(this.editData))
        .then(res => {
          if (res.data.code == 2) {
            this.data.forEach(item => {
              if (item.goodsId == this.editData.goodsId) {
                for (let [key, val] of Object.entries(this.editData)) {
                  item[key] = val;
                }
              }
            });
            this.$message.success("修改成功");
            this.editData = {
              goodsName: "",
              typeId: "",
              goodsDesc: "",
              goodStock: "",
              goodSvg: "",
              goodscore: 0,
              isSale: "",
              isHot: ""
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
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post(
              "/delete",
              qs.stringify({
                tableName: "goods",
                goodsId: row.goodsId
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
.el-select {
  width: 100%;
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
.score {
  line-height: 2.5;
}
.largImg {
  width: 600px;
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

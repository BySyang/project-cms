<template>
<div class="orders">
    <div class="orders_main">
    <div class="main_top">
                <div>订单管理</div>
            </div>
   <div class="container" id="app">
            <div id="mySearch">
                <input type="text" placeholder="请输入栏目名称" @input="search" list="cars" class="search">
                <datalist id="cars">
                    <el-option v-for="item in searchlist" :value="item" :key="item.id"></el-option>
                </datalist>

                <el-button size="small" type="primary"  @click="dialogFormVisible = true" class="add">添加栏目</el-button>
            </div>
            <div>
                <div class="table">
                    <el-table border ref="multipleTable" :data="slist" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="30" label="批量删除" show-overflow-tooltip></el-table-column>
                        <!-- <el-table-column prop="index" label="系列ID" align="center"  show-overflow-tooltip></el-table-column> -->
                        <el-table-column prop="columnName" label="栏目名称" align="center" show-overflow-tooltip> </el-table-column>
                        <el-table-column prop="src" label="连接地址" align="center" width="400px" show-overflow-tooltip> </el-table-column>
                        <el-table-column prop="addTime" label="添加时间" align="center" show-overflow-tooltip> </el-table-column>
                        <el-table-column prop="classes" label="级别" align="center" width="80px" show-overflow-tooltip > </el-table-column>
                        <el-table-column prop="state" label="状态"  align="center"  width="80px" show-overflow-tooltip> </el-table-column>
                        <el-table-column prop="" label="操作" align="center" show-overflow-tooltip>
                            <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="showOverlay(index)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="del(index)">删除</el-button>
                            </template>
                        </el-table-column>               
                    </el-table>
                </div>
               
                <!-- <table class="webTable">
                    <tr >
                        <th>ID</th>
                        <th>栏目名称</th>
                        <th>连接地址</th>
                        <th>添加时间</th>
                        <th>级别</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    <tr v-cloak v-for="(item, index) of slist " :key="item.id">
                        <td>{{index+1}}</td>
                        <td>{{item.columnName}}</td>
                        <td>{{item.src}}</td>
                        <td>{{item.addTime}}</td>
                        <td>{{item.classes}}</td>
                        <td>{{item.state}}</td>
                        <td>
                        <el-button type="primary" size="mini" @click="showOverlay(index)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="del(index)">删除</el-button>
                        </td>
                    </tr>
                </table> -->
            </div>
            <model :list='selectedlist' :isactive="isActive" v-cloak @change="changeOverlay" @modify="modify"></model>
        </div>

    </div>
    


<!-- Form -->

<el-dialog title="添加栏目" :visible.sync="dialogFormVisible" >
  <el-form :model="form">
    <el-form-item label="栏目名称：" :label-width="formLabelWidth" >
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="连接地址：" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="添加时间：" :label-width="formLabelWidth">
        <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
        </div>
    </el-form-item>
    <el-form-item label="级别：" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择页面级别">
        <el-option label="一级" value="shanghai"></el-option>
        <el-option label="二级" value="beijing"></el-option>
        <el-option label="三级" value="beijing"></el-option>
        <el-option label="四级" value="beijing"></el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="显示状态：" :label-width="formLabelWidth">
        <el-radio v-model="radio" label="1">显示</el-radio>
        <el-radio v-model="radio" label="2">隐藏</el-radio>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click=" modify" >确 定</el-button>
  </div>
</el-dialog>


 
 </div>
       
</template>













<script type="text/javascript" src="https://unpkg.com/vue@2.3.4/dist/vue.js"></script>
<script type="text/javascript">
import Vue from 'vue'

Vue.component('model', {
        props: ['list', 'isactive'],
        template: `<div class="overlay" v-show="isactive">
                        <div class="con">
                        <h2 class="title">新增 | 修改</h2>
                        <div class="content">
                        <table>
                        <tr>
                        <td>栏目名称</td>
                        <td><input type="text" v-model="modifylist.columnName"></td>
                        </tr>
                        <tr>
                        <td>连接地址</td>
                        <td><input type="text" v-model="modifylist.src"></td>
                        </tr>
                        <tr>
                        <td>添加时间</td>
                        <td>
                        <label><input type="radio" name="addTime" value="男" v-model="modifylist.addTime">男</label>
                        <label><input type="radio" name="addTime" value="女" v-model="modifylist.addTime">女</label>
                        </td>
                        </tr>
                        <tr>
                        <td>级别</td>
                        <td>
                        <select name="" id="" v-model="modifylist.classes">
                        <option value="一级">一级</option>
                        <option value="二级">二级</option>
                        <option value="三级">三级</option>
                        <option value="四级">四级</option>
                        </select>
                        </td>
                        </tr>
                        <tr>
                        <td>状态</td>
                        <td>
                        <label><input type="checkbox" v-model="modifylist.state" value="显示">显示</label>
                        <label><input type="checkbox" v-model="modifylist.state" value="隐藏">隐藏</label>
                        </td>
                        </tr>
                        </table>
                        <p>
                        <el-button @click="changeActive">取 消</el-button>
                        <el-button type="primary" @click="modify">确 定</el-button>
                        </p>
                        </div>
                        </div>
                    </div>`,
        computed: {
            modifylist() {
                return this.list;
            }
        },
        methods: {
            changeActive() {
                this.$emit('change');
            },
            modify() {
                this.$emit('modify', this.modifylist);
            }
        }
    });
    var app = new Vue({
    });
 export default {
     data(){
       return {
           el: '#app',
           radio: '1',
        isActive: false,
            selected: -1,
            selectedlist: {},
            slist: [],
            searchlist: [],
            list: [
                {
                    columnName: '首页',
                    src: 'http://www.weiqing.com/help.php?name=23&id=1',
                    addTime: '2017-03-28',
                    classes: '一类',
                    state: "显示"
                },
                {
                    columnName: "产品页",
                    src: "http://www.weiqing.com/help.php?name=23&id=2",
                    addTime: "2017-04-02",
                    classes: "二类",
                    state: "显示"
                },
                {
                    columnName: "关于我们",
                    src: "http://www.weiqing.com/help.php?name=23&id=4",
                    addTime: "2017-04-05",
                    classes: "二类",
                    state: "显示"
                },
                {
                    columnName: "运动系列",
                    src: "http://www.weiqing.com/help.php?name=23&id=21",
                    addTime: "2017-04-09",
                    classes: "二类",
                    state: "显示"
                },
            ],

        //添加栏目返回值
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',

        //时间插件返回值
         pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',





      }
    },
        created() {
                    console.log(Date.now());
                    this.setSlist(this.list);
                },
        methods: {
            // 修改数据
            showOverlay(index) {
                this.selected = index;
                this.selectedlist = this.list[index];
                this.changeOverlay();
            },
            // 点击保存按钮
            modify(arr) {
                if (this.selected > -1) {
                    Vue.set(this.list, this.selected, arr);
                 
                } else {
                    this.list.push(arr);
                }
                this.setSlist(this.list);
                this.changeOverlay();
                this.dialogFormVisible = false;
            },
            add: function () {
                this.selectedlist = {
                    columnName: '',
                    src: '',
                    addTime: '男',
                    classes: '一级',
                    state: ""
                };
                this.isActive = true;
            },
            // delete list in index location
            del(index) {
                this.list.splice(index, 1);
                this.setSlist(this.list);
            },
            changeOverlay() {
                this.isActive = !this.isActive;
            },
            // 获取需要渲染到页面中的数据
            setSlist(arr) {
                this.slist = JSON.parse(JSON.stringify(arr));
            },
            // 搜索
            search(e) {
                var v = e.target.value,
                    self = this;
                self.searchlist = [];
                if (v) {
                    var ss = [];
                    // 过滤需要的数据
                    this.list.forEach(function (item) {
                        if (item.columnName.indexOf(v) > -1) {
                            if (self.searchlist.indexOf(item.columnName) == -1) {
                                self.searchlist.push(item.columnName);
                            }
                            ss.push(item);
                        } else if (item.src.indexOf(v) > -1) {
                            if (self.searchlist.indexOf(item.src) == -1) {
                                self.searchlist.push(item.src);
                            }
                            ss.push(item);
                        }
                    });
                    this.setSlist(ss); // 将过滤后的数据给了slist
                } else {
                    // 没有搜索内容，则展示全部数据
                    this.setSlist(this.list);
                }
            },
    
  
    
    },




        watch: {
        }


    
}
</script>






<style scoped>
    .orders {
        width: 100%;
        height: 100%;
    }
    .orders_main {
    margin: 1% auto;
    width: 98%;
    height: 95%;
    background-color: white;
    box-shadow: 0 -3px 0 0 #59ace2;
    }
    .main_top {
      position: relative;
      height: 30px;
      border-bottom: 1px solid #e5e6e6;
    }
    .main_top div {
        position: absolute;
        top: 0;
        left: 40px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #59ace2;
    }
    #mySearch{
        padding:10px 10px 10px 20px; 
    }
    #mySearch input {
        height: 32px;
    }
    .search{
            border: 1px solid #dcdfe6;
            box-sizing: border-box;
            color: #909399;
            border-radius: 5px;
            font-size: inherit;
            height: 40px;
            line-height: 40px;
            width: 20%;
    }






</style>

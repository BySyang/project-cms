<template>
<<<<<<< HEAD
<div class="orders">
    <div class="container orders_main" id="app">
            <div>
                <input type="text" placeholder="search" @input="search" list="cars" class="search">
                <datalist id="cars">
                    <option v-for="item in searchlist" :value="item" :key="item.id"></option>
                </datalist>
                <input type="button" class="add" @click="add" value="新增">
            </div>
            <div>
                <table>
                    <tr>
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
                        <td><a href="javascript:;" @click="showOverlay(index)">修改</a> | <a href="javascript:;" @click="del(index)">删除</a></td>
                    </tr>
                </table>
            </div>
            <model :list='selectedlist' :isactive="isActive" v-cloak @change="changeOverlay" @modify="modify"></model>
        </div>
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
                        <td>用户名</td>
                        <td><input type="text" v-model="modifylist.columnName"></td>
                        </tr>
                        <tr>
                        <td>邮箱</td>
                        <td><input type="text" v-model="modifylist.src"></td>
                        </tr>
                        <tr>
                        <td>性别</td>
                        <td>
                        <label><input type="radio" name="addTime" value="男" v-model="modifylist.addTime">男</label>
                        <label><input type="radio" name="addTime" value="女" v-model="modifylist.addTime">女</label>
                        <label><input type="radio" name="addTime" value="未知" v-model="modifylist.addTime">未知</label>
                        </td>
                        </tr>
                        <tr>
                        <td>省份</td>
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
                        <td>爱好</td>
                        <td>
                        <label><input type="checkbox" v-model="modifylist.state" value="篮球">篮球</label>
                        <label><input type="checkbox" v-model="modifylist.state" value="读书">读书</label>
                        <label><input type="checkbox" v-model="modifylist.state" value="插画">插画</label>
                        <label><input type="checkbox" v-model="modifylist.state" value="编程">编程</label>
                        <label><input type="checkbox" v-model="modifylist.state" value="弹琴">弹琴</label>
                        </td>
                        </tr>
                        </table>
                        <p>
                        <input type="button" @click="changeActive" value="取消">
                        <input type="button" @click="modify" value="保存">
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
            ]
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
            },
            add: function () {
                this.selectedlist = {
                    columnName: '',
                    src: '',
                    addTime: '男',
                    classes: '北京市',
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
            }
        },
        watch: {
        }


    
=======
<div>
    前端管理
</div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
>>>>>>> 9699d1736c0dd2fa6e57c5ab85a1d9708dcc6342
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
















<<<<<<< HEAD
   [v-cloak] {
            display: none
        }
        table {
            border: 1px solid #ccc;
            padding: 0;
            border-collapse: collapse;
            table-layout: fixed;
            margin-top: 10px;
            width: 100%;
        }
        table td,
        table th {
            height: 30px;
            border: 1px solid #ccc;
            background: #fff;
            font-size: 15px;
            padding: 3px 3px 3px 8px;
        }
        table th:first-child {
            width: 30px;
        }
        .container,
        .st {
            width: 1000px;
            margin: 10px auto 0;
            font-size: 13px;
            font-family: 'Microsoft YaHei'
        }
        .container .search {
            font-size: 15px;
            padding: 4px;
        }
        .container .add {
            padding: 5px 15px;
        }
        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 6;
            background: rgba(0, 0, 0, 0.7);
        }
        .overlay td:first-child {
            width: 66px;
        }
        .overlay .con {
            position: absolute;
            width: 420px;
            min-height: 300px;
            background: #fff;
            left: 50%;
            top: 50%;
            -webkit-transform: translate3d(-50%, -50%, 0);
            transform: translate3d(-50%, -50%, 0);
            /*margin-top: -150px;*/
            padding: 20px;
        }
</style>
=======
</style>
>>>>>>> 9699d1736c0dd2fa6e57c5ab85a1d9708dcc6342

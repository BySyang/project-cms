<template>
<div id="goodsClass">
    <div class="search">
        <div class="main_top">
            <div>评论管理</div>
        </div>
        <div>
            评论时间:
            <el-date-picker v-model="xiadandata" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
        </div>
        <div>
            评论人:
            <el-input v-model="select_word" placeholder="请输入姓名" prefix-icon="el-icon-search">
            </el-input>
        </div>
        <div>
            <el-button type="primary" @click="searchpl" icon="el-icon-search">搜索</el-button>
        </div>
    </div>
    <el-table :data="data1" border style="width: 100%" stripe show-header tooltip-effect="dark">
        <el-table-column prop="goodsId" sortable label="商品ID" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="goodsName" label="商品名" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="typeName" label="商品类型" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="goodsDesc" label="商品描述" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodSvg" label="商品价格" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodStock" label="商品库存" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodscore" label="商品评价" show-overflow-tooltip></el-table-column>
        <el-table-column prop="isSale" label="是否上架" show-overflow-tooltip></el-table-column>
        <el-table-column prop="isHot" label="是否热销" show-overflow-tooltip></el-table-column>
        <el-table-column label="上架时间">
            <template slot-scope="scope">
          {{scope.row.createTime.substr(0,10)}}
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
</template>

<script>
import qs from "qs";
export default {
    data() {
        return {
            data: [],
            current: 1,
            size: 5
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
        }
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

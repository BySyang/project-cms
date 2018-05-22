<template>
<div id="index">
        <!-- 列表 -->
        <div class="list">
            <div class="list_item">
                <div>
                  <i class="iconfont icon-gouwuchekong"></i>
                  <span>新增订单</span>
                </div>
                <label for="">30</label>
            </div>
            <div class="list_item">
                <div>
                    <i class="iconfont icon-05_kucunguanli"></i>
                    <span>存储信息</span>
                </div>
                <label for="">300</label>
            </div>

            <div class="list_item">
                <div>
                    <i class="iconfont icon-xiaoxi1"></i>
                    <span>消息</span>
                </div>
                <label for="">20</label>
            </div>

            <div class="list_item">
                <div>
                    <i class="iconfont icon-quxiaocancel6"></i>
                    <span>取消订单</span>
                </div>
                <label for="">34</label>
            </div>

            <div class="list_item">
                <div>
                    <i class="iconfont icon-045zhuanqulirun"></i>
                    <span>总利润</span>
                </div>
                <label for="">$521314</label>
            </div>
        </div>
        <!-- 分栏内容 -->
        <div id="contain">
            <div id="treated">
                <div class="title">
                    <h4>待处理</h4>
                </div>
                <div class="menu">
                    <ul>
                        <li class="iconfont icon-fahuotixing"></li>
                        <!-- <el-submenu index="/home/wuliu">
                           <li>待发货</li>
                        </el-submenu> -->
                        <li>待发货</li>
                        <li>906</li>
                    </ul>
                    <ul>
                        <li class="iconfont icon-daifukuan"></li>
                        <li>待付款</li>
                        <li>928</li>
                    </ul>
                    <ul>
                        <li class="iconfont icon-tuikuan1"></li>
                        <li>退货/退款</li>
                        <li>11</li>
                    </ul>
                    <ul>
                        <li class="iconfont icon-stock"></li>
                        <li>库存预警</li>
                        <li>0</li>
                    </ul>
                    <ul>
                        <li class="iconfont icon-guanbi"></li>
                        <li>商品咨询</li>
                        <li>63</li>
                    </ul>
                </div>
            </div>
            <div id="Common_menu">
                <div class="title_2">
                    <h4>常用菜单</h4>
                </div>
                <div class="menu_2">
                    <div class="menu_2_list">
                        <div class="menu_2_list_1">
                            <i class="iconfont icon-shangpin"></i>
                        </div>
                        <span>商品系列</span>
                    </div>
                    <div class="menu_2_list">
                        <div class="menu_2_list_2">
                            <i class="iconfont icon-tupian"></i>
                        </div>
                        <span>首页轮播</span>
                    </div>
                    <div class="menu_2_list">
                        <div class="menu_2_list_3">
                            <i class="iconfont icon-kefu"></i>
                        </div>
                        <span>在线客服</span>
                    </div>
                    <div class="menu_2_list">
                        <div class="menu_2_list_4">
                            <i class="iconfont icon-wenzhang-copy"></i>
                        </div>
                        <span>文章发布</span>
                    </div>
                    <div class="menu_2_list">
                        <div class="menu_2_list_5">
                            <i class="iconfont icon-204"></i>
                        </div>
                        <span>会员中心</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- Echars图表 -->
         <div id="Echars">
            <div id="Echars_1"></div>
            <div id="Echars_2"></div>
            <div id="Echars_4"></div>
            <div id="Echars_3"></div>
            
        </div>
</div>
</template>

<script>
// import qs from "qs";
var echarts = require("echarts");
export default {
  data() {
    return {
      // ruleForm: {
      // name: ""
      // }
    };
   
  },
   created() {
    if (this.$route.name == "home") {
      this.$router.replace("/home/index");
    }
  },
  mounted() {
    /*ECharts图表*/
    var myChart1 = echarts.init(document.getElementById("Echars_1")); //初始化图标到相应的div中
    var myChart2 = echarts.init(document.getElementById("Echars_2"));
    var myChart3 = echarts.init(document.getElementById("Echars_3"));
    var myChart4 = echarts.init(document.getElementById("Echars_4"));
    myChart1.setOption({
      tooltip: {
        trigger: "axis" //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
      },
      toolbox: {
        //工具栏
        show: true,
        icon: "image://http://echarts.baidu.com/images/favicon.png",
        feature: {
          left: "30px",
          magicType: {
            show: true,
            type: ["line", "bar"]
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      title: {
        //图标标题
        top: "-1%",
        text: "月度销售额",
        left: "43%",
        textStyle: {
          color: "#333"
        }
      },
      grid: {
        left: "3%",
        right: "8%",
        bottom: "3%",
        top: "9%",
        containLabel: true, //grid 区域是否包含坐标轴的刻度标签。
        color: "#20a0ff"
      },
      xAxis: {
        name: "(月份)",
        nameLocation: "end",
        type: "category",
        splitNumber: "23",
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ]
      },
      yAxis: {
        //Y轴
        name: "(销售额度)", //Y轴名称
        nameLocation: "end", //名称显示位置：'strat','end','center或者middle'
        type: "value",
        axisLabel: {
          formatter: "{value} W"
        }
      },
      series: [
        {
          //系列
          name: "销售额", //这点显示名称
          type: "line", //图标类型：line:线装，bar：条形
          areaStyle: {
          color: "rgba(0,0,0,0.1)"
          }, //图形面积背景
          data: [
            "120",
            "132",
            "101",
            "134",
            "90",
            "230",
            "210",
            "220",
            "330",
            "300",
            "310",
            "200"
          ],
          markPoint: {
            data: [
              {
                type: "max",
                name: "最大值"
              },
              {
                type: "min",
                name: "最小值"
              }
            ]
          }
        }
      ]
    }),
      myChart2.setOption({
        title: {
          text: "年度系列销售比例",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["野性魅惑", "活力少女", "气质优雅", "清新自然", "情调趣味"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              {
                value: 336.8,
                name: "情调趣味"
              },
              {
                value: 310,
                name: "活力少女"
              },
              {
                value: 234,
                name: "气质优雅"
              },
              {
                value: 136.8,
                name: "清新自然"
              },
              {
                value: 1548,
                name: "野性魅惑"
              }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }),
      myChart3.setOption({
        title: {
          top: "7%",
          text: "当周交易记录",
          left: "43%",
          textStyle: {
            color: "#333"
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["气质优雅", "清新自然", "活力少女", "情调趣味", "野性魅惑"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          top: "8%",
          feature: {
            left: "36.8px",
            magicType: {
              show: true,
              type: ["line", "bar"]
            },
            restore: {
              show: true
            },
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "气质优雅",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "清新自然",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "活力少女",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "情调趣味",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "野性魅惑",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }),
      myChart4.setOption({
        title:{
          left: "43%",
          text:'月销售比例'
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["情调趣味", "野性魅惑", "清新自然", "气质优雅", "活力少女"]
        },
        series: [
          {
            name: "本周销售比例",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 336.8,
                name: "情调趣味"
              },
              {
                value: 310,
                name: "野性魅惑"
              },
              {
                value: 234,
                name: "清新自然"
              },
              {
                value: 136.8,
                name: "气质优雅"
              },
              {
                value: 1548,
                name: "活力少女"
              }
            ]
          }
        ]
      });
  }
};
</script>

<style lang="scss" scoped>
// .el-submenu{
//   position: absolute;
//   width: 100px;
//   height: 100px;
//   background: red;
// }
#index {
  border: none;
  outline: none;
  background: white;
  width: 96%;
  margin: 25.8px auto;
  padding: 0px 1px 0px 1px;
  box-shadow: -1px -1px -1px -1px lightgray;
}
#Echars {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}
#Echars_1,
#Echars_2,
#Echars_3,
#Echars_4 {
  // border: 1px solid black;
  height: 300px;
  width: 48.6%;
  background: #e6e6fa;
  box-shadow: 1px 0px -1px 0px lightgrey;
  margin: 10px 0px 15px 0px;
}

.list {
  // border: 1px solid red;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  .list_item>div{
    transition: all 0.3s;
  }
  .list_item>div:hover{
    cursor: pointer;
    transform: scale(1.4)
  }
  .list_item:nth-child(1) {
    background: #17d57e;
  }
  .list_item:nth-child(2) {
    background: #fec92b;
  }
  .list_item:nth-child(3) {
    background: #ffaf8e;
  }
  .list_item:nth-child(4) {
    background: #2da3fb;
  }
  .list_item:nth-child(5) {
    background: #c172d8;
  }
}
.list_item {
  // border: 1px solid red;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 45px 15px 45px;
}
.list_item > div {
  text-align: center;
  display: flex;
  flex-direction: column;
}
.list_item > div > i {
  font-size: 42px;
  color: white;
}
.list_item > div > span {
  font-size: 12px;
  color: white;
  margin-top: 5px;
}
.list_item > label {
  margin-left: 20px;
  color: white;
  font-size: 26px;
}
#contain{
    outline: none;
    border: none;
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between
    // flex-wrap: wrap;
}
#treated {
  margin:8px 0px 0px 0px;
  width: 48.7%;
  background: #f0f0f0;
}

.title {
  width: 100%;
  padding: 10px 0px 10px 0px;
  border-bottom: 1px solid white;
  box-shadow: 1px 0px 1px 0px lightgrey;
  background: #2da3fb;
  color: white;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 15px;
}

.menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ul {
    cursor: pointer;
    float: left;
    margin: 25.8px 25px 20px 25px;
    li {
      list-style: none;
      margin: 10px 0px;
      text-align: center;
    }
    li:nth-child(1) {
      font-size: 30px;
      color: #3399ff;
       transition: all 0.3s;  
    }
    li:nth-child(1):hover{
      transform: scale(1.6);  
    }
    li:nth-child(2) {
      font-size: 14px;
      color: #6897bb;
    }
    li:nth-child(3) {
      font-size: 17px;
    }
  }
}

#Common_menu {
  width: 48.7%;
  margin: 8px 0px 0px 10px;
  background: #f0f0f0; // border: 1px solid red;
  .title_2 {
    width: 100%;
    padding: 10px 0px 10px 0px;
    border-bottom: 1px solid white;
    // box-shadow: 1px 0px 1px 0px lightgrey;
    background: #ffab7f;
    color: white;
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    font-size: 15px;
  }
}

.menu_2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.menu_2_list {
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; // border: 1px solid yellow;
  div {
    // border:  1px solid yellow;
    padding: 20px; 
    margin: 30px 0px 10px 0px;
    border-radius: 5px;
  }
  i {
    font-size: 30px;
    color: white;
  }
  span {
    font-size: 15px;
    margin-bottom: 20px;
  }
  .menu_2_list_1 {
    background: #ffbe60;
  }
  .menu_2_list_2 {
    background: #47d7e8;
  }
  .menu_2_list_3 {
    background: #55de9f;
  }
  .menu_2_list_4 {
    background: #fb99cc;
  }
  .menu_2_list_5 {
    background: #87c0ea;
  }
}
h4{
  margin-left: 27px
}
</style>

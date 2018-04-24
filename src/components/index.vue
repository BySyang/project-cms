<template>
<div id="index">
    <ul>
        <li>
            <span>成交金额</span>
            <i class="iconfont "></i>
            <span>4000W</span>
        </li>
        <li>
            <span>留言</span>
            <i class="iconfont"></i>
            <span>8000条</span>
        </li>
        <li>
            <span>订单</span>
            <i class="iconfont"></i>
            <span>10000条</span>
        </li>
        <li>
            <span>通知</span>
            <i class="iconfont"></i>
            <span>456条</span>
        </li>
        <li>
            <span>待处理</span>
            <i class="iconfont"></i>
            <span>15条</span>
        </li>
    </ul>
    <div id="main"></div>
</div>
</template>

<script>
var echarts = require('echarts');
export default {
    data() {
        return {

        }
    },
    mounted() {
        /*ECharts图表*/
        var myChart = echarts.init(document.getElementById('main')); //初始化图标到相应的div中
        myChart.setOption({
            tooltip: {
                trigger: 'axis', //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
            },
            toolbox: { //工具栏
                show: true,
                icon: 'image://http://echarts.baidu.com/images/favicon.png',
                feature: {
                    magicType: {
                        show: true,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            title: { //图标标题
                top: '-1%',
                text: '月度销售额',
                left: '43%',
                textStyle: {
                    color: '#333'
                },
            },
            grid: {
                left: '3%',
                right: '8%',
                bottom: '3%',
                top: '9%',
                containLabel: true, //grid 区域是否包含坐标轴的刻度标签。


            },
            xAxis: {
                name: '(月份)',
                nameLocation: 'end',
                type: 'category',
                splitNumber: '23',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],

            },
            yAxis: { //Y轴
                name: '(销售额度)', //Y轴名称
                nameLocation: 'end', //名称显示位置：'strat','end','center或者middle'
                type: 'value',
                axisLabel: {
                    formatter: '{value} W',
                },
            },
            series: [{ //系列
                name: '销售额', //这点显示名称
                type: 'line', //图标类型：line:线装，bar：条形
                areaStyle: {
                    color: 'rgba(0,0,0,0.1)'
                }, //图形面积背景
                data: ['120', '132', '101', '134', '90', '230', '210', '220', '330', '300', '310', '200'],
                markPoint: {
                    data: [{
                            type: 'max',
                            name: '最大值'
                        },
                        {
                            type: 'min',
                            name: '最小值'
                        }
                    ]
                },
            }],
        })
    }
}
</script>

<style>
#main {
    position: absolute;
    top: 60%;
    height: 350px;
    width: 600px;
    background: #f0f0f0
}
</style>

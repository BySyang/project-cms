<template>
<div class="pays_section">
    <div class="pays_content">
        <div class="topBox">
            <div>支付配置</div>
        </div>
        <div class="other_pays">
            <div class="centerTop">
                <span>其他配置信息</span>
            </div>
            <div class="otherInfo">
                <div class="infoBox">
                    <div class="information">
                        <div>发票</div>
                        <div>发票是指一切单位和个人在购销商品、提供或接受服务以及从事其他经营活动中，所开具和收取的业务凭证，是会计核算的原始依据，也是审计机关、税务机关执法检查的重要依据。收据才是收付款凭证，发票只能证明业务发生了，不能证明款项是否收付。</div>
                        <div>
                            <el-button type="primary">已启用</el-button>
                            <el-button type="danger">禁用</el-button>
                        </div>
                    </div>
                    <div class="information">
                        <div>优惠券</div>
                        <div>优惠券可降低产品的价格，是一种常见的消费者营业推广工具。优惠券可以印在杂志的插页上、或夹在报纸中随报附送、或附在产品的包装上、或放置在商店中让人索取，有时甚至可以派人在街上分送。</div>
                        <div>
                            <el-button type="primary">启用</el-button>
                            <el-button type="danger">已禁用</el-button>
                        </div>
                    </div>
                    <div class="information">
                        <div>代收</div>
                        <div>不是用户自己收货,委托别人替为代收。该人就称为“代收人”</div>
                        <div>
                            <el-button type="primary">已启用</el-button>
                            <el-button type="danger">禁用</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.pays_section {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  .pays_content {
    margin: 1% auto;
    width: 98%;
    height: 96%;
    background-color: white;
    box-shadow: 0 -3px 0 0 #59ace2; // outline: 1px solid red;
    .topBox {
      position: relative;
      height: 30px;
      padding-left: 22px;
      margin: 1% auto;
      background-color: white;
      border-bottom: 1px solid #e5e6e6;
      div {
        color: white;
        position: absolute;
        top: 0;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #59ace2;
      }
    }
    .other_pays {
      margin-top: 1%;
      height: 92%; // border:1px solid #e5e6e6;
      .centerTop {
        height: 30px;
        padding-left: 22px;
        background: linear-gradient(#fefefe, #f1f1f1);
        span {
          line-height: 30px;
        }
      }
    }
    .otherInfo {
      padding: 10px 22px 0;
      .infoBox {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        .information {
          width: 240px;
          height: 320px;
          margin-top: 22px;
          margin-left: 23px;
          border: 1px solid #e5e6e6;
          div:nth-of-type(1) {
            background-color: #59ace2;
            height: 35px;
            line-height: 35px;
            color: white;
            text-align: center;
          }
          div:nth-of-type(2) {
            padding: 0 10px;
            font-size: 12px;
            line-height: 24px;
            margin-top: 15px;
            height: 175px;
            color: #999999;
            border-bottom: 1px solid #e5e6e6;
          }
          div:nth-of-type(3) {
            height: 74px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            flex-wrap: wrap;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="pays_section">
    <div class="pays_content">
      <div class="topBox">
        <div>支付管理</div>
      </div>
      <div class="pays_centerBox">
        <div class="centerTop">
          <span>在线支付方式</span>
        </div>
        <div class="centerContent">
          <el-alert title="提示：" description="该支付方式启用并不能正常使用，需要开通支付功能才能使用相应的支付方式。" type="error"></el-alert>
          <div class="paymentBox">
            <div class="payment">
              <div>支付宝</div>
              <div><img src="../assets/zhifb.jpg" alt=""></div>
              <div>支付宝（中国）网络技术有限公司是国内领先的第三方支付平台，致力于提供“简单、安全、快速”的支付解决方案</div>
              <div class="countState">
                <el-button type="primary" @click="open1">{{message}}</el-button>
                <el-button type="danger" @click="open2">{{message1}}</el-button>
              </div>
            </div>
            <div class="payment">
              <div>微信支付</div>
              <div><img src="../assets/weixin.jpg" alt=""></div>
              <div>微信支付是集成在微信客户端的支付功能，用户可以通过手机完成快速的支付流程。</div>
              <div> 
                <el-button type="primary" @click="open1();Count()" >{{message}}</el-button>
                <el-button type="danger" @click="open2();Count2()">{{message1}}</el-button>
              </div>
            </div>
            <div class="payment">
              <div>银联支付</div>
              <div><img src="../assets/yinlian.jpg" alt=""></div>
              <div>中国银联是通过银联跨行交易清算系统实现商业银行系统间的互联互通和资源共享，保证银行卡跨行、跨地区和跨境使用。</div>
              <div>
                <el-button type="primary" @click="open1">{{message}}</el-button>
                <el-button type="danger" @click="open2">{{message1}}</el-button>
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
  data:function() {
    return {
      message:"启用",
      totalCount:0,
      message1:"禁用",
      totalCnt:1
    };
  },
  methods: {
    'Count':function(){
      var count=this.totalCount;
      if(count<1){
        count++;
        return;
        console.log(count)                
      }else if(count>=1){
        count=1;
      } 
    },
    'Count2':function(){
      var count1=this.totalCnt;
      if(count1>0){
        count1--;
        console.log(count1)        
      }else if(count1<1){
        count1=0;
      } 
    },
    open1() {
      this.$confirm("是否启用该项？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.$message({
          type: "success",
          message: "启用成功!"
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消启用"
        });
      });  
    },
    open2() {
      this.$confirm("禁用后将不能进行与此相关操作，是否禁用该项？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.$message({
          type: "success",
          message: "禁用成功!"
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消禁用"
        });
      });  
    }
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
    box-shadow: 0 -3px 0 0 #59ace2;
    // outline: 1px solid red;
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
    .pays_centerBox {
      margin-top: 1%;
      height: 92%;
      // border:1px solid #e5e6e6;
      .centerTop {
        height: 30px;
        padding-left: 22px;
        background: linear-gradient(#fefefe, #f1f1f1);
        span {
          line-height: 30px;
        }
      }
      .centerContent {
        padding: 10px 22px 0;
        .el-alert {
          padding: 8px 0px;
        }
        .paymentBox {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;
          .payment {
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
              border-bottom: 1px solid #e5e6e6;
              img {
                width: 240px;
              }
            }
            div:nth-of-type(3) {
              padding: 0 6px;
              font-size: 12px;
              line-height: 20px;
              margin-top: 15px;
              height: 80px;
              color: #999999;
              border-bottom: 1px solid #e5e6e6;
            }
            div:nth-of-type(4) {
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
}
</style>
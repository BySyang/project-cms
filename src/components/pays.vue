<template>
  <div class="pays_section">
    <div class="pays_content">
      <div class="topBox">
        <div>支付管理</div>
      </div>
      <div class="pays_centerBox">
        <div class="centerTop">
          <span>在线支付方式</span> 
          <div class="centerContent">
            <div>
              
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
    return {

    };
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
    .pays_centerBox{
      margin-top:1%;
      height: 92%;
      // border:1px solid #e5e6e6;
      .centerTop{
        height: 30px;
        padding-left:22px;
        background:linear-gradient(#fefefe,#f1f1f1) ;
        span{
          line-height: 30px;
        }
      }
    }
  }
}
</style>
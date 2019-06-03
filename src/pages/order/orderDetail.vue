<template>
  <div class="order-detail">
    <div class="itembox">
      <div class="refresh p03">
        <span>刷新</span>
      </div>
      <div class="paydesc">请完成付款</div>
      <div class="amount">¥8899.00</div>
      <div class="countdown">
        (请在
        <span>13分13秒</span>内完成付款,并点击下方
        <span>"我已完成付款"</span>)
      </div>
    </div>
    <div class="itembox">
        <p class="title p03">卖家信息</p>
        <div class="goodstitle p03">
            <div class="gt-left">
                <img src="http://img1.imgtn.bdimg.com/it/u=1107314399,2602653806&fm=26&gp=0.jpg" alt="">
                <p class="gt-title">支持信用卡华北</p>
            </div>
            <div class="gt-right">
                微信 <span class="icon-mobile  icon-ml">&#xe6af;</span>
            </div>
        </div>

        <div class="pay-info p03">
            <div class="pay-item">
                微信号
                <div class="pay-info-right">
                    KIM8843 <span class="icon-mobile  icon-ml pay-icon">&#xe605;</span>
                </div>
            </div>
             <div class="pay-item">
                真实姓名
                <div class="pay-info-right">
                    西门吹雪 <span class="icon-mobile  icon-ml pay-icon">&#xe605;</span>
                </div>
            </div>
             <div class="pay-item">
                收款地址
                <div class="pay-info-right">
                    <span>打开微信</span> <span class="icon-mobile  icon-ml">&#xe6b1;</span>
                </div>
            </div>
            <div class="pay-qrcode">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559584486380&di=cb2c2eeaeea9a77269a17fb053fc9a3f&imgtype=0&src=http%3A%2F%2Fimgcache.cjmx.com%2Fstar%2F201609%2F20160903233734449.jpg" alt="">
            </div>
        </div>
    </div>
    <div class="itembox">
        <p class="title p03">订单信息</p>
    </div>
    <div class="pay-btn p03">
        <div class="cancle">取消</div>
        <div class="pay-done">我已经完成付款（14:58）</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.order-detail {
  background: $bg04;
  box-sizing: border-box;
  .p03{
      padding: 0 0.3rem;
  }
  .icon-ml{
      margin-left: 0.2rem;
  }
  .itembox{
      border-bottom: 0.2rem solid $border02;
      .title{
          line-height: 1rem;
          font-size: $f28;
          color: $fc06;
      }
  }
  .refresh {
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: $f28;
    color: $fc02;
  }
  .paydesc {
    width: 100%;
    font-size: $f40;
    color: $fc07;
    font-weight: bold;
    text-align: center;
  }
  .amount {
    font-weight: bold;
    color: $fc06;
    font-size: $f56;
    text-align: center;
    padding-top: 0.4rem;
    padding-bottom: 0.6rem;
  }
  .countdown {
    font-size: $f24;
    color: $fc10;
    text-align: center;
    padding-bottom: 0.9rem;
    span {
      color: $fc13;
    }
  }
  .goodstitle{
      height:1.32rem;
      background: $bg03 ;
      display:flex;
      align-items: center;
      justify-content: space-between;
      .gt-left{
          display: flex;
          align-items: center;
          img{
              width: 0.8rem;
              height: 0.8rem;
              border-radius: 50%;
          }
          p{
              margin-left: 0.2rem;
              font-size: $f32  ;
              color: $fc06 ;
          }
      }
  }
  .pay-item{
      display: flex;
      justify-content: space-between;
      height: 0.88rem;
      align-items: center;
      border-bottom: 1px solid $border02 ;
      font-size: $f24 ;
      color: $fc03 ;
      .pay-info-right{
          font-size: $f22;
          color: $fc06 ;
          font-weight: bold;
          span{
              color: $fc07 ;
          }
          .pay-icon{
              color: $fc14;
          }
      }
  }
  .pay-qrcode{
      padding: 0.2rem 0;
      display: flex;
      justify-content: flex-end;
      img{
          width: 1.9rem;
          height: 2.6rem;
          border-radius: 0.1rem;
      }
  }
  .pay-btn{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: $bg04;
      font-size: $f30 ;
      .cancle{
          width: 2rem;
          height: 0.88rem;
          text-align: center;
          line-height: 0.88rem;
          color: $fc02 ;
          border: 1px solid $border01 ;
          border-radius: 4px;
      }
      .pay-done{
          width: 4.4rem;
          height: 0.88rem;
          text-align: center;
          line-height: 0.88rem;
           border-radius: 4px;
           background: $fc07  ;
           color: $fc08 ;
      }
  }
}
</style>
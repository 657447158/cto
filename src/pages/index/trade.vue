<template>
  <div class="trade">
    <div class="itembox p03">
      <div class="title">
        <div class="title-left">
          <img src="http://img1.imgtn.bdimg.com/it/u=1107314399,2602653806&fm=26&gp=0.jpg" alt>
          支持信用卡花呗
        </div>
        <div class="title-right">2182单|97%</div>
      </div>
      <div class="item">
        <span class="item-title">单价</span>
        <span class="item-info">¥0.99999</span>
      </div>
      <div class="item">
        <span class="item-title">数量</span>
        <span class="item-info">10000000.0000BCV</span>
      </div>
      <div class="item">
        <span class="item-title">限额</span>
        <span class="item-info">¥35.00-900.00</span>
      </div>
    </div>
    <div class="itembox p03 buybox">
      <div class="buyinfo buyamount">
        <input type="number" placeholder="0.00">
        <p>
          输入买入数量
          <span>BCV</span>
        </p>
        <p>399.0000-1222222.0000</p>
      </div>
      <span class="icon-mobile change">&#xe823;</span>
      <div class="buyinfo buyprice">
        <input type="number" value="9999" placeholder="0.00">
        <p>
          输入买入金额
          <span>CNY</span>
        </p>
        <p>399.00-1229.00</p>
      </div>
    </div>
    <div class="btnbox p03">
      <button class="cancle">取消（50）</button>
      <button class="sure">立即买入</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.trade {
  background: $bg05;
  .p03 {
    padding: 0 0.3rem;
  }
  .btnbox{
      margin-top: 0.6rem;
      display: flex;
      justify-content: space-between;
      height: 0.88rem;
      .cancle{
          border: 1px solid $fc14   ;
          background: $bg04;
          height: 100%;
          width: 1.8rem;
          outline: none;
          font-size: $f28  ;
          color: $fc02   ;
          text-align: center;
          line-height: 100%;
          border-radius: 4px;
      }
      .sure{
          height: 100%;
          width: 4.9rem;
          background: $fc07  ;
          font-size: $f28  ;
          color: $fc08   ;
          text-align: center;
          line-height: 100%;
          border-radius: 4px;
      }
  }
  .itembox {
    border-top: 0.2rem solid $border02;
    background: $bg04;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 0.8rem;
      .item-title {
        font-size: $f30;
        color: $fc03;
      }
      .item-info {
        font-size: $f24;
        color: $fc06;
        font-weight: bold;
      }
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.3rem 0;
      .title-left {
        display: flex;
        align-items: center;
        font-size: $f30;
        color: $fc06;
        font-weight: bold;
        img {
          width: 0.7rem;
          height: 0.7rem;
          border-radius: 50%;
          margin-right: 0.3rem;
        }
      }
      .title-right {
        font-size: $f20;
        color: $fc03;
      }
    }
    &.buybox {
      display: flex;
      padding: 0.3rem 0;
      justify-content: space-evenly;
      align-items: center;
      .change {
        font-size: 0.6rem;
        color: $fc11;
      }
      .buyinfo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        input {
          width: 2rem;
          line-height: 1rem;
          font-size: $f44;
          text-align: center;
        }
        p {
          font-size: $f24;
          color: $fc02;
          margin-top: 0.24rem;
          span {
            display: inline-block;
            margin-left: 0.12rem;
            color: $fc11;
          }
        }
      }
    }
  }
}
</style>

<template>
    <div>
        <div
            class="goods"
            v-for="item in list"
            :key="item.id"
        >
            <div class="title">
                <div class="title-left">
                    <span class="img-box">
                        <img :src="item.headImage" />
                    </span>
                    <span>{{item.nickName || '龙猫用户'}}</span>
                </div>
                <div class="title-right">
                    {{item.dealNum}}单 | {{item.dealRatio}}
                </div>
            </div>
            <div class="count">
                <div class="count-left">
                    数量 <span>{{item.totalNum}} {{item.coinName}}</span>
                </div>
                <div class="count-right">
                    单价
                </div>
            </div>
            <div class="count">
                <div class="count-left">
                    限额 <span>¥{{item.minQuota}}-{{item.maxQuota}}</span>
                </div>
                <div class="count-right price">
                    ¥{{item.price}}
                </div>
            </div>
            <div class="buyorsell">
                <div class="buyorsell-left">
                    <span class="icon-mobile big vx" v-if="item.wxPayFlag === 1">&#xe81f;</span>
                    <span class="icon-mobile big zfb" v-if="item.aliPayFlag === 1">&#xe820;</span>
                    <span class="icon-mobile big yhk" v-if="item.bankPayFlag === 1">&#xe608;</span>
                </div>
                <router-link tag="div" class="buyorsell-right" :to="{path: `/trade/${tradeType}`, query: {id: item.otcBuyId}}">{{btnText}}</router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        list: Array,
        btnText: {
            type: String,
            default: '购买'
        },
        // 1：买币 2：卖币
        tradeType: {
            type: Number,
            default: 1
        }
    }
}
</script>
<style lang="scss" scoped>
    .goods {
       border-radius: .2rem;
       box-shadow: 0px 0px 5px #e9e9e9;
       box-sizing: border-box;
       padding: .2rem .3rem .24rem;
       background: #ffffff;
       margin-top: 0.2rem;
       .title{
           display: flex;
           justify-content: space-between;
           align-items: center;
           .title-left{
               display: flex;
               align-items: center;
                .img-box {
                    display: block;
                    width: 0.5rem;
                    height: 0.5rem;
                    border-radius: 50%;
                    margin-right:0.2rem;
                }
           }
           .title-right{
               font-size: $f24;
               color: $fc02 
           }
       }
       .count{
           display: flex;
           justify-content: space-between;
           align-items: center;
           font-size: $f24;
           color: $fc03;
           margin-top: .24rem;
           span{
               display: inline-block;
               margin-left: 0.3rem;
           }
           .price{
               font-size: $f36 ;
               color: #000000;
               font-weight: bold;
           }
       }
       .buyorsell{
           display: flex;
           border-top: 1px solid $border01;
           justify-content: space-between;
           margin-top: .36rem;
           box-sizing: border-box;
           padding: 0.2rem 0;
           padding-bottom: 0;
           .buyorsell-left{
               display: flex;
               align-items: center;
           }
           .big{
                font-size: $f28;
                margin-right: .14rem;
           }
           .vx{
               color:#69c362;
           }
           .zfb{
               color:#61aff7;
           }
            .yhk{
                color: #efcc94;
           }
           .buyorsell-right{
               height: 0.6rem;
               width: 1.4rem;
               background: $fc07;
               line-height: 0.6rem;
               color: $fc08;
               text-align: center;
               border-radius: 5px;
               &:active {
                   opacity: .8;
               }
           }
       }

    }
</style>
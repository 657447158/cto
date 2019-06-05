<template>
    <div class="goods">
        <div class="title">
            <div class="title-left">
                <span class="img-box">
                    <img src="" alt="">
                </span>
                <span>支持信用卡花呗</span>
            </div>
            <div class="title-right">
                996单 | 97%
            </div>
        </div>
        <div class="count">
            <div class="count-left">
                数量 <span>1500.0000 SEED</span>
            </div>
            <div class="count-right">
                单价
            </div>
        </div>
         <div class="count">
            <div class="count-left">
                限额 <span>¥30.00-1433.33</span>
            </div>
            <div class="count-right price">
                ¥0.995
            </div>
        </div>
        <div class="buyorsell">
            <div class="buyorsell-left">
                <span class="icon-mobile big vx" >&#xe81f;</span>
                <span class="icon-mobile big zfb" >&#xe820;</span>
                <span class="icon-mobile big yhk" >&#xe608;</span>
            </div>
            <div class="buyorsell-right">
                出售
            </div>
        </div>
    </div>
</template>
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
                    background: #999;
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
               color: $fc08 ;
               text-align: center;
               border-radius: 5px;
               &:active {
                   opacity: .8;
               }
           }
       }

    }
</style>
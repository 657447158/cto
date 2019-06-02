<template>
    <div class="goods">
        <div class="title">
            <div class="title-left">
                <img src="https://cdn.duitang.com/uploads/item/201610/03/20161003000301_Wfm5X.jpeg" alt="">
                <span>支持信用卡花呗</span>
            </div>
            <div class="title-right">
                996单|97%
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
       border-radius: 5px;
       box-shadow: 0px 0px 5px #e9e9e9;
       box-sizing: border-box;
       padding: 0.3rem;
       background: #ffffff;
       margin-top: 0.3rem;
       .title{
           display: flex;
           justify-content: space-between;
           align-items: center;
           .title-left{
               display: flex;
               align-items: center;
                img{
                    width: 1rem;
                    height: 1rem;
                    border-radius: 50%;
                    margin-right:10px;
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
           margin-top: 0.3rem;
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
           margin-top: 0.4rem;
           box-sizing: border-box;
           padding: 0.3rem 0;
           .big{
               font-size: $f56;
                margin-right:0.3rem;
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
           }
       }

    }
</style>
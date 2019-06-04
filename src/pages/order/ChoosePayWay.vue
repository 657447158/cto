<template>
    <div class="paywaybox p03">
        <div class="title">
            我已经转账到
            <span class="icon-mobile close" @click="hide">&#xe656;</span>
        </div>
        <div class="payway-item">
            <div class="left">
                <img src="http://img1.imgtn.bdimg.com/it/u=1107314399,2602653806&fm=26&gp=0.jpg" class="pay-icon">
                <span>支持信用还款</span>
            </div>
        </div>
        <div class="payway-item">
            <div class="left">
                 <span class="icon-mobile vx pay-icon" >&#xe81f;</span>
                <span class="way">微信</span>
                <span class="name">kim8899</span>
            </div>
             <div class="right"></div>
        </div>
         <div class="payway-item">
            <div class="left">
                 <span class="icon-mobile pay-icon zfb" >&#xe820;</span>
                <span class="way">支付宝</span>
                <span class="name">135455555555</span>
            </div>
             <div class="right"></div>
        </div>
         <div class="payway-item">
            <div class="left">
                 <span class="icon-mobile pay-icon yhk" >&#xe608;</span>
                <span class="way">银行卡</span>
                <span class="name">434444443434343432434</span>
            </div>
            <div class="right"></div>
        </div>
        <div class="btn">
            确认
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        hide(){
             this.$emit('hide');
        }
    }
}
</script>

<style lang="scss" scoped>
.p03{
      padding: 0 0.3rem;
  }
.paywaybox{
    .title{
        line-height:1rem;
        border-bottom: 1px solid $border02;
        text-align: center;
        font-size: $f30;
        color: $fc06  ;
        font-weight: bold;
        position: relative;
        span{
            position: absolute;
            right: 0rem;
        }
    }
    .payway-item{
        display: flex;
        align-items: center;
        height: 0.88rem;
        .left{
            display: flex;
            align-items: center;
            flex:1;
            font-size: $f30;
            color: $fc04  ;
            .pay-icon{
                width: 0.5rem;
                height: 0.5rem;
                margin-right: 0.3rem;
                border-radius: 50%;
                font-size: 0.5rem;
            }
            .way{
                display: inline-block;
                margin-right: 0.24rem;
                min-width: 0.94rem;
                // background: red;
            }
            .name{
                color: $fc02;
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
        }
        .right{
            width: 0.4rem;
            height: 0.4rem;
            border-radius: 50%;
            border: 1px solid $fc03   ;
        }
    }
    .btn{
        width: 100%;
        height: 0.88rem;
        border-radius: 5px;
        background: $fc07;
        text-align: center;
        line-height: 0.88rem;
        color: $fc08;
        margin-top: 0.8rem;
        margin-bottom: 0.2rem;
    }
  }
</style>
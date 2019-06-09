<template>
    <div class="order-info">
        <div class="itembox">
            <p class="title p03">订单信息</p>
            <div class="order-info p03">
                <div class="pay-item dark">
                    <span>交易单价</span>
                    <div class="pay-info-right">¥{{detail.price}}</div>
                </div>
                <div class="pay-item dark">
                    <span>交易数量</span>
                    <div class="pay-info-right">{{detail.buyNum}} {{detail.coinName}}</div>
                </div>
                <div class="pay-item dark">
                    <span>交易单号</span>
                    <div class="pay-info-right">{{detail.orderId}}</div>
                </div>
                <div class="pay-item dark">
                    <span>下单时间</span>
                    <div class="pay-info-right">{{detail.createDate}}</div>
                </div>
            </div>
        </div>
        <div class="itembox itembox1">
            <p class="title p03">交易说明</p>
            <p class="desc p03">1、对方的数字货币已经委托给平台,您完成付款后对方确认后将会把数字货币发送给您</p>
            <p class="desc p03">2、给对方付款后请务必点击下方“我已完成付款”</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        detail: Object
    }
}
</script>
<style lang="scss" scoped>
.order-info {
    box-sizing: border-box;
    .p03{
        padding: 0 0.3rem;
    }
    .itembox{
        margin-bottom: 0.14rem;
        background: $bg02;
        overflow: hidden;
        &.itembox1 {
            margin-bottom: 0;
            padding-bottom: 0.58rem;
        }
        .title{
            line-height: 1rem;
            font-size: $f32;
            color: $fc06;
            font-weight: bold;
            border: 1px solid $border01;
        }
        .desc{
            font-size: $f28;
            color: $fc02 ;
            line-height: $f36;
            margin-top: $f24;
        }
    }
    .pay-item{
        display: flex;
        justify-content: space-between;
        height: 0.88rem;
        align-items: center;
        border-bottom: 1px solid $border01;
        font-size: $f28;
        color: $fc03;
        &.dark{
            color:#5b5b5b;
        }
        .pay-info-right{
            color: $fc06;
            font-weight: bold;
            span{
                color: $fc07;
            }
            .pay-icon{
                color: $fc14;
            }
        }
    }
}
</style>


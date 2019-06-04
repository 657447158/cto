<template>
    <ul class="my-order">
        <li class="my-order-item">
            <div class="top">
                <span>购买BVC</span>
                <span class="time">2019-06-05 11:24:22</span>
                <div>
                    <span>下架</span>
                    <span>上架</span>
                </div>
            </div>
            <div class="content">
                <div>
                    <span>单价</span>
                    <span><i>一口价</i><span>￥0.0835</span></span>
                </div>
                <div>
                    <span>剩余</span>
                    <span>1000.0000 BCV</span>
                </div>
                <div>
                    <span>已成交</span>
                    <span>0.0000 BCV</span>
                </div>
                <div>
                    <span>限额</span>
                    <span>￥10 - 1000.00</span>
                </div>
                <div>
                    <span>备注</span>
                    <span>收款收款</span>
                </div>
            </div>
        </li>
    </ul>
</template>
<style lang="scss" scoped>
    .my-order {
        &-item {
            margin-top: .14rem;
            padding: 0 .32rem;
            background: $bg02;
        }
        .top {
            display: flex;
            justify-content: space-between;
            height: 0.88rem;
            line-height: .88rem;
        }
        .time {
            flex: 1;
        }
    }
</style>

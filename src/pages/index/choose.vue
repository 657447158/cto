<template>
    <div class="choose">
        <span class="icon-mobile close" @click="hide">&#xe656;</span>
        <p class="choose-title">排序</p>
        <div class="choose-box">
            <span class="choose-item choose-item1 active">综合排序</span>
            <span class="choose-item choose-item1">价格优先</span>
            <span class="choose-item choose-item1">成本率高</span>
            <span class="choose-item choose-item1">成交最多</span>
        </div>
        <p class="choose-title">支付方式</p>
        <div class="choose-box">
            <span class="choose-item choose-item2 active">微信</span>
            <span class="choose-item choose-item2 active">支付宝</span>
            <span class="choose-item choose-item2 active">银行卡</span>
        </div>
        <div class="choose-box">
            <span class="choose-reset">重置</span>
            <span class="choose-filter">筛选</span>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            show: Boolean
        },
        methods: {
            hide () {
                this.$emit('hide', this.show)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .choose {
        position: relative;
        padding: .4rem .36rem;
        .close {
            position: absolute;
            top: .24rem;
            right: .3rem;
            color: $fc03;
            font-size: $f24;
            font-weight: bold;
        }
        &-title {
            font-size: $f36;
            color: $fc05;
            font-weight: bold;
        }
        &-box {
            margin: .4rem 0;
            display: flex;
            justify-content: space-between;
        }
        &-item {
            height: .64rem;
            line-height: .64rem;
            text-align: center;
            color: $fc05;
            border-radius: .05rem;
            border: 2px solid $bg05;
            background: $bg05;
            &.active {
                color: $fc07;
                background-color: #e9edfd;
                border: 2px solid;
            }
        }
        &-item1 {
            width: 1.52rem;
        }
        &-item2 {
            width: 1.96rem;
        }
        &-reset {
            width: 2.8rem;
            height: 0.88rem;
            line-height: .88rem;
            text-align: center;
            font-size: $f32;
            color: #6f759c;
            background: $bg05;
            border-radius: .05rem;
        }
        &-filter {
            width: 4rem;
            height: 0.88rem;
            line-height: .88rem;
            text-align: center;
            font-size: $f32;
            color: $fc08;
            background: $fc07;
            border-radius: .05rem;
        }
    }
</style>

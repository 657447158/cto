<template>
    <div class="more">
        <div class="more-tab">
            <span>创新区</span>
            <span>分红区</span>
            <span>优质区</span>
            <span>稳定区</span>
        </div>
        <ul class="more-list">
            <li>
                <p><span class="img-box"></span><span class="name">BCV</span></p>
                <p><span class="img-box"></span><span class="name">TAC</span></p>
                <p><span class="img-box"></span><span class="name">EMAN</span></p>
                <p><span class="img-box"></span><span class="name">HT</span></p>
                <p><span class="img-box"></span><span class="name">ULA</span></p>
                <p><span class="img-box"></span><span class="name">CMDT</span></p>
            </li>
            <li>
                <p><span class="img-box"></span><span class="name">SEED</span></p>
                <p><span class="img-box"></span><span class="name">ABCB</span></p>
                <p><span class="img-box"></span><span class="name">WL</span></p>
            </li>
            <li>
                <p><span class="img-box"></span><span class="name">BTC</span></p>
                <p><span class="img-box"></span><span class="name">ETH</span></p>
                <p><span class="img-box"></span><span class="name">EOS</span></p>
            </li>
            <li>
                <p><span class="img-box"></span><span class="name">HKDT</span></p>
                <p><span class="img-box"></span><span class="name">USDT</span></p>
                <p><span class="img-box"></span><span class="name">USDTDSFS</span></p>
            </li>
        </ul>
        <div class="more-btn" @click="hide">取消</div>
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
    .more {
        &-tab {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: .99rem;
            border-bottom: 1px solid $border01;
            span {
                width: 25%;
                text-align: center;
            }
        }
        &-list {
            padding-top: 0.2rem;
            display: flex;
            height: 7.5rem;
        }
        li {
            width: 25%;
            border-right: 1px solid $border01;
            overflow: auto;
        }
        p {
            margin-bottom: 0.4rem;
            padding: 0 .2rem;
            display: flex;
            align-items: center;
        }
        .img-box {
            margin-right: 0.14rem;
            width: 0.46rem;
            height: 0.46rem;
            border: 2px solid $border01;
            border-radius: 50%;
            background: $fc02;
        }
        .name {
            font-size: $f20;
            @include ellipsis(.7rem)
        }
        &-btn {
            font-size: $f32;
            color: $fc04;
            height: .88rem;
            line-height: .88rem;
            text-align: center;
            border-top: 1px solid $border01;
        }
    }
</style>

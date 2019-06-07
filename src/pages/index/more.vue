<template>
    <div class="more">
        <div class="more-tab">
            <span v-for="(item, index) in list" :key="index">{{item.region}}</span>
        </div>
        <ul class="more-list">
            <li v-for="(item, index) in list" :key="index">
                <p
                    v-for="coin in item.regionCoins"
                    :key="coin.coinName"
                    @click="switchCoinType(coin.coinId, coin.coinName, coin.coinPrice, coin.coinImage)"
                >
                    <span class="img-box">
                        <img :src="coin.coinImage" :alt="coin.coinName">
                    </span>
                    <span class="name">{{coin.coinName}}</span>
                </p>
            </li>
        </ul>
        <div class="more-btn" @click="hide">取消</div>
    </div>
</template>
<script>
    export default {
        props: {
            show: Boolean,
            list: Array
        },
        methods: {
            hide () {
                this.$emit('hide')
            },
            switchCoinType (coinId, coinName, coinPrice) {
                this.$emit('switchCoinType', coinId, coinName, coinPrice)
                this.hide()
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
            display: flex;
            max-height: 7.5rem;
        }
        li {
            padding-top: 0.2rem;
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
            overflow: hidden;
        }
        .name {
            font-size: $f20;
            @include ellipsis(.9rem)
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

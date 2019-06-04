<template>
    <div class="create">
        <div class="create-tab">
            <span class="active">我要买币</span>
            <span>我要卖币</span>
        </div>
        <div class="create-form">
            <div class="create-item">
                <span class="label">币种</span>
                <div class="create-sub-item2" @click="showPop">
                    <span>{{iconType}}</span>
                    <span class="icon-mobile">&#xe66f;</span>
                </div>
            </div>
            <div class="create-item">
                <span class="label">收购总量(WL)</span>
                <input type="text" placeholder="0.0001">
            </div>
            <div class="create-item">
                <span class="label">最小交易额(CNY)</span>
                <input type="text" placeholder="￥1.00">
            </div>
            <div class="create-item">
                <span class="label">最大交易额(CNY)</span>
                <input type="text" placeholder="￥999999.99">
            </div>
            <div class="create-item">
                <span class="label">支持付款方式</span>
                <div class="create-sub-item">
                    <span>微信</span>
                    <span>支付宝</span>
                    <span>银行卡</span>
                </div>
            </div>
        </div>
        <div class="create-form">
            <div class="create-item create-item1">
                <span class="labal">设置单价</span>
                <div class="create-sub-item1">
                    <input id="check" type="checkbox" class="switch" />
                    <label for="check">
                        <span
                            v-for="(item, index) in priceType"
                            :key="index"
                            :class="priceTypeIndex === index && 'active'"
                            @click="choosePriceType(index)"
                        >{{item}}</span>
                    </label>
                </div>
            </div>
        </div>
        <!-- 币种选择modal -->
        <cto-modal :show="show" class="coin-type" dir="bottom" @hide="cancel">
            <div class="coin-type-top">
                <span class="confirm" @click="confirm">完成</span>
            </div>
            <div class="coin-type-list" ref="coinList">
                <div class="coin-type-item">
                    <div
                        class="coin-type-subItem"
                        v-for="(item, index) in coinTypeList"
                        :key="index"
                    >{{item}}</div>
                </div>
            </div>
        </cto-modal>
    </div>
</template>
<script>
    import Swiper from '@/utils/swiper'
import { setTimeout } from 'timers';
    export default {
        data () {
            return {
                priceType: ['浮动价', '一口价'],
                priceTypeIndex: 0,
                iconType: 'WL',
                show: false,
                coinTypeList: ['WL', 'DKS', 'DSFFD', 'JJNSD', 'SDWER', 'SONZ'],
                coinIndex: 0
            }
        },
        methods: {
            choosePriceType (index) {
                this.priceTypeIndex = index
            },
            showPop () {
                let _this = this
                _this.show = true
                    setTimeout(() => {
                        new Swiper(this.$refs.coinList, {
                        autoPlay: false,
                        initialSlide: _this.coinIndex,
                        wrapper: '.coin-type-item',
                        direction: 'vertical',
                        slide: '.coin-type-subItem',
                        isTouch: true,
                        endFn (num) {
                            _this.coinIndex = num
                        }
                    })
                }, 0)
            },
            cancel () {
                this.show = false
            },
            confirm () {
                this.iconType = document.querySelector('.swiper-slide-active').innerHTML
                this.show = false
            }
        }
    }
</script>
<style lang="scss" scoped>
    .create {
        &-tab {
            display: flex;
            justify-content: space-between;
            line-height: .88rem;
            font-size: $f32;
            background: $bg02;
            span {
                position: relative;
                width: 50%;
                text-align: center;
                &.active {
                    color: $fc07;
                    font-weight: bold;
                    &::after {
                        display: block;
                        content: '';
                        position: absolute;
                        left: 50%;
                        bottom: 0;
                        margin-left: -0.8rem;
                        width: 1.6rem;
                        height: 3px;
                        background: $fc07;
                    }
                }
            }
        }
        &-form {
            padding: 0 .32rem;
            margin-top: 0.14rem;
            overflow: hidden;
            background: $bg02;
        }
        &-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 1.08rem;
            font-size: $f30;
            border-bottom: 2px solid $border01;
            input {
                text-align: right;
                &::placeholder {
                    font-size: $f26;
                }
            }
        }
        &-sub-item {
            display: flex;
            span {
                margin-left: 0.3rem;
                width: 1rem;
                height: .42rem;
                text-align: center;
                line-height: .42rem;
                font-size: $f24;
                color: $fc04;
                background: $bg05;
                border-radius: 3px;
            }
        }
        &-sub-item1 {
            position: relative;
            width: 2.8rem;
            height: .72rem;
            border-radius: 3.6rem;
            background: $bg05;
            .switch {
                display: none;
                width: 100%;
                height: .72rem;
                &:checked~label::after{
                    transform: translateX(1.4rem);
                }
            }
            label {
                display: flex;
                position: relative;
                width: 100%;
                height: 0.72rem;
                border-radius: .36rem;
                &::after {
                    position: absolute;
                    top: 0;
                    left: 0;
                    content: '';
                    display: block;
                    width: 1.4rem;
                    height: .72rem;
                    border-radius: .36rem;
                    background: $fc07;
                    transition: all .3s ease;
                }
            }
            span {
                position: relative;
                z-index: 1;
                width: 50%;
                height: 100%;
                line-height: .72rem;
                text-align: center;
                color: $fc05;
                transition: all .3s linear;
                &.active {
                    color: $fc08;
                    transition: all .3s linear;
                }
            }
        }
        &-sub-item2 {
            display: flex;
            line-height: 1;
            font-size: $f26;
            .icon-mobile {
                margin: .05rem 0 0 .16rem;
                font-size: $f20;
            }
        }
    }
    .coin-type {
        .swiper-slide-active{
            color: $fc06;
        }
        &-top {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            height: .88rem;
            border-bottom: 1px solid $border01;
            .confirm {
                padding: 0 .32rem;
                text-align: center;
                color: $fc07;
                font-size: $f30;
                font-weight: bold;
            }
        }
        &-list {
            position: relative;
            height: 3.7rem;
            padding-top:1.48rem;
            overflow: hidden;
            &:before {
                position: absolute;
                top: 1.48rem;
                left: 0;
                right: 0;
                content: '';
                height: .74rem;
                border-top: 1px solid $border01;
                border-bottom: 1px solid $border01;
            }
        }
        &-item {
            position: relative;
            z-index: 1;
            text-align: center;
            color: $fc03;
            font-size: $f32;
        }
        &-subItem{
            height: .74rem;
            line-height: .74rem;
        }
    }
</style>

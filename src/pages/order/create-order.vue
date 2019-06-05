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
                <span class="label">收购总量({{iconType}})</span>
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
            <!-- 浮动价 -->
            <div class="create-item2" v-show="priceTypeIndex === 0">
                <div class="create-item2-top">
                    <span class="label">固定价格</span>
                    <span class="tip">市场参考价￥0.564</span>
                </div>
                <div class="create-item2-bottom">
                    <input type="text" placeholder="不随市价浮动" />
                    <span>CNY</span>
                </div>
                <p class="create-item2-tip">发布后，该产品不会因市场波动而改变</p>
            </div>
            <!-- 一口价 -->
            <div class="create-item2" v-show="priceTypeIndex === 1">
                <div class="create-item2-top">
                    <span class="label">设置溢价</span>
                    <span class="tip">市场参考价￥0.1023</span>
                    <router-link class="icon-mobile icon-mark" to="mark-detail">&#xe821;</router-link>
                </div>
                <div class="create-item2-bottom">
                    <input type="text" placeholder="建议 0 到 20" />
                    <span>%</span>
                </div>
                <p class="create-item2-tip">浮动价 -</p>
            </div>
            <div class="create-item3">
                <textarea placeholder="请输入备注信息(最多输入20个字符)"></textarea>
            </div>
            <div class="create-btn" @click="createOrder">创建挂单</div>
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
    import Dialog from '@/components/dialog'
    export default {
        data () {
            return {
                priceType: ['浮动价', '一口价'],
                priceTypeIndex: 0,
                iconType: 'WL',
                show: false,
                coinTypeList: ['WL', 'DKS', 'DSFFD', 'JJNSD', 'SDWER', 'SONZ'],
                coinIndex: 0,
                blockShow: true
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
            },
            // 创建订单
            createOrder () {
                Dialog({
                    title: '确认创建挂单吗?',
                    content: '(创建后将不可修改)'
                })
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
        &-item1 {
            height: 1.18rem;
        }
        &-item2 {
            font-size: $f26;
            .label {
                margin-right: 0.2rem;
            }
            .tip {
                flex: 1;
                font-size: $f24;
                color: $fc02;
            }
            .icon-mark {
                color: $fc07;
                font-size: $f30;
            }
            &-top {
                display: flex;
                line-height: .92rem;
            }
            &-bottom {
                display: flex;
                justify-content: space-between;
                align-content: center;
                padding: 0 .32rem;
                width: 100%;
                height: 0.88rem;
                background: $bg05;
                line-height: .88rem;
                input {
                    width: 5.5rem;
                    background: none;
                    &::placeholder {
                        font-size: $f26;
                    }
                }
                span {
                    font-size: $f22;
                    font-weight: bold;
                }
            }
            &-tip {
                padding: .3rem 0 0.4rem;
                font-size: $f24;
                color: $fc02;
            }
        }
        &-item3 {
            padding: .25rem .2rem 0;
            width: 100%;
            height: 1.2rem;
            background: $bg05;
            textarea {
                width: 100%;
                height: 100%;
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
        &-btn {
            margin-top: 0.52rem;
            width: 100%;
            height: 0.88rem;
            line-height: .88rem;
            text-align: center;
            font-size: $f32;
            color: $fc08;
            background: $fc07;
            border-radius: .05rem;
            &:active {
                opacity: .8;
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

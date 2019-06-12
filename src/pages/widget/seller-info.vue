<template>
    <div class="itembox">
        <p class="title p03">卖家信息</p>
        <div class="goodstitle p03" @click="showPayTypePop">
            <div class="gt-left">
                <img :src="detail.headImage" />
                <p class="gt-title">{{detail.buyNickName}}</p>
            </div>
            <div class="gt-right">
                {{payTypeText}} <span class="icon-mobile  icon-ml">&#xe6af;</span>
            </div>
        </div>
        <!-- 选择微信 -->
        <div class="pay-info p03" v-show="payType === 0">
            <div class="pay-item">
                <span>微信号</span>
                <div class="pay-info-right">
                    {{detail.receiptAccount && detail.receiptAccount.wxNo}} <span class="icon-mobile  icon-ml pay-icon">&#xe605;</span>
                </div>
            </div>
             <div class="pay-item">
                <span>真实姓名</span>
                <div class="pay-info-right">
                    {{detail.receiptAccount && detail.receiptAccount.wxRealName}} <span class="icon-mobile  icon-ml pay-icon">&#xe605;</span>
                </div>
            </div>
             <div class="pay-item">
                <span>收款地址</span>
                <div class="pay-info-right">
                    <span>打开微信</span> <span class="icon-mobile  icon-ml">&#xe6b1;</span>
                </div>
            </div>
            <div class="pay-qrcode">
                <img :src="detail.receiptAccount && detail.receiptAccount.wxPaymentCode" />
            </div>
        </div>
        <!-- 选择支付宝 -->
        <div class="pay-info p03" v-show="payType === 1">
            <div class="pay-item">
                <span>支付宝账号</span>
                <div class="pay-info-right">
                    {{detail.receiptAccount && detail.receiptAccount.aliNo}} <span class="icon-mobile  icon-ml pay-icon">&#xe605;</span>
                </div>
            </div>
             <div class="pay-item">
                <span>真实姓名</span>
                <div class="pay-info-right">
                    {{detail.receiptAccount && detail.receiptAccount.aliRealName}} <span class="icon-mobile  icon-ml pay-icon">&#xe605;</span>
                </div>
            </div>
             <div class="pay-item">
                <span>收款地址</span>
                <div class="pay-info-right">
                    <span>打开支付宝</span> <span class="icon-mobile  icon-ml">&#xe6b1;</span>
                </div>
            </div>
            <div class="pay-qrcode">
                <img :src="detail.receiptAccount && detail.receiptAccount.aliPaymentCode" />
            </div>
        </div>
        <!-- 选择银行卡 -->
        <div class="pay-info p03" v-show="payType === 2">
            <div class="pay-item">
                <span>姓名</span>
                <div class="pay-info-right">
                    {{detail.receiptAccount && detail.receiptAccount.bankRealName}} <span class="icon-mobile  icon-ml pay-icon">&#xe605;</span>
                </div>
            </div>
            <div class="pay-item">
                <span>卡号</span>
                <div class="pay-info-right">
                    {{detail.receiptAccount && detail.receiptAccount.bankCardNumber}} <span class="icon-mobile  icon-ml pay-icon">&#xe605;</span>
                </div>
            </div>
            <div class="pay-item">
                <span>银行</span>
                <div class="pay-info-right">
                    {{detail.receiptAccount && detail.receiptAccount.bankDeposit}} <span class="icon-mobile  icon-ml pay-icon">&#xe605;</span>
                </div>
            </div>
            <div class="pay-item">
                <span>支行</span>
                <div class="pay-info-right">
                    {{detail.receiptAccount && detail.receiptAccount.bankSubBranch}} <span class="icon-mobile  icon-ml pay-icon">&#xe605;</span>
                </div>
            </div>
        </div>
        <!-- 支付方式选择 -->
        <otc-modal :show="payTypeShow" class="order-type" dir="bottom" @hide="hide">
            <div class="order-type-top">
                <span class="confirm" @click="confirm">完成</span>
            </div>
            <div class="order-type-list" ref="payTypeList">
                <div class="order-type-item">
                    <div
                        class="order-type-subItem"
                        v-for="item in payTypeList"
                        :key="item.type"
                        :index="item.type"
                    >{{item.name}}</div>
                </div>
            </div>
        </otc-modal>
    </div>
</template>
<script>
import Swiper from '@/utils/swiper'
export default {
    props: {
        detail: Object,
        payTypeText: String,
        payType: Number,
        payTypeList: Array
    },
    data () {
        return {
            payTypeShow: false
        }
    },
    methods: {
        hide () {
            this.payTypeShow = false
        },
        // 弹出支付方式选择框
        showPayTypePop () {
            let _this = this
            _this.payTypeShow = true
            setTimeout(() => {
                new Swiper(_this.$refs.payTypeList, {
                    autoPlay: false,
                    initialSlide: _this.payTypeIndex,
                    wrapper: '.order-type-item',
                    direction: 'vertical',
                    slide: '.order-type-subItem',
                    isTouch: true,
                    endFn (num) {
                        _this.payTypeIndex = num
                    }
                })
            }, 0)
        },
        // 支付方式选择-完成
        confirm () {
            let activeDOM = document.querySeleotcr('.swiper-slide-active')
            this.payTypeShow = false
            this.$emit('sellerConfirm', activeDOM.innerHTML, parseInt(activeDOM.getAttribute('index')))
            // this.payTypeText = activeDOM.innerHTML
            // this.payType = parseInt(activeDOM.getAttribute('index'))
        },
    }
}
</script>
<style lang="scss" scoped>
.p03{
    padding: 0 0.3rem;
}
.icon-ml{
    margin-left: 0.2rem;
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
.goodstitle{
    height:1.32rem;
    background: $bg03;
    display:flex;
    align-items: center;
    justify-content: space-between;
    font-size: $f32;
    .gt-left{
        display: flex;
        align-items: center;
        img {
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
        }
        p {
            margin-left: 0.2rem;
            font-size: $f32;
            color: $fc06;
            font-weight: bold;
        }
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
.pay-qrcode{
    padding: 0.2rem 0;
    display: flex;
    justify-content: flex-end;
    img{
        width: 1.9rem;
        height: 2.6rem;
        border: 2px solid $border01;
        border-radius: 0.1rem;
    }
}
.order-type {
    &-top {
        padding: 0 .32rem;
        height: .87rem;
        line-height: .87rem;
        text-align: right;
        font-size: $f30;
        color: $fc07;
        border-top: 1px solid $border03;
    }
    &-list {
        position: relative;
        padding-top: 1.8rem;
        font-size: $f44;
        line-height: .68rem;
        text-align: center;
        background: $bg01;
        &:before {
            position: absolute;
            top: 1.8rem;
            left: 0;
            right: 0;
            content: '';
            height: .68rem;
            border-top: 1px solid $border03;
            border-bottom: 1px solid $border03;
        }
    }
}
</style>


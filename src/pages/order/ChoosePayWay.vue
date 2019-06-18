<template>
    <div class="paywaybox p03">
        <div class="title">
            我已经转账到
            <span class="icon-mobile close" @click="hide">&#xe656;</span>
        </div>
        <div class="payway-item">
            <div class="left">
                <span class="img-box" :class="!detail.headImage && 'otc-no-photo'">
                    <img v-if="detail.headImage" :src="detail.headImage" />
                </span>
                <span>{{detail.buyNickName}}</span>
            </div>
        </div>
        <div
            class="payway-item"
            v-for="(item, index) in payTypeList"
            :key="index"
        >
            <div class="left">
                <span class="icon-mobile pay-icon" :style="{color: item.color}" v-html="item.icon"></span>
                <span class="way">{{item.name}}</span>
                <span class="name">{{item.num}}</span>
            </div>
            <div class="icon-mobile right" :class="typIndex === index && 'active'" v-html="typIndex === index ? '&#xe7a1;' : ''" @click="choosePayType(index)"></div>
        </div>
        <div class="btn" @click="confirm">确认</div>
    </div>
</template>
<script>
import Dialog from '@/components/dialog'
import Toast from '@/components/toast'
import Ajax from '@/service'
export default {
    props: {
        detail: Object,
        payTypeList: Array,
        buyOrderId: String
    },
    data () {
        return {
            typIndex: '',
            // 转账方式 1微信 2支付宝 3银行卡
            payType: ''
        }
    },
    methods: {
        hide(){
            this.$emit('hide');
        },
        // 选择支付方式
        choosePayType (index) {
            this.typIndex = index
            this.payType = index + 1
        },
        confirmPay () {
            this.$emit('confirmPay')
        },
        confirm () {
            if (this.typIndex === '') {
                Toast({
                    message: '请选择转账方式'
                })
                return
            }
            this.hide()
            Dialog({
                title: '确认已经完成付款吗？',
                content: `<p style="font-size: .26rem; line-height: .4rem;">还未完成付款，请勿点击“确认”,恶意操作3次以上会被列入黑名单</p>`,
                comfirmFn: (callback) => {
                    Ajax.finishPayBuyOrder({
                        buyOrderId: this.buyOrderId,
                        payType: this.payType
                    }).then(res => {
                        if (res.code === '0000') {
                            this.confirmPay()
                        } else {
                            Toast({
                                message: res.message
                            })
                        }
                    }).catch(err => {

                        console.log(err)
                    })
                    callback()
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.p03 {
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
            color: $fc04;
            .img-box {
                margin-right: 0.3rem;
                width: 0.5rem;
                height: 0.5rem;
                border-radius: 50%;
            }
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
        }
        .right{
            width: 0.4rem;
            height: 0.4rem;
            border-radius: 50%;
            border: 1px solid $fc03;
            &.active {
                font-size: $f24;
                color: $fc08;
                line-height: .4rem;
                text-align: center;
                background: $fc07;
                border: 1px solid $fc07;
            }
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
        font-size: $f32;
        &:active {
            opacity: .8;
        }
    }
}
</style>
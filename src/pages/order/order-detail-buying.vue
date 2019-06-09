<template>
  <div class="order-detail">
    <div class="itembox">
      <div class="refresh p03">
        <span>刷新</span>
      </div>
      <!-- 订单状态为 1-正在进行（包含3个支付状态：1请完成付款，2等待对方确认收款，3已完成） -->
      <div class="paydesc" v-if="orderStatus === 1">{{payStatusText}}</div>
      <div class="paydesc" v-else-if="orderStatus === 2">已完成</div>
      <div class="paydesc" v-else-if="orderStatus === 3">已取消</div>
      <!-- 订单状态 end -->
      <div class="amount">¥{{detail.buyMoney}}</div>
      <div class="countdown" v-if="orderStatus !== 3 && payStatus === 1">
        (请在
        <span>{{restMinuteT}}内</span>完成付款,并点击下方
        <span>"我已完成付款"</span>)
      </div>
    </div>
    <!-- 卖家信息 start -->
    <seller-info
        :detail="detail"
        :payTypeText="payTypeText"
        :payType="payType"
        :payTypeList="payTypeList"
        @sellerConfirm="sellerConfirm"
    ></seller-info>
    <!-- 卖家信息 end -->
    <!-- 订单信息&交易说明 start -->
    <order-info :detail="detail"></order-info>
    <!-- 订单信息&交易说明 end -->
    <!-- 底部按钮 start -->
    <div class="pay-btn p03" v-if="orderStatus === 1 && payStatus === 1">
        <div class="cancle" @click="cancelFn">取消</div>
        <div class="pay-done" @click="showPop">我已经完成付款（{{restMinuteB}}）</div>
    </div>
    <div class="disabled-btn p03" v-else-if="orderStatus === 1 && payStatus === 2">
        <span>等待对方确认（{{restMinuteB}}）</span>
    </div>
    <div class="disabled-btn p03" v-else-if="orderStatus === 2">
        <span>已完成</span>
    </div>
    <div class="disabled-btn p03" v-else-if="orderStatus === 3">
        <span>该订单已取消</span>
    </div>
    <!-- 底部按钮 end -->
    <!-- 更多弹窗 -->
    <cto-modal :show="moreShow">
        <choose-payway
            :detail="detail"
            :payTypeList="payTypeList"
            :buyOrderId="buyOrderId"
            @hide="hide"
            @confirmPay="confirmPay"
        />
    </cto-modal>
  </div>
</template>
<script>
import SellerInfo from '../widget/seller-info'
import OrderInfo from '../widget/order-info'
import ChoosePayway from './ChoosePayWay';
import Ajax from '@/service'
import { translateMinute } from '@/utils/common'
import Dialog from '@/components/dialog'
import Toast from '@/components/toast'

export default {
    components:{
        SellerInfo,
        OrderInfo,
        ChoosePayway
    },
    data(){
        return {
            moreShow: false,
            payType: 0,
            payTypeList: [],
            payTypeText: '',
            buyOrderId: this.$route.query.id + '',
            detail: {},
            //支付状态 1请完成付款，2等待对方确认收款，3已完成
            payStatus: 1,
            // 订单状态 1正在进行 2已完成 3已取消
            orderStatus: 1,
            // 剩余时间（默认15分钟）
            restSecond: 900,
            timer: null,
            payFlag: true,
            payTypeIndex: 0,
            // 取消dialog协议按钮状态
            cancelFlag: false
        }
    },
    created () {
        this.getOrderDetail()
    },
    computed: {
        payStatusText () {
            let text
            switch (this.payStatus) {
                case 1:
                    text = '请完成付款'
                    break
                case 2:
                    text = '等待对方确认收款'
                    break
                case 3:
                    text = '已完成'
                    break
            }
            return text
        },
        // 转换剩余时间(mm分ss秒)
        restMinuteT () {
            return translateMinute(this.restSecond)
        },
        restMinuteB () {
            return translateMinute(this.restSecond, 'mm:ss')
        }
    },
    methods:{
        // 定时器
        startTimer () {
            this.timer = setInterval(() => {
                console.log(1)
                if (this.restSecond > 0) {
                    this.restSecond--
                } else {
                    clearInterval(this.timer)
                    this.timer = null
                    this.payFlag = false
                }
            }, 1000)
        },
        // 获取订单详情
        getOrderDetail () {
            Ajax.getBuyOrderDetail({
                buyOrderId: this.buyOrderId
            }).then(res => {
                if (res.code === '0000') {
                    this.detail = res.data
                    this.payStatus = res.data.payStatus
                    this.orderStatus = res.data.orderStatus
                    this.restSecond = res.data.restSecond
                    if (this.orderStatus === 1 && this.payStatus !== 3) {
                        this.startTimer()
                    }
                    let { wxPayFlag, aliPayFlag, bankPayFlag } = res.data.payType
                    if (wxPayFlag === 1) {
                        this.payTypeList.push({
                            name: '微信',
                            type: 0,
                            num: res.data.receiptAccount.wxNo,
                            icon: '&#xe81f;',
                            color: '#69c362'
                        })
                    }
                    if (aliPayFlag === 1) {
                        this.payTypeList.push({
                            name: '支付宝',
                            type: 1,
                            num: res.data.receiptAccount.aliNo,
                            icon: '&#xe820;',
                            color: '#61aff7'
                        })
                    }
                    if (bankPayFlag === 1) {
                        this.payTypeList.push({
                            name: '银行卡',
                            type: 2,
                            num: res.data.receiptAccount.bankCardNumber,
                            icon: '&#xe608;',
                            color: '#efcc94'
                        })
                    }
                    this.payTypeText = this.payTypeList[0].name
                    this.paytype = this.payTypeList[0].type
                }
            }).catch(err => {
                console.log(err)
            })
        },
        hide(){
            this.moreShow = false
        },
        showPop () {
            this.moreShow = true;
        },
        // 取消按钮事件
        cancelFn () {
            let content = `<p style="font-size: .26rem; color: #080707; text-align: center;">如果您已给对方付款，请千万不要点击取消</p><div style="display: flex; align-items: flex-start; margin-top: .24rem;"><span style="width: .34rem; height: .34rem; border: 1px solid #b5b8bc; border-radius: 50%; margin-right: .18rem;"></span><p style="flex: 1; font-size: .24rem; color: #8c8c8c; line-height: .34rem;">取消规则：买方当日累计3笔取消，限制当日买入功能</p></div>`
            Dialog({
                title: '取消',
                content: content,
                align: 'left',
                cancelValue: '我再想想',
                comfirmValue: '确认取消',
                comfirmFn: (callback) => {
                    if (!this.cancelFlag) {
                        Toast({
                            message: '请先同意取消规则'
                        })
                        return
                    }
                    Ajax.cancelBuyOrder({
                        buyOrderId: this.buyOrderId
                    }).then(res => {
                        if (res.code === '0000') {
                            this.payFlag = false
                        }
                    }).catch(err => {
                        Toast({
                            type: 'error',
                            message: '服务器错误！'
                        })
                    })
                    callback()
                },
                contentFn: (callback) => {
                    this.cancelFlag = !this.cancelFlag
                    if (this.cancelFlag) {
                        content = `<p style="font-size: .26rem; color: #080707; text-align: center;">如果您已给对方付款，请千万不要点击取消</p><div style="display: flex; align-items: flex-start; margin-top: .24rem;"><span class="icon-mobile" style="width: .34rem; height: .36rem; border-radius: 50%; margin-right: .18rem; background: #3e5ef4; color: #fff; font-size: .22rem; text-align: center; line-height: .36rem;">&#xe7a1;</span><p style="flex: 1; font-size: .24rem; color: #8c8c8c; line-height: .34rem;">取消规则：买方当日累计3笔取消，限制当日买入功能</p></div>`
                    } else {
                        content = `<p style="font-size: .26rem; color: #080707; text-align: center;">如果您已给对方付款，请千万不要点击取消</p><div style="display: flex; align-items: flex-start; margin-top: .24rem;"><span style="width: .34rem; height: .34rem; border: 1px solid #b5b8bc; border-radius: 50%; margin-right: .18rem;"></span><p style="flex: 1; font-size: .24rem; color: #8c8c8c; line-height: .34rem;">取消规则：买方当日累计3笔取消，限制当日买入功能</p></div>`
                    }
                    callback(content)
                }
            })
        },
        // 确认付款后改变状态
        confirmPay () {
            this.payStatus = 2
        },
        sellerConfirm (payTypeText, payType) {
            this.payTypeText = payTypeText
            this.payType = payType
        }
    },
    destroyed () {
        clearInterval(this.timer)
        this.timer = null
    }
}
</script>
<style lang="scss" scoped>
.order-detail {
    box-sizing: border-box;
    padding-bottom: 1.2rem;
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
    .refresh {
        margin-top: 0.05rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: $f28;
        color: $fc02;
    }
    .paydesc {
        margin-top: 0.42rem;
        width: 100%;
        font-size: $f40;
        color: $fc07;
        font-weight: bold;
        text-align: center;
    }
    .amount {
        font-weight: bold;
        color: $fc06;
        font-size: $f56;
        text-align: center;
        padding: .34rem 0 .54rem;
    }
    .countdown {
        font-size: $f24;
        color: $fc10;
        text-align: center;
        padding-bottom: .88rem;
        span {
        color: $fc13;
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
    .pay-btn{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: $bg04;
        font-size: $f32;
        box-shadow: 0 0 .3rem rgba(0, 0, 0, .1);
        .cancle{
            width: 2rem;
            height: 0.88rem;
            text-align: center;
            line-height: 0.88rem;
            color: $fc02;
            border: 1px solid $border01;
            border-radius: 4px;
        }
        .pay-done{
            width: 4.4rem;
            height: 0.88rem;
            text-align: center;
            line-height: 0.88rem;
            border-radius: 4px;
            background: $fc07  ;
            color: $fc08 ;
        }
    }
    .disabled-btn {
        padding: 0 .32rem;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1.2rem;
        background: $bg02;
        box-shadow: 0 0 .3rem rgba(0, 0, 0, .1);
        span {
            margin-top: 0.16rem;
            display: block;
            width: 100%;
            height: .88rem;
            font-size: $f32;
            color: $fc08;
            text-align: center;
            line-height: .88rem;
            background: #dbdde6;
            &:active {
                opacity: .8;
            }
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
}
</style>
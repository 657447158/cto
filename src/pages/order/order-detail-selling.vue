<template>
    <!-- 订单详情-已完成（出售） -->
    <div class="order">
        <span class="refresh" @click="refresh">刷新</span>
        <div class="order-top">
            <span class="icon-mobile order-top-status" v-if="orderStatus === 2">&#xe7a1;</span>
            <p class="order-top-text order-top-text1" v-if="orderStatus === 1">{{payStatusText}}</p>
            <p class="order-top-text order-top-text2" v-else-if="orderStatus === 2">已完成</p>
            <p class="order-top-text order-top-text3" v-else-if="orderStatus === 3">已取消</p>
            <p class="order-top-price">￥{{detail.buyMoney}}</p>
        </div>
        <div class="order-content">
            <span class="pay-type" v-if="(orderStatus === 1 && payStatus !== 1) || orderStatus === 2">已打款至您的{{translatePayType}}了</span>
            <div class="order-content-item">
                <span class="label">买家</span>
                <div>
                    <img :src="detail.headImage" alt="">
                    <span>{{detail.nickName}}</span>
                </div>
            </div>
            <div class="order-content-item">
                <span class="label">买家姓名</span>
                <span>{{detail.buyNickName}}</span>
            </div>
            <div class="order-content-item">
                <span class="label">交易单价</span>
                <span>￥{{detail.price}}</span>
            </div>
            <div class="order-content-item">
                <span class="label">交易数量</span>
                <span>{{detail.buyNum}} {{detail.coinName}}</span>
            </div>
            <div class="order-content-item">
                <span class="label">交易单号</span>
                <span>{{detail.orderId}}</span>
            </div>
            <div class="order-content-item">
                <span class="label">下单时间</span>
                <span>{{detail.createDate}}</span>
            </div>
        </div>
        <!-- 分隔条 -->
        <span class="line"></span>
        <!-- 底部按钮 -->
        <div class="order-bottom" v-if="orderStatus === 1 && payStatus === 1">
            <span class="order-bottom-btn order-bottom-disabled">等待对方付款（{{restMinute}}）</span>
            <p class="order-bottom-tip">(15分钟内对方未完成付款交易会被取消)</p>
        </div>
        <div class="order-bottom" v-else-if="orderStatus === 1 && payStatus === 2">
            <span class="order-bottom-btn" @click="confirmRecieveMoney">请确认收到付款（{{restMinute}}）</span>
            <p class="order-bottom-tip order-bottom-tip1">收到付款后，请务必在15分钟内确认，如果有付款不及时确认将会被列入黑名单</p>
            <span class="order-bottom-pop" @click="showPop">提交申述</span>
        </div>
        <div class="order-bottom" v-else-if="orderStatus === 2">
            <router-link class="order-bottom-btn" to="index">返回首页</router-link>
        </div>
        <div class="order-bottom disabled-btn" v-else>
            <span>该订单已取消</span>
        </div>
        <!-- 投诉弹框 -->
        <otc-modal :show="show">
            <div class="otc-modal-box">
                <div class="otc-modal-top">
                    <span>提交申述原因：</span>
                    <span class="icon-mobile" @click="hide">&#xe656;</span>
                </div>
                <ul class="otc-modal-list">
                    <li
                        v-for="(item, index) in reasonList"
                        :key="index"
                        @click="chooseItem(index)"
                        :class="item.focus && 'active'"
                    >{{item.reason}}</li>
                </ul>
                <span class="otc-modal-confirm" @click="setOtcAppeal">确认</span>
            </div>
        </otc-modal>
        <!-- 输入密码弹框 -->
        <transition enter-active-class="animation-fade-in" leave-active-class="animation-fade-out">
            <div class="otc-modal-psd" v-show="psdShow">
                <div class="otc-modal-psd-box">
                    <div class="otc-modal-psd-top">
                        <span class="title">输入支付密码</span>
                        <span class="icon-mobile" @click="hide">&#xe656;</span>
                    </div>
                    <div class="otc-modal-psd-ct">
                        <p class="title">OTC场外兑换</p>
                        <p><span class="num">{{detail.buyNum}}</span><span>{{detail.coinName}}</span></p>
                    </div>
                    <div class="otc-modal-psd-input">
                        <input type="password" maxlength="6" v-model="password" ref="psd" />
                        <ul>
                            <li :class="password.length === 0 && 'focus'"><i v-show="password.length > 0"></i></li>
                            <li :class="password.length === 1 && 'focus'"><i v-show="password.length > 1"></i></li>
                            <li :class="password.length === 2 && 'focus'"><i v-show="password.length > 2"></i></li>
                            <li :class="password.length === 3 && 'focus'"><i v-show="password.length > 3"></i></li>
                            <li :class="password.length === 4 && 'focus'"><i v-show="password.length > 4"></i></li>
                            <li :class="password.length === 5 && 'focus'"><i v-show="password.length > 5"></i></li>
                        </ul>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import Ajax from '@/service'
import { translateMinute } from '@/utils/common'
import Toast from '@/components/toast'
import md5 from 'blueimp-md5'
import { setTimeout } from 'timers';
export default {
    data () {
        return {
            detail: {},
            orderStatus: 1,
            payStatus: 1,
            timer: null,
            restSecond: 900,
            show: false,
            reasonList: [],
            psdShow: false,
            password: '',
            viewHeight: window.innerHeight
        }
    },
    computed: {
        payStatusText () {
            let text = ''
            switch (this.payStatus) {
                case 1:
                    text = '等待对方付款'
                    break
                case 2:
                    text = '请确认收到付款'
                    break
                case 3:
                    text = '已完成'
                    break
            }
            return text
        },
        translatePayType () {
            let name = ''
            if (this.detail.payType.wxPayFlag === 1) {
                name = '微信'
            }
            if (this.detail.payType.aliPayFlag === 1) {
                name = '支付宝'
            }
            if (this.detail.payType.bankPayFlag === 1) {
                name = '银行卡'
            }
            return name
        },
        restMinute () {
            return translateMinute(this.restSecond, 'mm:ss')
        }
    },
    created () {
        this.getOrderDetail()
        this.getOtcAppealReasonList()
    },
    methods: {
        // 刷新页面
        refresh () {
            window.location.reload()
        },
        showPop () {
            this.show = true
        },
        hide () {
            this.show = false
            this.psdShow = false
        },
        chooseItem (index) {
            this.reasonList[index].focus = !this.reasonList[index].focus
        },
        // 定时器
        startTimer () {
            this.timer = setInterval(() => {
                if (this.restSecond > 0) {
                    this.restSecond--
                } else {
                    clearInterval(this.timer)
                    this.timer = null
                }
            }, 1000)
        },
        // 获取订单详情
        getOrderDetail () {
            Ajax.getBuyOrderDetail({
                buyOrderId: this.$route.query.id
            }).then(res => {
                if (res.code === '0000') {
                    this.detail = res.data
                    this.orderStatus = res.data.orderStatus
                    this.payStatus = res.data.payStatus
                    this.restSecond = res.data.restSecond
                    if (this.detail.orderStatus === 1 && this.detail.payStatus !== 3) {
                        this.startTimer()
                    }
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 确认收到付款
        confirmRecieveMoney () {
            this.psdShow = true
        },
        // 验证密码获取支付凭证
        checkUserPayPassword () {
            Ajax.checkUserPayPassword({
                payPassword :md5(this.password)
            }).then(res => {
                if (res.code === '0000') {
                    Ajax.sureBuyOrder({
                        buyOrderId: this.detail.buyOrderId,
                        payCertificate: res.data.payCertificate,
                        payTimestamps: res.data.payTimestamps
                    }).then(data => {
                        if (data.code === '0000') {
                            this.hide()
                            Toast({
                                type: 'sucess',
                                message: '已确认收款'
                            })
                            setTimeout(() => {
                                window.location.reload()
                            }, 2000)
                        } else {
                            Toast({
                                type: 'error',
                                message: res.message
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    Toast({
                        type: 'error',
                        message: res.message
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 获取申诉理由
        getOtcAppealReasonList () {
            Ajax.getOtcAppealReasonList()
                .then(res => {
                    if (res.code === '0000') {
                        res.data.map(item => {
                            item.focus = false
                        })
                        this.reasonList = res.data
                    }
                })
        },
        // 提交申诉
        setOtcAppeal () {
            let reasonId = ''
            this.reasonList.map(item => {
                if (item.focus) {
                    reasonId += item.id + ','
                }
            })
            Ajax.setOtcAppeal({
                reasonId,
                buyOrderId: this.detail.buyOrderId
            }).then(res => {
                if (res.code === '0000') {
                    this.hide
                    Toast({
                        type: 'sucess',
                        message: '提交成功！'
                    })
                }
            })
        }
    },
    watch: {
        password (val) {
            if (val && val.length === 6) {
                this.checkUserPayPassword()
            }
        }
    },
    destroyed () {
        clearInterval(this.timer)
        this.timer = null
    }
}
</script>
<style lang="scss" scoped>
    .order {
        position: relative;
        min-height: 100vh;
        background: $bg02;
        .refresh {
            position: absolute;
            top: 0.08rem;
            right: 0.32rem;
            font-size: $f28;
            color: $fc02;
        }
        &-top {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 3.8rem;
            background: $bg02;
            &-status {
                width: 1.05rem;
                height: 1.05rem;
                text-align: center;
                line-height: 1.05rem;
                font-size: .5rem;
                color: $fc08;
                border-radius: 50%;
                background: #64bd67;
            }
            &-text {
                margin: .18rem 0 .3rem;
                font-size: $f30;
                color: $fc06;
            }
            &-text1 {
                color: $fc07;
                font-size: $f44;
            }
            &-text3 {
                color: $fc07;
                font-size: $f44;
                font-weight: bold;
            }
            &-price {
                margin-left: -0.1rem;
                font-size: .6rem;
                color: #000;
                font-weight: bold;
            }
        }
        &-content {
            position: relative;
            padding: 0 .32rem;
            background: $bg02;
            border-top: 1px solid $border01;
            &-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 0.9rem;
                font-size: $f30;
                color: $fc04;
                border-bottom: 1px solid $border01;
                &:last-child {
                    border-bottom: none;
                }
            }
            .label {
                color: $fc02;
            }
            img {
                margin-right: 0.2rem;
                width: 0.48rem;
                height: 0.48rem;
                border-radius: 50%;
            }
            .pay-type {
                position: absolute;
                top: -0.58rem;
                right: 0.46rem;
                padding: 0 .12rem;
                font-size: $f24;
                color: $fc08;
                line-height: .58rem;
                background: #ee873a;
                border-radius: 5px;
                &::after {
                    position: absolute;
                    left: 50%;
                    display: block;
                    content: '';
                    width: 0;
                    height: 0;
                    border-right: .12rem solid transparent;
                    border-left: .12rem solid transparent;
                    border-top: .12rem solid #ee873a;

                }
            }
        }
        &-bottom {
            padding: 0 .32rem;
            width: 100%;
            background: $bg02;
            overflow: hidden;
            &-btn {
                margin-top: 0.5rem;
                display: block;
                text-align: center;
                line-height: .88rem;
                height: 0.88rem;
                font-size: $f34;
                color: $fc08;
                background: $fc07;
                &:active {
                    opacity: .8;
                }
            }
            &-disabled {
                background: #dbdde6;
            }
            &-tip {
                margin-top: .4rem;
                text-align: center;
                color: $fc02;
            }
            &-tip1 {
                padding: 0 .12rem;
                text-align: left;
                line-height: .38rem;
            }
            &-pop {
                margin-top: .4rem;
                display: block;
                font-size: $f26;
                color: $fc07;
                text-align: center;
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
        .line {
            display: block;
            width: 100%;
            height: 0.14rem;
            background: $bg01;
        }
        .otc-modal {
            /* 密码弹窗样式 */
            &-psd {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, .7);
                &-box {
                    position: absolute;
                    top: 1.5rem;
                    left: 50%;
                    width: 6.12rem;
                    height: 4.62rem;
                    transform: translateX(-50%);
                    background: $bg04;
                    border-radius: .1rem;
                }
                &-top {
                    padding: 0 .3rem;
                    display: flex;
                    align-items: center;
                    height: 0.99rem;
                    color: $fc02;
                    border-bottom: 1px solid $border01;
                    .title {
                        flex: 1;
                        text-align: center;
                        font-size: $f32;
                        color: $fc06;
                        font-weight: bold;
                    }
                }
                &-ct {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    color: $fc06;
                    font-weight: bold;
                    .title {
                        margin: .3rem 0 .45rem;
                        font-size: $f28;
                        color: $fc10;
                        font-weight: normal;
                    }
                    .num {
                        font-size: .65rem;
                    }
                }
                &-input {
                    position: relative;
                    margin-top: 0.5rem;
                    display: flex;
                    justify-content: center;
                    ul {
                        display: flex;
                        width: 4.92rem;
                        height: 0.8rem;
                        border: 2px solid #b9b9b9;
                        background: $bg01;
                    }
                    li {
                        position: relative;
                        width: calc(100% / 6);
                        height: 0.76rem;
                        border-right: 1px solid #b9b9b9;
                        &:last-child {
                            border-right: none;
                        }
                        &.focus {
                            &::after {
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                content: '';
                                display: block;
                                width: 1px;
                                height: 0.4rem;
                                background: $border03;
                                transform: translateY(-50%);
                                
                            }
                        }
                        i {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            display: block;
                            width: .1rem;
                            height: .1rem;
                            border-radius: 50%;
                            background: $fc06;
                            transform: translate(-50%, -50%);
                        }
                    }
                    input {
                        position: absolute;
                        z-index: 10;
                        width: 4.92rem;
                        height: 0.82rem;
                        opacity: 0;
                    }
                }
            }
            &-box {
                padding: 0 .4rem;
            }
            &-top {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 1rem;
                font-size: $f32;
                border-bottom: 1px solid $border01;
                .icon-mobile {
                    margin-top: -0.2rem;
                    font-size: $f24;
                    color: $fc02;
                    font-weight: bold;
                }
            }
            &-list {
                padding-top: 0.28rem;
                li {
                    margin-bottom: .2rem;
                    width: 100%;
                    height: 0.72rem;
                    line-height: .72rem;
                    text-align: center;
                    background: $bg05;
                    color: $fc02;
                    font-size: $f26;
                    border-radius: .05rem;
                    border: 2px solid $bg05;
                }
                .active {
                    color: $fc07;
                    border: 2px solid $fc07;
                    background: #e3ebfd;
                }
            }
            &-confirm {
                margin: 0.12rem 0;
                display: block;
                width: 100%;
                height: 0.88rem;
                font-size: $f32;
                color: $fc08;
                text-align: center;
                line-height: .88rem;
                background: $fc07;
            }
        }
    }
</style>

<template>
    <div class="create">
        <div class="create-tab">
            <span
                v-for="(item, index) in tabList"
                :key="index"
                :class="tabIndex === index && 'active'"
                @click="chooseTab(index)"
            >{{item}}</span>
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
                <span class="label">{{typeText}}总量({{iconType}})</span>
                <input type="text" placeholder="0.0001" v-model="total">
            </div>
            <div class="create-item-sell" v-show="tabIndex === 1">
                <span>我的 {{myTotal}} {{iconType}}</span>
                <span @click="inputAll">全部</span>
            </div>
            <div class="create-item">
                <span class="label">最小交易额(CNY)</span>
                <input type="text" placeholder="￥1.00" v-model="minSum">
            </div>
            <div class="create-item">
                <span class="label">最大交易额(CNY)</span>
                <input type="text" placeholder="￥999999.99" v-model="maxSum">
            </div>
            <div class="create-item">
                <span class="label">支持付款方式</span>
                <div class="create-sub-item">
                    <span
                        v-for="(item, index) in payTypeList"
                        :key="index"
                        :class="item.focus && 'active'"
                        @click="choosePayType(index)"
                    >{{item.title}}</span>
                </div>
            </div>
        </div>
        <div class="create-form">
            <div class="create-item create-item1">
                <span class="labal">设置单价</span>
                <div class="create-sub-item1">
                    <span class="switch" :class="checked ? 'checked' : 'unchecked'"></span>
                    <label>
                        <span
                            v-for="(item, index) in priceType"
                            :key="index"
                            class="status-switch"
                            :class="priceTypeIndex === index && 'active'"
                            @click="choosePriceType(index)"
                        >{{item}}</span>
                    </label>
                </div>
            </div>
            <!-- 浮动价 -->
            <div class="create-item2" v-show="priceTypeIndex === 0">
                <div class="create-item2-top">
                    <span class="label">设置溢价</span>
                    <span class="tip">市场参考价￥{{exchangeRate}}</span>
                    <router-link class="icon-mobile icon-mark" to="mark-detail">&#xe821;</router-link>
                </div>
                <div class="create-item2-bottom">
                    <input type="text" placeholder="建议 0 到 20" v-model="floatPrice" />
                    <span>%</span>
                </div>
                <p class="create-item2-tip">浮动价 - {{floatPriceEnd}}</p>
            </div>
            <!-- 一口价 -->
            <div class="create-item2" v-show="priceTypeIndex === 1">
                <div class="create-item2-top">
                    <span class="label">固定价格</span>
                    <span class="tip">市场参考价￥{{exchangeRate}}</span>
                </div>
                <div class="create-item2-bottom">
                    <input type="text" placeholder="不随市价浮动" v-model="fixedPrice" />
                    <span>CNY</span>
                </div>
                <p class="create-item2-tip">发布后，该产品不会因市场波动而改变</p>
            </div>
            <!-- 备注 -->
            <div class="create-item3">
                <textarea placeholder="请输入备注信息(最多输入20个字符)" maxlength="20" v-model="remark"></textarea>
            </div>
            <div class="create-btn" @click="createOrder" v-show="tabIndex === 0">创建挂单</div>
            <div class="create-btn-box" v-show="tabIndex === 1">
                <div class="create-btn" @click="createOrder">委托 {{total || 0}} {{iconType}} 给平台</div>
                <p>您的 {{iconType}} 交由平台保管，只有对方给你您完成付款后平台才会将 你的 {{iconType}} 发送给对方，请放心交易</p>
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
                        v-for="item in coinTypeList"
                        :key="item.coinId"
                        :total="item.totalCoin"
                        :exchangeRate="item.exchangeRate"
                        :coinId="item.coinId"
                    >{{item.coinName}}</div>
                </div>
            </div>
        </cto-modal>
    </div>
</template>
<script>
    import Ajax from '@/service'
    import Swiper from '@/utils/swiper'
    import Toast from '@/components/toast'
    import Dialog from '@/components/dialog'
import { setTimeout } from 'timers';
    export default {
        data () {
            return {
                tabList: ['我要买币', '我要卖币'],
                tabIndex: 0,
                checked: true,
                priceType: ['浮动价', '一口价'],
                priceTypeIndex: 0,
                iconType: '',
                show: false,
                coinTypeList: [],
                coinIndex: 0,
                blockShow: true,
                typeText: '收购',
                payTypeList: [{
                    title: '微信',
                    type: 1,
                    // 用于判断是否选中，添加active类
                    focus: false,
                    // 判断用户是否设置了该付款方式，未设置则不能选
                    set: false
                }, {
                    title: '支付宝',
                    type: 2,
                    focus: false,
                    set: false
                }, {
                    title: '银行卡',
                    type: 3,
                    focus: false,
                    set: false
                }],
                total: '',
                myTotal: 0,
                // 币种id
                coinId: '',
                // 参考价
                exchangeRate: '',
                // 最小交易额
                minSum: '',
                // 最大交易额
                maxSum: '',
                // 浮动价
                floatPrice: '',
                // 计算后的浮动价
                floatPriceEnd: '',
                // 固定价
                fixedPrice: '',
                // 备注
                remark: ''
            }
        },
        created () {
            this.getManyCoins()
            this.getUserAccount()
        },
        methods: {
            // 我要卖币-全部
            inputAll () {
                this.total = this.myTotal
            },
            // 我要买币、我要卖币 切换
            chooseTab (index) {
                if (this.tabIndex === index) return
                this.tabIndex = index
                if (this.tabIndex === 0) {
                    this.typeText = '收购'
                } else {
                    this.typeText = '出售'
                }
            },
            // 选择支持支付方式
            choosePayType (index) {
                if (!this.payTypeList[index].set) return
                this.payTypeList[index].focus = !this.payTypeList[index].focus
            },
            // 设置单价按钮切换（浮动价 | 一口价）
            choosePriceType (index) {
                if (this.priceTypeIndex === index) return
                this.checked = !this.checked
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
                this.total = ''
                this.iconType = document.querySelector('.swiper-slide-active').innerHTML
                this.myTotal = document.querySelector('.swiper-slide-active').getAttribute('total')
                this.exchangeRate = document.querySelector('.swiper-slide-active').getAttribute('exchangeRate')
                this.coinId = document.querySelector('.swiper-slide-active').getAttribute('coinId')
                this.show = false
            },
            /**
             * 接口API
             */
            getManyCoins () {
                Ajax.getManyCoins()
                    .then(res => {
                        if (res.code === '0000') {
                            this.coinTypeList = res.data
                            this.myTotal = res.data[0].totalCoin
                            this.exchangeRate = res.data[0].exchangeRate
                            this.coinId = res.data[0].coinId
                            this.iconType = res.data[0].coinName
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            getUserAccount () {
                Ajax.getReceiptAccountPayType()
                    .then(res => {
                        if (res.code === '0000') {
                            let { wxPayFlag, aliPayFlag, bankPayFlag,  } = res.data
                            if (wxPayFlag === 1) {
                                this.payTypeList[0].set = true
                            }
                            if (aliPayFlag === 1) {
                                this.payTypeList[1].set = true
                            }
                            if (bankPayFlag === 1) {
                                this.payTypeList[2].set = true
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 校验表单
            verifyFormData () {
                if (!this.total) {
                    let text = '购买'
                    if (this.tabIndex === 1) {
                        text = '出售'
                    }
                    Toast({
                        message: `请输入${text}总量`
                    })
                    return false
                }
                if (this.tabIndex === 1 && Number(this.total) > Number(this.myTotal)) {
                    Toast({
                        message: '出售总量不能大于您的资产'
                    })
                    return false
                }
                if (!this.minSum) {
                    Toast({
                        message: '请输入最小交易额'
                    })
                    return false
                }
                if (this.minSum < 1) {
                    Toast({
                        message: '最小交易额不能小于1'
                    })
                    return false
                }
                if (!this.maxSum) {
                    Toast({
                        message: '请输入最大交易额'
                    })
                    return false
                }
                let arr = this.payTypeList.filter(item => {
                    return item.focus
                })
                if (arr.length === 0) {
                    Toast({
                        message: '请选择支持付款方式'
                    })
                    return false
                }
                // 浮动价
                if (this.priceTypeIndex === 0) {
                    if (!this.floatPrice) {
                        Toast({
                            message: '请输入溢价区间'
                        })
                        return false
                    }
                    if (this.floatPrice < 0 || this.floatPrice > 20) {
                        Toast({
                            message: '溢价最好在 0-20%之间'
                        })
                        return false
                    }
                }
                // 一口价
                if (this.priceTypeIndex === 1 && !this.fixedPrice) {
                    Toast({
                        message: '请输入单价'
                    })
                    return false
                }
                return true
            },
            // 创建挂单
            createOrder () {
                if (!this.verifyFormData()) {
                    return
                }
                Dialog({
                    title: '确认创建挂单吗?',
                    content: '(创建后将不可修改)',
                    comfirmFn: (callback) => {
                        callback()
                        this.publishBuyOrder()
                    }
                })
            },
            // 下单API
            publishBuyOrder () {
                let params = {
                    requestNo: new Date().getTime(),
                    tradeType: this.tabIndex + 1,
                    coinId: this.coinId,
                    totalNum: this.total,
                    minQuota: this.minSum,
                    maxQuota: this.maxSum,
                    wxPayFlag: this.payTypeList[0].focus ? 1 : 0,
                    aliPayFlag: this.payTypeList[1].focus ? 1 : 0,
                    bankPayFlag: this.payTypeList[2].focus ? 1 : 0,
                    priceType: this.priceTypeIndex + 1,
                    remark: this.remark
                }
                if (this.priceTypeIndex === 0) {
                    // 浮动价
                    params.premiumRatio = this.floatPrice
                } else {
                    // 一口价
                    params.price = this.fixedPrice
                }
                Ajax.publishBuyOrder(params)
                    .then(res => {
                        if (res.code === '0000') {
                            Toast({
                                type: 'sucess',
                                message: '创建成功！'
                            })
                            setTimeout(() => {
                                this.$router.push('/index')
                            }, 2000)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        watch: {
            floatPrice (val) {
                let price = Number(val)
                if (!price) {
                    this.floatPriceEnd = ''
                    return
                }
                this.floatPriceEnd = ((100 + price) * this.exchangeRate / 100).toFixed(4)
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
        &-item-sell {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            height: 1.08rem;
            border-bottom: 2px solid $border01;
            span {
                font-size: $f24;
                margin-left: 0.2rem;
                &:last-child {
                    color: $fc07;
                }
            }
        }
        &-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 1.08rem;
            font-size: $f30;
            border-bottom: 2px solid $border01;
            &:last-child {
                border-bottom: none;
            }
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
                border: 1px solid $bg05;
                border-radius: 3px;
            }
            .active {
                color: $fc07;
                border: 1px solid $fc07;
                background: #e3ebfd;
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
                &.checked~label::after{
                    transform: translateX(0);
                }
                &.unchecked~label::after {
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
            .status-switch {
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
            margin: 0.52rem 0;
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
        &-btn-box {
            margin: 0.52rem 0;
            width: 100%;
            .create-btn {
                margin: 0 0 .25rem 0;
                width: 100%;
                height: 0.88rem;
            }
            p {
                padding: 0 .12rem;
                font-size: $f24;
                line-height: .3rem;
                color: $fc02;
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

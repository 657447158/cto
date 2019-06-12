<template>
    <!-- 个人中心-我的挂单 -->
    <otc-scroll-load @list="getList" requestName="listMarketOrder">
        <ul class="my-order" slot="list">
            <li
                class="my-order-item"
                v-for="(item, orderIndex) in orderList"
                :key="item.id"
            >
                <div class="top">
                    <span class="top-name">{{item.title}}</span>
                    <span class="top-time">{{item.createDate}}</span>
                    <div class="top-box" v-if="item.status === 1 || item.status === 2">
                        <span class="switch" :class="item.checked ? 'checked' : 'unchecked'"></span>
                        <label for="status">
                            <span
                                class="status-switch"
                                :class="item.statusIndex === index && 'active'"
                                v-for="(s, index) in status"
                                :key="index"
                                @click="confirm(orderIndex, index, item.otcBuyId)"
                            >{{s}}</span>
                        </label>
                    </div>
                </div>
                <div class="content">
                    <div class="content-box">
                        <span>单价</span>
                        <span><i class="content-type">{{item.priceType === 1 ? '浮动价' : '一口价'}}</i><span>￥{{item.price}}</span></span>
                    </div>
                    <div class="content-box">
                        <span>剩余</span>
                        <span>{{item.restNum}} {{item.coinName}}</span>
                    </div>
                    <div class="content-box">
                        <span>已成交</span>
                        <span>{{item.dealNum}} {{item.coinName}}</span>
                    </div>
                    <div class="content-box">
                        <span>限额</span>
                        <span>￥{{item.minQuota}} - {{item.maxQuota}}</span>
                    </div>
                    <div class="content-box">
                        <span>备注</span>
                        <span>{{item.remark}}</span>
                    </div>
                </div>
                <div class="bottom">
                    <div class="bottom-box">
                        <span class="icon-mobile wechat" v-if="item.wxPayFlag === 1">&#xe81f;</span>
                        <span class="icon-mobile alipay" v-if="item.aliPayFlag === 1">&#xe820;</span>
                        <span class="icon-mobile card" v-if="item.bankPayFlag === 1">&#xe608;</span>
                    </div>
                    <span class="selled" v-if="item.status === 0">已取消</span>
                    <span class="cancel" v-if="item.status === 1 || item.status === 2" @click="cancelListBuyOrder(item.otcBuyId)">撤销</span>
                    <span class="selled" v-if="item.status === 3">已售完</span>
                </div>
            </li>
        </ul>
    </otc-scroll-load>

</template>
<script>
    import Dialog from '@/components/dialog'
    import Ajax from '@/service';
    import Toast from '@/components/toast'
import { setTimeout } from 'timers';
    export default {
        data () {
            return {
                status: ['下架', '上架'],
                orderList: []
            }
        },
        methods: {
            // 获取我的挂单列表数据
            getList (value) {
                if (value.length === 0) return
                // 给每条数据加入一个状态
                value.map(item => {
                    item.statusIndex = item.status === 1 ? 1 : 0
                    item.checked = item.status === 1 ? true : false
                })
                this.orderList = this.orderList.concat(value)
            },
            confirm (orderIndex, index, otcBuyId) {
                let _this = this
                if (index === 0) {
                    Dialog({
                        title: '暂时下架后，别人无法看到你的挂单',
                        comfirmValue: '暂时下架',
                        comfirmFn: (callback) => {
                            callback()
                            _this.upDownListBuyOrder(otcBuyId, 2, function() {
                                _this.orderList[orderIndex].checked = false
                                _this.orderList[orderIndex].statusIndex = index
                            })
                        }
                    })
                } else {
                    Dialog({
                        title: '确定要上架该挂单么?',
                        comfirmFn: (callback) => {
                            callback()
                            _this.upDownListBuyOrder(otcBuyId, 1, function() {
                                _this.orderList[orderIndex].checked = true
                                _this.orderList[orderIndex].statusIndex = index
                            })
                        }
                    })
                }
            },
            // 上下架api
            upDownListBuyOrder (otcBuyId, status, callback) {
                Ajax.upDownListBuyOrder({
                    otcBuyId,
                    status
                }).then(res => {
                    if (res.code === '0000') {
                        callback()
                        Toast({
                            type: 'sucess',
                            message: '操作成功！'
                        })
                    } else {
                        Toast({
                            message: res.message
                        })
                    }
                })
            },
            // 挂单撤销
            cancelListBuyOrder (otcBuyId) {
                Dialog({
                    title: '确定要撤销该挂单么?',
                    comfirmFn: (callback) => {
                        callback()
                        Ajax.cancelListBuyOrder({
                            otcBuyId
                        }).then(res => {
                            if (res.code === '0000') {
                                Toast({
                                    type: 'sucess',
                                    message: '撤销成功！'
                                })
                                setTimeout(() => {
                                    window.location.reload()
                                })
                            }
                        })
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .my-order {
        &-item {
            margin-top: .14rem;
            padding: 0 .32rem;
            background: $bg02;
        }
        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 0.88rem;
            border-bottom: 2px solid $border01;
            &-name {
                margin-right: 0.2rem;
                font-size: $f32;
                color: $fc05;
                font-weight: bold;
            }
            &-time {
                flex: 1;
                font-size: $f20;
                color: $fc09;
            }
            &-box {
                display: flex;
                width: 1.3rem;
                height: 0.44rem;
                background: $bg01;
                border-radius: 5px;
            }
            .switch {
                display: none;
                width: 1.3rem;
                height: 0.44rem;
                &.checked~label::after {
                    transform: translateX(.65rem);
                }
                &.unchecked~label::after {
                    transform: translateX(0);
                }
            }
            label {
                position: relative;
                display: flex;
                width: 100%;
                height: 100%;
                &::after {
                    position: absolute;
                    top: 0;
                    left: 0;
                    content: '';
                    display: block;
                    width: .65rem;
                    height: .44rem;
                    border-radius: 5px;
                    background: $fc07;
                    transition: all .3s ease;
                }
            }
            .status-switch {
                position: relative;
                z-index: 1;
                width: 50%;
                line-height: .44rem;
                text-align: center;
                font-size: $f24;
                color: $fc10;
                &.active {
                    color: $fc08;
                }
            }
        }
        .content {
            padding: 0.2rem 0;
            &-box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 0.45rem;
                font-size: $f24;
                color: $fc09;
            }
            &-type {
                margin-right: 0.05rem;
                padding: .06rem .1rem;
                display: inline-block;
                color: $fc08;
                background: $fc13;
                border-radius: 3px;
            }
        }
        .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: .36rem 0;
            border-top: 2px solid $border01;
            .icon-mobile {
                margin-right: .1rem;
                font-size: $f36;
                &.wechat {
                    color:#69c362;
                }
                &.alipay {
                    color:#61aff7;
                }
                &.card {
                    color: #efcc94;
                }
            }
            .cancel {
                width: 1.38rem;
                height: .58rem;
                color: #ff7076;
                border: 1px solid;
                border-radius: 5px;
                text-align: center;
                line-height: .58rem;
            }
            .selled {
                width: 1.38rem;
                height: .58rem;
                color: $fc02;
                border: 1px solid;
                border-radius: 5px;
                text-align: center;
                line-height: .58rem;
            }
        }
    }
</style>

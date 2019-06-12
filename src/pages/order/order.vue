<template>
    <div class="order">
        <!-- 顶部选项卡 -->
        <div class="order-tab">
            <span
                class="order-tab-item"
                v-for="(item, index) in tabList"
                :key="index"
                :class="tabIndex === index && 'active'"
                @click="changeTab(index)"
            >{{item}}</span>
        </div>
        <!-- 订单列表 -->
        <cto-scroll-load @list="getList" requestName="listMyOrder" :params="params">
            <ul class="order-list" slot="list">
                <li
                    v-for="item in cList"
                    :key="item.orderId"
                >
                    <router-link
                        tag="div"
                        class="order-list-item"
                        :to="{path: item.path, query: {id: item.buyOrderId}}"
                        v-if="item.orderStatus !== 3"
                    >
                        <div class="top">
                            <span class="icon-mobile">&#xe822;</span>
                            <span class="name">{{item.title}}</span>
                            <span class="price">￥{{item.buyMoney}}</span>
                        </div>
                        <div class="content">
                            <div class="content-item">
                                <span class="label" v-if="item.tradeType === 1">卖家</span>
                                <span class="label" v-else>买家</span>
                                <p class="img-wrap">
                                    <span class="img-box"></span>
                                    <span>{{item.nickName}}</span>
                                </p>
                            </div>
                            <div class="content-item">
                                <span class="label">数量</span>
                                <span>{{item.buyNum}} {{item.coinName}}</span>
                            </div>
                            <div class="content-item">
                                <span class="label">订单号</span>
                                <span>{{item.orderId}}</span>
                            </div>
                        </div>
                        <div class="bottom">
                            <span class="time">{{item.time}}</span>
                            <span class="state" v-if="item.orderStatus === 1">正在进行</span>
                            <span class="state" v-else-if="item.orderStatus === 2">已完成</span>
                            <span class="state" v-else-if="item.orderStatus === 3">已取消</span>
                        </div>
                    </router-link>
                    <router-link
                        tag="div"
                        class="order-list-item order-list-item-cancel"
                        :to="{path: item.path, query: {id: item.buyOrderId}}"
                        v-else
                    >
                        <div class="top">
                            <span class="icon-mobile">&#xe822;</span>
                            <span class="name">{{item.title}}</span>
                            <span class="price">￥{{item.buyMoney}}</span>
                        </div>
                        <div class="content">
                            <div class="content-item">
                                <span class="label" v-if="item.tradeType === 1">卖家</span>
                                <span class="label" v-else>买家</span>
                                <p class="img-wrap">
                                    <span>{{item.nickName}}</span>
                                </p>
                            </div>
                            <div class="content-item">
                                <span class="label">数量</span>
                                <span>{{item.buyNum}} {{item.coinName}}</span>
                            </div>
                            <div class="content-item">
                                <span class="label">订单号</span>
                                <span>{{item.orderId}}</span>
                            </div>
                        </div>
                        <div class="bottom">
                            <span class="time">{{item.time}}</span>
                            <span class="state" v-if="item.orderStatus === 1">正在进行</span>
                            <span class="state" v-else-if="item.orderStatus === 2">已完成</span>
                            <span class="state" v-else-if="item.orderStatus === 3">已取消</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </cto-scroll-load>
    </div>
</template>
<script>
import { dateDiff } from '@/utils/common'
export default {
    data () {
        return {
            tabList: ['正在进行', '已完成', '已取消'],
            tabIndex: 1,
            params: {
                orderStatus: 2
            },
            list: []
        }
    },
    computed: {
        cList () {
            return this.list.map(item => {
                item.createDate = item.createDate.replace(/-/g, '/')
                item.time = dateDiff(new Date(item.createDate).getTime())
                if (item.tradeType === 1) {
                    // 买币
                    item.path = 'order-detail-buying'
                } else {
                    // 卖币
                    item.path = 'order-detail-selling'
                }
                
                return item
            })
        }
    },
    methods: {
        changeTab (index) {
            if (this.tabIndex === index) return
            this.tabIndex = index
            this.params.orderStatus = index + 1
            this.list = []
        },
        getList (value) {
            this.list = this.list.concat(value)
        }
    }
}
</script>
<style lang="scss" scoped>
    .order {
        padding-bottom: 1.02rem;
        &-tab {
            position: fixed;
            top: 0;
            padding: 0 .66rem;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 0.88rem;
            font-size: $f28;
            color: $fc02;
            background: $bg02;
            &-item {
                height: 0.88rem;
                line-height: .88rem;
            }
            .active {
                position: relative;
                color: $fc07;
                &::after {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    margin-left: -0.3rem;
                    display: block;
                    content: '';
                    width: 0.6rem;
                    height: 0.05rem;
                    background: $fc07;
                    border-radius: 2px;
                }
            }
        }
        &-list {
            padding: .88rem .3rem 0;
            &-item {
                margin-top: 0.2rem;
                padding: 0 .32rem;
                background: $bg02;
                border-radius: 5px;
            }
            &-item-cancel {
                position: relative;
                overflow: hidden;
                // background-position: 4.95rem 1.6rem;
                &::after {
                    position: absolute;
                    right: -.3rem;
                    bottom: -.5rem;
                    content: '';
                    display: block;
                    width: 2.25rem;
                    height: 2.25rem;
                    background: url('../../assets/images/order-cancel.png') no-repeat;
                    background-size: 2.25rem 2.25rem;
                }
                * {
                    color: $fc10!important
                }
            }
            .top {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 0.88rem;
                border-bottom: 2px solid $bg01;
            }
            .icon-mobile {
                margin-right: .2rem;
                font-size: .5rem;
                color: $fc07;
            }
            .name {
                flex: 1;
                font-size: $f30;
                font-weight: bold;
            }
            .price {
                color: $fc07;
                font-size: $f30;
            }
            .content {
                padding: .08rem 0;
                &-item {
                    display: flex;
                    justify-content: space-between;
                    line-height: .48rem;
                    font-size: $f26;
                    color: $fc03;
                }
            }
            .img-wrap {
                display: flex;
                align-items: center;
            }
            .img-box {
                margin-right: 0.1rem;
                width: 0.4rem;
                height: 0.4rem;
                border-radius: 50%;
                background: #999;
            }
            .bottom {
                display: flex;
                justify-content: space-between;
                height: 0.9rem;
                line-height: .9rem;
                color: $fc03;
                border-top: 2px solid $bg01;
            }
            .state {
                color: #4dcc27;
            }
        }
    }
</style>

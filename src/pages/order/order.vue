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
        <ul class="order-list">
            <li class="order-list-item">
                <div class="top">
                    <span class="icon-mobile">&#xe822;</span>
                    <span class="name">购买BCV</span>
                    <span class="price">￥891.00</span>
                </div>
                <div class="content">
                    <div class="content-item">
                        <span class="label">卖家</span>
                        <p class="img-wrap">
                            <span class="img-box"></span>
                            <span>支持信用卡花呗</span>
                        </p>
                    </div>
                    <div class="content-item">
                        <span class="label">数量</span>
                        <span>9900.0000 BCV</span>
                    </div>
                    <div class="content-item">
                        <span class="label">订单号</span>
                        <span>01DS55661415486654</span>
                    </div>
                </div>
                <div class="bottom">
                    <span class="time">三分钟前</span>
                    <span class="state">已完成</span>
                </div>
            </li>
            <li class="order-list-item">
                <div class="top">
                    <span class="icon-mobile">&#xe822;</span>
                    <span class="name">购买BCV</span>
                    <span class="price">￥891.00</span>
                </div>
                <div class="content">
                    <div class="content-item">
                        <span class="label">卖家</span>
                        <p class="img-wrap">
                            <span class="img-box"></span>
                            <span>支持信用卡花呗</span>
                        </p>
                    </div>
                    <div class="content-item">
                        <span class="label">数量</span>
                        <span>9900.0000 BCV</span>
                    </div>
                    <div class="content-item">
                        <span class="label">订单号</span>
                        <span>01DS55661415486654</span>
                    </div>
                </div>
                <div class="bottom">
                    <span class="time">三分钟前</span>
                    <span class="state">已完成</span>
                </div>
            </li>
            <li class="order-list-item">
                <div class="top">
                    <span class="icon-mobile">&#xe822;</span>
                    <span class="name">购买BCV</span>
                    <span class="price">￥891.00</span>
                </div>
                <div class="content">
                    <div class="content-item">
                        <span class="label">卖家</span>
                        <p class="img-wrap">
                            <span class="img-box"></span>
                            <span>支持信用卡花呗</span>
                        </p>
                    </div>
                    <div class="content-item">
                        <span class="label">数量</span>
                        <span>9900.0000 BCV</span>
                    </div>
                    <div class="content-item">
                        <span class="label">订单号</span>
                        <span>01DS55661415486654</span>
                    </div>
                </div>
                <div class="bottom">
                    <span class="time">三分钟前</span>
                    <span class="state">已完成</span>
                </div>
            </li>
            <li class="order-list-item">
                <div class="top">
                    <span class="icon-mobile">&#xe822;</span>
                    <span class="name">购买BCV</span>
                    <span class="price">￥891.00</span>
                </div>
                <div class="content">
                    <div class="content-item">
                        <span class="label">卖家</span>
                        <p class="img-wrap">
                            <span class="img-box"></span>
                            <span>支持信用卡花呗</span>
                        </p>
                    </div>
                    <div class="content-item">
                        <span class="label">数量</span>
                        <span>9900.0000 BCV</span>
                    </div>
                    <div class="content-item">
                        <span class="label">订单号</span>
                        <span>01DS55661415486654</span>
                    </div>
                </div>
                <div class="bottom">
                    <span class="time">三分钟前</span>
                    <span class="state">已完成</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data () {
        return {
            tabList: ['正在进行', '已完成', '已取消'],
            tabIndex: 1
        }
    },
    methods: {
        changeTab (index) {
            this.tabIndex = index
        }
    }
}
</script>
<style lang="scss" scoped>
    .order {
        padding-bottom: 1.02rem;
        &-tab {
            padding: 0 .66rem;
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
            padding: 0 .3rem;
            &-item {
                margin-top: 0.2rem;
                padding: 0 .32rem;
                background: $bg02;
                border-radius: 5px;
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
                padding-top: .06rem;
                background: $bg02;
                &-item {
                    padding-bottom: 0.18rem;
                    display: flex;
                    justify-content: space-between;
                    line-height: .5rem;
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

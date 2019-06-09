<template>
    <!-- 订单详情-已完成（出售） -->
    <div class="order">
        <div class="order-top">
            <span class="icon-mobile order-top-status">&#xe7a1;</span>
            <p class="order-top-text">已完成</p>
            <p class="order-top-price">￥{{detail.buyMoney}}</p>
        </div>
        <div class="order-content">
            <span class="pay-type">已打款至您的{{translatePayType}}了</span>
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
        <div class="order-bottom">
            <router-link class="order-bottom-btn" to="index">返回首页</router-link>
        </div>
    </div>
</template>
<script>
import Ajax from '@/service'
export default {
    data () {
        return {
            detail: {}
        }
    },
    created () {
        this.getOrderDetail()
    },
    computed: {
        translatePayType () {
            let name = ''
            switch(this.detail.payType) {
                case 1:
                    name = '支付宝'
                    break
                case 2:
                    name = '微信'
                    break
                case 3:
                    name = '银行卡'
                    break
            }
            return name
        }
    },
    methods: {
        getOrderDetail () {
            Ajax.getBuyOrderDetail({
                buyOrderId: this.$route.query.id
            }).then(res => {
                if (res.code === '0000') {
                    this.detail = res.data
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .order {
        min-height: 100vh;
        background: $bg02;
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
                border-bottom: 1px solid $border01;
                &:last-child {
                    border-bottom: none;
                }
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
        }
        .line {
            display: block;
            width: 100%;
            height: 0.14rem;
            background: $bg01;
        }
    }
</style>

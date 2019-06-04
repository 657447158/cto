<template>
    <div class="personal">
        <!-- 用户信息 -->
        <div class="header">
            <span class="img-box">
                <!-- <img src="" alt=""> -->
            </span>
            <div class="word-box">
                <p class="phone">135****5539</p>
                <div class="order-info">
                    <span>0单</span>
                    <span>|</span>
                    <span>0%</span>
                </div>
            </div>
        </div>
        <!-- 收款账号 -->
        <div class="account">
            <h2>收款账号</h2>
            <ul class="account-list">
                <router-link tag="li" to="wechat" class="account-item">
                    <span class="icon-mobile wechat">&#xe81f;</span>
                    <span>微信</span>
                    <span class="icon-mobile icon-right">&#xe6b1;</span>
                </router-link>
                <router-link tag="li" to="alipay" class="account-item">
                    <span class="icon-mobile alipay">&#xe820;</span>
                    <span>支付宝</span>
                    <span class="icon-mobile icon-right">&#xe6b1;</span>
                </router-link>
                <router-link tag="li" to="card" class="account-item">
                    <span class="icon-mobile card">&#xe608;</span>
                    <span>银行卡</span>
                    <span class="icon-mobile icon-right">&#xe6b1;</span>
                </router-link>
            </ul>
        </div>
        <!-- 我的挂单 -->
        <router-link tag="div" class="order" to="my-order">
            <span class="icon-mobile icon-left">&#xe608;</span>
            <span class="order-name">我的挂单</span>
            <span class="icon-mobile icon-right">&#xe6b1;</span>
        </router-link>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
    .personal {
        .header {
            padding: 0 .32rem;
            display: flex;
            align-items: center;
            height: 1.98rem;
            background: $bg02;
        }
        .img-box {
            margin-right: 0.32rem;
            width: 1.2rem;
            height: 1.2rem;
            background: #999;
            border-radius: 50%;
            overflow: hidden;
        }
        .phone {
            margin-bottom: 0.32rem;
            font-size: $f30;
            font-weight: bold;
            color: $fc05;
        }
        .order-info {
            display: flex;
            color: $fc03;
            span {
                margin-right: 0.1rem;
            }
        }
        .account {
            margin-top: 0.14rem;
            padding: .4rem .32rem 0 .32rem;
            background: $bg02;
            overflow: hidden;
            h2 {
                margin-bottom: 0.24rem;
                font-size: $f30;
                color: $fc06;
            }
            &-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: .38rem 0 .48rem;
                color: $fc09;
                font-size: $f30;
                border-bottom: 1px solid $border01;
                &:last-child {
                    border-bottom: none;
                }
                span {
                    &:first-child {
                        font-size: $f44;
                        margin-right: 0.24rem;
                    }
                    &:nth-child(2) {
                        flex: 1;
                    }
                }
            }
            .wechat {
                color: #68c263;
            }
            .alipay {
                color: #5eabf6;
            }
            .card {
                color: #ddb16a;
            }
        }
        .order {
            margin-top: 0.14rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: .38rem .32rem .48rem;
            color: $fc09;
            font-size: $f30;
            background: $bg02;
            overflow: hidden;
            &-name {
                flex: 1;
            }
            .icon-left {
                margin-right: 0.24rem;
                color: #74c3ed;
                font-size: $f44;
            }
            .icon-right {
                
            }
        }
    }
</style>
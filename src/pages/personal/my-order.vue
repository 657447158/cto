<template>
    <!-- 个人中心-我的挂单 -->
    <ul class="my-order">
        <li class="my-order-item">
            <div class="top">
                <span class="top-name">购买BVC</span>
                <span class="top-time">2019-06-05 11:24:22</span>
                <div class="top-box">
                    <span class="switch" :class="checked ? 'checked' : 'unchecked'"></span>
                    <!-- <input id="status" type="checkbox" class="switch" /> -->
                    <label for="status">
                        <span
                            class="status-switch"
                            :class="statusIndex === index && 'active'"
                            v-for="(item, index) in status"
                            :key="index"
                            @click="confirm(index)"
                        >{{item}}</span>
                    </label>
                </div>
            </div>
            <div class="content">
                <div class="content-box">
                    <span>单价</span>
                    <span><i>一口价</i><span>￥0.0835</span></span>
                </div>
                <div class="content-box">
                    <span>剩余</span>
                    <span>1000.0000 BCV</span>
                </div>
                <div class="content-box">
                    <span>已成交</span>
                    <span>0.0000 BCV</span>
                </div>
                <div class="content-box">
                    <span>限额</span>
                    <span>￥10 - 1000.00</span>
                </div>
                <div class="content-box">
                    <span>备注</span>
                    <span>收款收款</span>
                </div>
            </div>
            <div class="bottom">
                <span class="icon-mobile">&#xe820;</span>
                <span class="cancel">撤销</span>
            </div>
        </li>
    </ul>
</template>
<script>
    import Dialog from '@/components/dialog'
    export default {
        data () {
            return {
                checked: false,
                status: ['下架', '上架'],
                statusIndex: 0
            }
        },
        methods: {
            confirm (index) {
                let _this = this
                if (index === 0) {
                    Dialog({
                        title: '暂时下架后，别人无法看到你的挂单',
                        comfirmValue: '暂时下架',
                        comfirmFn: () => {
                            _this.checked = false
                            _this.statusIndex = index
                        }
                    })
                } else {
                    Dialog({
                        title: '确定要上架该挂单么?',
                        comfirmFn: () => {
                            _this.checked = true
                            _this.statusIndex = index
                        }
                    })
                }
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
        }
        .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: .36rem 0;
            border-top: 2px solid $border01;
            .icon-mobile {
                font-size: $f36;
                color: $fc07;
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
        }
    }
</style>

<template>
    <div class="choose">
        <span class="icon-mobile close" @click="hide">&#xe656;</span>
        <p class="choose-title">排序</p>
        <div class="choose-box">
            <span
                class="choose-item choose-item1"
                :class="sortTypeIndex === index && 'active'"
                v-for="(item, index) in sortTypeList"
                :key="item.index"
                @click="chooseSortType(index, item.type)"
            >{{item.name}}</span>
        </div>
        <p class="choose-title">支付方式</p>
        <div class="choose-box">
            <span
                class="choose-item choose-item2"
                :class="item.pay === 1 && 'active'"
                v-for="(item, index) in payType"
                :key="index"
                @click="choosePayType(index)"
            >{{item.name}}</span>
        </div>
        <div class="choose-box">
            <span class="choose-reset" @click="reset">重置</span>
            <span class="choose-filter" @click="chooseType">筛选</span>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            show: Boolean
        },
        data () {
            return {
                sortTypeList: [{
                    name: '综合排序',
                    type: 1
                }, {
                    name: '价格优先',
                    type: 2
                }, {
                    name: '成本率高',
                    type: 3
                }, {
                    name: '成交最多',
                    type: 4
                }],
                sortTypeIndex: 0,
                sortType: 1,
                payType: [{
                    name: '微信',
                    pay: 1
                }, {
                    name: '支付宝',
                    pay: 1
                }, {
                    name: '银行卡',
                    pay: 1
                }]
            }
        },
        methods: {
            hide () {
                this.$emit('hide')
            },
            chooseSortType (index, type) {
                this.sortTypeIndex = index
                this.sortType = type
            },
            choosePayType (index) {
                if (this.payType[index].pay === 1) {
                    this.payType[index].pay = 0
                } else {
                    this.payType[index].pay =1
                }
            },
            chooseType () {
                this.$emit('chooseType', this.sortType, this.payType[0].pay, this.payType[1].pay, this.payType[2].pay)
                this.hide()
            },
            reset () {
                this.sortTypeIndex = 0
                this.payType[0].pay = 1
                this.payType[1].pay = 1
                this.payType[2].pay = 1
            }
        }
    }
</script>
<style lang="scss" scoped>
    .choose {
        position: relative;
        padding: .4rem .36rem;
        .close {
            position: absolute;
            top: .24rem;
            right: .3rem;
            color: $fc03;
            font-size: $f24;
            font-weight: bold;
        }
        &-title {
            font-size: $f36;
            color: $fc05;
            font-weight: bold;
        }
        &-box {
            margin: .4rem 0;
            display: flex;
            justify-content: space-between;
        }
        &-item {
            height: .64rem;
            line-height: .64rem;
            text-align: center;
            color: $fc05;
            border-radius: .05rem;
            border: 2px solid $bg05;
            background: $bg05;
            &.active {
                color: $fc07;
                background-color: #e9edfd;
                border: 2px solid;
            }
        }
        &-item1 {
            width: 1.52rem;
        }
        &-item2 {
            width: 1.96rem;
        }
        &-reset {
            width: 2.8rem;
            height: 0.88rem;
            line-height: .88rem;
            text-align: center;
            font-size: $f32;
            color: #6f759c;
            background: $bg05;
            border-radius: .05rem;
        }
        &-filter {
            width: 4rem;
            height: 0.88rem;
            line-height: .88rem;
            text-align: center;
            font-size: $f32;
            color: $fc08;
            background: $fc07;
            border-radius: .05rem;
        }
    }
</style>

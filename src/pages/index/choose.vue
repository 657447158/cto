<template>
    <div class="choose">
        <span class="icon-mobile">&#xe656;</span>
        <p>排序</p>
        <div>
            <span>综合排序</span>
            <span>价格优先</span>
            <span>成本率高</span>
            <span>成交最多</span>
        </div>
        <p>支付方式</p>
        <div>
            <span>微信</span>
            <span>支付宝</span>
            <span>银行卡</span>
        </div>
        <div>
            <span>重置</span>
            <span>筛选</span>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            show: Boolean
        },
        methods: {
            hide () {
                this.$emit('hide', this.show)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .choose {

    }
</style>

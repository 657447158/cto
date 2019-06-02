<template>
    <div class="footer">
        <router-link tag="div" to="index" class="footer-item">
            <span class="icon-mobile">&#xe7f6;</span>
            <span>首页</span>
        </router-link>
        <router-link tag="div" to="order" class="footer-item">
            <span class="icon-mobile">&#xe7d0;</span>
            <span>订单</span>
        </router-link>
        <router-link tag="div" to="personal" class="footer-item">
            <span class="icon-mobile">&#xe720;</span>
            <span>我</span>
        </router-link>
    </div>
</template>
<style lang="scss" scoped>
    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: .16rem 1.06rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.02rem;
        background: $bg02;
        box-shadow: 0 -.05rem 1rem rgba(0, 0, 0, .05);
        &-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: $f20;
        }
        .icon-mobile {
            margin-bottom: 0.1rem;
            font-size: .44rem;
            color: $fc06
        }
    }
</style>
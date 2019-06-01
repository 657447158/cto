<template>
    <div class="footer">
        <div><router-link to="index">首页</router-link></div>
        <div><router-link to="order">订单</router-link></div>
        <div><router-link to="personal">我的</router-link></div>
    </div>
</template>
<style>
    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        background: #999;
    }
</style>
<template>
    <div class="wechat">
        <div class="wechat-item">
            <span class="label">微信号</span>
            <input type="text" placeholder="请输入微信号" />
        </div>
        <div class="wechat-item">
            <span class="label">真实姓名</span>
            <input type="text" placeholder="请输入姓名" />
        </div>
        <p class="tips">(微信收款码的真实姓名)</p>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    .wechat {
        padding: 0 .32rem;
        background: $bg02;
        &-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1.14rem;
            &:first-child {
                border-bottom: 1px solid $border01;
            }
        }
        .label {
            font-size: $f32;
            font-weight: bold;
            color: $fc11;
        }
        input {
            width: 4.7rem;
            text-align: right;
        }
        .tips {
            color: #eb7219;
            font-size: $f26;
        }
    }
</style>

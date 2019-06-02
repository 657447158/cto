<template>
    <div class="wechat">
        <div class="input-box">
            <div class="wechat-item">
                <span class="label">姓名</span>
                <input type="text" placeholder="请输入真实姓名" />
            </div>
            <div class="wechat-item">
                <span class="label">银行卡号</span>
                <input type="text" placeholder="请输入卡号" />
            </div>
            <div class="wechat-item">
                <span class="label">开户银行</span>
                <input type="text" placeholder="请输入开户银行名称" />
            </div>
            <div class="wechat-item">
                <span class="label">所在支行</span>
                <input type="text" placeholder="请输入支行名称" />
            </div>
        </div>
        <!-- 上传按钮 -->
        <span class="submit-btn">确认提交</span>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    .wechat {
        .input-box {
            padding: 0 .32rem;
            background: $bg02;
            .tips {
                margin-top: -0.14rem;
                padding-bottom: 0.24rem;
                color: #eb7219;
                font-size: $f26;
            }
        }
        &-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1.14rem;
            border-bottom: 1px solid $border01;
            &:last-child {
                border-bottom: none;
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
        .submit-btn {
            margin: .6rem auto 0;
            display: block;
            width: 6.86rem;
            height: 0.88rem;
            background: $fc07;
            border-radius: 3px;
            color: $fc08;
            font-size: $f34;
            text-align: center;
            line-height: .88rem;
            &:active {
                opacity: .8;
            }
        }
    }
</style>

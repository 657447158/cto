<template>
    <div class="wechat">
        <div class="input-box">
            <div class="wechat-item">
                <span class="label">姓名</span>
                <input type="text" placeholder="请输入真实姓名" v-model="bankRealName" :readonly="type === 1 ? true : false" />
            </div>
            <div class="wechat-item">
                <span class="label">银行卡号</span>
                <input type="text" placeholder="请输入卡号" v-model="bankCardNumber" :readonly="type === 1 ? true : false" />
            </div>
            <div class="wechat-item">
                <span class="label">开户银行</span>
                <input type="text" placeholder="请输入开户银行名称" v-model="bankDeposit" :readonly="type === 1 ? true : false" />
            </div>
            <div class="wechat-item">
                <span class="label">所在支行</span>
                <input type="text" placeholder="请输入支行名称" v-model="bankSubBranch" :readonly="type === 1 ? true : false" />
            </div>
        </div>
        <!-- 重新编辑 -->
        <span class="submit-btn" @click="edit" v-if="type === 1">重新编辑</span>
        <!-- 上传按钮 -->
        <span class="submit-btn" @click="confirmInfo" v-else>提交信息</span>
    </div>
</template>
<script>
import Ajax from '@/service'
import Toast from '@/components/toast'
export default {
    data () {
        return {
            type: parseInt(this.$route.query.type),
            bankRealName: '',
            bankCardNumber: '',
            bankDeposit: '',
            bankSubBranch: '',
        }
    },
    created () {
        if (this.type === 1) {
            this.getAccountInfo()
        }
    },
    methods: {
        // 提交信息
        confirmInfo () {
            Ajax.setBankPayInfo({
                bankRealName: this.bankRealName,
                bankCardNumber: this.bankCardNumber,
                bankDeposit: this.bankDeposit,
                bankSubBranch: this.bankSubBranch
            }).then(res => {
                if (res.code === '0000') {
                    Toast({
                        type: 'sucess',
                        message: '信息提交成功'
                    })
                } else {
                    Toast({
                        type: 'error',
                        message: res.message
                    })
                }
                this.type = 1
            }).catch(err => {
                console.log(err)
            })
        },
        // 获取收款账户详情
        getAccountInfo () {
            Ajax.getReceiptAccountInfo({
                payType: 3
            }).then(res => {
                if (res.code === '0000') {
                    this.bankRealName = res.data.bankRealName
                    this.bankCardNumber = res.data.bankCardNumber
                    this.bankDeposit = res.data.bankDeposit
                    this.bankSubBranch = res.data.bankSubBranch
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 编辑信息
        edit () {
            this.type = 0
        }
    }
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

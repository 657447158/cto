<template>
    <div class="wechat">
        <div class="input-box">
            <div class="wechat-item">
                <span class="label">支付宝账号</span>
                <input type="text" placeholder="请输入支付宝账号" v-model="aliNo" />
            </div>
            <div class="wechat-item">
                <span class="label">真实姓名</span>
                <input type="text" placeholder="请输入姓名" v-model="aliRealName" />
            </div>
            <p class="tips">(支付宝收款码的真实姓名)</p>
        </div>
        <!-- 照片上传 -->
        <div class="upload-wrap">
            <div class="upload-box" v-if="!aliPic">
                <span class="icon-mobile">&#xe7ff;</span>
                <p>请上传支付宝收款码</p>
                <form action="javascript:;" method="post" @change="fileImage($event)" enctype="multipart/form-data">
                    <input type="file" name="Filedata" class="upload-btn" />
                    <input type="hidden" name="path"/>
                </form>
            </div>
            <p class="tips" v-if="!aliPic">提示：打开支付宝 > 收钱 > 保存图片</p>
            <div class="upload-box upload-box-edit" v-else>
                <form action="javascript:;" method="post" @change="fileImage($event)" enctype="multipart/form-data" v-if="type === 0">
                    <input type="file" name="FiledataEdit" class="upload-btn" />
                    <input type="hidden" name="path"/>
                </form>
                <img class="wx-pic" :src="aliPic" />
            </div>
        </div>
        <!-- 重新编辑 -->
        <span class="submit-btn" @click="edit" v-if="type === 1">重新编辑</span>
        <!-- 上传按钮 -->
        <span class="submit-btn" @click="confirmInfo" v-else>提交信息</span>
    </div>
</template>
<script>
import axios from 'axios'
import Ajax from '@/service'
import Toast from '@/components/toast'
export default {
    data () {
        return {
            type: parseInt(this.$route.query.type),
            aliNo: '',
            aliPic: '',
            aliRealName: ''
        }
    },
    created () {
        if (this.type === 1) {
            this.getAccountInfo()
        }
    },
    methods: {
        fileImage (e) {
            let _this = this
            let files = e.target.files[0];
            let topFileUrl = files;
            console.log(e.target.files[0]);
            if (!e || !window.FileReader) return  // 看支持不支持FileReader
            let reader = new FileReader()
            reader.readAsDataURL(files) // 这里是最关键的一步，转换就在这里
            reader.onloadend = function () {
                _this.srcOthers = this.result
            }
            console.log(topFileUrl);
            console.log(_this.srcOthers);
            let formData =  new FormData();
            formData.append("image", topFileUrl);
            event.preventDefault()
            this.submitForm(formData)
            return false
        },
        submitForm (params) {
            let headers = {headers: {"Content-Type": "multipart/form-data"}}
            axios.post("/upload/cos/api/simple/upload/picture", params, headers)
                .then(res => {
                    if (res.data.code === '0000') {
                        this.aliPic = res.data.data.pictureUrl
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // 获取收款账户详情
        getAccountInfo () {
            Ajax.getReceiptAccountInfo({
                payType: 2
            }).then(res => {
                if (res.code === '0000') {
                    this.aliNo = res.data.aliNo
                    this.aliRealName = res.data.aliRealName
                    this.aliPic = res.data.aliPaymentCode
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 提交信息
        confirmInfo () {
            Ajax.setAliPayInfo({
                aliNo: this.aliNo,
                aliRealName: this.aliRealName,
                aliPaymentCode: this.aliPic,
            }).then(res => {
                if (res.code === '0000') {
                    Toast({
                        type: 'sucess',
                        message: '信息提交成功'
                    })
                    this.type = 1
                } else {
                    Toast({
                        type: 'error',
                        message: res.message
                    })
                    this.type = 1
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
            &:first-child {
                border-bottom: 1px solid $border01;
            }
        }
        .label {
            font-size: $f32;
            font-weight: bold;
            color: $fc07;
        }
        input {
            width: 4.7rem;
            text-align: right;
        }
        .upload-wrap {
            margin-top: 0.14rem;
            padding: .32rem .32rem .6rem;
            background: $bg02;
            overflow: hidden;
            .tips {
                margin-top: .38rem;
                color: #eb7219;
                font-size: $f26;
            }
            .upload-btn {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                width: 100%;
                opacity: 0;
            }
        }
        .upload-box {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 3.2rem;
            color: $fc07;
            background: $bg03;
            .icon-mobile {
                margin-bottom: 0.3rem;
                font-size: 1rem;
            }
        }
        .upload-box-edit {
            position: relative;
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

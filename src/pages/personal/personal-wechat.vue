<template>
    <div class="wechat">
        <div class="input-box">
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
        <!-- 照片上传 -->
        <div class="upload-wrap">
            <div class="upload-box" v-if="!wxPic">
                <span class="icon-mobile">&#xe7ff;</span>
                <p>请上传微信收款码</p>
                <form action="javascript:;" method="post" @change="fileImage($event)" enctype="multipart/form-data">
                    <input type="file" name="Filedata" class="upload-btn" />
                    <input type="hidden" name="path"/>
                </form>
            </div>
            <p class="tips" v-if="!wxPic">提示：打开微信 > 收付款 > 收款码 > 保存图片</p>
            <img class="wx-pic" v-else :src="wxPic" />
        </div>
        <!-- 上传按钮 -->
        <span class="submit-btn">提交信息</span>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            wxPic: '',
            srcOthers:'',
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
                    console.log(res)
                    if (res.data.code === '0000') {
                        console.log(res.data.data)
                        console.log(res.data.data.pictureUrl)
                        this.wxPic = res.data.data.pictureUrl
                    }
                })
                .catch(err => {
                    console.log(err)
                })
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
            color: $fc11;
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
            color: $fc12;
            background: $bg03;
            .icon-mobile {
                margin-bottom: 0.3rem;
                font-size: 1rem;
            }
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
        .wx-img-box {
            margin-top: 0.14rem;
            padding: .32rem .32rem .6rem;
            background: $bg02;
            .wx-pic {
                width: 100%;
            }
        }
    }
</style>

<template>
    <transition name="fade">
        <div class="otc-check-photo" v-show="show" @click="hide">
            <div class="bd">
                <div class="bd-box">
                    <img :src="imgsrc" />
                    <p>按 <a :href="imgsrc" target="_blank" style="color: #2cc7b1; font-size: .32rem">保存</a> 将二维码保存至手机相册</p>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'otc-check-photo',
        props: {
            // 是否显示
            show: {
                type: Boolean,
                default: false
            },
            // 图片
            imgsrc: {
                type: String,
                default: ''
            }
        },
        methods: {
            hide () {
                this.$emit('hide')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .otc-check-photo {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 1000;
        background: rgba(0, 0, 0, .7);
        .bd {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
            &-box {
                text-align: center;
                max-width: 6rem;
                animation: scaleShow .5s linear;
            }
            p {
                margin-top: .24rem;
                color: $fc08;
                font-size: $f28;
            }
        }
        .ft {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            padding-bottom: .3rem;
            text-align: center;
            font-size: $f30;
            color: $fc10;
        }
    }
    @keyframes scaleShow {
        from {
            transform: scale(0)
        }
        to {
            transform: scale(1)
        }
    }
</style>

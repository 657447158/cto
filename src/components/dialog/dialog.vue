<template>
    <transition name="fade">
        <div class="otc-dialog-wrap" v-if="show">
            <div class="otc-dialog-mask mask" @click="close"></div>
            <div class="otc-dialog">
                <div class="otc-dialog-hd" v-if="title">{{title}}</div>
                <div class="otc-dialog-bd" :style="'text-align:' + align" v-html="content" @click="ctFn"></div>
                <div class="otc-dialog-ft" v-if="showConfirm">
                    <div class="otc-dialog-cancel" v-if="cancelValue" @click="close">{{cancelValue}}</div>
                    <div class="otc-dialog-comfirm" @click="open">{{comfirmValue}}</div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>

    export default {
        name: 'otc-dialog',
        props: {
            title: String,
            content: String,
            cancelValue: String,
            comfirmValue: String,
            comfirmFn: Function,
            cancelFn: Function,
            contentFn: Function,
            align: {
                type: String,
                default: 'left'
            },
            showConfirm: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                show: false
            }
        },
        methods: {
            close () {
                if (typeof this.cancelFn !== 'function') {
                    this.show = false
                } else {
                    this.cancelFn()
                }
            },
            open () {
                if (typeof this.comfirmFn !== 'function') {
                    this.show = false
                } else {
                    this.comfirmFn(() => {
                        this.show = false
                    })
                }
            },
            ctFn () {
                if (typeof this.contentFn === 'function') {
                    this.contentFn((content) => {
                        this.content = content
                    })
                }
            }
        },
        watch: {
            show (value) {
                if (value) {
                    document.querySelector('html').style.overflow = 'hidden'
                } else {
                    document.querySelector('html').style.overflow = 'auto'
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .otc-dialog {
        width: 6.4rem;
        border-radius: .1rem;
        background: $bg04;
        overflow: hidden;
        &-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            z-index: 999;
        }
        &-mask {
            position: absolute;
            left: 0;
            top: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .4);
        }
        &-hd {
            line-height: 1.2;
            padding-top: .75rem;
            font-size: $f36;
            font-weight: bold;
            text-align: center;
        }
        &-bd {
            padding: .38rem .56rem .68rem;
            font-size: $f30;
            color: $fc04;
        }
        &-ft {
            display: flex;
            height: 1rem;
            font-size: $f32;
            line-height: 1rem;
            text-align: center;
            border-top: 1px solid $border01;
            > div {
                flex: 1;
                border-left: 1px solid $border01;
                transition: all .25s ease 0s;
                &:first-child {
                    border: none;
                }
                &:active {
                    background: $bg02
                }
            }
        }
        &-cancel {
            color: $fc02;
        }
        &-comfirm {
            color: $fc07;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>

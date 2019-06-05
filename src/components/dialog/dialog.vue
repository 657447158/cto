<template>
    <transition name="fade">
        <div class="cto-dialog-wrap" v-if="show">
            <div class="cto-dialog-mask mask" @click="close"></div>
            <div class="cto-dialog">
                <div class="cto-dialog-hd" v-if="title">{{title}}</div>
                <div class="cto-dialog-bd" :style="'text-align:' + align" v-html="content"></div>
                <div class="cto-dialog-ft" v-if="showConfirm">
                    <div class="cto-dialog-cancel" v-if="cancelValue" @click="close">{{cancelValue}}</div>
                    <div class="cto-dialog-comfirm" @click="open">{{comfirmValue}}</div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>

    export default {
        name: 'cto-dialog',
        props: {
            title: String,
            content: String,
            cancelValue: String,
            comfirmValue: String,
            comfirmFn: Function,
            cancelFn: Function,
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
                if (!(typeof this.cancelFn === 'function' && this.cancelFn())) {
                    this.show = false
                }
            },
            open () {
                if (!(typeof this.comfirmFn === 'function' && this.comfirmFn())) {
                    this.show = false
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
    .cto-dialog {
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

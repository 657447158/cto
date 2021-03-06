<template>
    <div class="otc-scroll-load" :class="classname">
        <slot name="list"/>
        <p class="otc-no-data-text" v-if="noMore"><span>没有更多了</span></p>
        <div class="otc-no-data" v-if="noData">
            <span class="otc-no-data-img"></span>
            <span>{{noDataText}}</span>
        </div>
    </div>
</template>
<script>
    import Ajax from '../../service/index.js'
    export default {
        name: 'otc-scroll-load',
        props: {
            classname: String,
            list: Array,
            requestName: {
                type: String,
                require: true
            },
            params: {
                type: Object
            },
            isScroll: {
                type: Boolean,
                default: true
            },
            defaultParams: {
                type: Boolean,
                default: true
            },
            noDataText: {
                type: String,
                default: '暂无数据'
            },
            preFlag: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                // 当前页数
                page: 1,
                // 是否最后一页
                isLastPage: false,
                // 是否允许加载
                flag: true,
                // 无更多数据
                noMore: false,
                // 无数据
                noData: false,
                parameter: this.params ? this.params : {}
            }
        },
        created () {
            if (!this.params || this.defaultParams) {
                this.getList()
            }
        },
        methods: {
            /**
             * [获取列表]
             * @returns
             */
            getList () {
                if (this.flag && this.preFlag) {
                    this.flag = false
                    Ajax[this.requestName](Object.assign({}, this.parameter, {
                        pageNum: this.page
                    })).then(data => {
                        // 允许加载
                        this.flag = true
                        this.dataList(data.data)
                        this.isLastPage = data.page.isLastPage
                        if (data.data.length > 0) {
                            if (data.page.isLastPage) {
                                this.noData = false
                                this.noMore = true
                                return
                            }
                            this.noData = false
                            this.noMore = false
                            return false
                        } else {
                            this.noData = true
                            this.noMore = false
                        }
                    })
                }
            },
            /**
             * [将数据传到父级去]
             * @returns
             */
            dataList (arr) {
                this.$emit('list', arr)
            },
            /**
             * [获取滚动条当前的位置]
             * @return {[Number]} [scrollTop]
             */
            getScrollTop () {
                let scrollTop = 0
                if (document.documentElement && document.documentElement.scrollTop) {
                    scrollTop = document.documentElement.scrollTop
                } else if (document.body) {
                    scrollTop = document.body.scrollTop
                }
                return scrollTop
            },
            /**
             * [获取当前可视范围的高度]
             * @return {[Number]} [clientHeight]
             */
            getClientHeight () {
                let clientHeight = 0
                if (document.body.clientHeight && document.documentElement.clientHeight) {
                    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
                } else {
                    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
                }
                return clientHeight
            },
            /**
             * [获取当前可视范围的高度]
             * @return {[Number]} [clientHeight]
             */
            getScrollHeight () {
                return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            },
            scrollHander () {
                let _this = this
                // 判断是否到达可滚动加载
                if (_this.isScroll && _this.getScrollTop() + _this.getClientHeight() + 50 > _this.getScrollHeight()) {
                    if (!_this.isLastPage && _this.flag) {
                        _this.page++
                        _this.getList(_this.page)
                    } else {
                        return false
                    }
                }
            }
        },
        mounted () {
            /**
             * [滚动加载]
             */
            window.addEventListener('scroll', this.scrollHander)
        },
        watch: {
            /**
             * [深入监听params参数是否有变化]
             */
            params: {
                handler (value) {
                    this.noData = false
                    this.noMore = false
                    this.page = 1
                    this.parameter = value
                    this.getList()
                },
                deep: true
            }
        },
        destroyed () {
            /**
             * [销毁滚动加载]
             */
            window.removeEventListener('scroll', this.scrollHander)
        }
    }
</script>
<style lang="scss" scoped>
    .otc-no-data {
        padding: 0.4rem 0 .2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 3rem;
        &-img {
            display: block;
            width: 3.34rem;
            height: 2.57rem;
            background: url('../../assets/images/otc-no-data.png') no-repeat;
            background-size: 100% 100%;
        }
    }
    .otc-no-data-text {
        text-align: center;
        line-height: 0.88rem;
        color: $fc02;
        font-size: $f22;
        background: $bg01;
        span {
            position: relative;
            display: inline-block;
            &:before {
                content: "";
                position: absolute;
                left: -0.3rem;
                top: 0.45rem;
                width: 0.2rem;
                height: 0;
                border-top: 1px solid $fc09;
            }
            &:after {
                content: "";
                position: absolute;
                right: -0.3rem;
                top: 0.45rem;
                width: 0.2rem;
                height: 0;
                border-top: 1px solid $fc09;
            }
        }
    }
</style>

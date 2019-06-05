<template>
    <div class="index">
        <router-link
            class="icon-mobile go-btn"
            to="create-order"
        >&#xe65b;</router-link>
        <div class="index-tab">
            <div
                class="index-tab-item"
                v-for="(item, index) in tabList"
                :key="index"
                :class="tabIndex === index && 'active'"
                @click="chooseTab(index)"
            >
                {{item}}
            </div>
        </div>
        <div class="index-nav">
            <div
                class="nav-item"
                v-for="(item, index) in navList"
                :key="index"
                :class="navIndex === index && 'active'"
                @click="chooseNav(index)"
            >
                {{item.coinName}}
            </div>
            <div class="nav-item" @click="showMoreModal">更多 <span class="delta"></span></div>
            <div class="nav-item" @click="showChooseModal">筛选 <span class="delta"></span></div>
        </div>
        <div class="index-current-price">SEED当前的价格：<span>¥1.0000</span></div>
        <div class="content">
            <goods-item/>
            <goods-item/>
            <goods-item/>
            <goods-item/>
        </div>
        <!-- 更多弹窗 -->
        <cto-modal :show="moreShow">
            <More :show="moreShow" :list="regionCoinsList" @hide="hide" />
        </cto-modal>
        <!-- 筛选弹窗 -->
        <cto-modal :show="chooseShow">
            <Choose :show="chooseShow" @hide="hide" />
        </cto-modal>
    </div>
</template>
<script>
import GoodsItem from '../widget/goodsItem';
import More from './more'
import Choose from './choose'
import Ajax from '@/service'

export default {
    components: {
      GoodsItem,
      More,
      Choose
    },
    data () {
        return {
            moreShow: false,
            chooseShow: false,
            tabList: ['我要买币', '我要卖币'],
            tabIndex: 0,
            navList: [],
            navIndex: 0,
            regionCoinsList: []
        }
    },
    created () {
        this.getHotCoin()
        this.getRegionCoin()
    },
    methods: {
        /**
         * 请求数据
         */
        // 获取热门币种
        getHotCoin () {
            Ajax.getHotCoin()
                .then(res => {
                    if (res.code === '0000') {
                        this.navList = res.data
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // 获取币种区域
        getRegionCoin () {
            Ajax.getRegionCoin()
                .then(res => {
                    if (res.code === '0000') {
                        this.regionCoinsList = res.data
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        /**
         * 交互函数
         */
        // 切换tab（买卖币）
        chooseTab (index) {
            this.tabIndex = index
        },
        // 切换nav
        chooseNav (index) {
            this.navIndex = index
        },
        showMoreModal () {
            this.moreShow = true
        },
        showChooseModal () {
            this.chooseShow = true
        },
        hide () {
            this.moreShow = false
            this.chooseShow = false
        }
    }
}
    
</script>
<style lang="scss" scoped>
    .index {
        padding-bottom: 1.02rem;
        .go-btn {
            display: block;
            position: fixed;
            right: 0.3rem;
            bottom: 2.02rem;
            z-index: 99;
            width: 0.9rem;
            height: 0.9rem;
            color: $fc06;
            font-size: $f40;
            font-weight: bold;
            line-height: .9rem;
            text-align: center;
            border-radius: 50%;
            background: $bg02;
            box-shadow: 0 0 .2rem rgba(0, 0, 0, .5)
        }
        &-tab {
            padding: 0.08rem 0 .18rem;
            display: flex;
            justify-content: center;
            font-size: $f26;
            color: $fc07;
            line-height: .56rem;
            background-color: $bg02;

        }
        &-tab-item {
            padding: 0 .5rem;
            border: 1px solid $fc07;
            &.active {
                background-color: $fc07;
                color: $fc08;
            }
            &:first-child{
                border-radius: 5px 0 0 5px;
            }
            &:last-child{
                  border-radius: 0 5px  5px 0;
            }
        }
        &-nav{
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            height: 0.9rem;
            // padding: 0.6rem 0 ;
            background: $fc08;
            border-bottom: 1px solid $border01 ;
            .nav-item{
                height:100%;
                font-size:$f28 ;
                color: $fc02 ;
                display: flex;

                align-items: center;
                &.active{
                    color: $fc07;
                    position: relative;
                    &::after{
                        position: absolute;
                        content: "";
                        height:4px;
                        width: 100%;
                        bottom: 0;
                        left: 0;
                        background: $fc07;
                        border-radius: 2px;
                    }
                }
                .delta{
                    width:0;
                    height:0;
                    border-width: .1rem .1rem 0;
                    border-style: solid;
                    border-color: $fc02 transparent transparent;/*灰 透明 透明 */
                    position: relative;
                    display: inline-block;
                    margin-left:4px;
                }
            }
        }
        &-current-price{
            height: 0.6rem;
            background: $fc08;
            padding: 0 0.4rem;
            line-height: 0.6rem;
            font-size:$f24 ;
            color: $fc02 ;
            span{
                color: $fc06;
            }
        }
        .content{
            background: $bg01;
            box-sizing: border-box;
            padding: 0 .3rem;
        }
    }
</style>

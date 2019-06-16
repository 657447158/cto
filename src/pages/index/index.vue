<template>
    <div class="index">
        <div class="index-fixed">
            <!-- 创建挂单入口按钮 -->
            <router-link
                class="icon-mobile go-btn"
                to="create-order"
            >&#xe65b;</router-link>
            <!-- 我要买币|我要买币 -->
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
            <!-- 币种切换 -->
            <div class="index-nav">
                <div
                    class="nav-item"
                    v-for="(item, index) in navList"
                    :key="index"
                    :class="navIndex === index && 'active'"
                    @click="chooseNav(index, item.coinId, item.coinName, item.coinPrice)"
                >
                    {{item.coinName}}
                </div>
                <div class="nav-item" @click="showMoreModal">更多 <span class="delta"></span></div>
                <div class="nav-item" @click="showChooseModal">筛选 <span class="delta"></span></div>
            </div>
            <div class="index-current-price">{{coinName}}当前的价格：<span>¥{{coinPrice}}</span></div>
        </div>
        <!-- 滚动加载 -->
        <otc-scroll-load @list="getList" requestName="getBuyOrders" :params="params">
            <div class="content" slot="list" v-if="coinList.length > 0">
                <goods-item :list="coinList" :btnText="btnText" :tradeType="params.tradeType" />
            </div>
        </otc-scroll-load>

        <!-- 更多弹窗 -->
        <otc-modal :show="moreShow">
            <More :show="moreShow" :list="regionCoinsList" @hide="hide" @switchCoinType="switchCoinType" />
        </otc-modal>
        <!-- 筛选弹窗 -->
        <otc-modal :show="chooseShow">
            <Choose :show="chooseShow" @hide="hide" @chooseType="chooseType" />
        </otc-modal>
    </div>
</template>
<script>
import GoodsItem from '../widget/goodsItem';
import More from './more'
import Choose from './choose'
import Ajax from '@/service'
import axios from 'axios'
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
            // 当前选中的币种名称
            coinName: '',
            // 当前选中的币种价格
            coinPrice: 0,
            regionCoinsList: [],
            coinList: [],
            params: {
                tradeType: 1, // 1买币，2卖币
                coinId: '',
                wxPayFlag: 0,
                aliPayFlag: 0,
                bankPayFlag: 0,
                sortType: 1
            },
            btnText: '购买'
        }
    },
    created () {
        if (this.$route.query.token) {
            axios({
                method: 'post',
                url: '/app/index/',
                params: {
                    method: '/wallet/switchTokenForOtc',
                    mediaType: 'h5',
                    token: this.$route.query.token,
                    sign: '',
                    hasToken: '1'
                }
            }).then(res => {
                if (res.data.code == '1') {
                    localStorage.setItem("otctoken", res.data.data)
                }
            }).catch(err =>{
                console.log('fail' + err)
                // that.isCommittedForm = false;
            });

        }

        this.initOtcUser()
        this.getHotCoin()
        this.getRegionCoin()
    },
    methods: {
        /**
         * 请求数据
         */
        // 进去otc时调用
        initOtcUser () {
            Ajax.initOtcUser()
        },
        // 获取热门币种
        getHotCoin () {
            Ajax.getHotCoin()
                .then(res => {
                    if (res.code === '0000') {
                        this.navList = res.data
                        this.coinName = this.navList[0] && this.navList[0].coinName
                        this.coinPrice = this.navList[0] && this.navList[0].coinPrice
                        this.params.coinId = this.navList[0] && this.navList[0].coinId
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
        // 获取买卖币列表
        getList (value) {
            this.coinList = this.coinList.concat(value)
        },
        /**
         * 交互函数
         */
        // 切换tab（买卖币）
        chooseTab (index) {
            if (this.tabIndex === index) return
            this.tabIndex = index
            this.coinList = []
            if (index === 0) {
                this.params.tradeType = 1
                this.btnText = '购买'
            } else {
                this.params.tradeType = 2
                this.btnText = '出售'
            }
        },
        // 切换nav（币种切换）
        chooseNav (index, id, name, price) {
            if (this.navIndex === index ) return
            this.navIndex = index
            this.coinList = []
            this.coinName = name
            this.coinPrice = price
            this.params.coinId = id
        },
        // 子组件选择币种（更多弹窗里面）
        switchCoinType (coinId, coinName, coinPrice, coinImage) {
            if (this.params.coinId === coinId) return
            this.coinList = []
            this.coinName = coinName
            this.coinPrice = coinPrice
            this.params.coinId = coinId
            // 这里对比更多里面的币种是否在热门区域里，没有的话则将热门币种列表的最后一个替换为当前选中的币种
            for (let i = 0; i < this.navList.length; i++) {
                if (this.navList[i].coinId === coinId) {
                    this.navIndex = i
                    return
                }
            }
            let obj = {
                coinId: coinId,
                coinImage: coinImage,
                coinName: coinName,
                coinPrice: coinPrice
            }
            this.navList[3] = obj
            this.navIndex = 3
        },
        // 子组件选择排序方式（筛选弹窗里面）
        chooseType (sortType, wxPayFlag, aliPayFlag, bankPayFlag) {
            if (this.params.sortType === sortType && this.params.wxPayFlag === wxPayFlag && this.params.aliPayFlag === aliPayFlag && this.params.bankPayFlag === bankPayFlag) return
            this.coinList = []
            this.params.sortType = sortType
            this.params.wxPayFlag = wxPayFlag
            this.params.aliPayFlag = aliPayFlag
            this.params.bankPayFlag = bankPayFlag
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
        &-fixed {
            position: fixed;
            top: 0;
            width: 100%;
            height: 2.34rem;
        }
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
        /deep/ .otc-scroll-load {
            padding-top: 2.34rem;
        }
        .content{
            background: $bg01;
            box-sizing: border-box;
            padding: 0 .3rem;
        }
    }
</style>

<template>
    <div class="index">
        <div class="index-tab">
            <div class="index-tab-item">我要买币</div>
            <div class="index-tab-item active">我要卖币</div>
        </div>
        <div class="index-nav">
            <div class="nav-item active">BCV</div>
            <div class="nav-item">HRC</div>
            <div class="nav-item">PAN</div>
            <div class="nav-item">SEED</div>
            <div class="nav-item">更多 <span class="delta"></span></div>
            <div class="nav-item">筛选 <span class="delta"></span></div>
        </div>
        <div class="index-current-price">
            SEED当前的价格：<span>¥1.0000</span>
        </div>
        <div class="content">
                <goods-item/>
                 <goods-item/>
                  <goods-item/>
                   <goods-item/>
        </div>
    </div>
</template>
<script>
import GoodsItem from '../widget/goodsItem';

export default {
    components: {
      GoodsItem
    }
}
    
</script>
<style lang="scss" scoped>
    .index {
        padding-bottom: 1.02rem;
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
                    border-width:5px 5px 0;
                    border-style:solid;
                    border-color:$fc02 transparent transparent;/*灰 透明 透明 */
                    position:relative;
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
                color: #000000;
            }
        }
        .content{
            background:$bg01;
            box-sizing: border-box;
            padding: 0 0.4rem;
        }
    }
</style>

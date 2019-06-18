<template>
  <div class="trade">
    <div class="itembox p03">
      <div class="title">
        <div class="title-left">
          <img :src="detail.headImage" alt>
          {{detail.nickName}}
        </div>
        <div class="title-right">{{detail.dealNum}}单 | {{detail.dealRatio}}</div>
      </div>
      <div class="item">
        <span class="item-title">单价</span>
        <span class="item-info">¥{{detail.price}}</span>
      </div>
      <div class="item">
        <span class="item-title">数量</span>
        <span class="item-info">{{detail.totalNum}} {{detail.coinName}}</span>
      </div>
      <div class="item">
        <span class="item-title">限额</span>
        <span class="item-info">¥{{detail.minQuota}}-{{detail.maxQuota}}</span>
      </div>
    </div>
    <div class="itembox p03 buybox">
      <div class="buyinfo buyamount">
        <input type="number" placeholder="0.00" v-model="buyNum" @focus="numFocusFn">
        <p>输入{{text}}数量<span>{{detail.coinName}}</span></p>
        <p>{{detail.restNum || 0}}-{{detail.totalNum}}</p>
      </div>
      <span class="icon-mobile change">&#xe823;</span>
      <div class="buyinfo buyprice">
        <input type="number" placeholder="0.00" v-model="buySum" @focus="sumFocusFn">
        <p>输入{{text}}金额<span>CNY</span></p>
        <p>{{detail.minQuota}}-{{detail.maxQuota}}</p>
      </div>
    </div>
	<div class="my-total" v-if="tradeType === '2'">
		<span>我的</span>
		<span>{{detail.userValidAmount || 0}} {{detail.coinName}}</span>
		<span @click="inputAll">全部</span>
	</div>
    <div class="btnbox p03" v-if="buyFlag">
      <router-link tag="div" class="cancle" to="/index">取消({{time}})</router-link>
      <div class="sure" @click="buyNow">立即{{text}}</div>
    </div>
	<div class="btnbox p03" v-else>
      <div class="disabeld">已超出{{text1}}时间</div>
    </div>
  </div>
</template>
<script>
import Ajax from '@/service'
import Toast from '@/components/toast'

export default {
	data () {
		return {
			// 1：买币 2：卖币
			tradeType: this.$route.params.type,
			otcBuyId: this.$route.query.id,
			detail: {},
			time: 60,
			timer: null,
			buyNum: '',
			buySum: '',
			buyFlag: true,
			// 买入数量输入框聚焦状态
			numFocus: false,
			// 买入金额输入框聚焦状态
			sumFocus: false,
			text: '买入',
			text1: '购买'
		}
	},
	created () {
		if (this.tradeType == 2) {
			this.text = '卖出'
			this.text1 = '卖出'
		}
		this.getDetail()
		this.timer = setInterval(() => {
			if (this.time > 0) {
				this.time--
			} else {
				this.buyFlag = false
				clearInterval(this.timer)
				this.timer = null
			}
		}, 1000);
	},
	methods: {
		getDetail () {
			Ajax.buySomeCoinDetail({
				otcBuyId: this.otcBuyId
			}).then(res => {
				if (res.code === '0000') {
					this.detail = res.data
				}
			}).catch(err => {
				console.log(err)
			})
		},
		inputAll () {
			if (this.detail.userValidAmount < this.detail.restNum) {
				Toast({
					message: `请至少输入 ${this.detail.restNum} ${this.detail.coinName}`
				})
				return
			} 
			if (this.detail.userValidAmount > this.detail.totalNum) {
				Toast({
					message: `最多可输入 ${this.detail.totalNum} ${this.detail.coinName}`
				})
				return
			}
			this.buyNum = this.detail.userValidAmount
			this.numFocus = true
			this.sumFocus = false
		},
		// 立即买入|卖出
		buyNow () {
			if (!this.buyNum || (this.buyNum < this.detail.restNum && this.numFocus)) {
				Toast({
					message: `请至少输入 ${this.detail.restNum} ${this.detail.coinName}`
				})
				return
			}
			if (this.buyNum > this.detail.totalNum && this.numFocus) {
				Toast({
					message: `最多可输入 ${this.detail.totalNum} ${this.detail.coinName}`
				})
				return
			}
			if (this.buySum < this.detail.minQuota && this.sumFocus) {
				Toast({
					message: `最少需输入 ${this.detail.minQuota} 元`
				})
				return
			}
			if (this.buySum > this.detail.maxQuota && this.numFocus) {
				Toast({
					message: `最多可输入 ${this.detail.maxQuota} 元`
				})
				return
			}
			Ajax.createBuyOrder({
				requestNo: new Date().getTime(),
				otcBuyId: this.otcBuyId,
				buyNum: this.buyNum,
				buyMoney: this.buySum
			}).then(res => {
				if (res.code === '0000') {
					// 买入
					let path = '/order-detail-buying'
					if (this.tradeType === '2') {
						path = '/order-detail-selling'						
					}
					this.$router.push({
						path: path,
						query: {
							id: res.data.buyOrderId
						}
					})
				} else {
					Toast({
						type: 'error',
						message: res.message
					})
				}
				console.log(res)
			}).catch(err => {
				console.log(err)
			})
		},
		// 买入|卖出数量输入框聚焦事件
		numFocusFn () {
			this.numFocus = true
			this.sumFocus = false
		},
		// 买入|卖出数量输入框聚焦事件
		sumFocusFn () {
			this.numFocus = false
			this.sumFocus = true
		}
	},
	watch: {
		buyNum (val) {
			if (!val) {
				this.buySum = ''
				return
			}
			if (this.numFocus) {
				// 买入|卖出数量聚焦
				this.buySum = (val * this.detail.price).toFixed(4)
			}
		},
		buySum (val) {
			if (!val) {
				this.buyNum = ''
				return
			}
			if (this.sumFocus) {
				// 买入|卖出金额聚焦时
				this.buyNum = (val / this.detail.price).toFixed(4)
			}
		}
	},
	destroyed () {
		clearInterval(this.timer)
		this.timer = null
	}
}
</script>
<style lang="scss" scoped>
.trade {
	background: $bg05;
	.p03 {
		padding: 0 0.3rem;
	}
	.btnbox{
		margin-top: 0.6rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 0.88rem;
		line-height: .88rem;
		font-size: $f32;
		.cancle{
			border: 1px solid $fc14;
			background: $bg04;
			height: 100%;
			width: 1.8rem;
			color: $fc02;
			text-align: center;
			border-radius: 4px;
			&:active {
				opacity: .8;
			}
		}
		.sure{
			height: 100%;
			width: 4.9rem;
			background: $fc07;
			color: $fc08;
			text-align: center;
			border-radius: 4px;
			&:active {
				opacity: .8;
			}
		}
		.disabeld {
			width: 100%;
			height: 100%;
			background: $bg04;
			border: 1px solid $fc14;
			text-align: center;
			color: $fc02;
			&:active {
				opacity: .8;
			}
		}
	}
	.itembox {
		margin-top: 0.14rem;
		background: $bg04;
		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			line-height: .9rem;
			.item-title {
			font-size: $f30;
			color: $fc03;
			}
			.item-info {
			font-size: $f24;
			color: $fc06;
			font-weight: bold;
			}
		}
		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: .3rem 0 .2rem;
			.title-left {
			display: flex;
			align-items: center;
			font-size: $f30;
			color: $fc06;
			font-weight: bold;
			img {
				width: 0.7rem;
				height: 0.7rem;
				border-radius: 50%;
				margin-right: 0.3rem;
			}
			}
			.title-right {
				font-size: $f20;
				color: $fc03;
			}
		}
		&.buybox {
			display: flex;
			padding: 0.3rem 0;
			justify-content: space-evenly;
			align-items: center;
			.change {
				font-size: 0.6rem;
				color: $fc07;
			}
			.buyinfo {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				input {
					width: 2rem;
					line-height: 1rem;
					font-size: $f44;
					text-align: center;
				}
				p {
					font-size: $f24;
					color: $fc02;
					margin-top: 0.24rem;
					span {
						display: inline-block;
						margin-left: 0.12rem;
						color: $fc07;
					}
				}
			}
		}
	}
	.my-total {
		display: flex;
		padding: 0 .32rem;
		height: .8rem;
		line-height: .8rem;
		color: $fc02;
		background: $bg02;
		border-top: 1px solid $border01;
		span {
			margin-right: 0.4rem;
			&:first-child {
				margin-right: 0.25rem;
			}
			&:last-child {
				color: $fc07;
			}
		}
	}
}
</style>

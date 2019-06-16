import ajax from './axios'
console.log(process.env.NODE_ENV)
export default {
    /**
     * [(重点 )进去otc时调用]
     */
    initOtcUser (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/initOtcUser',
            params: Object.assign({...params})
        })
    },
    /**
     * [单图片上传]
     */
    upload (params) {
        return ajax({
            baseURL: '/upload',
            type: 'POST',
            url: '/cos/api/simple/upload/picture',
            params: Object.assign({...params})
        })
    },
    /**
     * [币种区域]
     */
    getRegionCoin (params) {
        return ajax({
            type: 'POST',
            url: '/api/coin/region/getRegionCoin',
            params: Object.assign({...params})
        })
    },
    /**
     * [热门币种]
     */
    getHotCoin (params) {
        return ajax({
            type: 'POST',
            url: '/api/coin/region/getHotCoin',
            params: Object.assign({...params})
        })
    },
    /**
     * [我要买/卖币-列表]
     */
    getBuyOrders (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/getBuyOrders',
            params: Object.assign({...params})
        })
    },
    /**
     * [我的挂单-列表]
     */
    listMarketOrder (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/listMarketOrder',
            params: Object.assign({...params})
        })
    },
    /**
     * [我要买/卖币-买入详情]
     */
    buySomeCoinDetail (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/buySomeCoinDetail',
            params: Object.assign({...params})
        })
    },
    /**
     * [获取用户信息]
     */
    getOtcUserInfo (params) {
        return ajax({
            loading: false,
            type: 'POST',
            url: '/api/otc/getOtcUserInfo',
            params: Object.assign({...params})
        })
    },
    /**
     * [我要买/卖币-下单]
     */
    createBuyOrder (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/createBuyOrder',
            params: Object.assign({...params})
        })
    },
    /**
     * [我的订单]
     */
    listMyOrder (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/listMyOrder',
            params: Object.assign({...params})
        })
    },
    /**
     * [订单详情]
     */
    getBuyOrderDetail (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/getBuyOrderDetail',
            params: Object.assign({...params})
        })
    },
    /**
     * [我要买/卖币-取消]
     */
    cancelBuyOrder (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/cancelBuyOrder',
            params: Object.assign({...params})
        })
    },
    /**
     * [我要买/卖币-用户/商家已完成付款]
     */
    finishPayBuyOrder (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/finishPayBuyOrder',
            params: Object.assign({...params})
        })
    },
    /**
     * [获取可用币种和余额-创建挂单页面用]
     */
    getManyCoins (params) {
        return ajax({
            type: 'POST',
            url: '/api/wallet/getManyCoins',
            params: Object.assign({...params})
        })
    },
    /**
     * [检查用户已经设置了的账户类型-创建挂单页面用]
     */
    getReceiptAccountPayType (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/getReceiptAccountPayType',
            params: Object.assign({...params})
        })
    },
    /**
     * [我要买/卖币-发布-创建挂单]
     */
    publishBuyOrder (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/publishBuyOrder',
            params: Object.assign({...params})
        })
    },
    /**
     * [我的挂单-上下架]
     */
    upDownListBuyOrder (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/upDownListBuyOrder',
            params: Object.assign({...params})
        })
    },
    /**
     * [我的挂单-撤销]
     */
    cancelListBuyOrder (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/cancelListBuyOrder',
            params: Object.assign({...params})
        })
    },
    /**
     * [申诉，理由列表]
     */
    getOtcAppealReasonList (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/getOtcAppealReasonList',
            params: Object.assign({...params})
        })
    },
    /**
     * [提交申诉]
     */
    setOtcAppeal (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/setOtcAppeal',
            params: Object.assign({...params})
        })
    },
    /**
     * [确认收到付款]
     */
    sureBuyOrder (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/sureBuyOrder',
            params: Object.assign({...params})
        })
    },
    /**
     * [输入支付密码后拿到支付凭证]
     */
    checkUserPayPassword (params) {
        return ajax({
            type: 'POST',
            url: '/app/pay/checkUserPayPassword',
            params: Object.assign({...params})
        })
    },
    /**
     * [获取收款账户详情]
     */
    getReceiptAccountInfo (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/getReceiptAccountInfo',
            params: Object.assign({...params})
        })
    },
    /**
     * [微信支付]
     */
    setWxPayInfo (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/setWxPayInfo',
            params: Object.assign({...params})
        })
    },
    /**
     * [支付宝支付]
     */
    setAliPayInfo (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/setAliPayInfo',
            params: Object.assign({...params})
        })
    },
    /**
     * [银行卡支付]
     */
    setBankPayInfo (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/setBankPayInfo',
            params: Object.assign({...params})
        })
    }
}

import ajax from './axios'

let proxy = '/cto'

export default {
    /**
     * [(重点 )进去otc时调用]
     */
    initOtcUser (params) {
        return ajax({
            type: 'POST',
            url: proxy + '/api/otc/initOtcUser',
            params: Object.assign({...params})
        })
    },
    /**
     * [单图片上传]
     */
    upload (params) {
        return ajax({
            type: 'POST',
            url: proxy + '/api/simple/upload/picture',
            params: Object.assign({...params})
        })
    },
    /**
     * [币种区域]
     */
    getRegionCoin (params) {
        return ajax({
            type: 'POST',
            url: proxy + '/api/coin/region/getRegionCoin',
            params: Object.assign({...params})
        })
    },
    /**
     * [热门币种]
     */
    getHotCoin (params) {
        return ajax({
            type: 'POST',
            url: proxy + '/api/coin/region/getHotCoin',
            params: Object.assign({...params})
        })
    },
    /**
     * [我要买/卖币-列表]
     */
    getBuyOrders (params) {
        return ajax({
            type: 'POST',
            url: proxy + '/api/otc/getBuyOrders',
            params: Object.assign({...params})
        }) 
    },
    /**
     * [我的挂单-列表]
     */
    listMarketOrder (params) {
        return ajax({
            type: 'POST',
            url: proxy + '/api/otc/listMarketOrder',
            params: Object.assign({...params})
        }) 
    },
    /**
     * [我要买/卖币-买入详情]
     */
    buySomeCoinDetail (params) {
        return ajax({
            type: 'POST',
            url: proxy + '/api/otc/buySomeCoinDetail',
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
            url: proxy + '/api/otc/getOtcUserInfo',
            params: Object.assign({...params})
        }) 
    },
    /**
     * [我要买/卖币-下单]
     */
    createBuyOrder (params) {
        return ajax({
            type: 'POST',
            url: proxy + '/api/otc/createBuyOrder',
            params: Object.assign({...params})
        }) 
    },
    /**
     * [我的订单]
     */
    listMyOrder (params) {
        return ajax({
            type: 'POST',
            url: proxy + '/api/otc/listMyOrder',
            params: Object.assign({...params})
        }) 
    },
    /**
     * [订单详情]
     */
    getBuyOrderDetail (params) {
        return ajax({
            type: 'POST',
            url: proxy + '/api/otc/getBuyOrderDetail',
            params: Object.assign({...params})
        }) 
    },
    /**
     * [我要买/卖币-取消]
     */
    cancelBuyOrder (params) {
        return ajax({
            type: 'POST',
            url: proxy + '/api/otc/cancelBuyOrder',
            params: Object.assign({...params})
        }) 
    },
    /**
     * [我要买/卖币-用户/商家已完成付款]
     */
    finishPayBuyOrder (params) {
        return ajax({
            type: 'POST',
            url: proxy + '/api/otc/finishPayBuyOrder',
            params: Object.assign({...params})
        }) 
    },
    /**
     * [获取可用币种和余额-创建挂单页面用]
     */
    getManyCoins (params) {
        return ajax({
            type: 'POST',
            url: proxy + '/api/wallet/getManyCoins',
            params: Object.assign({...params})
        }) 
    },
    /**
     * [检查用户已经设置了的账户类型-创建挂单页面用]
     */
    getReceiptAccountPayType (params) {
        return ajax({
            type: 'POST',
            url: proxy + '/api/otc/getReceiptAccountPayType',
            params: Object.assign({...params})
        }) 
    },
    /**
     * [我要买/卖币-发布-创建挂单]
     */
    publishBuyOrder (params) {
        return ajax({
            type: 'POST',
            url: proxy + '/api/otc/publishBuyOrder',
            params: Object.assign({...params})
        }) 
    },
    /**
     * [我的挂单-上下架]
     */
    upDownListBuyOrder (params) {
        return ajax({
            type: 'POST',
            url: proxy + '/api/otc/upDownListBuyOrder',
            params: Object.assign({...params})
        }) 
    },
    /**
     * [我的挂单-撤销]
     */
    cancelListBuyOrder (params) {
        return ajax({
            type: 'POST',
            url: proxy + '/api/otc/cancelListBuyOrder',
            params: Object.assign({...params})
        }) 
    }
}
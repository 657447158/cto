import ajax from './axios'

let proxy = '/cto'

export default {
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
    }
}
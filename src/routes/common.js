const routes = [
    {
        path: '/index',
        name: 'index',
        meta: {
            title: '大厅'
        },
        component: () => import('../pages/index/index')
    },
    {
        path: '/order',
        name: 'order',
        meta: {
            title: '订单'
        },
        component: () => import('../pages/order/order')
    },
    {
        path: '/personal',
        name: 'personal',
        meta: {
            title: '我的'
        },
        component: () => import('../pages/personal/personal-index')
    },
    {
        path: '/wechat',
        name: 'wechat',
        meta: {
            title: '微信'
        },
        component: () => import('../pages/personal/personal-wechat')
    },
    {
        path: '/alipay',
        name: 'alipay',
        meta: {
            title: '支付宝'
        },
        component: () => import('../pages/personal/personal-alipay')
    },
    {
        path: '/card',
        name: 'card',
        meta: {
            title: '银行卡'
        },
        component: () => import('../pages/personal/personal-card')
    }
]

export default routes
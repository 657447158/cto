const routes = [
    {
        path: '/',
        redirect: '/index',
        component: () => import('../pages/index/index')
    },
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
    },
    {
        path: '/order-detail',
        name: 'order-detail',
        meta: {
            title: '订单详情'
        },
        component: () => import('../pages/order/orderDetail.vue')
    },
    {
        path: '/order-detail-buying',
        name: 'order-detail-buying',
        meta: {
            title: '订单详情-购买'
        },
        component: () => import('../pages/order/order-detail-buying.vue')
    },
    {
        path: '/order-detail-selling',
        name: 'order-detail-selling',
        meta: {
            title: '订单详情-出售'
        },
        component: () => import('../pages/order/order-detail-selling.vue')
    },
    {
        path: '/create-order',
        name: 'create-order',
        meta: {
            title: '创建订单'
        },
        component: () => import('../pages/order/create-order.vue')
    },
    {
        path: '/mark-detail',
        name: 'mark-detail',
        meta: {
            title: '为什么要设置溢价'
        },
        component: () => import('../pages/order/mark-detail.vue')
    },
    {
        path: '/my-order',
        name: 'my-order',
        meta: {
            title: '我的挂单'
        },
        component: () => import('../pages/personal/my-order.vue')
    },
    {
        path: '/trade/:type',   // type: 1 买 | 2 卖
        name: 'trade',
        meta: {
            title: '购买|卖出'
        },
        component: () => import('../pages/index/trade.vue')
    }
]

export default routes
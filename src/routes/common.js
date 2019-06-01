const routes = [
    {
        path: '/index',
        name: 'index',
        component: () => import('../pages/index/index')
    },
    {
        path: '/order',
        name: 'order',
        component: () => import('../pages/order/order')
    },
    {
        path: '/personal',
        name: 'personal',
        component: () => import('../pages/personal/personal-index')
    }
]

export default routes
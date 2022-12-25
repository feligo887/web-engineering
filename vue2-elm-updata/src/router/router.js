import { createRouter, createWebHistory } from 'vue-router'

import App from '../App'

const routes =  [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        //首页城市列表页
        {
            path: '/home',
            component: () => import('../page/home/home')
        },
        //当前选择城市页
        {
            path: '/city/:cityid',
            component: () => import('../page/city/city')
        },
        //所有商铺列表页
        {
            path: '/msite',
            component: () => import('../page/msite/msite'),
            meta: { keepAlive: true },
        },
        //特色商铺列表页
        {
            path: '/food',
            component: () => import('../page/food/food')
        },
        //搜索页
        {
            path: '/search/:geohash',
            component: () => import('../page/search/search')
        },
        //商铺详情页
        {
            path: '/shop',
            component: () => import('../page/shop/shop'),
            children: [{
                path: 'foodDetail', //食品详情页
                component: () => import('../page/shop/children/foodDetail'),
            }, {
                path: 'shopDetail', //商铺详情页
                component: () => import('../page/shop/children/shopDetail'),
                children: [{
                    path: 'shopSafe', //商铺安全认证页
                    component: () => import('../page/shop/children/children/shopSafe'),
                }, ]
            }]
        },
        //确认订单页
        {
            path: '/confirmOrder',
            component:  () => import('../page/confirmOrder/confirmOrder'),
            children: [{
                path: 'remark', //订单备注
                component: () => import('../page/confirmOrder/children/remark'),
            }, {
                path: 'invoice', //发票抬头
                component: () => import('../page/confirmOrder/children/invoice'),
            }, {
                path: 'payment', //付款页面
                component: () => import('../page/confirmOrder/children/payment'),
            }, {
                path: 'userValidation', //用户验证
                component: () => import('../page/confirmOrder/children/userValidation'),
            }, {
                path: 'chooseAddress', //选择地址
                component: () => import('../page/confirmOrder/children/chooseAddress'),
                children: [{
                    path: 'addAddress', //添加地址
                    component: () => import('../page/confirmOrder/children/children/addAddress'),
                    children: [{
                        path: 'searchAddress', //搜索地址
                        component: () => import('../page/confirmOrder/children/children/children/searchAddress'),
                    }]
                }, ]
            }, ]
        },
        //登录注册页
        {
            path: '/login',
            component: () => import('../page/login/login'),
        },
        //个人信息页
        {
            path: '/profile',
            component:  () => import('../page/profile/profile'),
            children: [{
                path: 'info', //个人信息详情页
                component: () => import('../page/profile/children/info'),
                children: [{
                    path: 'setusername',
                    component: () => import('../page/profile/children/children/setusername'),
                },{
                    path: 'address',
                    component: () => import('../page/profile/children/children/address'),     //编辑地址
                    children:[{
                        path:'add',
                        component:() => import('../page/profile/children/children/children/add'),
                        children:[{
                            path:'addDetail',
                            component:() => import('../page/profile/children/children/children/children/addDetail')
                        }]
                    }]
                }]
            },
            {
                path: 'service', //服务中心
                component: () => import('../page/service/service'),
            },]
        },
        //修改密码页
        {
            path: '/forget',
            component: () => import('../page/forget/forget')
        },
        //订单列表页
        {
            path: '/order',
            component: () => import('../page/order/order'),
            children: [{
                path: 'orderDetail', //订单详情页
                component: () => import('../page/order/children/orderDetail'),
            }, ]
        },
        //vip卡页
        {
            path: '/vipcard',
            component: () => import('../page/vipcard/vipcard'),
            children: [{
                path: 'invoiceRecord', //开发票
                component: () => import('../page/vipcard/children/invoiceRecord'),
            }, {
                path: 'useCart', //购买会员卡
                component: () => import('../page/vipcard/children/useCart'),
            }, {
                path: 'vipDescription', //会员说明
                component: () => import('../page/vipcard/children/vipDescription'),
            },]
        },
        //发现页
        {
            path: '/find',
            component: () => import('../page/find/find')
        },
        //下载页
        {
            path: '/download',
            component: () => import('../page/download/download')
        },
        //服务中心
        {
            path: '/service',
            component: () => import('../page/service/service'),
             children: [{
                path: 'questionDetail', //订单详情页
                component: () => import('../page/service/children/questionDetail'),
            }, ]
        },
        //余额
        {
            path: 'balance',
            component: () => import('../page/balance/balance'),
            children: [{
                path: 'detail', //余额说明
                component: () => import('../page/balance/children/detail'),
            }, ]
        },
        //我的优惠页
        {
            path: 'benefit',
            component: () => import('../page/benefit/benefit'),
            children: [{
                path: 'coupon', //代金券说明
                component: () => import('../page/benefit/children/coupon'),
            }, {
                path: 'hbDescription', //红包说明
                component: () => import('../page/benefit/children/hbDescription'),
            }, {
                path: 'hbHistory', //历史红包
                component: () => import('../page/benefit/children/hbHistory'),
            }, {
                path: 'exchange', //兑换红包
                component: () => import('../page/benefit/children/exchange'),
            }, {
                path: 'commend', //推荐有奖
                component: () => import('../page/benefit/children/commend'),
            },]
        },
        //我的积分页
        {
            path: 'points',
            component: () => import('../page/points/points'),
            children: [{
                path: 'detail', //积分说明
                component: () => import('../page/points/children/detail'),
            }, ]
        },
    ]
}]

const router = createRouter( {
  history: createWebHistory(),
  routes,
})

export default router;

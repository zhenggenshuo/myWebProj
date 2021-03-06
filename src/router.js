/**
 * 参考资料：https://router.vuejs.org/zh/
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let route = new Router({
  mode: 'history',
  routes: [
    {
      // 首页
      path: '/',
      name: 'myIndex',
      component: () => import('./views/myIndex')
    },
    {
      // 新闻板块
      path: '/newsInfo',
      name: 'newsInfo',
      component: () => import('./views/newsInfo')
    },
    {
      // 图书板块
      path: '/booksInfo',
      name: 'booksInfo',
      component: () => import('./views/booksInfo')
    },
    {
      // 学习笔记总结
      path: '/studyNotes',
      name: 'studyNotes',
      component: () => import('./views/studyNotes'),
      children: [
        {
          path: 'booksInfo',
          name: 'booksInfo',
          component: () => import('./views/booksInfo')
        },
        {
          path: 'htmlBasic2',
          name: 'htmlBasic22',
          component: () => import('./views/studyNotesFiles/htmlBasic')
        },
        {
          path: 'htmlBasic3',
          name: 'htmlBasic33',
          component: () => import('./views/studyNotesFiles/htmlBasic')
        },
        {
          path: 'htmlBasic4',
          name: 'htmlBasic44',
          component: () => import('./views/studyNotesFiles/htmlBasic')
        }

      ]

    }
  ]
})

route.beforeEach((to, from, next) => {
  // 路由导航守卫，使用next()，才能开始切换
  next()
  // console.log('from --> to', from.path + '-->' + to.path)
})

export default route

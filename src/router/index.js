import Vue from 'vue'
import VueRouter from 'vue-router'
import homePage from '../views/home-page.vue'
import boardPage from '../views/board-page.vue'
import boardList from '../views/board-list.vue'
import cardDetails from '../views/card-details.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home-page',
    component: homePage,
    path: '/'
  },
  {
    name: 'board-list',
    component: boardList,
    path: '/board-list'
  },
  {
    name: 'board-page',
    component: boardPage,
    path: '/board/:boardId',
    children: [
      {
        name: 'card-details',
        component: cardDetails,
        path: '/board/:boardId/card/:listCardId'
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

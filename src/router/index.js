import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Book from '@/pages/Book'
import Status from '@/pages/Status'
import Group from '@/pages/Group'
import Movie from '@/pages/Movie'
import Search from '@/pages/Search'
import movieItem from '@/pages/movieItem'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/status',
      name: 'Status',
      component: Status
    },
    {
      path: '/group',
      name: 'Group',
      component: Group
    },
    {
      path: '/movie',
      name: 'Movie',
      component: Movie
    },
    {
      path: '/movie/:movieId',
      name: 'movieItem',
      component: movieItem
    },
    {
      path: '/book',
      name: 'Book',
      component: Book
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})

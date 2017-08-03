import ajax from '../../lib/ajax'
const state = {
  bookNonfiction: null,
  bookFiction: null,
  bookMarket: null
}

const mutations = {
}

const actions = {
  getBookNonfiction ({ state }) {
    ajax({
      url: '/fake',
      method: 'GET',
      query: {
        url: 'https://m.douban.com/rexxar/api/v2/subject_collection/book_nonfiction/items'
      }
    }).then((value) => {
      state.bookNonfiction = JSON.parse(value)
    }, (e) => {
      console.error(e)
    })
  },
  getBookFiction ({ state }) {
    ajax({
      url: '/fake',
      method: 'GET',
      query: {
        url: 'https://m.douban.com/rexxar/api/v2/subject_collection/book_fiction/items'
      }
    }).then((value) => {
      state.bookFiction = JSON.parse(value)
    }, (e) => {
      console.error(e)
    })
  },
  getBookMarket ({ state }) {
    ajax({
      url: '/fake',
      method: 'GET',
      query: {
        url: 'https://m.douban.com/rexxar/api/v2/subject_collection/market_product_book_mobile_web/items'
      }
    }).then((value) => {
      state.bookMarket = JSON.parse(value)
    }, (e) => {
      console.error(e)
    })
  }
}

export default {
  state,
  mutations,
  actions
}

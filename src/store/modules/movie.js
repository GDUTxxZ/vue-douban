import ajax from '../../lib/ajax'
const state = {
  movieInTheaters: null,
  movieFree: null,
  movieLast: null
}

const mutations = {
}

const actions = {
  getMovieInTheaters ({ state }) {
    ajax({
      url: '/fake',
      method: 'GET',
      query: {
        url: 'https://api.douban.com/v2/movie/in_theaters'
      }
    }).then((value) => {
      state.movieInTheaters = JSON.parse(value)
    }, (e) => {
      console.error(e)
    })
  },
  getMovieFree ({ state }) {
    ajax({
      url: '/fake',
      method: 'GET',
      query: {
        url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items'
      }
    }).then((value) => {
      state.movieFree = JSON.parse(value)
    }, (e) => {
      console.error(e)
    })
  },
  getMovieLast ({ state }) {
    ajax({
      url: '/fake',
      method: 'GET',
      query: {
        url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items'
      }
    }).then((value) => {
      state.movieLast = JSON.parse(value)
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

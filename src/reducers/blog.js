import * as actionTypes from '../actions/blog';

const initalState = {
  isFetching: false,
  hasError: false,
  ids: [],
  articles: {},
}

function postReducer(state = initalState, action) {
  switch (action.type) {
    case actionTypes.POSTS_FETCH_SUCCESS:
      const ids = action.posts.map(post => post.slug);
      const articles = {};
      action.posts.forEach(post => { articles[post.slug] = post });

      return {
        ...state,
        ids,
        articles,
      }
    case actionTypes.POST_FETCH_SUCCESS:
      return {
        ...state,
        articles: {
          ...state.articles,
          [action.post.slug]: action.post
        },
      }
    case actionTypes.POSTS_FETCH_HAS_ERROR:
    case actionTypes.POST_FETCH_HAS_ERROR:
      return {
        ...state,
        hasError: action.hasError,
      }
    case actionTypes.POSTS_IS_FETCHING:
    case actionTypes.POST_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    default:
      return state;
  }
}

export default postReducer;

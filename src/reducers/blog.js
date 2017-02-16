import * as actionTypes from '../actions/blog';

const initalState = {
  isFetching: false,
  hasError: false,
  articles: [],
}

function postReducer(state = initalState, action) {
  switch (action.type) {
    case actionTypes.POSTS_FETCH_SUCCESS:
      return {
        ...state,
        articles: action.posts,
      }
    case actionTypes.POSTS_FETCH_HAS_ERROR:
      return {
        ...state,
        hasError: action.hasError,
      }
    case actionTypes.POSTS_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    default:
      return state;
  }
}

export default postReducer;

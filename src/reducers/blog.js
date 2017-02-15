import * as actionTypes from '../actions/blog';

const initalState = {
  post: null,
}

function postReducer(state = initalState, action) {
  switch (action.type) {
    case actionTypes.FETCH_POST_SUCCESS:
      return {
        ...state,
        post: action.post,
      }
    default:
      return state;
  }
}

export default postReducer;

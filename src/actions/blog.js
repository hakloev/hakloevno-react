import fetch from 'isomorphic-fetch';

export const POSTS_IS_FETCHING = 'POSTS_IS_FETCHING';
export const POSTS_FETCH_SUCCESS =  'POSTS_FETCH_SUCCESS';
export const POSTS_FETCH_HAS_ERROR = 'POSTS_FETCH_HAS_ERROR';

export function postsIsFetching(bool) {
  return {
    type: POSTS_IS_FETCHING,
    isFetching: bool,
  };
}

export function postsFetchSuccess(posts) {
  return {
    type: POSTS_FETCH_SUCCESS,
    posts,
  };
}

export function postsFetchHasError(bool) {
  return {
    type: POSTS_FETCH_HAS_ERROR,
    hasError: bool,
  }
}

export function fetchPosts() {
  return (dispatch) => {
    dispatch(postsIsFetching(true))

    return fetch('http://localhost:3000/api/articles/')
      .then(response => {
        dispatch(postsIsFetching(false));
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then(response => response.json())
      .then(posts => dispatch(postsFetchSuccess(posts)))
      .catch(e => dispatch(postsFetchHasError(true)));
  }
}

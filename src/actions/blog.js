// require('es6-promise').polyfill();
// require('isomorphic-fetch');
import axios from 'axios';
import { getBaseURL } from '../utils';

export const POSTS_IS_FETCHING = 'POSTS_IS_FETCHING';
export const POSTS_FETCH_SUCCESS =  'POSTS_FETCH_SUCCESS';
export const POSTS_FETCH_HAS_ERROR = 'POSTS_FETCH_HAS_ERROR';

export const POST_IS_FETCHING = 'POST_IS_FETCHING';
export const POST_FETCH_SUCCESS =  'POST_FETCH_SUCCESS';
export const POST_FETCH_HAS_ERROR = 'POST_FETCH_HAS_ERROR';

/* ALL POSTS */
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

/* SINGLE POST */
export function postIsFetching(bool) {
  return {
    type: POST_IS_FETCHING,
    isFetching: bool,
  };
}

export function postFetchSuccess(post) {
  return {
    type: POST_FETCH_SUCCESS,
    post,
  };
}

export function postFetchHasError(bool) {
  return {
    type: POST_FETCH_HAS_ERROR,
    hasError: bool,
  }
}

/* ASYNC FETCH ACTIONS */
export function fetchPosts() {
  return (dispatch) => {
    dispatch(postsIsFetching(true))

    return axios.get(`${getBaseURL()}/api/articles/`)
      .then(response => {
        console.log('response', response);
        dispatch(postsIsFetching(false));
        dispatch(postsFetchSuccess(response.data));
      })
      .catch(e => {
        dispatch(postsFetchHasError(true));
        console.log('Error fetchPosts', e);
      });
  }
}

export function fetchPost(slug) {
  return (dispatch) => {
    dispatch(postIsFetching(true))

    return fetch(`/api/articles/${slug}`)
      .then(response => {
        dispatch(postIsFetching(false));
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then(response => response.json())
      .then(post => dispatch(postFetchSuccess(post)))
      .catch(e => {
        console.log(e);
        dispatch(postFetchHasError(true));
      });
  }
}

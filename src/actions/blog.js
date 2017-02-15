import fetch from 'isomorphic-fetch';

export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';

export function fetchPostSuccess(post) {
	return {
		type: FETCH_POST_SUCCESS,
		post,
	};
}

export function postFetchData() {
	return (dispatch) => {
		return fetch('http://localhost:3000/api/articles/')
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then(response => response.json())
			.then(post => dispatch(fetchPostSuccess(post)))
			.catch(e => console.error('err in postFetchData', e));
	}
}

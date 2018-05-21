import * as ApiData from './ApiData'

export const getCommentsByPostId = postId => 
	fetch(`${ApiData.url}/posts/${postId}/comments`, { headers: ApiData.headers })
	    .then(res => res.json())

export const addComment = comment =>
	fetch(`${ApiData.url}/comments`, {
		method: 'POST',
		headers: ApiData.headers,
		body: JSON.stringify(comment)
	}).then(res => res.json())

export const updateComment = comment =>
	fetch(`${ApiData.url}/comments/${comment.id}`, {
		method: 'PUT',
		headers: ApiData.headers,
		body: JSON.stringify(comment)
	}).then(res => res.json())

export const deleteComment = id =>
	fetch(`${ApiData.url}/comments/${id}`, {
		method: 'DELETE',
		headers: ApiData.headers,
	})
	
export const changeVote = (id, option) =>
	fetch(`${ApiData.url}/comments/${id}`, {
		method: 'POST',
		headers: ApiData.headers,
		body: JSON.stringify({ option })
	}).then(res => res.json());
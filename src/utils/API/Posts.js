import * as ApiData from './ApiData'

export const getAll = () => 
	fetch(`${ApiData.url}/posts`, { headers: ApiData.headers })
	    .then(res => res.json())

export const getPostById = id => 
	fetch(`${ApiData.url}/posts/${id}`, { headers: ApiData.headers })
	    .then(res => res.json())

export const getPostsByCategory = categoryPath => 
	fetch(`${ApiData.url}/${categoryPath}/posts`, { headers: ApiData.headers })
	    .then(res => res.json())

export const addPost = post =>
	fetch(`${ApiData.url}/posts`, {
		method: 'POST',
		headers: ApiData.headers,
		body: JSON.stringify(post)
	}).then(res => res.json())

export const updatePost = post =>
	fetch(`${ApiData.url}/posts/${post.id}`, {
		method: 'PUT',
		headers: ApiData.headers,
		body: JSON.stringify(post)
	}).then(res => res.json())

export const deletePost = id =>
	fetch(`${ApiData.url}/posts/${id}`, {
		method: 'DELETE',
		headers: ApiData.headers,
	})
	
export const changeVote = (id, option) =>
	fetch(`${ApiData.url}/posts/${id}`, {
		method: 'POST',
		headers: ApiData.headers,
		body: JSON.stringify({ option })
	}).then(res => res.json())
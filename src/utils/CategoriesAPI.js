// const config = require('../../api-server/config.js')
const api = 'http://localhost:3001'//`${config.origin}:${config.port}`

const token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-type': 'application/json'
}

export const getAll = () =>
	fetch(`${api}/categories`, { headers })
	    .then(res => res.json())
	    .then(data => data.categories) 
//Dados básicos das requisições.
export const url = 'http://localhost:3001'
export const token = Math.random().toString(36).substr(-8)
export const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-type': 'application/json'
}
import * as PostsAPI from '../utils/API/Posts'
import * as ACTION_TYPES from '../utils/constants/ActionTypes'
import uuid from 'uuid'

function fetchPosts (posts) {
  return {
    type: ACTION_TYPES.GET_POSTS,
    posts
  }
}

function fetchPost (post) {
  return {
    type: ACTION_TYPES.GET_POST,
    post
  }
}

//Enviando a ID para filtrar o post para fora da lista.
function removePost (postId) {
  return {
    type: ACTION_TYPES.DELETE_POST,
    postId
  }
}

function insertPost (post) {
  return {
    type: ACTION_TYPES.ADD_POST,
    post
  }
}

function editPost (post) {
  return {
    type: ACTION_TYPES.UPDATE_POST,
    post
  }
}

//newOrder define se a ordem é: voteScore, commentCount ou timestamp
//ascending: define se a ordem é crescente ou decrescente
function changeOrder (newOrder, ascending) {
  return {
    type: ACTION_TYPES.ORDER_POSTS,
    newOrder,
    ascending
  }
}

export function changePostOrder (newOrder, ascending) {
  return dispatch => dispatch(changeOrder(newOrder, ascending))
}

export function getPostById (postId) {
  return dispatch => 
    PostsAPI.getPostById(postId)
      .then(post => dispatch(fetchPost(post)))
}

export function getPosts (categoryPath) {
  return dispatch => {
    if (categoryPath)
      return PostsAPI.getPostsByCategory(categoryPath)
        .then(posts => dispatch(fetchPosts(posts)))
    else
      return PostsAPI.getAll()
        .then(posts => dispatch(fetchPosts(posts)))
  }
}

export function deletePost (postId) {
  return dispatch => 
    PostsAPI.deletePost(postId)
      .then(() => dispatch(removePost(postId)))
}

export function addPost (post) {
  const newPost = {
    ...post, 
    timestamp: Date.now(),//Incluindo timestamp do momento de criação do comentário.
    id: uuid().replace(new RegExp('-', 'g'),'')//Obtendo uuid e atribuindo ao novo comentário.
  }

  return dispatch => 
    PostsAPI.addPost(newPost)
      .then(data => {
        return dispatch(insertPost(data))
      })
}

export function updatePost (post) {
  return dispatch => 
    PostsAPI.updatePost(post)
      .then(data => {
        return dispatch(editPost(data))
      })
}

export function changeVotePost (postId, option) {
  return dispatch => 
    PostsAPI.changeVote(postId, option)
      .then(data => {
        return dispatch(editPost(data))
      })  
}
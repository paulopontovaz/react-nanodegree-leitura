import * as PostsAPI from '../utils/API/Posts'
import * as ACTION_TYPES from '../utils/constants/ActionTypes'

function fetchPosts (posts) {
  return {
    type: ACTION_TYPES.GET_POSTS,
    posts
  }
}

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

export function getPosts (categoryPath) {
  return dispatch => {
    if (categoryPath)
      return PostsAPI.getPostsByCategory(categoryPath)
        .then(posts => dispatch(fetchPosts(posts)))
    else
      return PostsAPI.getAllPosts()
        .then(posts => dispatch(fetchPosts(posts)))
  }
}

export function deletePost (postId) {
  return dispatch => 
    PostsAPI.deletePost(postId)
      .then(() => dispatch(removePost(postId)))
}

export function addPost (post) {
  const currentTime = Date.now()
  const newPost = {
    ...post, 
    timestamp: currentTime,
    id: currentTime.toString()
  }

  return dispatch => 
    PostsAPI.addPost(post)
      .then(data => dispatch(insertPost(data)))
}
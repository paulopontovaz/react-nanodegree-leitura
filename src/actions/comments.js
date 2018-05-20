import * as PostsAPI from '../utils/API/Posts'
import * as ACTION_TYPES from '../utils/constants/ActionTypes'

function fetchComments (comments) {
  return {
    type: ACTION_TYPES.GET_COMMENTS,
    comments
  }
}

export function getPosts (postId) {
  return dispatch => 
    PostsAPI.getCommentsByPostId(categoryPath)
      .then(comments => dispatch(fetchPosts(comments)))
}
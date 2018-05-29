import * as CommentsAPI from '../utils/API/Comments'
import * as ACTION_TYPES from '../utils/constants/ActionTypes'
import uuid from 'uuid'

//Actions feitas com base nas actions dos posts.

function fetchComments (comments) {
  return {
    type: ACTION_TYPES.GET_COMMENTS,
    comments
  }
}

function removeComment (commentId) {
  return {
    type: ACTION_TYPES.DELETE_COMMENT,
    commentId
  }
}

function insertComment (comment) {
  return {
    type: ACTION_TYPES.ADD_COMMENT,
    comment
  }
}

function editComment (comment) {
  return {
    type: ACTION_TYPES.UPDATE_COMMENT,
    comment
  }
}

//orderType define se a ordem é: voteScore ou timestamp
//ascending: define se a ordem é crescente ou decrescente
function changeOrder (orderType, ascending) {
  return {
    type: ACTION_TYPES.CHANGE_ORDER_COMMENTS,
    orderType,
    ascending
  }
}

export function changeCommentOrder (orderType, ascending) {
  return dispatch => dispatch(changeOrder(orderType, ascending))
}

export function getCommentsByPostId (postId) {
  return dispatch => 
    CommentsAPI.getCommentsByPostId(postId)
      .then(comments => dispatch(fetchComments(comments)))
}

export function deleteComment (commentId) {
  return dispatch => 
    CommentsAPI.deleteComment(commentId)
      .then(comment => dispatch(removeComment(commentId)))
}

export function addComment (comment) {
  const newComment = {
    ...comment, 
    timestamp: Date.now(),
    id: uuid().replace(new RegExp('-', 'g'),''),
  }

  return dispatch => 
    CommentsAPI.addComment(newComment)
      .then(data => {
        return dispatch(insertComment(data))
      })
}

export function updateComment (comment) {
  return dispatch => 
    CommentsAPI.updateComment(comment)
      .then(data => {
        return dispatch(editComment(data))
      })
}

//Chama a mesma função que a função updateComment, pois também faz atualização.
export function changeVoteComment (commentId, option) {
  return dispatch => 
    CommentsAPI.changeVote(commentId, option)
      .then(data => {
        return dispatch(editComment(data))
      })  
}
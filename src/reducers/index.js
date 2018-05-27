import { combineReducers } from 'redux'
import sortBy from 'sort-by'
import * as ACTION_TYPES from '../utils/constants/ActionTypes'

//Reducer de categorias. Criado apenas para obter a lista total de categorias.
function categories(state = [], action) {
    switch (action.type) {
        case ACTION_TYPES.GET_ALL_CATEGORIES:
            return action.categories
        default:
            return state
    }
}

//Reducer de posts. 
function posts(state = [], action) {
    switch (action.type) {
        case ACTION_TYPES.GET_POSTS:
            let posts = action.posts
            //Preordenando a lista de posts decrescentemente, utilizando o "sortBy".
            posts.sort(sortBy('-voteScore'))

            return posts

        case ACTION_TYPES.GET_POST:
            /* Para manter o formato de retorno, ao solicitar um post pela ID,
            o retorno é uma lista com apenas um elemento. */
            return [action.post]

        case ACTION_TYPES.DELETE_POST:
            //Filtrando o post excluído para fora da lista.
            return state.filter(p => p.id !== action.postId)

        case ACTION_TYPES.ADD_POST:
            return state.concat(action.post)

        case ACTION_TYPES.UPDATE_POST:
            //Modificando apenas o post cuja ID foi passada na action.
            return state.map(post => post.id === action.post.id ? 
                {...post, ...action.post} : post)

        case ACTION_TYPES.ORDER_POSTS:
            let orderedPosts = Object.assign([], state)

            /* Se a newOrder não foi passada, então a ordenação é a padrão: 
            decrescente pelo vote score. */
            if(!action.newOrder)
                orderedPosts.sort(sortBy('-voteScore'))
            else {
                /* Acrescenta '-' à string de ordenação passada ao sortBy, 
                caso a propriedade "ascending" for false. */
                const order = action.ascending === true ? action.newOrder : '-' + action.newOrder
                orderedPosts.sort(sortBy(order))
            }

            return orderedPosts

        default:
            return state
    }
}

//Reducer de comentários, feito baseado no de posts.
function comments(state = [], action) {
    switch (action.type) {
        case ACTION_TYPES.GET_COMMENTS:
            let comments = action.comments

            comments.sort(sortBy('-voteScore'))

            return comments

        case ACTION_TYPES.DELETE_COMMENT:
            return state.filter(p => p.id !== action.commentId)

        case ACTION_TYPES.ADD_COMMENT:
            return state.concat(action.comment)

        case ACTION_TYPES.UPDATE_COMMENT:
            return state.map(comment => comment.id === action.comment.id ? 
                {...comment, ...action.comment} : comment)

        case ACTION_TYPES.ORDER_COMMENTS:
            let orderedComments = Object.assign([], state)

            if(!action.newOrder)
                orderedComments.sort(sortBy('-voteScore'))
            else {
                const order = action.ascending === true ? action.newOrder : '-' + action.newOrder
                orderedComments.sort(sortBy(order))
            }

            return orderedComments

        default:
            return state
    }
}

//Combinando os três reducers num só objeto, com "combineReducers".
export default combineReducers ({
	categories,
	posts,
    comments
})
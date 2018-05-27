import '../../assets/PostItem.css'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeVotePost } from '../../actions/posts'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

const PostItem = props => {
    /*
        post: o objeto representando do post, com as propriedades preenchidas.
        isHome: vai definir se a categoria do post será exibida.
        changeVotePost: função chamada para modificar o vote score do post.
    */
    const { post, isHome, changeVotePost } = props

    /*
        Este componente é a representação mínima de um post. Permite ir aos detalhes do 
    post e modificar seu vote score.
        Sua quantidade de comentários é exibida, mas a única interação é o vote score.
        As outras deverão ser feitas na tela de detalhes. 
    */
    return (
        <div className="post-item">
            {isHome && (
                <div className="category"><span>{post.category.toUpperCase()}</span></div>
            )}            
            <header className="post-item-header">
                <div className="title">
                    <h4>{post.title}</h4>
                    <Link to={`/posts/${post.id}`}>
                        <Button variant="flat">GO TO DETAILS</Button>
                    </Link>
                </div>
                <div className="author">
                    <span>
                        By <span className="author-name">{post.author}</span> 
                        ({new Date(post.timestamp).toLocaleString()})
                    </span>
                </div>              
            </header>
            <footer className="post-item-footer">
                <div className="votes">
                    <span>Vote Score: {post.voteScore}</span>
                    <Tooltip title="Upvote">
                        <IconButton className="icon-button"
                                    onClick={() => changeVotePost(post.id, "upVote")}>
                            <Icon>thumb_up</Icon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Downvote">
                        <IconButton className="icon-button"
                                    onClick={() => changeVotePost(post.id, "downVote")}>
                            <Icon>thumb_down</Icon>
                        </IconButton>
                    </Tooltip>
                </div>                    
                <div className="comments">
                    <span>{post.commentCount}</span>
                    <Tooltip title="Comments"><Icon>comment</Icon></Tooltip>
                </div>                    
            </footer>
        </div>
    )
}

//Mapeando função de modificação de vote score.
const mapDispatchToProps = dispatch => ({
    changeVotePost: (post, option) => dispatch(changeVotePost(post, option))
})

//Certificando que as devidas propriedades estejam presentes e no formato certo
PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    changeVotePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    isHome: PropTypes.bool,
}

//Enviando os mapeamentos para propriedades, com o "connect"
export default connect(
    null,
    mapDispatchToProps
)(PostItem)
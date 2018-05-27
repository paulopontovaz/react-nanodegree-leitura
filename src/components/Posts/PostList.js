import '../../assets/PostList.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts, changePostOrder } from '../../actions/posts'
import PostItem from './PostItem'
import PostModal from './PostModal'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

class PostList extends Component {
  state = {
    showPostModal: false,//Exibir a modal de criação de post
    modalPost: null,//O post a ser passado para a modal de edição e criação de posts.
    order: 'voteScore',//Tipo de ordenação dos posts.
    ascending: false,//Indicador de ordem crescente ou decrescente.
  }

  //Abrir a modal para adicionar um novo post.
  openPostModal = (post = null) => this.setState({ showPostModal: true, modalPost: post })
  //Fechar a modal de adicionar post.
  closePostModal = () => this.setState({ showPostModal: false, modalPost: null })

  /* Após montar o componente, os posts são carregados, passando para a função a devida categoria.
  Se nenhuma categoria for passada (na propriedade "categoryPath"), todos os posts serão carregados. */
  componentDidMount = () => {
    this.props.loadPosts(this.props.categoryPath)
  }

  //Modifica o tipo de ordenação dos posts.
  changeOrder = (newOrder, ascending) => {
    this.props.changeOrder(newOrder, ascending)
    this.setState({order: newOrder})
  }  

  //Alterna a ordenação  dos posts entre crescente e decrescente.
  toggleAscending = (newOrder, ascending) =>{
    this.props.changeOrder(newOrder, ascending)
    this.setState({ ascending: ascending })
  }

  render() {
    const { categoryPath, posts } = this.props
    const { showPostModal, modalPost, order, ascending } = this.state

    /*
        Este componente apresenta um botão para acionar a modal com um formulário para adicionar um post.
        Além disso é possível ordenar os posts de até seis maneiras diferentes, combinando o tipo de ordenação
      e a definição da ordem como crescente ou decrescente.
        Também há uma lista de posts cuja função map chama os respectivos "PostItems".
    */
    return (
      <div className="post-list">
        <Button
          className="new-post"
          color="primary"
          variant="raised"
          fullWidth={true}
          onClick={() => this.openPostModal()}>NEW POST</Button>
        <FormControl fullWidth={true} className='modal-form-field'>
          <InputLabel htmlFor="post-order">Order by</InputLabel>
          <Select
            inputProps={{name: 'post-order', id: 'post-order'}}
            value={order}
            onChange={event => this.changeOrder(event.target.value, ascending)}>
              <MenuItem value='voteScore'>Vote Score</MenuItem>
              <MenuItem value='commentCount'>Comment Count</MenuItem>
              <MenuItem value='timestamp'>Date</MenuItem>
          </Select>          
        </FormControl>
        <FormControlLabel
            label="Ascending Order"
            control={
              <Checkbox
                checked={ascending}
                onChange={(event, checked) => this.toggleAscending(order, checked)}
                value='ascending'
              />
            }/>
        {posts && posts.map(post => (
          <PostItem key={post.id} post={post} isHome={!categoryPath} editFunction={this.openPostModal} />
        ))}
        {(!posts || posts.length === 0) && (<div><br/><p>No post found</p></div>)}
        
        <Dialog
          title="Post"
          open={showPostModal}>
            <PostModal 
              post={modalPost || (categoryPath ? {category: categoryPath} : null)} 
              closeModal={this.closePostModal} />
        </Dialog>
      </div>
    )    
  }
}

//Mapeando os posts vindos do reducer para a propriedade correspondente
const mapStateToProps = ({ posts }) => ({ posts })

/* Mapeando as funções que chamarão os action creators de 
carregamento de posts e de mudança na sua ordenação. */
const mapDispatchToProps = dispatch => ({
  loadPosts: categoryPath => dispatch(getPosts(categoryPath)),
  changeOrder: (newOrder, ascending) => dispatch(changePostOrder(newOrder, ascending)),
})

//Certificando que as devidas propriedades estejam presentes e no formato certo
PostList.propTypes = {
  loadPosts: PropTypes.func.isRequired,
  changeOrder: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  categoryPath: PropTypes.string.isRequired,
}

//Enviando os mapeamentos para propriedades, com o "connect"
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
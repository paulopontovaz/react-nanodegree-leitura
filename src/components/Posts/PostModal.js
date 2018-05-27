import '../../assets/Modal.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost, updatePost } from '../../actions/posts'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

class PostModal extends Component {
  /* O construtor preenche o estado do componente com valores vazios 
  de forma que os campos sejam controlados.  */
  constructor (props) {
    super(props)
    this.state = { 
      title: '', 
      author: '', 
      body: '', 
      category: '',
    }

    if(this.props.post)
      /* Se o post for passado (no caso de edição do post),
      suas propriedades são descontruídas e passadas para o estado. */
      this.state = {...this.props.post}
  }

  save (post) {
    //Se todos os campos obrigatórios estiverem preenchidos, o post é criado ou atualizado.
    if (post.title && post.author && post.body && post.category) {
      let promise

      //Definindo se a promise será de edição ou de criação.
      if (post.id) 
        promise = this.props.updatePost(post)
      else 
        promise = this.props.addPost(post)

      //Executando a função de fechamento da modal, passada como parâmetro, após a conclusão da promise.
      promise
        .then(this.props.closeModal)
        .catch(error => {
          console.log(error)
          this.props.closeModal()
        })
    }
  }

  render() {
    const { closeModal } = this.props
    const { title, author, body, category, id } = this.state

    /*
        O componente consiste num form simples três tipos de campos diferentes,
      em termos de HTML: textarea, input type text e select.
        O corpo da modal é definido aqui, porém sua casca e sua visibilidade são 
      definidos no componente que referencia este.
    */
    return (
      <div className="modal-container">
        <DialogContent>
          <TextField 
            className="modal-form-field"
            fullWidth={true}
            label="Title"
            value={title} 
            onChange={event => this.setState({title: event.target.value})}
            required />
          <TextField 
            className="modal-form-field"
            fullWidth={true}
            label="Author"
            value={author} 
            onChange={event => this.setState({author: event.target.value})}
            required />
          <TextField 
            className="modal-form-field"
            fullWidth={true}
            label="Text"
            multiline
            rows={3}
            value={body} 
            onChange={event => this.setState({body: event.target.value})}
            required />              
          <FormControl fullWidth={true} className='modal-form-field'>
            <InputLabel htmlFor="category-select">Category</InputLabel>
            <Select
              inputProps={{name: 'category', id: 'category-select'}}              
              value={category}
              onChange={(event) => this.setState({category: event.target.value})}>
                <MenuItem value='redux'>Redux</MenuItem>
                <MenuItem value='react'>React</MenuItem>
                <MenuItem value='udacity'>Udacity</MenuItem>
            </Select>
          </FormControl>
          
        </DialogContent>

        <DialogActions>
          <Button 
              variant="flat"
              onClick={closeModal}>CANCEL</Button>
          <Button 
            variant="flat"
            onClick={() => this.save(this.state)} 
            color="primary">{id ? "UPDATE" : "CREATE"}</Button>
        </DialogActions>
      </div>
      
    )    
  }
}

//Mapeando as funções de criar e editar post para as propriedades do componente.
const mapDispatchToProps = dispatch => ({
    addPost: post => dispatch(addPost(post)),
    updatePost: post => dispatch(updatePost(post)),
})

//Certificando que as devidas propriedades estejam presentes e no formato certo
PostModal.propTypes = {
  addPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  post: PropTypes.array,
}

//Enviando os mapeamentos para propriedades, com o "connect"
export default connect(
    null,
    mapDispatchToProps
)(PostModal)
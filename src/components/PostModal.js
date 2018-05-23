import '../assets/Modal.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost, updatePost } from '../actions/posts'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'

class PostModal extends Component {
  constructor (props) {
    super(props)
    this.state = { 
      title: '', 
      author: '', 
      body: '', 
      category: ''
    }

    if(this.props.post)
      this.state = {...this.props.post}
  }

  add (post) {
    if (post.title && post.author && post.body && post.category) {
      let promise

      if (post.id)
        promise = this.props.updatePost(post)
      else
        promise = this.props.addPost(post)

      promise.then(() => this.props.closeModal())
    }
  }

  render() {
    const { closeModal } = this.props
    const { title, author, body, category, id } = this.state

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
          <Select
            className="modal-form-field"
            fullWidth={true}
            label="Category"
            value={category}
            onChange={(event) => this.setState({category: event.target.value})}>
              <MenuItem value='redux'>Redux</MenuItem>
              <MenuItem value='react'>React</MenuItem>
              <MenuItem value='udacity'>Udacity</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button 
              variant="flat"
              onClick={closeModal}>CANCEL</Button>
          <Button 
            variant="flat"
            onClick={() => this.add(this.state)} 
            color="primary">{id ? "UPDATE" : "CREATE"}</Button>
        </DialogActions>
      </div>
      
    )    
  }
}

const mapDispatchToProps = dispatch => ({
    addPost: post => dispatch(addPost(post)),
    updatePost: post => dispatch(updatePost(post)),
})

export default connect(
    null,
    mapDispatchToProps
)(PostModal)
import '../assets/Modal.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost, updatePost } from '../actions/posts'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

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
            <TextField 
              fullWidth={true}
              floatingLabelText="Title"
              value={title} 
              onChange={event => this.setState({title: event.target.value})}
              required />
            <TextField 
              fullWidth={true}
              floatingLabelText="Author"
              value={author} 
              onChange={event => this.setState({author: event.target.value})}
              required />
            <TextField 
              fullWidth={true}
              floatingLabelText="Text"
              hintText="What do you want to say?"
              multiLine={true}
              rows={3}
              value={body} 
              onChange={event => this.setState({body: event.target.value})}
              required />
            <SelectField
              fullWidth={true}
              floatingLabelText="Category"
              value={category}
              onChange={(event, index, value) => this.setState({category: value})}>
                <MenuItem value='redux' primaryText="Redux" />
                <MenuItem value='react' primaryText="React" />
                <MenuItem value='udacity' primaryText="Udacity" />
            </SelectField>
            <footer>
              <FlatButton label="CANCEL" onClick={closeModal} />
              <FlatButton label={id ? "UPDATE" : "CREATE"} onClick={() => this.add(this.state)} primary={true} />
            </footer>  
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
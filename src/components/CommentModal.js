import '../assets/Modal.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment, updateComment } from '../actions/comments'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class CommentModal extends Component {
  constructor (props) {
    super(props)
    this.state = { 
      author: '', 
      body: '', 
      parentId: this.props.postId
    }

    if(this.props.comment)
      this.state = {...this.props.comment}
  }

  add (comment) {
    if (comment.author && comment.body) {
      let promise

      if (comment.id)
        promise = this.props.updateComment(comment)
      else
        promise = this.props.addComment(comment)

      promise.then(this.props.closeModal)
    }
  }

  render() {
    const { closeModal } = this.props
    const { author, body, id } = this.state

    return (
          <div className="modal-container">
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
            <footer>
              <FlatButton label="CANCEL" onClick={closeModal} />
              <FlatButton label={id ? "UPDATE" : "CREATE"} onClick={() => this.add(this.state)} primary={true} />
            </footer>  
          </div>
    )    
  }
}

const mapDispatchToProps = dispatch => ({
    addComment: comment => dispatch(addComment(comment)),
    updateComment: comment => dispatch(updateComment(comment)),
})

export default connect(
    null,
    mapDispatchToProps
)(CommentModal)
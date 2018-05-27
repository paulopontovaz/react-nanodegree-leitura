import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'

const ConfirmModal = props => {
    const { onCancel, onConfirm, itemType, open } = props

    return (
      <Dialog
        open={open}
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        aria-labelledby="confirmation-dialog-title">
        <DialogTitle id="confirmation-dialog-title">Confirm delete</DialogTitle>
          <DialogContent>
            <span>Are you sure you want to delete this {itemType}?</span>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel} color="primary">Cancel</Button>
            <Button onClick={onConfirm} color="primary">Ok</Button>
          </DialogActions>
      </Dialog>      
    )
}

ConfirmModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  itemType: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired
}

export default ConfirmModal
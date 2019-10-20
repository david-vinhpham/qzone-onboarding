import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import Button from 'components/CustomButtons/Button';

class CustomModal extends Component {
  render() {
    const {
      openModal, onClose, onConfirm, title, message,
      closeButtonLabel, confirmButtonLabel
    } = this.props;
    return (
      <Dialog
        aria-labelledby="custom-modal-label"
        aria-describedby="custom-modal-description"
        open={openModal}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="custom-modal-label">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{closeButtonLabel}</Button>
          <Button onClick={onConfirm} color="rose">{confirmButtonLabel}</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default CustomModal;

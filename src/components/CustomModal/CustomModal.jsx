import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import Button from 'components/CustomButtons/Button';

class CustomModal extends Component {
  render() {
    const { openModal, closeModal, confirmDeletion } = this.props;
    return (
      <Dialog
        aria-labelledby="custom-modal-label"
        aria-describedby="custom-modal-description"
        open={openModal}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle>
          Do you want to delete this email template?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will not be able to recovery this template anymore. As it is permanently deleted!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Discard</Button>
          <Button onClick={confirmDeletion} color="rose">Delete</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default CustomModal;

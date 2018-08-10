import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Close from "@material-ui/icons/Close";
import { Dialog, DialogTitle, DialogContent, DialogActions }  from "@material-ui/core";  
import validationFormStyle from "assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";

class BusinessModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    const { classes } = this.props;

    return (
      <Dialog
        classes={{
          root: classes.center + " " + classes.modalRoot,
          paper: classes.modal
        }}
        open={this.props.open}
        keepMounted
        onClose={() => this.setState({open: false})}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <Button
            justIcon
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="transparent"
            onClick={this.props.onClose}
          >
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>Customer Additional Data</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <h6>In Development</h6>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button color="transparent">Nice Button</Button>
          <Button
            onClick={this.props.onClose}
            color="danger"
            simple
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

BusinessModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(validationFormStyle)(BusinessModal);;

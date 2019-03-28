import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Slide from '@material-ui/core/Slide';
import Button from 'components/CustomButtons/Button';
import deletionModalStyle from '../assets/jss/material-dashboard-pro-react/modules/deletionModal';
export const CTA = {
  DELETE: 'delete',
  DELETE_CONFIRMED: 'deleted',
};

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class DeletionModal extends Component {
  static defaultProps = {
    type: CTA.DELETE,
    itemId: '',
    itemName: '',
    itemSubName: '',
  };

  static propTypes = {
    itemDeleteHandler: PropTypes.func.isRequired,
    openDialog: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    type: PropTypes.string,
    itemId: PropTypes.string,
    itemName: PropTypes.string,
    itemSubName: PropTypes.string,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  deleteSurveyHandler = () => {
    const { itemId, itemDeleteHandler } = this.props;
    itemDeleteHandler(itemId);
  };

  onDialogClose = () => {
    const { closeDialog } = this.props;
    closeDialog();
  };

  render() {
    const {
      openDialog, type, itemId, classes, itemName, itemSubName,
    } = this.props;
    let itemCount = `this ${itemName}`;
    let itemDeterminer = 'it is';
    let dialogTitle = `Delete ${itemName} ${itemSubName}`;
    let cancelButtonLabel = 'Cancel';

    if (!itemId) {
      itemCount = `all ${itemName}s`;
      itemDeterminer = 'they are';
      dialogTitle = `Delete All ${itemName}s`;
    }
    if (type === CTA.DELETE_CONFIRMED) {
      dialogTitle = itemId ? `${itemName} deleted` : `${itemName}s deleted`;
      cancelButtonLabel = 'OK';
    }

    const dialogContent = type === 'delete' ? `Do you want to delete ${itemCount}? You cannot recovery as
                         ${itemDeterminer} permanently purged from the ${itemName} Database.`
      : `${itemName}s permanently deleted from DataBase!`;

    const isDeleteButtonVisible = cancelButtonLabel === 'Cancel';
    const deleteButton = isDeleteButtonVisible ? (
      <div>
        <Button onClick={this.deleteSurveyHandler} color="rose">Delete</Button>
      </div>
    ) : null;
    return (
      <React.Fragment>
        <Dialog
          TransitionComponent={Transition}
          keepMounted
          open={openDialog}
          onClose={this.onDialogClose}
          aria-labelledby="delete-item-dialog"
          disableBackdropClick
          classes={{ paper: classes.paper }}
        >
          <DialogTitle id="delete-item-title">
            {dialogTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-item-content">
              {dialogContent}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div>
              <Button onClick={this.onDialogClose}>{cancelButtonLabel}</Button>
            </div>
            { deleteButton }
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(deletionModalStyle)(DeletionModal);

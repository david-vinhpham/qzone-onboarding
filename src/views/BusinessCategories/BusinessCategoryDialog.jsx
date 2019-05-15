import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { businessCategoryType } from 'types/global';

class BusinessCategoryDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { businessCategoryName: props.selectedBusinessCategory.name };
  }

  handleSubmitBusinessCategoryForm = () => {
    const {
      isEditMode, handleAddBusinessCategory, handleEditBusinessCategory,
      selectedBusinessCategory
    } = this.props;
    const { businessCategoryName } = this.state;

    if (isEditMode) {
      handleEditBusinessCategory(
        selectedBusinessCategory.id,
        businessCategoryName
      );
    } else {
      handleAddBusinessCategory(businessCategoryName);
    }
  }

  onBusinessCategoryNameChange = e => {
    this.setState({ businessCategoryName: e.target.value });
  }

  render() {
    const {
      isEditMode, handleBusinessCategoryDialogClose,
    } = this.props;
    const { businessCategoryName } = this.state;

    return (
      <Dialog
        open
        onClose={handleBusinessCategoryDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {isEditMode ? 'Edit Business Category' : 'Add Business Category'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={businessCategoryName}
            onChange={this.onBusinessCategoryNameChange}
            label="Business Name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBusinessCategoryDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!businessCategoryName}
            onClick={this.handleSubmitBusinessCategoryForm}
            color="primary">
            {isEditMode ? 'Edit' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

BusinessCategoryDialog.propTypes = {
  handleBusinessCategoryDialogClose: PropTypes.func.isRequired,
  handleEditBusinessCategory: PropTypes.func.isRequired,
  handleAddBusinessCategory: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  selectedBusinessCategory: businessCategoryType,
};

BusinessCategoryDialog.defaultProps = {
  isEditMode: false
};

export default BusinessCategoryDialog;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { serviceCategoryType } from 'types/global';

class ServiceCategoryDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { serviceCategoryName: props.selectedServiceCategory.name };
  }

  handleSubmitServiceCategoryForm = () => {
    const {
      isEditMode, handleAddServiceCategory, handleEditServiceCategory,
      selectedServiceCategory
    } = this.props;
    const { serviceCategoryName } = this.state;

    if (isEditMode) {
      handleEditServiceCategory(
        selectedServiceCategory.id,
        serviceCategoryName,
        selectedServiceCategory.parentCategoryId
      );
    } else {
      handleAddServiceCategory(serviceCategoryName);
    }
  }

  onServiceCategoryNameChange = e => {
    this.setState({ serviceCategoryName: e.target.value });
  }

  render() {
    const {
      isEditMode, handleServiceCategoryDialogClose,
    } = this.props;
    const { serviceCategoryName } = this.state;

    return (
      <Dialog
        open
        onClose={handleServiceCategoryDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {isEditMode ? 'Edit Service Category' : 'Add Service Category'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={serviceCategoryName}
            onChange={this.onServiceCategoryNameChange}
            label="Service Name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleServiceCategoryDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!serviceCategoryName}
            onClick={this.handleSubmitServiceCategoryForm}
            color="primary">
            {isEditMode ? 'Edit' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ServiceCategoryDialog.propTypes = {
  handleServiceCategoryDialogClose: PropTypes.func.isRequired,
  handleEditServiceCategory: PropTypes.func.isRequired,
  handleAddServiceCategory: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  selectedServiceCategory: serviceCategoryType,
};

ServiceCategoryDialog.defaultProps = {
  isEditMode: false
};

export default ServiceCategoryDialog;

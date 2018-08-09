import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GridContainer from "components/Grid/GridContainer.jsx";
import Close from "@material-ui/icons/Close";
import GridItem from "components/Grid/GridItem.jsx";
import { FormLabel, InputLabel, MenuItem, FormControl, Select, Modal, Dialog, DialogTitle, DialogContent, DialogActions }  from "@material-ui/core";  
import validationFormStyle from "assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import Table from "components/Table/Table.jsx";

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
          <Table
            tableHeaderColor="primary"
            tableData={[
              ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
              ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
              ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
              ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
              ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
              ["Mason Porter", "Chile", "Gloucester", "$78,615"]
            ]}
            coloredColls={[3]}
            colorsColls={["primary"]}
          />
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

// We need an intermediary variable for handling the recursive nesting.

export default withStyles(validationFormStyle)(BusinessModal);;

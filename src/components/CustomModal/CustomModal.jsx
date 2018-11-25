import React, {Component} from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  root: {
    width: '35%',
    top: '30%',
    left: '40%',
  },
});

class CustomModal extends Component {
  render() {
    const { openModal, closeModal, confirmDeletion, classes } = this.props;
    return (
      <Modal
        aria-labelledby="custom-modal-label"
        aria-describedby="custom-modal-description"
        open={openModal}
        disableBackdropClick
        disableEscapeKeyDown
        classes={classes}
      >
        <Card>
          <CardHeader>
            <Typography variant="headline" color="textPrimary">Do you want to delete this email template?</Typography>
          </CardHeader>
          <CardBody>
            <Typography variant="subheading" color="textSecondary">You will not be able to recovery this template anymore. As it is permanently deleted!</Typography>
          </CardBody>
          <CardFooter>
            <Button onClick={confirmDeletion} color="rose">Delete</Button>
            <Button onClick={closeModal}>Discard</Button>
          </CardFooter>
        </Card>
      </Modal>
    );
  }
}

export default withStyles(styles)(CustomModal);

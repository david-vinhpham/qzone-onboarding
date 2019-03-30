import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import { roseColor } from 'assets/jss/material-dashboard-pro-react';
import Button from 'components/CustomButtons/Button.jsx';

const styles = () => ({
  root: {
    color: roseColor
  }
});

class Error extends Component {
  render() {
    const { classes, children, cancelError } = this.props;
    return (
      <Card>
        <CardBody>
          <Typography classes={classes}>{}</Typography>
        </CardBody>
        <CardFooter>
          <Button onClick={cancelError}>OK</Button>
        </CardFooter>
      </Card>
    );
  }
}

Error.propTypes = {
  cancelError: PropTypes.func.isRequired
};

export default withStyles(styles)(Error);

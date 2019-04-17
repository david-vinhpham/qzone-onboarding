import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { specialEventType, classesType, historyType } from 'types/global';
import { connect } from 'react-redux';
import {
  Paper, Table, TableBody, TableCell,
  TableHead, TableRow,
} from '@material-ui/core';
import moment from 'moment-timezone';
import { fetchSpecialEvents } from 'actions/specialEvents';
import tableStyle from "assets/jss/material-dashboard-pro-react/components/tableStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import Loading from 'components/Loading/Loading';

class SpecialEventsList extends PureComponent {
  componentDidMount() {
    this.props.fetchSpecialEvents(localStorage.getItem('userSub'));
  }

  handleClick(event, history) {
    history.push('/special-event/detail/' + event.id);
  }

  render() {
    const { specialEvents, classes, history, isLoading } = this.props;

    return (
      <Paper className={classes.root}>
        {isLoading ?
          <Loading />
          : <Table className={classes.tableScale}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cellHeaderBold} padding="dense">No</TableCell>
                <TableCell className={classes.cellHeaderBold}>Description</TableCell>
                <TableCell className={classes.cellHeaderBold}>Provider</TableCell>
                <TableCell className={classes.cellHeaderBold}>Start time</TableCell>
                <TableCell className={classes.cellHeaderBold}>End time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {specialEvents.map((event, key) => (
                <TableRow key={event.id} className={classes.row} onClick={() => this.handleClick(event, history)}>
                  <TableCell padding="dense">{key + 1}</TableCell>
                  <TableCell className={classes.textLinkTruncate} title={event.description}>{event.description}</TableCell>
                  <TableCell>{event.providerName}</TableCell>
                  <TableCell>{moment(event.slot.startTime * 1000).format('L LT Z')}</TableCell>
                  <TableCell>{moment(event.slot.endTime * 1000).format('L LT Z')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>}
      </Paper>
    )
  }
}

SpecialEventsList.propTypes = {
  specialEvents: PropTypes.arrayOf(specialEventType).isRequired,
  fetchSpecialEvents: PropTypes.func.isRequired,
  classes: classesType.isRequired,
  history: historyType.isRequired
};

const mapStateToProps = state => ({
  specialEvents: state.specialEvents.list,
  isLoading: state.specialEvents.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchSpecialEvents: businessId => dispatch(fetchSpecialEvents(businessId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(tableStyle)(SpecialEventsList));

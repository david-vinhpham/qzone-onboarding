import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Card from 'components/Card/Card';
import CardText from 'components/Card/CardText';
import CardHeader from 'components/Card/CardHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from 'components/CustomButtons/Button';
import Search from '@material-ui/icons/Search';
import CustomInput from 'components/CustomInput/CustomInput';
import headerLinksStyle from 'assets/jss/material-dashboard-pro-react/components/headerLinksStyle';
import tableStyle from 'assets/jss/material-dashboard-pro-react/components/tableStyle';
import { fetchAvailability } from 'actions/availabilitySlots';
import { historyType, availabilitySlotType, classesType, userDetailType } from 'types/global';
import { fetchProvidersByBusinessAdminId, fetchProvidersSuccess } from 'actions/provider';
import { defaultDateTimeFormat, eUserType } from 'constants.js';

class AvailabilitySlotsList extends PureComponent {
  componentDidMount() {
    const { history: { location: { state = {} } }, userDetail } = this.props;

    if (!state.specialEventId) {
      this.props.history.replace('/tmp-services');
    } else {
      this.props.fetchAvailability({
        specialEventId: state.specialEventId,
        customerTimezoneId: state.customerTimezoneId
      });

      if (userDetail.userType === eUserType.provider) {
        this.props.fetchProvidersSuccess([userDetail]);
      } else {
        this.props.fetchProvidersByBusinessAdminId(localStorage.getItem('userSub'));
      }
    }
  }

  render() {
    const { classes, availabilitySlots, history: { goBack, location: { state = {} } } } = this.props;

    return (
      <div>
        <Card>
          <CardHeader color="primary" icon>
            <Button
              size="small"
              color="primary"
              style={{ display: 'inline-block', margin: 0 }}
              onClick={goBack}
            >
              <ArrowBack />
            </Button>
            <CardText color="rose">
              <h4>Check availability</h4>
            </CardText>
            <div>
              <CustomInput
                formControlProps={{
                  className: `${classes.top} ${classes.search}`
                }}
                inputProps={{
                  placeholder: 'Search',
                  inputProps: {
                    'aria-label': 'Search',
                    className: classes.searchInput
                  }
                }}
              />
              <CustomButton
                color="white"
                aria-label="edit"
                justIcon
                round
              >
                <Search />
              </CustomButton>
            </div>
          </CardHeader>
        </Card>
        <Paper>
          <Table aria-labelledby="availabilityTable">
            <TableHead>
              <TableRow>
                <TableCell className={classes.cellHeaderBold} size="small">No</TableCell>
                <TableCell className={classes.cellHeaderBold}>Provider</TableCell>
                <TableCell className={classes.cellHeaderBold}>Service</TableCell>
                <TableCell className={classes.cellHeaderBold}>
                  Start time (DD/MM/YYYY)
                  <br />
                  Time zone ({moment.tz(state.customerTimezoneId).zoneAbbr()})
                </TableCell>
                <TableCell className={classes.cellHeaderBold}>
                  End time (DD/MM/YYYY)
                  <br />
                  Time zone ({moment.tz(state.customerTimezoneId).zoneAbbr()})
                </TableCell>
                <TableCell className={classes.cellHeaderBold}>Duration (minutes)</TableCell>
                <TableCell className={classes.cellHeaderBold}>Available slots</TableCell>
                <TableCell className={classes.cellHeaderBold}>Total slots</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {availabilitySlots.map((slot, idx) => (
                <TableRow key={slot.id} classes={{ root: classes.row }}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{slot.providerName}</TableCell>
                  <TableCell>{state.serviceName}</TableCell>
                  <TableCell>{slot.startTime}</TableCell>
                  <TableCell>{slot.endTime}</TableCell>
                  <TableCell>{slot.durationSec}</TableCell>
                  <TableCell>{slot.spotsOpen}</TableCell>
                  <TableCell>{slot.spotsTotal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

AvailabilitySlotsList.propTypes = {
  history: historyType.isRequired,
  availabilitySlots: PropTypes.arrayOf(availabilitySlotType).isRequired,
  fetchAvailability: PropTypes.func.isRequired,
  classes: classesType.isRequired,
  fetchProvidersByBusinessAdminId: PropTypes.func.isRequired,
  fetchProvidersSuccess: PropTypes.func.isRequired,
  userDetail: userDetailType.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  availabilitySlots: state.availabilitySlots.list.map(slot => {
    let providerName = '';
    const providerDetail = state.provider.providers.find(p => p.id === slot.providerId);

    if (providerDetail) {
      providerName = `${providerDetail.familyName} ${providerDetail.givenName}`;
    }

    return {
      ...slot,
      providerName,
      endTime: moment.tz(
        slot.endSec * 1000,
        ownProps.history.location.state.customerTimezoneId
      ).format(defaultDateTimeFormat),
      startTime: moment.tz(
        slot.startSec * 1000,
        ownProps.history.location.state.customerTimezoneId
      ).format(defaultDateTimeFormat)
    };
  }),
  userDetail: state.user.userDetail,
});

export default connect(
  mapStateToProps,
  { fetchAvailability, fetchProvidersByBusinessAdminId, fetchProvidersSuccess }
)(withStyles(tableStyle, headerLinksStyle)(AvailabilitySlotsList));

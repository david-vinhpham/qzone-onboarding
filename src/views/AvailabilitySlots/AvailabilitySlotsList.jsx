import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  Grid,
  Link
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Card from 'components/Card/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import headerLinksStyle from 'assets/jss/material-dashboard-pro-react/components/headerLinksStyle';
import tableStyle from 'assets/jss/material-dashboard-pro-react/components/tableStyle';
import { fetchAvailability } from 'actions/availabilitySlots';
import { historyType, availabilitySlotType, classesType, userDetailType } from 'types/global';
import { fetchProvidersByBusinessAdminId, fetchProvidersSuccess } from 'actions/provider';
import {BeatLoader} from "react-spinners";
import {css} from "@emotion/core";
import {fetchTmpServiceDetail} from "../../actions/tmpServiceDetail";
import Loading from 'components/Loading/Loading';

const override = css`
  margin: 0 auto;
  border-color: red;
  width: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

class AvailabilitySlotsList extends PureComponent {
  componentDidMount() {
    console.log('AvailabilitySlotsList...')
    const { id } = this.props.match.params;

    this.props.fetchAvailability({
      specialEventId: id,
    });
  }

  render() {
    const { classes, isLoading, availabilitySlots, tmpServiceId, uniqueLink,
      timezoneId, eventDate, providerName, serviceName, geoLocation, repeatType } = this.props;
    if (isLoading) {
      return (
        <BeatLoader
          css={override}
          sizeUnit="px"
          size={22}
          color="#e91e63"
          loading={isLoading}
        />
      );
    }
    return (
      <div>
        <Card>
        <Paper>
          <div className={classes.customPage}>
            <div className={classes.headerPage}>
              <div style={{ flexGrow: 1, display: 'flex' }}>
                <Button size="small" color="primary" onClick={this.props.history.goBack}>
                  <ArrowBack />
                </Button>
                <Typography display="inline" variant="h6">Event detail</Typography>
              </div>
            </div>
            {tmpServiceId ?
              <Grid container spacing={2}>
                <Grid item sm={3} xs={12}>
                  <Typography variant="body2" gutterBottom align="right" className={classes.customTitle}>
                    Provider name:
                  </Typography>
                </Grid>
                <Grid item sm={9} xs={12}>
                  <Typography variant="body2">
                    {providerName}
                  </Typography>
                </Grid>
                <Grid item sm={3} xs={12}>
                  <Typography variant="body2" gutterBottom align="right" className={classes.customTitle}>
                    Service name:
                  </Typography>
                </Grid>
                <Grid item sm={9} xs={12}>
                  <Typography variant="body2">
                    {serviceName}
                  </Typography>
                </Grid>
                <Grid item sm={3} xs={12}>
                  <Typography variant="body2" gutterBottom align="right" className={classes.customTitle}>
                    Unique Link:
                  </Typography>
                </Grid>
                <Grid item sm={9} xs={12}>
                  <Link
                    className={classes.custUrl}
                    title={uniqueLink}
                    href={uniqueLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {uniqueLink || ''}
                  </Link>
                </Grid>
                <Grid item sm={3} xs={12}>
                <Typography variant="body2" gutterBottom align="right" className={classes.customTitle}>
                  When:
                </Typography>
              </Grid>
                <Grid item sm={9} xs={12}>
                  <Typography variant="body2"> {eventDate}
                  </Typography>
                </Grid>
                <Grid item sm={3} xs={12}>
                  <Typography variant="body2" gutterBottom align="right" className={classes.customTitle}>
                    TimezoneId:
                  </Typography>
                </Grid>
                <Grid item sm={9} xs={12}>
                  <Typography variant="body2"> {timezoneId}
                  </Typography>
                </Grid>
                {repeatType &&
                <>
                  <Grid item sm={3} xs={12}>
                    <Typography variant="body2" gutterBottom align="right" className={classes.customTitle}>
                      Repeat :
                    </Typography>
                  </Grid>
                  <Grid item sm={9} xs={12}>
                    <Typography variant="body2">
                      {repeatType}
                    </Typography>
                  </Grid>
                </>
                }
                <Grid item sm={3} xs={12}>
                  <Typography variant="body2" gutterBottom align="right" className={classes.customTitle}>
                    Location:
                  </Typography>
                </Grid>
                <Grid item sm={9} xs={12}>
                  <Typography variant="body2">
                    {geoLocation}
                  </Typography>
                </Grid>
              </Grid> :
              <Loading />
            }
          </div>
        </Paper>
        </Card>
        <Paper>
          <Table aria-labelledby="availabilityTable">
            <TableHead>
              <TableRow>
                <TableCell className={classes.cellHeaderBold} size="small">No</TableCell>
                <TableCell className={classes.cellHeaderBold}>
                  Start time
                  <br />
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
                  <TableCell>{slot.providerStartSec}</TableCell>
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
  isLoading: PropTypes.isRequired,
  userDetail: userDetailType.isRequired,
  fetchTmpServiceDetail: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    availabilitySlots: state.availabilitySlots.list,
    geoLocation: state.availabilitySlots.geoLocation,
    providerName: state.availabilitySlots.providerName,
    serviceName: state.availabilitySlots.serviceName,
    eventDate: state.availabilitySlots.eventDate,
    timezoneId: state.availabilitySlots.timezoneId,
    uniqueLink: state.availabilitySlots.uniqueLink,
    isLoading: state.availabilitySlots.isLoading,
    tmpServiceId: state.availabilitySlots.tmpServiceId,
    repeatType: state.availabilitySlots.repeatType,
  }
};

export default connect(
  mapStateToProps,
  { fetchAvailability, fetchProvidersByBusinessAdminId, fetchProvidersSuccess, fetchTmpServiceDetail }
)(withStyles(tableStyle, headerLinksStyle)(AvailabilitySlotsList));

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
import { historyType, availabilitySlotType, classesType } from 'types/global';
import { fetchProvidersByBusinessAdminId, fetchProvidersSuccess } from 'actions/provider';
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";
import { fetchTmpServiceDetail } from "../../actions/tmpServiceDetail";

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
      <>
        <Card style={{ padding: 8 }}>
          <div style={{ flexGrow: 1, display: 'flex', marginBottom: 16 }}>
            <Button size="small" color="primary" onClick={this.props.history.goBack}>
              <ArrowBack />
            </Button>
            <Typography display="inline" variant="h6">Event detail</Typography>
          </div>
          {tmpServiceId &&
            <Grid container spacing={2}>
              <Grid item sm={3} xs={12}>
                <Typography variant="body2" align="right" className={classes.customTitle}>
                  Provider name:
                </Typography>
              </Grid>
              <Grid item sm={9} xs={12}>
                <Typography variant="body2">
                  {providerName}
                </Typography>
              </Grid>
              <Grid item sm={3} xs={12}>
                <Typography variant="body2" align="right" className={classes.customTitle}>
                  Service name:
                </Typography>
              </Grid>
              <Grid item sm={9} xs={12}>
                <Typography variant="body2">
                  {serviceName}
                </Typography>
              </Grid>
              <Grid item sm={3} xs={12}>
                <Typography variant="body2" align="right" className={classes.customTitle}>
                  Unique link:
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
                <Typography variant="body2" align="right" className={classes.customTitle}>
                  When:
                </Typography>
              </Grid>
              <Grid item sm={9} xs={12}>
                <Typography variant="body2">{eventDate}</Typography>
              </Grid>
              <Grid item sm={3} xs={12}>
                <Typography variant="body2" align="right" className={classes.customTitle}>
                  Timezone:
                </Typography>
              </Grid>
              <Grid item sm={9} xs={12}>
                <Typography variant="body2">{timezoneId}</Typography>
              </Grid>
              {repeatType &&
                <>
                  <Grid item sm={3} xs={12}>
                    <Typography variant="body2" align="right" className={classes.customTitle}>
                      Repeat:
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
                <Typography variant="body2" align="right" className={classes.customTitle}>
                  Location:
                </Typography>
              </Grid>
              <Grid item sm={9} xs={12}>
                <Typography variant="body2">
                  {geoLocation}
                </Typography>
              </Grid>
            </Grid>}
        </Card>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cellHeaderBold} size="small">No</TableCell>
                <TableCell className={classes.cellHeaderBold}>Start time</TableCell>
                <TableCell className={classes.cellHeaderBold}>Duration (minutes)</TableCell>
                <TableCell className={classes.cellHeaderBold}>Available slots</TableCell>
                <TableCell className={classes.cellHeaderBold}>Total slots</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {availabilitySlots.map((slot, idx) => (
                <TableRow key={slot.id} classes={{ root: classes.row }}>
                  <TableCell size="small">{idx + 1}</TableCell>
                  <TableCell>{slot.providerStartSec}</TableCell>
                  <TableCell>{slot.durationSec}</TableCell>
                  <TableCell>{slot.spotsOpen}</TableCell>
                  <TableCell>{slot.spotsTotal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </>
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
  isLoading: PropTypes.bool.isRequired,
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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { tmpServiceType, classesType } from 'types/global';
import { connect } from 'react-redux';
import { Typography, Paper, Grid, Link, Button } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { fetchTmpServiceDetail } from '../../actions/tmpServiceDetail';
import gridSystemStyle from "assets/jss/material-dashboard-pro-react/views/gridSystemStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from "redux";
import Loading from 'components/Loading/Loading';
import moment from 'moment-timezone';
import { defaultDateTimeFormat } from 'constants.js';

class TmpServicesDetail extends PureComponent {
  componentDidMount() {
    if (!this.props.tmpServiceDetail.id) {
      const { id } = this.props.match.params;
      this.props.fetchTmpServiceDetail(id);
    }
  }

  navigateToAvailability = (event) => {
    event.preventDefault();
    this.props.history.push('/availability', {
      specialEventId: this.props.tmpServiceDetail.id,
      customerTimezoneId: this.props.tmpServiceDetail.timezoneId,
      serviceName: this.props.tmpServiceDetail.serviceName
    });
  }

  render() {
    const { tmpServiceDetail, classes } = this.props;

    return (
      <Paper>
        <div className={classes.customPage}>
          <div className={classes.headerPage}>
            <div style={{ flexGrow: 1, display: 'flex' }}>
              <Button size="small" color="primary" onClick={this.props.history.goBack}>
                <ArrowBack />
              </Button>
              <Typography inline variant="h6">Event detail</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link
                href="/availability"
                target="_blank"
                rel="noreferrer"
                onClick={this.navigateToAvailability}
              >
                Check availability
            </Link>
            </div>
          </div>
          {tmpServiceDetail.id ?
            <Grid container spacing={16}>
              <Grid item sm={3} xs={12}>
                <Typography variant="body2" gutterBottom align="right" className={classes.customTitle}>
                  Type:
                </Typography>
              </Grid>
              <Grid item sm={9} xs={12}>
                <Typography variant="body2">
                  Temporary service
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
                  title={tmpServiceDetail.custUrl}
                  href={tmpServiceDetail.custUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {tmpServiceDetail.custUrl || ''}
                </Link>
              </Grid>
              <Grid item sm={3} xs={12}>
                <Typography variant="body2" gutterBottom align="right" className={classes.customTitle}>
                  When:
                </Typography>
              </Grid>
              <Grid item sm={9} xs={12}>
                <Typography variant="body2">
                  {moment.tz(tmpServiceDetail.slot.startTime * 1000, tmpServiceDetail.timezoneId).format(defaultDateTimeFormat)}
                  &nbsp;---&nbsp;
                  {moment.tz(tmpServiceDetail.slot.endTime * 1000, tmpServiceDetail.timezoneId).format(defaultDateTimeFormat)}
                </Typography>
              </Grid>
              {tmpServiceDetail.repeatType &&
                <>
                  <Grid item sm={3} xs={12}>
                    <Typography variant="body2" gutterBottom align="right" className={classes.customTitle}>
                      Repeat :
                    </Typography>
                  </Grid>
                  <Grid item sm={9} xs={12}>
                    <Typography variant="body2">
                      {tmpServiceDetail.repeatType}
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
                  {
                    [
                      tmpServiceDetail.geoLocation.streetAddress,
                      tmpServiceDetail.geoLocation.district,
                      tmpServiceDetail.geoLocation.city,
                      tmpServiceDetail.geoLocation.state,
                      tmpServiceDetail.geoLocation.country
                    ]
                      .filter(str => str)
                      .join(', ')
                  }
                </Typography>
              </Grid>
              {tmpServiceDetail.description &&
                <>
                  <Grid item sm={3} xs={12}>
                    <Typography variant="body2" gutterBottom align="right" className={classes.customTitle}>
                      Description:
                    </Typography>
                  </Grid>
                  <Grid item sm={9} xs={12}>
                    <Typography variant="body2">
                      {tmpServiceDetail.description}
                    </Typography>
                  </Grid>
                </>
              }
            </Grid> :
            <Loading />
          }
        </div>
      </Paper>
    )
  }
}

TmpServicesDetail.propTypes = {
  fetchTmpServiceDetail: PropTypes.func.isRequired,
  tmpServiceDetail: tmpServiceType.isRequired,
  classes: classesType.isRequired
};


const mapsStateToProp = (state, ownProps) => ({
  tmpServiceDetail: state.tmpServices.list.find(event => ownProps.match.params.id === event.id)
    || state.tmpServiceDetail.eventDetail
});

const mapDispatchToProps = dispatch => ({
  fetchTmpServiceDetail: eventId => dispatch(fetchTmpServiceDetail(eventId)),
});

export default compose(
  withStyles(gridSystemStyle),
  connect(
    mapsStateToProp,
    mapDispatchToProps
  )
)(TmpServicesDetail);

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { specialEventType, classesType } from 'types/global';
import { connect } from 'react-redux';
import { Typography, Paper, Grid, Link, Button } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { fetchSpecialEventDetail } from '../../actions/specialEventDetail';
import gridSystemStyle from "assets/jss/material-dashboard-pro-react/views/gridSystemStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from "redux";
import Loading from 'components/Loading/Loading';
import moment from 'moment-timezone';

class SpecialEventsDetail extends PureComponent {
  componentDidMount() {
    if (!this.props.specialEventDetail.id) {
      const { id } = this.props.match.params;
      this.props.fetchSpecialEventDetail(id);
    }
  }

  render() {
    const { specialEventDetail, classes } = this.props;

    return (
      <Paper>
        <div className={classes.customPage}>
          <div className={classes.headerPage}>
            <Button size="small" color="primary" onClick={this.props.history.goBack}>
              <ArrowBack />
            </Button>
            <Typography inline variant="h6">Event detail</Typography>
          </div>
          {specialEventDetail.custUrl ?
            <Grid container spacing={16}>
              <Grid item sm={3} xs={12}>
                <Typography variant="body2" gutterBottom align="right" className={classes.customTitle}>
                  Type:
                </Typography>
              </Grid>
              <Grid item sm={9} xs={12}>
                <Typography variant="body2">
                  Special
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
                  title={specialEventDetail.custUrl}
                  href={specialEventDetail.custUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {specialEventDetail.custUrl}
                </Link>
              </Grid>
              <Grid item sm={3} xs={12}>
                <Typography variant="body2" gutterBottom align="right" className={classes.customTitle}>
                  When:
                </Typography>
              </Grid>
              <Grid item sm={9} xs={12}>
                <Typography variant="body2">
                  {moment(specialEventDetail.slot.startTime * 1000).format('L LT Z')}
                  &nbsp;---&nbsp;
                  {moment(specialEventDetail.slot.endTime * 1000).format('L LT Z')}
                </Typography>
              </Grid>
              {specialEventDetail.repeatType &&
                <>
                  <Grid item sm={3} xs={12}>
                    <Typography variant="body2" gutterBottom align="right" className={classes.customTitle}>
                      Repeat :
                    </Typography>
                  </Grid>
                  <Grid item sm={9} xs={12}>
                    <Typography variant="body2">
                      {specialEventDetail.repeatType}
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
                      specialEventDetail.geoLocation.streetAddress,
                      specialEventDetail.geoLocation.district,
                      specialEventDetail.geoLocation.city,
                      specialEventDetail.geoLocation.state,
                      specialEventDetail.geoLocation.country
                    ]
                      .filter(str => str)
                      .join(', ')
                  }
                </Typography>
              </Grid>
              {specialEventDetail.description &&
                <>
                  <Grid item sm={3} xs={12}>
                    <Typography variant="body2" gutterBottom align="right" className={classes.customTitle}>
                      Description:
                    </Typography>
                  </Grid>
                  <Grid item sm={9} xs={12}>
                    <Typography variant="body2">
                      {specialEventDetail.description}
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

SpecialEventsDetail.propTypes = {
  fetchSpecialEventDetail: PropTypes.func.isRequired,
  specialEventDetail: specialEventType.isRequired,
  classes: classesType.isRequired
};


const mapsStateToProp = (state, ownProps) => ({
  specialEventDetail: state.specialEvents.list.find(event => ownProps.match.params.id === event.id)
    || state.specialEventDetail.eventDetail
});

const mapDispatchToProps = dispatch => ({
  fetchSpecialEventDetail: eventId => dispatch(fetchSpecialEventDetail(eventId)),
});

export default compose(
  withStyles(gridSystemStyle),
  connect(
    mapsStateToProp,
    mapDispatchToProps
  )
)(SpecialEventsDetail);

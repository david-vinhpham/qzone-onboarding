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
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Card from 'components/Card/Card';
import CardText from 'components/Card/CardText';
import CardHeader from 'components/Card/CardHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import headerLinksStyle from 'assets/jss/material-dashboard-pro-react/components/headerLinksStyle';
import tableStyle from 'assets/jss/material-dashboard-pro-react/components/tableStyle';
import { fetchScheduleReport } from 'actions/scheduleReport';
import { historyType, scheduleReportType, classesType } from 'types/global';
import {BeatLoader} from "react-spinners";
import {css} from "@emotion/core";
import Loading from 'components/Loading/Loading';
import ScheduleReportDialog from "./ScheduleReportDialog";
import {
  getScheduleReport,
  setScheduleReportData,
} from "../../actions/tmpServices";

const override = css`
  margin: 0 auto;
  border-color: red;
  width: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;
class ScheduleReportList extends PureComponent {
  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.fetchScheduleReport({
      tmpServiceId: id,
    });
    if (id !== undefined && id !== '') {
      this.setState({tmpServiceId: id});
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      isOpenScheduleReport: false,
      tempServiceId: ''
    };
  }
  openScheduleReportDialog = () => {
    const {
      tmpServiceId,
    } = this.state;
    this.props.getScheduleReport( tmpServiceId);
    this.setState({ isOpenScheduleReport: true });
  }
  closeScheduleReportDialog = () => {
    this.props.setScheduleReportData({ providerName: '', tmServiceReportList: [] });
    this.setState({ isOpenScheduleReport: false });
  }

  render() {
    const { classes, providerName, dateEvent, reportList,
      reportData, isReportLoading, isLoading, timezone } = this.props;
    const {
      isOpenScheduleReport,
    } = this.state;
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
                  <Typography display="inline" variant="h6">Report review</Typography>
                </div>
              </div>
              {isOpenScheduleReport && (
                <ScheduleReportDialog
                  onDialogClose={this.closeScheduleReportDialog}
                  reportData={reportData}
                  isReportLoading={isReportLoading}
                />
              )}
              {providerName ?
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
                      Date event:
                    </Typography>
                  </Grid>
                  <Grid item sm={9} xs={12}>
                    <Typography variant="body2">
                      {dateEvent}
                    </Typography>
                  </Grid>
                  <Grid item sm={3} xs={12}>
                    <Typography variant="body2" gutterBottom align="right" className={classes.customTitle}>
                      Timezone:
                    </Typography>
                  </Grid>
                  <Grid item sm={9} xs={12}>
                    <Typography variant="body2">
                      {timezone}
                    </Typography>
                  </Grid>
                  <Grid item sm={3} xs={12}>
                    <Typography variant="body2" gutterBottom align="right" className={classes.customTitle}>
                      Print Schedule:
                    </Typography>
                  </Grid>
                  <Grid item sm={9} xs={12}>
                    <CardHeader color="primary" style={{cursor:'pointer'}} icon>
                      <CardText color="rose" onClick={this.openScheduleReportDialog}>
                        <h4 className={classes.cardTitle}>Export Schedule</h4>
                      </CardText>
                    </CardHeader>
                  </Grid>
                </Grid> :
                <Loading />
              }
            </div>
          </Paper>
        </Card>
        <Paper>
          <Table aria-labelledby="scheduleReportTable">
            <TableHead>
              <TableRow>
                <TableCell className={classes.cellHeaderBold} size="small">No</TableCell>
                <TableCell className={classes.cellHeaderBold}>Customer Name</TableCell>
                <TableCell className={classes.cellHeaderBold}>Customer Email</TableCell>
                <TableCell className={classes.cellHeaderBold}>Customer Phone</TableCell>
                <TableCell className={classes.cellHeaderBold}>
                  Start time (DD/MM/YYYY)
                </TableCell>
                <TableCell className={classes.cellHeaderBold}>
                  End time (DD/MM/YYYY)
                </TableCell>
                <TableCell className={classes.cellHeaderBold}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportList.map((report, idx) => (
                <TableRow key={report.id} classes={{ root: classes.row }}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{report.customerName}</TableCell>
                  <TableCell>{report.customerEmail}</TableCell>
                  <TableCell>{report.customerPhone}</TableCell>
                  <TableCell>{report.startTime}</TableCell>
                  <TableCell>{report.toTime}</TableCell>
                  <TableCell>{report.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

ScheduleReportList.propTypes = {
  history: historyType.isRequired,
  scheduleReports: PropTypes.arrayOf(scheduleReportType).isRequired,
  fetchScheduleReport: PropTypes.func.isRequired,
  getScheduleReport: PropTypes.func.isRequired,
  setScheduleReportData: PropTypes.func.isRequired,
  isReportLoading: PropTypes.bool.isRequired,
  classes: classesType.isRequired,
}


const mapStateToProps = (state) => {
    return {
      reportList: state.scheduleReports.list,
      providerName: state.scheduleReports.providerName,
      dateEvent: state.scheduleReports.dateEvent,
      timezone: state.scheduleReports.timezone,
      isLoading: state.scheduleReports.isLoading,
      reportData: state.tmpServices.reportData,
      isReportLoading: state.tmpServices.isReportLoading,
    }
}

export default connect(
  mapStateToProps,
  { fetchScheduleReport, getScheduleReport, setScheduleReportData  }
)(withStyles(tableStyle, headerLinksStyle)(ScheduleReportList));

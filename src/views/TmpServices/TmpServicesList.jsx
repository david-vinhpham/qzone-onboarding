import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { classesType, historyType, tmpServiceType } from "types/global";
import { connect } from "react-redux";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import moment from "moment-timezone";
import { deleteTmpService, fetchTmpServices } from "../../actions/tmpServices";
import tableStyle from "../../assets/jss/material-dashboard-pro-react/components/tableStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom";
import DeletionModal from "../../shared/deletion-modal";
import { ClipLoader } from "react-spinners";
import ArtTrack from "@material-ui/icons/ArtTrack";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import { css } from "@emotion/core";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Search from "@material-ui/icons/Search";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
class TmpServicesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      deletedTmpService: {
        id: 0,
        isDel: false
      }
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.tmpServices });
    if (nextProps.tmpServices != null && nextProps.tmpServices.length > 0 && !nextProps.delTmpServiceLoading) {
      localStorage.setItem('tmpServices', JSON.stringify(nextProps.tmpServices));
    }

  }
  componentDidMount() {
    let userInfo = localStorage.getItem('user');
    if (userInfo === null) {
      window.location = '/login';
    }
    let tmpServices = localStorage.getItem('tmpServices');
    tmpServices = JSON.parse(tmpServices);
    if (tmpServices !== null && tmpServices.length > 0) {
      this.setState({ data: tmpServices });
    } else {
      const userSub = localStorage.getItem('userSub');
      this.props.fetchTmpServices(userSub);
    }

  }

  handleClick(event, history) {
    history.push('/tmp-service/detail/' + event.id);
  }
  cancelDelete = () => {
    const data = {
      isDel: false
    };
    this.setState({ deletedTmpService: data });
  };

  confirmDelete = eventId => {
    this.props.deleteTmpService(eventId);
    const data = {
      isDel: false
    };
    this.setState({ deletedTmpService: data });
  };

  deleteTmpService(eventId) {
    const data = {
      id: eventId,
      isDel: true
    };
    this.setState({ deletedTmpService: data });
  }
  render() {
    const { classes, history, isLoading, delTmpServiceLoading, delTmpServiceError } = this.props;
    let data = [];
    const { deletedTmpService } = this.state;
    if (isLoading) {
      return (
        <ClipLoader
          className={override}
          sizeUnit="px"
          size={100}
          color="#123abc"
          loading={isLoading}
        />
      );
    }
    if (delTmpServiceLoading) {
      return (
        <ClipLoader
          css={override}
          sizeUnit="px"
          size={100}
          color="#123abc"
          loading={delTmpServiceLoading}
        />
      );
    }
    if (delTmpServiceError) {
      return <div className="alert alert-danger">Error</div>;
    }
    data = (
      <Paper>
        <Table aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell className={classes.cellHeaderBold} padding="dense">No</TableCell>
              <TableCell className={classes.cellHeaderBold}>Provider</TableCell>
              <TableCell className={classes.cellHeaderBold}>Start time</TableCell>
              <TableCell className={classes.cellHeaderBold}>End time</TableCell>
              <TableCell className={classes.cellHeaderBold}>Description</TableCell>
              <TableCell className={classes.cellHeaderBold}>View|Edit|Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map((event, index) => (
              <TableRow key={event.id} className={classes.row}>
                <TableCell padding="dense">{index + 1}</TableCell>
                <TableCell>{event.providerName}</TableCell>
                <TableCell>{moment(event.slot.startTime * 1000).format('L LT Z')}</TableCell>
                <TableCell>{moment(event.slot.endTime * 1000).format('L LT Z')}</TableCell>
                <TableCell>
                  {event.description !== null
                    ? event.description.substring(0, 150)
                    : ''}
                </TableCell>
                <TableCell>
                  <Tooltip onClick={() => this.handleClick(event, history)}
                    id="tooltip-top"
                    title="View"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <ArtTrack className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Edit"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Link to={`/tmp-service/edit/${event.id}`}>
                      <Button color="success" simple justIcon>
                        <Edit className={classes.underChartIcons} />
                      </Button>
                    </Link>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Remove"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button
                      onClick={() => this.deleteTmpService(event.id)}
                      color="danger"
                      simple
                      justIcon
                    >
                      <Delete className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );

    const deletionPopup = deletedTmpService.isDel ? (
      <DeletionModal
        openDialog={deletedTmpService.isDel}
        closeDialog={this.cancelDelete}
        itemDeleteHandler={this.confirmDelete}
        itemId={deletedTmpService.id}
      />
    ) : null;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardText color="rose">
                  <h4 className={classes.cardTitle}>List temporary services</h4>
                </CardText>
                <div className="centerDiv">
                  <div className="search" md={3}>
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
                    <Button
                      color="white"
                      aria-label="edit"
                      justIcon
                      round
                      className={`${classes.top} ${classes.searchButton}`}
                    >
                      <Search className={`${classes.headerLinksSvg} ${classes.searchIcon}`} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>
        {data}
        {deletionPopup}
      </div>
    );
  }
}

TmpServicesList.propTypes = {
  tmpServices: PropTypes.arrayOf(tmpServiceType).isRequired,
  fetchTmpServices: PropTypes.func.isRequired,
  classes: classesType.isRequired,
  history: historyType.isRequired,
  delTmpServiceLoading: PropTypes.bool.isRequired,
  delTmpServiceError: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  tmpServices: state.tmpServices.list,
  isLoading: state.tmpServices.isLoading,
  delTmpServiceLoading: state.tmpServices.delTmpServiceLoading,
  delTmpServiceError: state.tmpServices.delTmpServiceError,
});

const mapDispatchToProps = dispatch => ({
  fetchTmpServices: businessId => dispatch(fetchTmpServices(businessId)),
  deleteTmpService: eventId => dispatch(deleteTmpService(eventId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(tableStyle)(TmpServicesList));

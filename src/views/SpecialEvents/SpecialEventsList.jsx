import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { classesType, historyType, specialEventType } from "types/global";
import { connect } from "react-redux";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import moment from "moment-timezone";
import { deleteSpecialEvent, fetchSpecialEvents } from "../../actions/specialEvents";
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
class SpecialEventsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      deletedSpecialEvent: {
        id: 0,
        isDel: false
      }
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.specialEvents });
    if (nextProps.specialEvents != null && nextProps.specialEvents.length > 0 && !nextProps.delSpecialEventLoading) {
      localStorage.setItem('specialEvents', JSON.stringify(nextProps.specialEvents));
    }

  }
  componentDidMount() {
    let userInfo = localStorage.getItem('user');
    if(userInfo === null) {
      window.location = '/login';
    }
    let specialEvents = localStorage.getItem('specialEvents');
    specialEvents = JSON.parse(specialEvents);
    if (specialEvents !== null && specialEvents.length > 0) {
      this.setState({ data: specialEvents });
    } else {
      const userSub = localStorage.getItem('userSub');
      this.props.fetchSpecialEvents(userSub);
    }

  }

  handleClick(event, history) {
    history.push('/special-event/detail/' + event.id);
  }
  cancelDelete = () => {
    const data = {
      isDel: false
    };
    this.setState({ deletedSpecialEvent: data });
  };

  confirmDelete = eventId => {
    this.props.deleteSpecialEvent(eventId);
    const data = {
      isDel: false
    };
    this.setState({ deletedSpecialEvent: data });
  };

  deleteSpecialEvent(eventId) {
    const data = {
      id: eventId,
      isDel: true
    };
    this.setState({ deletedSpecialEvent: data });
  }
  render() {
    const { specialEvents, classes, history, isLoading, delSpecialEventLoading,
      delSpecialEventError } = this.props;
    let data = [];
    const { deletedSpecialEvent } = this.state;
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
    if (delSpecialEventLoading) {
      return (
        <ClipLoader
          css={override}
          sizeUnit="px"
          size={100}
          color="#123abc"
          loading={delSpecialEventLoading}
        />
      );
    }
    if (delSpecialEventError) {
      return <div className="alert alert-danger">Error</div>;
    }
    data = (
      <GridContainer>
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
              <TableRow key={event.id}>
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
                    <Link to={`/special-event/edit/${event.id}`}>
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
                      onClick={() => this.deleteSpecialEvent(event.id)}
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
      </GridContainer>
    );

    const deletionPopup = deletedSpecialEvent.isDel ? (
      <DeletionModal
        openDialog={deletedSpecialEvent.isDel}
        closeDialog={this.cancelDelete}
        itemDeleteHandler={this.confirmDelete}
        itemId={deletedSpecialEvent.id}
      />
    ) : null;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardText color="rose">
                  <h4 className={classes.cardTitle}>Temp List</h4>
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

SpecialEventsList.propTypes = {
  specialEvents: PropTypes.arrayOf(specialEventType).isRequired,
  fetchSpecialEvents: PropTypes.func.isRequired,
  classes: classesType.isRequired,
  history: historyType.isRequired,
  delSpecialEventLoading: PropTypes.bool.isRequired,
  delSpecialEventError: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  specialEvents: state.specialEvents.list,
  isLoading: state.specialEvents.isLoading,
  delSpecialEventLoading: state.specialEvents.delSpecialEventLoading,
  delSpecialEventError: state.specialEvents.delSpecialEventError,
});

const mapDispatchToProps = dispatch => ({
  fetchSpecialEvents: businessId => dispatch(fetchSpecialEvents(businessId)),
  deleteSpecialEvent: eventId => dispatch(deleteSpecialEvent(eventId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(tableStyle)(SpecialEventsList));

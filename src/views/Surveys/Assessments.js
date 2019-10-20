import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'components/Loading/Loading';
import { InsertLink, Delete, Edit } from '@material-ui/icons';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import tableStyle from '../../assets/jss/material-dashboard-pro-react/components/tableStyle';
import listPageStyle from '../../assets/jss/material-dashboard-pro-react/views/listPageStyle';
import Card from '../../components/Card/Card.jsx';
import CardText from '../../components/Card/CardText.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody';
import { deleteSurveyByIdAction, resetSurveyStatus, setSurveysAction } from '../../actions/surveys';
import { eUserType } from 'constants.js';
import DeletionModal from "../../shared/deletion-modal";
import { showAlert } from 'actions/alert.jsx';

class Survey extends Component {
  static getDerivedStateFromProps(props, state) {
    const {
      isLoading,
      isError,
      errorMessage,
      surveys,
      isDeletedSurveyById,
    } = props;
    const {
      isLoading: cachedLoading,
      isError: cachedError,
      errorMessage: cachedErrorMessage,
      surveys: cachedSurveys,
      isDeletedSurveyById: cachedIsDeletedSurveyById,
    } = state;

    if (
      isLoading !== cachedLoading
      || isError !== cachedError
      || errorMessage !== cachedErrorMessage
      || surveys !== cachedSurveys
      || isDeletedSurveyById !== cachedIsDeletedSurveyById
    ) {
      return {
        isLoading,
        isError,
        errorMessage,
        surveys,
        isDeletedSurveyById,
      };
    }

    return null;
  }

  state = {
    isLoading: false,
    isError: false,
    errorMessage: '',
    surveys: null,
    isDeletedSurveyById: null,
    deletedSurveyId: null,
  };

  componentDidMount() {
    const { userDetail } = this.props;
    const assessorId = userDetail.userType === eUserType.provider
      ? userDetail.providerInformation.businessId
      : userDetail.id;
    this.props.setSurveysAction(assessorId);
  }

  componentDidUpdate(prevProps) {
    const {
      setSurveysAction: setSurveys,
      resetSurveyStatus: resetSurveyStatusAction,
    } = this.props;
    const { isDeletedSurveyById } = prevProps;
    const { isDeletedSurveyById: cachedIsDeletedSurveyById } = this.state;
    if (cachedIsDeletedSurveyById && cachedIsDeletedSurveyById !== isDeletedSurveyById) {
      const { userDetail } = this.props;
      const assessorId = userDetail.userType === eUserType.provider
        ? userDetail.providerInformation.businessId
        : userDetail.id;
      resetSurveyStatusAction();
      setSurveys(assessorId);
    }
  }

  handleEditSurvey = id => () => {
    const { history } = this.props;
    const { surveys } = this.state;
    history.push('/assessments/new', {
      survey: surveys.find(s => s.id === id)
    });
  };

  handleDeleteSurvey = id => () => {
    this.setState({ deletedSurveyId: id });
  };

  handleCopyLink = event => {
    event.preventDefault();
    this.props.showAlert('success', 'Survey link is copied to your clipboard!');
  };

  cancelDelete = () => {
    this.setState({ deletedSurveyId: null });
  }

  confirmDelete = (id) => {
    this.setState({ deletedSurveyId: null }, () => { this.props.deleteSurveyByIdAction(id); });
  }

  render() {
    const { classes } = this.props;
    const { surveys, isLoading, deletedSurveyId } = this.state;

    return (
      <div>
        {isLoading && <Loading />}
        {<DeletionModal
          openDialog={!!deletedSurveyId}
          closeDialog={this.cancelDelete}
          itemDeleteHandler={this.confirmDelete}
          itemId={deletedSurveyId}
        />}
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardText color="rose">
                  <h4 className={classes.cardTitle}>Assessments</h4>
                </CardText>
                <Link to="/assessments/new">
                  <Button
                    size="sm"
                    className={classes.buttonDisplay}
                  >
                    New Assessment
                  </Button>
                </Link>
              </CardHeader>
              <CardBody>
                {surveys && surveys.length > 0 && (
                  <Paper>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.cellHeaderBold} size="small">No</TableCell>
                          <TableCell className={classes.cellHeaderBold}>Name</TableCell>
                          <TableCell className={classes.cellHeaderBold} align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {surveys.map((survey, index) => (
                          <TableRow key={survey.id} classes={{ root: classes.row }}>
                            <TableCell size="small">{index + 1}</TableCell>
                            <TableCell>{survey.title}</TableCell>
                            <TableCell align="center">
                              <CopyToClipboard text={survey.url}>
                                <Button
                                  simple
                                  justIcon
                                  color="primary"
                                  onClick={this.handleCopyLink}
                                >
                                  <Tooltip
                                    id="tooltip-top"
                                    title="Copy Link"
                                    placement="bottom"
                                    classes={{ tooltip: classes.tooltip }}
                                  >
                                    <InsertLink />
                                  </Tooltip>
                                </Button>
                              </CopyToClipboard>
                              <Button
                                color="success"
                                simple justIcon
                                onClick={this.handleEditSurvey(survey.id)}
                              >
                                <Tooltip
                                  id="tooltip-top"
                                  title="Edit"
                                  placement="bottom"
                                  classes={{ tooltip: classes.tooltip }}
                                >
                                  <Edit />
                                </Tooltip>
                              </Button>
                              <Button
                                onClick={this.handleDeleteSurvey(survey.id)}
                                color="danger"
                                simple
                                justIcon
                              >
                                <Tooltip
                                  id="tooltip-top"
                                  title="Remove"
                                  placement="bottom"
                                  classes={{ tooltip: classes.tooltip }}
                                >
                                  <Delete />
                                </Tooltip>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                )}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

const mapStateToProps = ({ common, surveys, user }) => ({
  isLoading: common.isLoading,
  isError: common.isError,
  errorMessage: common.errorMessage,
  surveys: surveys.surveys,
  isDeletedSurveyById: surveys.isDeletedSurveyById,
  userDetail: user.userDetail
});

export default connect(
  mapStateToProps,
  {
    setSurveysAction,
    deleteSurveyByIdAction,
    resetSurveyStatus,
    showAlert
  },
)(withStyles(
  theme => ({
    ...tableStyle(theme),
    ...listPageStyle,
  }), { withTheme: true }
)(Survey));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'components/Loading/Loading';
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
import { setSurveysAction, deleteSurveyByIdAction, resetSurveyStatus } from '../../actions/surveys';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

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
  };

  componentDidMount() {
    const { setSurveysAction: setSurveys } = this.props;
    setSurveys();
  }

  componentDidUpdate(prevProps) {
    const {
      setSurveysAction: setSurveys,
      resetSurveyStatus: resetSurveyStatusAction,
    } = this.props;
    const { isDeletedSurveyById } = prevProps;
    const { isDeletedSurveyById: cachedIsDeletedSurveyById } = this.state;
    if (cachedIsDeletedSurveyById && cachedIsDeletedSurveyById !== isDeletedSurveyById) {
      resetSurveyStatusAction();
      setSurveys();
    }
  }

  handleEditSurvey = id => () => {
    console.log('Edit Survey', id);
  };

  handleDeleteSurvey = id => () => {
    const { deleteSurveyByIdAction: deleteSurveyById } = this.props;
    const { surveys } = this.state;
    const newSurveys = surveys.filter(survey => survey.id !== id);
    this.setState({ surveys: newSurveys }, () => deleteSurveyById(id));
  };

  render() {
    const { classes } = this.props;
    const { surveys, isLoading } = this.state;

    return (
      <div>
        {isLoading && <Loading />}
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
                { surveys && surveys.length > 0 && (
                  <Paper>
                    <Table aria-labelledby="businessCategories">
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.cellHeaderBold} padding="dense">No</TableCell>
                          <TableCell className={classes.cellHeaderBold}>Name</TableCell>
                          <TableCell className={classes.cellHeaderBold} align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {surveys.map((survey, index) => (
                          <TableRow key={survey.id} classes={{ root: classes.row }}>
                            <TableCell padding="dense">{index + 1}</TableCell>
                            <TableCell>{survey.title}</TableCell>
                            <TableCell align="center">
                              <Tooltip
                                id="tooltip-top"
                                title="Edit"
                                placement="bottom"
                                classes={{ tooltip: classes.tooltip }}
                              >
                                <Button
                                  color="success"
                                  simple justIcon
                                  onClick={this.handleEditSurvey(survey.id)}
                                >
                                  <Edit className={classes.underChartIcons} />
                                </Button>
                              </Tooltip>
                              <Tooltip
                                id="tooltip-top"
                                title="Remove"
                                placement="bottom"
                                classes={{ tooltip: classes.tooltip }}
                              >
                                <Button
                                  onClick={this.handleDeleteSurvey(survey.id)}
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
                )}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

const mapStateToProps = ({ common, surveys }) => ({
  isLoading: common.isLoading,
  isError: common.isError,
  errorMessage: common.errorMessage,
  surveys: surveys.surveys,
  isDeletedSurveyById: surveys.isDeletedSurveyById,
});

export default connect(
  mapStateToProps,
  {
    setSurveysAction,
    deleteSurveyByIdAction,
    resetSurveyStatus,
  },
)(withStyles(
  theme => ({
    ...tableStyle(theme),
    ...listPageStyle,
  }), {withTheme: true}
)(Survey));

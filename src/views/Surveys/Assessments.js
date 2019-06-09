import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'components/Loading/Loading';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import tableStyle from "../../assets/jss/material-dashboard-pro-react/components/tableStyle";
import listPageStyle from "../../assets/jss/material-dashboard-pro-react/views/listPageStyle";
import Card from "../../components/Card/Card.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from '../../components/Card/CardBody';
import { setSurveysAction } from '../../actions/surveys';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";

class Survey extends Component {
  static getDerivedStateFromProps(props, state) {
    const {
      isLoading,
      isError,
      errorMessage,
      surveys,
    } = props;
    const {
      isLoading: cachedLoading,
      isError: cachedError,
      errorMessage: cachedErrorMessage,
      surveys: cachedSurveys,
    } = state;
    if (
      isLoading !== cachedLoading
      || isError !== cachedError
      || errorMessage !== cachedErrorMessage
      || surveys !== cachedSurveys
    ) {
      return {
        isLoading,
        isError,
        errorMessage,
        surveys,
      };
    }

    return null;
  }

  state = {
    isLoading: false,
    isError: false,
    errorMessage: '',
    surveys: null,
  };

  componentDidMount() {
    const { setSurveysAction: setSurveys } = this.props;
    setSurveys();
  }

  handleNewSurvey = () => {
    console.log('new Survey');
  };

  handleEditSurvey = id => () => {
    console.log('Edit Survey', id);
  };

  handleDeleteSurvey = id => () => {
    console.log('handle delete Survey', id);
  };

  render() {
    const { classes } = this.props;
    const { surveys, isLoading } = this.state;
    console.log('surveys in the render surveys: ', surveys);
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
                <Button
                  size="sm"
                  className={classes.buttonDisplay}
                  onClick={this.handleNewSurvey}
                >
                  New Assessment
                </Button>
              </CardHeader>
              <CardBody>
                { surveys && (
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
});

export default connect(
  mapStateToProps,
  {
    setSurveysAction,
  },
)(withStyles(
  theme => ({
    ...tableStyle(theme),
    ...listPageStyle,
  }), {withTheme: true}
)(Survey));

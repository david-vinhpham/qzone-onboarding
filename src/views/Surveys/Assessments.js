import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'components/Loading/Loading';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import tableStyle from "../../assets/jss/material-dashboard-pro-react/components/tableStyle";
import Search from "@material-ui/icons/Search";
import listPageStyle from "../../assets/jss/material-dashboard-pro-react/views/listPageStyle";
import Card from "../../components/Card/Card.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";import { setSurveysAction } from '../../actions/surveys';

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
                <div>
                  <CustomInput
                    formControlProps={{
                      className: classes.top + " " + classes.search
                    }}
                    inputProps={{
                      placeholder: "Search",
                      inputProps: {
                        "aria-label": "Search",
                        className: classes.searchInput
                      }
                    }}
                  />
                  <Button
                    color="white"
                    aria-label="edit"
                    justIcon
                    round>
                    <Search />
                  </Button>
                </div>
                <Button
                  size="sm"
                  className={classes.buttonDisplay}
                  onClick={this.handleNewSurvey}
                >
                  New Assessment
                </Button>
              </CardHeader>
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
)
(Survey));

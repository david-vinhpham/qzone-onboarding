import React from 'react';
import { func, objectOf, any } from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Poll } from '@material-ui/icons';
import withStyles from '@material-ui/core/styles/withStyles';
import validationFormStyle from 'assets/jss/material-dashboard-pro-react/modules/validationFormStyle';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardIcon from '../../components/Card/CardIcon';
import CardBody from '../../components/Card/CardBody';
import SurveyForm from './SurveyForm';

class CreateAssessment extends React.Component {
  static propTypes = {
    classes: objectOf(any).isRequired,
    history: objectOf(any).isRequired,
    createSurvey: func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      surveyInfo: {
        userId: '',
        title: '',
        description: '',
        logo: '',
        privacy: false,
        survey: '',
      },
      titleState: '',
      descriptionState: '',
      mode: 'create',
    };
  }

  handleChangeField = (event, stateName) => {
    if (isEmpty(event.target.value)) {
      this.setState({ [`${stateName}State`]: 'error' });
    } else {
      this.setState({ [`${stateName}State`]: 'success' });
    }
    const { surveyInfo } = this.state;
    surveyInfo[stateName] = (event.target.value || event.target.checked);
    this.setState({ surveyInfo });
  };

  changeQuestions = (newSurvey) => {
    const { createSurvey: createSurveyAction, history } = this.props;
    const { surveyInfo } = this.state;
    const { title, description } = surveyInfo;

    if (!isEmpty(title) && !isEmpty(description)) {
      createSurveyAction({
        ...surveyInfo,
        survey: JSON.stringify(newSurvey),
      });
    } else {
      this.setState(oldState => ({
        titleState: isEmpty(title) ? 'error' : 'success',
        descriptionState: isEmpty(description) ? 'error' : 'success',
        surveyInfo: { ...oldState.surveyInfo, survey: newSurvey },
      }));
    }
  };

  render() {
    const { classes } = this.props;
    const {
      surveyInfo, titleState, descriptionState, mode,
    } = this.state;
    const survey = {
      surveyInfo, titleState, descriptionState, mode,
    };

    return (
      <>
        <Card>
          <CardHeader color="rose" text>
            <CardIcon color="rose">
              <Poll />
            </CardIcon>
            <h3 className={classes.cardIconTitle}>New Assessment</h3>
            <Link to="/assessments" className={classes.linkDisplay}>
              <u>Cancel</u>
            </Link>
          </CardHeader>
          <CardBody>
            <SurveyForm
              survey={survey}
              change={this.handleChangeField}
              classes={classes}
              changeQuestions={this.changeQuestions}
            />
          </CardBody>
        </Card>
      </>
    );
  }
}

export default compose(
  withStyles(validationFormStyle),
  connect(null, { createSurvey: () => {console.log('create survey')} }),
)(CreateAssessment);

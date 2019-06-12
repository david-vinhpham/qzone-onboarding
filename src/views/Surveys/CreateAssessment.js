import React from 'react';
import { func, objectOf, any, arrayOf } from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isEmpty, get } from 'lodash';
import { Poll } from '@material-ui/icons';
import { saveSurveyAction } from '../../actions/surveys';
import { fetchTmpServices } from '../../actions/tmpServices';
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
    saveSurveyAction: func.isRequired,
    fetchTmpServices: func.isRequired,
    user: objectOf(any).isRequired,
    temporaryServices: arrayOf(any).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      surveyInfo: {
        userId: '',
        title: '',
        description: '',
        logo: '',
        privacy: true,
        survey: '',
        tempServiceId: '',
      },
      titleState: '',
      descriptionState: '',
      mode: 'create',
    };
  }

  componentDidMount() {
    const { user, fetchTmpServices: fetchTmpServicesAction, history } = this.props;
    const businessId = get(user, 'userDetails.userSub') || localStorage.getItem('userSub');
    if (!businessId) {
      history.push('/assessments');
    } else {
      fetchTmpServicesAction(businessId);
    }
  }

  handleChangeField = (event, stateName) => {
    const { surveyInfo } = this.state;
    if (event) event.preventDefault();
    if (isEmpty(event.target.value)) {
      this.setState({ [`${stateName}State`]: 'error' });
    } else {
      this.setState({ [`${stateName}State`]: 'success' });
    }
    surveyInfo[stateName] = (event.target.value || event.target.checked);
    this.setState({ surveyInfo });
  };

  handleSaveSurvey = (newSurvey) => {
    const { saveSurveyAction: saveSurvey, user, history } = this.props;
    const { surveyInfo } = this.state;
    const { title, description, tempServiceId } = surveyInfo;
    const userId = get(user, 'userDetails.userSub') || localStorage.getItem('userSub');
    if (!isEmpty(title) && !isEmpty(description) && !isEmpty(tempServiceId) && !isEmpty(userId)) {
      saveSurvey({
        ...surveyInfo,
        survey: JSON.stringify(newSurvey),
        userId,
        tempServiceId,
        url: '',
      });
    } else {
      this.setState(oldState => ({
        titleState: isEmpty(title) ? 'error' : 'success',
        descriptionState: isEmpty(description) ? 'error' : 'success',
        tempServiceIdState: isEmpty(tempServiceId) ? 'error' : 'success',
        surveyInfo: { ...oldState.surveyInfo, survey: newSurvey },
      }));
    }
  };

  render() {
    const { classes, user, temporaryServices } = this.props;
    const {
      surveyInfo, titleState, descriptionState, mode, tempServiceIdState,
    } = this.state;
    const survey = {
      surveyInfo, titleState, descriptionState, mode, tempServiceIdState,
    };

    console.log('userInfo ', user);
    console.log('temporaryServices, ', temporaryServices);
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
              onSave={this.handleSaveSurvey}
              services={temporaryServices}
            />
          </CardBody>
        </Card>
      </>
    );
  }
}

const mapStateToProps = ({ user, tmpServices }) => ({
  user,
  temporaryServices: tmpServices.list,
});

export default compose(
  withStyles(validationFormStyle),
  connect(mapStateToProps, { saveSurveyAction, fetchTmpServices }),
)(CreateAssessment);

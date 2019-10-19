import React from 'react';
import { func, objectOf, any } from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isEmpty, get } from 'lodash';
import { Poll } from '@material-ui/icons';
import { saveSurveyAction, resetSurveyStatus, editSurveyAction } from '../../actions/surveys';
import withStyles from '@material-ui/core/styles/withStyles';
import validationFormStyle from 'assets/jss/material-dashboard-pro-react/modules/validationFormStyle';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardIcon from '../../components/Card/CardIcon';
import CardBody from '../../components/Card/CardBody';
import SurveyForm from './SurveyForm';
import { Button } from '@material-ui/core';
import { fetchOrganizationsOptionByBusinessAdminId } from 'actions/organizationOptions';
import { historyType } from 'types/global';

class CreateAssessment extends React.Component {
  static propTypes = {
    classes: objectOf(any).isRequired,
    history: historyType.isRequired,
    saveSurveyAction: func.isRequired,
    resetSurveyStatus: func.isRequired,
    user: objectOf(any).isRequired,
    isSavedSurvey: objectOf(any),
  };

  static defaultProps = {
    isSavedSurvey: null,
  };

  static getDerivedStateFromProps(props, state) {
    const {
      isSavedSurvey,
    } = props;
    const {
      isSavedSurvey: cachedIsSavedSurvey,
    } = state;
    if (isSavedSurvey !== cachedIsSavedSurvey) {
      return {
        isSavedSurvey,
      };
    }

    return null;
  }

  constructor(props) {
    super(props);

    const { location: { state } } = props.history;
    let surveyInfo = {
      userId: '',
      title: '',
      description: '',
      orgId: '',
      privacy: true,
      survey: '',
    };
    let titleState = '';
    let descriptionState = '';
    let mode = 'create';

    if (state && state.survey) {
      surveyInfo = { ...state.survey, survey: JSON.parse(state.survey.survey) };
      titleState = 'success';
      descriptionState = 'success';
      mode = 'edit';
    }

    this.state = {
      surveyInfo,
      titleState,
      descriptionState,
      mode,
      isSavedSurvey: null,
    };
  }

  componentDidMount() {
    const userId = get(this.props.user, 'userDetail.userSub', localStorage.getItem('userSub'));
    this.props.fetchOrganizationsOptionByBusinessAdminId(userId);
  }

  componentDidUpdate(prevProps) {
    const { history, resetSurveyStatus: resetSurveyStatusAction } = prevProps;
    const { isSavedSurvey } = this.state;
    if (isSavedSurvey && isSavedSurvey.url !== '') {
      history.push('/assessments');
      resetSurveyStatusAction();
    }
  }

  handleChangeField = (event, stateName) => {
    if (event) event.preventDefault();

    const value = event.target.value;
    const checked = event.target.checked;
    this.setState((oldState) => ({
      [`${stateName}State`]: isEmpty(value) ? 'error' : 'success',
      surveyInfo: {
        ...oldState.surveyInfo,
        [stateName]: value || checked
      }
    }));
  };

  handleSaveSurvey = (newSurvey) => {
    const { saveSurveyAction: saveSurvey, user, editSurveyAction: editSurvey, organizationOptions } = this.props;
    const { surveyInfo, mode } = this.state;
    const { title, description } = surveyInfo;
    const userId = get(user, 'userDetail.userSub', localStorage.getItem('userSub'));
    if (!isEmpty(title) && !isEmpty(description) && !isEmpty(userId) && organizationOptions.length > 0) {
      const orgId = organizationOptions[0].value;

      if (mode === 'create') {
        saveSurvey({
          ...surveyInfo,
          survey: JSON.stringify(newSurvey),
          userId,
          orgId,
          url: '',
        });
      }

      if (mode === 'edit') {
        editSurvey({
          ...surveyInfo,
          survey: JSON.stringify(newSurvey),
          orgId,
        });
      }
    } else {
      this.setState(oldState => ({
        titleState: isEmpty(title) ? 'error' : 'success',
        descriptionState: isEmpty(description) ? 'error' : 'success',
        surveyInfo: { ...oldState.surveyInfo, survey: newSurvey },
      }));
    }
  };

  render() {
    const { classes, organizationOptions, history } = this.props;
    const {
      surveyInfo, titleState, descriptionState, mode,
    } = this.state;
    const survey = {
      surveyInfo, titleState, descriptionState, mode,
    };

    return (
      <Card>
        <CardHeader color="rose" text>
          <CardIcon color="rose">
            <Poll />
          </CardIcon>
          <h3 className={classes.cardIconTitle}>New Assessment</h3>
          <Link to="/assessments" className={classes.linkDisplay}>
            <Button color="secondary">Cancel</Button>
          </Link>
        </CardHeader>
        <CardBody>
          <SurveyForm
            survey={survey}
            change={this.handleChangeField}
            classes={classes}
            onSave={this.handleSaveSurvey}
            organizationOptions={organizationOptions}
            history={history}
          />
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = ({ user, surveys, options }) => ({
  user,
  isSavedSurvey: surveys.isSavedSurvey,
  organizationOptions: options.organization.orgOptions,
});

export default compose(
  withStyles(validationFormStyle),
  connect(mapStateToProps, {
    saveSurveyAction,
    resetSurveyStatus,
    editSurveyAction,
    fetchOrganizationsOptionByBusinessAdminId
  }),
)(CreateAssessment);

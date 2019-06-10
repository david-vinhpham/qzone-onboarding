import React from 'react';
import { objectOf, any, func, arrayOf, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  FormLabel, Select, MenuItem, FormControl,
} from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import CustomInput from 'components/CustomInput/CustomInput';
import CustomCheckbox from 'components/CustomCheckbox/CustomCheckbox';
import validationFormStyle from 'assets/jss/material-dashboard-pro-react/modules/validationFormStyle';
import SurveyEditor from './SurveyEditor';
import Assessor from './Assessor';
import withStyles from '@material-ui/core/styles/withStyles';

let editor = false;
class SurveyForm extends React.Component {
  static propTypes = {
    fetchUserTypeList: func.isRequired,
    AssessorList: arrayOf(object).isRequired,
    classes: objectOf(any).isRequired,
    survey: objectOf(object).isRequired,
    change: func.isRequired,
    changeQuestions: func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      userType: 'ASSESSOR',
      token: '',
      assessorList: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ assessorList: nextProps.AssessorList });
  }

  reloadAssessorList = () => {
    const { fetchUserTypeList: fetchUserTypeListAction } = this.props;
    fetchUserTypeListAction(this.state);
  };

  render() {
    const {
      classes, survey, change, changeQuestions,
    } = this.props;
    const { assessorList } = this.state;
    const {
      surveyInfo, titleState, descriptionState, mode,
    } = survey;
    if (mode === 'create' || surveyInfo.survey) { editor = true; }
    if (!assessorList) { return <div />; }
    return (
      <form>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              *Title
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={7}>
            <CustomInput
              labelText="Title"
              success={titleState === 'success'}
              value={surveyInfo.title || ''}
              error={titleState === 'error'}
              id="title"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                onChange: event => change(event, 'title', 'title'),
                type: 'text',
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              *Description
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={7}>
            <CustomInput
              labelText="Description"
              id="description"
              success={descriptionState === 'success'}
              error={descriptionState === 'error'}
              value={surveyInfo.description || ''}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                onChange: event => change(event, 'description'),
                type: 'text',
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              Assessor
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={7}>
            <FormControl
              fullWidth
              className={classes.selectFormControl}
            >
              <Select
                value={surveyInfo.userId || ''}
                onChange={event => change(event, 'userId')}
                classes={{ select: classes.select }}
                style={{ paddingTop: '20px' }}
              >
                {(assessorList).map(assessor => (
                  <MenuItem
                    key={assessor.id}
                    value={assessor.id}
                  >
                    {assessor.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem>
            <Assessor classes={classes} reloadAssessorList={this.reloadAssessorList} />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              Logo
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={7}>
            <CustomInput
              id="logo"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                onChange: event => change(event, 'logo'),
                type: 'file',
              }}
              style={{ paddingTop: '20px' }}

            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel
              className={
                `${classes.labelHorizontal
                } ${
                  classes.labelHorizontalRadioCheckbox}`
              }
            >
              Privacy
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={7}>
            <CustomCheckbox
              value=""
              checked={surveyInfo.privacy || false}
              label=""
              onClick={event => change(event, 'privacy')}
              classes={classes}
            />
          </GridItem>
        </GridContainer>

        <hr />
        <GridContainer>
          {editor && <SurveyEditor change={changeQuestions} data={surveyInfo.survey} />}
        </GridContainer>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { AssessorList: state.user.userTypeList };
}

export default compose(
  withStyles(validationFormStyle),
  connect(mapStateToProps, { fetchUserTypeList: () => {} }),
)(SurveyForm);

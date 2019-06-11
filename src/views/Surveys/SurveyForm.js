import React, { Component } from 'react';
import { objectOf, any, func, arrayOf, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  FormLabel, Select, MenuItem, FormControl,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomCheckbox from '../../components/CustomCheckbox/CustomCheckbox';
import validationFormStyle from 'assets/jss/material-dashboard-pro-react/modules/validationFormStyle';
import SurveyEditor from './SurveyEditor';

let editor = false;
class SurveyForm extends Component {
  static propTypes = {
    fetchUserTypeList: func.isRequired,
    // AssessorList: arrayOf(object).isRequired,
    classes: objectOf(any).isRequired,
    survey: objectOf(any).isRequired,
    change: func.isRequired,
    changeQuestions: func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      userType: 'ASSESSOR',
    };
  }

  render() {
    const {
      classes, survey, change, changeQuestions,
    } = this.props;
    const {
      surveyInfo, titleState, descriptionState, mode,
    } = survey;
    if (mode === 'create' || surveyInfo.survey) { editor = true; }
    return (
      <form>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              Title*
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={7}>
            <CustomInput
              success={titleState === 'success'}
              value={surveyInfo.title || ''}
              error={titleState === 'error'}
              id="title"
              onChange={event => change(event, 'title')}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: 'text',
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              Description*
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={7}>
            <CustomInput
              id="description"
              success={descriptionState === 'success'}
              error={descriptionState === 'error'}
              value={surveyInfo.description || ''}
              onChange={event => change(event, 'description')}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: 'text',
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              Logo*
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
              Privacy*
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

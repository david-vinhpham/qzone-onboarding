import React, { Component } from 'react';
import { objectOf, any, func } from 'prop-types';
import { FormLabel } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import CustomInput from '../../components/CustomInput/CustomInput';
import validationFormStyle from 'assets/jss/material-dashboard-pro-react/modules/validationFormStyle';
import SurveyEditor from './SurveyEditor';

let editor = false;
class SurveyForm extends Component {
  static propTypes = {
    classes: objectOf(any).isRequired,
    survey: objectOf(any).isRequired,
    change: func.isRequired,
    onSave: func.isRequired,
  };

  render() {
    const {
      classes, survey, change, onSave,
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
          {editor && <SurveyEditor onSave={onSave} data={surveyInfo.survey} />}
        </GridContainer>
      </form>
    );
  }
}

export default withStyles(validationFormStyle)(SurveyForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'components/Loading/Loading';
import { setSurveysAction } from '../../actions/surveys';

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


  render() {
    const { surveys } = this.state;
    console.log('surveys in the render surveys: ', surveys);
    return (
      <div>

        SURVEY App
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
  }
)(Survey);

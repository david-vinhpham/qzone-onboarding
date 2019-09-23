import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import 'chartist-plugin-tooltips';
import 'chartist-plugin-axistitle';
import { surveyType, userDetailType } from 'types/global';
import { sortBy } from 'lodash';
import { setSurveysAction } from 'actions/surveys';
import { Select, MenuItem, Card, CardContent, CardActions, FormControl, InputLabel } from '@material-ui/core';
import styles from './ChartBoard.module.scss';
import 'chartist/dist/chartist.min.css';
import { getChartBySurveyId } from 'actions/chart';

class ChartBoard extends PureComponent {
  static defaultProps = {
    chartData: null,
    surveys: null,
  };

  static propTypes = {
    chartData: PropTypes.objectOf(PropTypes.any),
    setSurveysAction: PropTypes.func.isRequired,
    surveys: PropTypes.arrayOf(surveyType),
    getChartBySurveyId: PropTypes.func.isRequired,
    userDetail: userDetailType.isRequired
  };

  constructor(props) {
    super(props);

    this.chartProps = {
      options: {
        seriesBarDistance: 10,
        stackBars: false,
        axisX: {
          showGrid: true,
        },
        axisY: {
          showGrid: true,
          scaleMinSpace: 100,
        },
        chartPadding: {
          bottom: 30
        },
        stretch: true,
        plugins: [
          Chartist.plugins.tooltip({
            class: styles.chartToolTip,
          }),
          Chartist.plugins.ctAxisTitle({
            axisX: {
              axisTitle: 'Questions',
              axisClass: styles.axisTitle,
              offset: {
                x: 0,
                y: 50
              },
            },
            axisY: {
              axisTitle: 'Answers',
              axisClass: styles.axisTitle,
            }
          }),
        ],
      },
      animation: {
        draw(data) {
          if (data.type === 'bar') {
            data.element.animate({
              opacity: {
                begin: (data.index + 1) * 80,
                dur: 500,
                from: 0,
                to: 1,
                easing: 'ease',
              },
            });
          }
        },
      },
    };
    this.state = {
      chart: null,
      selectedSurvey: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    let newState = null;

    if (props.chartData) {
      const { chartData: { chartBars } } = props;
      const labels = [];
      const series = [];
      let queSorted = {};

      if (chartBars) {
        const queResult = {};
        chartBars.map((chart) => {
          const { question, listSelectedItems } = chart;
          queResult[question.replace(/[^0-9]/g, '')] = listSelectedItems;
          queSorted = sortBy(queResult, 'question');
          return chart;
        });
      }

      const queKeys = Object.keys(queSorted);
      if (queKeys.length) {
        queKeys.map((question, qInd) => {
          labels.push(`Q${question}`);
          queSorted[question].map((item, ind) => {
            const { questionItem, numSelected } = item;
            series[ind] = series[ind] ? [...series[ind]] : [];
            series[ind][qInd] = { meta: questionItem, value: numSelected };
            return numSelected;
          });
          return question;
        });
      }

      newState = {
        chart: {
          labels: labels.length === 0 ? null : labels,
          series: series.length === 0 ? null : series,
        },
      };
    }

    return newState;
  }

  componentDidMount() {
    this.props.setSurveysAction(this.props.userDetail.id);
  }

  componentDidUpdate() {
    if (!this.state.selectedSurvey && this.props.surveys && this.props.surveys.length > 0) {
      this.setState(
        { selectedSurvey: this.props.surveys[0] },
        () => {
          this.props.getChartBySurveyId(this.props.surveys[0].id);
        }
      );
    }
  }

  onChangeSurvey = (e) => {
    const selectedSurvey = e.target.value;
    this.setState({ selectedSurvey });
    this.props.getChartBySurveyId(selectedSurvey.id);
  }

  render() {
    const { surveys } = this.props;
    const { selectedSurvey, chart } = this.state;

    if (!surveys) return null;

    return (
      <Card classes={{ root: styles.container }}>
        <CardActions>
          <FormControl classes={{ root: styles.selectSurveyForm }}>
            <InputLabel htmlFor="select-survey">Survey</InputLabel>
            <Select
              value={selectedSurvey}
              onChange={this.onChangeSurvey}
              inputProps={{ id: 'select-survey' }}
            >
              {surveys.map(survey => (
                <MenuItem value={survey} key={survey.id}>
                  {survey.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardActions>
        <CardContent>
          {!!chart && <ChartistGraph
            type="Bar"
            className="ct-bar ct-major-twelfth"
            data={chart}
            options={this.chartProps.options}
            listener={this.chartProps.animation}
          />}
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  chartData: state.chart.data,
  surveys: state.surveys.surveys,
  userDetail: state.user.userDetail
});

export default connect(mapStateToProps, { setSurveysAction, getChartBySurveyId })(ChartBoard);

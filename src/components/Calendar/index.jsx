import React from 'react';
import { arrayOf, any, func, string, bool } from 'prop-types';
import moment from 'moment';
import Scheduler, { SchedulerData, ViewTypes, DATETIME_FORMAT } from 'react-big-scheduler';
import ReactResizeDetector from 'react-resize-detector';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import produce from 'immer';

import withDnDContext from 'hoc/withDnDContext';
import 'react-big-scheduler/lib/css/style.css';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    const viewModel = new SchedulerData(
      moment().format(DATETIME_FORMAT),
      ViewTypes.Week,
      false,
      false,
      {
        resourceName: 'Providers',
        ...(props.highlightWeekend
          ? {}
          : {
              nonWorkingTimeHeadColor: 'inherit',
              nonWorkingTimeHeadBgColor: 'transparent',
              nonWorkingTimeBodyBgColor: 'transparent'
            }),
        views: [
          {
            viewName: 'Day',
            viewType: ViewTypes.Day,
            showAgenda: false,
            isEventPerspective: false
          },
          {
            viewName: 'Week',
            viewType: ViewTypes.Week,
            showAgenda: false,
            isEventPerspective: false
          },
          {
            viewName: 'Month',
            viewType: ViewTypes.Month,
            showAgenda: false,
            isEventPerspective: false
          }
        ]
      }
    );

    viewModel.setResources(props.resources);
    viewModel.setEvents(props.events);

    this.state = {
      viewModel
    };
  }

  static getDerivedStateFromProps({ resources, events }, { viewModel }) {
    viewModel.setResources(resources);
    viewModel.setEvents(events);
    return { viewModel };
  }

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    this.setState({ viewModel: schedulerData });
  };

  onPrevClick = schedulerData => {
    schedulerData.prev();
    this.setState({ viewModel: schedulerData });
  };

  onNextClick = schedulerData => {
    schedulerData.next();
    this.setState({ viewModel: schedulerData });
  };

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    this.setState({ viewModel: schedulerData });
  };

  onCalendarResize = width => {
    this.setState(oldState =>
      produce(oldState, draftState => {
        draftState.viewModel.config.schedulerWidth = width;
      })
    );
  };

  rightCustomHeader = () => (
    <Button
      variant="outlined"
      style={{ color: 'white', backgroundColor: '#108ee9' }}
      onClick={this.props.onClickNewEventButton}
    >
      <Add style={{ height: '16px', width: '16px', marginBottom: '2px' }} />
      {this.props.newEventLabel}
    </Button>
  );

  render() {
    return (
      <div style={{ padding: '8px 16px', backgroundColor: 'white' }}>
        <ReactResizeDetector handleWidth handleHeight onResize={this.onCalendarResize}>
          <Scheduler
            schedulerData={this.state.viewModel}
            prevClick={this.onPrevClick}
            nextClick={this.onNextClick}
            onSelectDate={this.onSelectDate}
            onViewChange={this.onViewChange}
            newEvent={this.props.onClickNewEvent}
            eventItemTemplateResolver={this.props.stickerTemplate}
            eventItemPopoverTemplateResolver={this.props.popoverTemplate}
            rightCustomHeader={this.rightCustomHeader()}
          />
        </ReactResizeDetector>
      </div>
    );
  }
}

Calendar.propTypes = {
  resources: arrayOf(any),
  events: arrayOf(any),
  stickerTemplate: func,
  popoverTemplate: func,
  onClickNewEvent: func,
  onClickNewEventButton: func,
  newEventLabel: string,
  highlightWeekend: bool
};

Calendar.defaultProps = {
  resources: [],
  events: [],
  stickerTemplate: undefined,
  popoverTemplate: undefined,
  onClickNewEvent: () => {},
  onClickNewEventButton: () => {},
  newEventLabel: 'New Event',
  highlightWeekend: false
};

export default withDnDContext(Calendar);

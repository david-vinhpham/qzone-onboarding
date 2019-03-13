import React from "react";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
import withStyles from "@material-ui/core/styles/withStyles";
import CalendarStyle from '../../assets/scss/material-dashboard-pro-react/views/calendarStyle.css';
import '../../../node_modules/fullcalendar/dist/fullcalendar.min.css';
import FullCalendar from 'fullcalendar-reactwrapper';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import buttonStyle from "../../assets/jss/material-dashboard-pro-react/components/buttonStyle.jsx";
import {createEvent, fetchEventsCalendarByProviderId} from "../../actions/events";
import {fetchProvidersOptionByBusinessAdminId} from "../../actions/provider";
import {connect} from 'react-redux';
import {FormControl, FormLabel} from "@material-ui/core";
import {css} from "@emotion/core";
import {ClipLoader} from "react-spinners";
import Select from 'react-select';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;


class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'agendaWeek',
      alert: null,
      providerOption: null,
      events: []
    };

    this.handleProviderChange = this.handleProviderChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ events: nextProps.events })
  }

  componentDidMount() {
    let businessAdminId = localStorage.getItem('userSub');
    this.props.fetchProvidersOptionByBusinessAdminId(businessAdminId);
  }
  handleProviderChange(selectedOption) {
    this.setState({ providerOption: selectedOption });
    this.props.fetchEventsCalendarByProviderId(selectedOption.value);
  }
  addNewEventAlert(startDate, endDate, jsEvent, view) {
    console.log('addNewEventAlert');
    this.setState({
      view: view.type,
      alert: (
        <SweetAlert
          input
          showCancel
          style={{ display: "block", marginTop: "-100px" }}
          title="Input something"
          onConfirm={e => this.addNewEvent(e, startDate, endDate)}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
        />
      )
    });
  }

  addNewEvent(e, startDate, endDate) {
    console.log(e, startDate, endDate);
    // var newEvents = this.state.events;
    // newEvents.push({
    //   title: e,
    //   start: startDate,
    //   end: endDate
    // });
    // this.setState({
    //   alert: null,
    //   events: newEvents
    // });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }

  eventRendering(event, element) {
    console.log("over here------", event)
    console.log(element);
    if (event.source.rendering === 'background') {
      console.log("event", event)
      element.append(event.title);
    }
  }
  handleDrop = (eventObj, date) => {
    console.group('onDrop');
    console.log('date');
    console.dir(date);
    console.groupEnd();
  };

  handleSelect = (start, end, allDay) => {
    console.group('select');
    console.log('start');
    console.dir(start);
    console.dir('end');
    console.dir(end);
    console.groupEnd();
  };

  handleClick = (calEvent, jsEvent, view) => {
    console.group('click');
    console.log('calEvent');
    console.dir(calEvent);
    console.groupEnd();
  };

  dayClick = (date, jsEvent, view) => {
    console.log('dateClick');
    alert('Clicked on: ' + date.format());
  };

  handleChangeView = view => e => {
    e.preventDefault();
    this.setState({
      view: view.name
    });
  };

  render() {
    const {classes, providers, fetchEventsLoading, fetchEventsError } = this.props;
    const { providerOption, events } = this.state;
    let providerOptions = [];
    if(providers && providers.length > 0) {
      providerOptions = providers;
    }
    if (fetchEventsLoading)
      return < ClipLoader
        className={override}
        sizeUnit={"px"}
        size={150}
        color={'#123abc'}
        loading={fetchEventsLoading}
      />;
    else if (fetchEventsError) {
      return <div className="alert alert-danger">Error: {events}</div>
    }

    return (
      <div className="row">
        <div className="col-md-10 ml-auto mr-auto">
          <div className="card card-calendar">
            {this.state.alert}
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={10}>
                <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Service Providers
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={8} sm={4} >
                    <FormControl

                      fullWidth
                      className={classes.selectFormControl}>
                      <Select
                        options={providerOptions}
                        value={ providerOption}
                        onChange={this.handleProviderChange}
                      >
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <Card>
                  <CardBody calendar>
                    <FullCalendar
                      id="fullCalendarContainer"
                      header={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay,listMonth'
                      }}
                      contentHeight='auto'
                      //businessHours= {this.state.businessHours}
                      selectConstraint= 'background'
                      defaultView={this.state.view}
                      navLinks={true}
                      editable={true}
                      droppable={true}
                      selectable={true}
                      selectAllow={false}
                      eventLimit={true}
                      nowIndicator={true}
                      events = {events}
                      eventDrop={function(eventBj, date) {
                        console.log('eventDrop function');
                      }}
                      drop={(date, jsEvent, ui, resourceId) => {
                        console.log('drop function');
                      }}
                      select={(start, end, allDay) => {
                        this.handleSelect(start, end, allDay);
                      }}
                      eventClick={(calEvent, jsEvent, view) => {
                        this.handleClick(calEvent, jsEvent, view);
                      }}
                      dayClick={(date, jsEvent, view) => {
                        this.dayClick(date, jsEvent, view);
                      }}
                      eventRender={(event, element) => this.eventRendering(event, element)}
                      dropAccept={true}
                      getView={(view) => this.setState({ view })}
                    />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}
Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    events: state.event.events,
    providers: state.provider.providers,
    fetchProvidersLoading: state.provider.fetchProvidersLoading,
    fetchProvidersError:  state.provider.fetchProvidersError,
    fetchEventsLoading: state.event.fetchEventsLoading,
    fetchEventsError:  state.event.fetchEventsError,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProvidersOptionByBusinessAdminId: (businessAdminId) => dispatch(fetchProvidersOptionByBusinessAdminId(businessAdminId)),
    fetchEventsCalendarByProviderId: (providerId) => dispatch(fetchEventsCalendarByProviderId(providerId)),
    createEvent: (e) => dispatch(createEvent(e))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(buttonStyle, CalendarStyle)(Calendar));

import React from "react";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
import withStyles from "@material-ui/core/styles/withStyles";
import CalendarStyle from '../../assets/scss/material-dashboard-pro-react/views/calendarStyle.css';
import '../../../node_modules/fullcalendar/dist/fullcalendar.min.css';
import FullCalendar from 'fullcalendar-reactwrapper';
//import '../../assets/scss/full-calender.css'
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import buttonStyle from "../../assets/jss/material-dashboard-pro-react/components/buttonStyle.jsx";
import { fetchEvents, createEvent } from "../../actions/events";
import { connect } from 'react-redux';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'agendaWeek',
      alert: null
    };
  }

  componentDidMount() {
    this.props.fetchEvents();
  }

  addNewEventAlert(startDate, endDate, jsEvent, view) {
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
    var newEvents = this.state.events;
    newEvents.push({
      title: e,
      start: startDate,
      end: endDate
    });
    this.setState({
      alert: null,
      events: newEvents
    });
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

  render() {
    const { events, loading, error } = this.props.eventsList;
    //const { breakEvent } = this.props.breakEvent;
    console.log("business hours--------", events);
    if (loading) {
      return <div className="container"><h1>Events</h1><h3>Loading...</h3></div>
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="row">
        <div className="col-md-10 ml-auto mr-auto">
          <div className="card card-calendar">
            {this.state.alert}
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={10}>
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
                      eventLimit={true}
                      nowIndicator={true}
                      //events = {this.state.events}
                      eventRender={(event, element) => this.eventRendering(event, element)}
                      eventSources={[events[0], events[1], events[2], events[3], events[4]]}
                      dropAccept={true}
                      select={(startDate, endDate, jsEvent, view) => this.addNewEventAlert(startDate, endDate, jsEvent, view)}
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
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    eventsList: state.events.eventsList,
    breakEvent: state.events.breakEvent,
    appointmentEvent: state.events.appointmentEvent
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
    createEvent: (e) => dispatch(createEvent(e))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(buttonStyle, CalendarStyle)(Calendar));

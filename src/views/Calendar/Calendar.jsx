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
import {fetchEvents, fetchEventsSuccess, fetchEventsFailure} from "../../actions/events";
import { connect } from 'react-redux';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'month',  
      alert: null,
    };
  }

  componentWillMount(){
    this.props.fetchEvents();
  }

  addNewEventAlert(startDate,endDate,jsEvent,view) {
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

  render() {
    const { events, loading, error } = this.props.eventsList;

    if(loading) {
      return <div className="container"><h1>Events</h1><h3>Loading...</h3></div>      
    } else if(error) {
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
					            id = "fullCalendarContainer"
					            header = {{
					              left: 'prev,next today myCustomButton',
					              center: 'title',
					              right: 'month,agendaWeek,agendaDay,list'
					            }}
					            defaultView= {this.state.view}
					            navLinks= {true} 
					            editable= {true}
					            droppable= {true}
					            selectable= {true}
					            eventLimit= {true} 
                      nowIndicator= {true}
					            events = {events} 
					            dropAccept = {true}
					            select= {(startDate,endDate,jsEvent,view) => this.addNewEventAlert(startDate,endDate,jsEvent,view)}
                      getView= {(view)=> this.setState({view})}
					            
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
    eventsList: state.events.eventsList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => {
      dispatch(fetchEvents()).then((response) => {
            console.log("response from fetchevents",response);
            !response.error ? dispatch(fetchEventsSuccess(response.payload.data)) : dispatch(fetchEventsFailure(response.payload.data));
          });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(buttonStyle,CalendarStyle)(Calendar));

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

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'month',  
      alert: null,
      events: [

                {
                  id: 0,
                  title: 'All Day Event very long title',
                  allDay: true,
                  start: new Date(2018, 6, 6),
                  end: new Date(2018, 6, 7),
                },
                {
                  id: 1,
                  title: 'Long Event',
                  start: new Date(2018, 6, 6),
                },
                {
                  id: 2,
                  title: "Birthday",
                  start: new Date(2018, 6, 30),
                  end: new Date(2018, 6, 31),
                }
              ]
    };
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
					            events = {this.state.events} 
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

export default withStyles(buttonStyle,CalendarStyle)(Calendar);



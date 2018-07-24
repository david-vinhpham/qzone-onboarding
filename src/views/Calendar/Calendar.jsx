import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CalendarStyle from 'assets/scss/material-dashboard-pro-react/views/calendarStyle.css';
import '../../../node_modules/fullcalendar/dist/fullcalendar.min.css';
import FullCalendar from 'fullcalendar-reactwrapper';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@material-ui/core';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open_dialog: false,
      view: 'month',  
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
                }
              ]
    };

    this.onEventSelect = this.onEventSelect.bind(this);
  }

  onEventSelect(start, end) {
    this.setState({
      open_dialog: true,
    });
  }

  handleClose = () => {
    this.setState({
      open_dialog: false
    });
  };

  render() {
    const { open_dialog } = this.state;

    return (
      <div className="row">
        <div className="col-md-10 ml-auto mr-auto">
          <div className="card card-calendar">
            <Dialog open={open_dialog} onClose={this.handleClose}>
              <DialogTitle>Window to Add Event</DialogTitle>
              <DialogContent>
                <DialogContentText>This is demo window and input fields will be added here.</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={this.handleClose}>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
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
					            defaultDate={'2018-07-09'}
					            navLinks= {true} 
					            editable= {true}
					            droppable= {true}
					            selectable= {true}
					            eventLimit= {true} 
					            events = {this.state.events} 
					            dropAccept = {true}
					            select= {this.onEventSelect}
					            
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

export default withStyles(CalendarStyle)(Calendar);



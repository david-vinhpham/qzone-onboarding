import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { RingLoader } from 'react-spinners';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import CardText from "../../components/Card/CardText.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import gridSystemStyle from "../../assets/jss/material-dashboard-pro-react/views/gridSystemStyle.jsx";
import { fetchTemplates } from "../../actions/email_templates";

import { connect } from 'react-redux';


class EmailTemplates extends Component {
  state = {
    togglePanel: {},
  };
  componentDidMount() {
    this.props.fetchTemplates();
  }
  componentWillReceiveProps(nextProps) {
    const { templates } = nextProps;
    let togglePanel = null;
    if (templates.length !== this.props.templates.length) {
      togglePanel = templates.map(template => ({ [template.id]: false }));
    }
    this.setState({ togglePanel });
  }
  expandHandler = (id) => {
    const { togglePanel } = this.state;
    const newTogglePanel = Object.keys(togglePanel).map(keyId => ({ [keyId]: false }));
    this.setState({ ...newTogglePanel, [newTogglePanel[id]]: true });
  };

  render() {
    const { classes, loading, error, templates } = this.props;
    const { togglePanel } = this.state;
    const emailTemplates = loading ? <RingLoader size={30} color="rose" />
      : (<Card>
        <CardHeader color="rose" icon>
          <CardText color="rose">
            <h4 className={classes.cardTitle}>Email Templates</h4>
          </CardText>
        </CardHeader>
        <CardBody>
          { templates.length && templates.map(template => (
            <ExpansionPanel keys={template.id} onChange={() => this.expandHandler(template.id)}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>{template.name}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {template.content}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </CardBody>
      </Card>);
    return (
      <React.Fragment>
        {emailTemplates}
      </React.Fragment>

    );
  }
}

const mapStateToProps = state => ({ templates: state.email.templates, loading: state.email.loading, error: state.email.error });
const mapDispatchToProps = dispatch => ({
  fetchTemplates: () => dispatch(fetchTemplates()),
});

export default withStyles(gridSystemStyle)(connect(mapStateToProps, mapDispatchToProps)(EmailTemplates));

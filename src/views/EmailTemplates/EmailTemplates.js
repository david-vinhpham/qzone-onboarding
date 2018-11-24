import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanelActions } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import CardText from "../../components/Card/CardText.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import gridSystemStyle from "../../assets/jss/material-dashboard-pro-react/views/gridSystemStyle.jsx";
import Loading from '../../components/Loading/Loading';
import { fetchTemplates, updateEmailTemplate, deleteTemplate, resetDeleteStatus } from "../../actions/email_templates";

import { connect } from 'react-redux';
import { restApiResponseCodes } from "../../constants";

class EmailTemplates extends Component {
  state = {
    templates: [],
  };

  componentDidMount() {
    this.props.fetchTemplates();
  }

  componentWillReceiveProps(nextProps) {
    const { templates, loading, deleteStatus, templateIdDeleted } = nextProps;
    let computedTemplates = [];
    if (!loading && templates.length) {
      if (deleteStatus == restApiResponseCodes.success && templateIdDeleted) {
        computedTemplates = templates.slice().filter(template => template.id !== templateIdDeleted);
        this.props.resetDeleteStatus();
        this.props.updateEmailTemplate(computedTemplates);
      } else {
        computedTemplates = templates.slice();
      }
    }
    this.setState({
      templates: computedTemplates,
    });
  }

  deleteTemplateHandler = (id) => {
    this.props.deleteTemplate(id);
  };

  render() {
    const { classes, loading, error, templates } = this.props;
    const templateList = templates.length ? templates.map(template => (
      <ExpansionPanel key={template.id}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography>{template.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {template.content}
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Link to={`/email-templates/edit/${template.id}`}>
            <Button color="rose">Edit</Button>
          </Link>
          <Button onClick={() => this.deleteTemplateHandler(template.id)}>Delete</Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    )) : <Typography variant="display1">There is no email template!</Typography>;
    const emailTemplates = loading ? <Loading />
      : (<Card>
        <CardHeader color="rose" icon>
          <CardText color="rose">
            <h4 className={classes.cardTitle}>Available Templates</h4>
          </CardText>
        </CardHeader>
        <CardBody>
          { templateList }
        </CardBody>
        <CardFooter>
          <Link to={`/email-templates/create`}>
            <Button color="rose">
              New template
            </Button>
          </Link>
        </CardFooter>
      </Card>);
    return (
      <React.Fragment>
        {emailTemplates}
      </React.Fragment>

    );
  }
}

const mapStateToProps = state => ({
  templates: state.email.templates,
  loading: state.email.loading,
  error: state.email.error,
  deleteStatus: state.email.deleteStatus,
  templateIdDeleted: state.email.templateIdDeleted,
});
const mapDispatchToProps = dispatch => ({
  fetchTemplates: () => dispatch(fetchTemplates()),
  deleteTemplate: (id) => dispatch(deleteTemplate(id)),
  resetDeleteStatus: () => dispatch(resetDeleteStatus()),
  updateEmailTemplate: (templates) => dispatch(updateEmailTemplate(templates))
});

export default withStyles(gridSystemStyle)(connect(mapStateToProps, mapDispatchToProps)(EmailTemplates));

import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary} from '@material-ui/core';
import {Link} from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardText from "components/Card/CardText.jsx";
import Button from "components/CustomButtons/Button.jsx";
import gridSystemStyle from "assets/jss/material-dashboard-pro-react/views/gridSystemStyle.jsx";
import Loading from 'components/Loading/Loading';
import CustomModal from 'components/CustomModal/CustomModal';
import {
  deleteTemplate,
  fetchTemplates,
  resetDeleteStatus,
  saveTemplateNameList,
  updateEmailTemplate,
} from "actions/email_templates";

import {connect} from 'react-redux';
import {eTemplateUrl, restApiResponseCodes} from "../../constants";

const styles = () => ({
  inputBox: {
    '&:before, &:after': {
      border: 'none !important',
    }
  },
  contentBox: {
    overflow: 'hidden',
  },
});

class EmailTemplates extends Component {
  state = {
    templates: [],
    isDeleting: false,
    templateIdTobeDeleted: null,
  };

  componentDidMount() {
    this.props.fetchTemplates();
  }

  componentWillReceiveProps(nextProps) {
    const { templates, loading, deleteStatus, templateIdDeleted } = nextProps;
    let computedTemplates = [];
    if (!loading && templates.length) {
      if (deleteStatus === restApiResponseCodes.success && templateIdDeleted) {
        computedTemplates = templates.slice().filter(template => template.id !== templateIdDeleted);
        this.props.resetDeleteStatus();
        this.props.updateEmailTemplate(computedTemplates);
      } else {
        computedTemplates = templates.slice();
      }
    }
    const nameList = computedTemplates.map(template => template.name);
    this.props.saveTemplateNameList(nameList);
    this.setState({
      templates: computedTemplates,
    });
  }

  deleteTemplateHandler = (id) => {
    this.setState({
      isDeleting: true,
      templateIdTobeDeleted: id,
    });
  };

  closeModal = () => {
    this.setState({
      isDeleting: false,
      templateTobeDeleted: null,
    });
  };

  confirmDeletion = () => {
    const { templateIdTobeDeleted } = this.state;
    this.props.deleteTemplate(templateIdTobeDeleted);
    this.setState({
      isDeleting: false,
      templateIdTobeDeleted: null,
    });
  };

  createTemplateHandler = () => {
    const { history } = this.props;
    history.push(`${eTemplateUrl}/create`);
  };

  render() {
    console.log('this.state', this.state);
    const { classes, loading, templates } = this.props;
    const { isDeleting } = this.state;
    const templateList = templates.length ? templates.map(template => (
      <ExpansionPanel key={template.id}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography>{template.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TextField
            id="filled-expansion-template-content"
            value={template.content}
            disabled
            multiline
            fullWidth
            inputProps={{
              className: [classes.inputBox, classes.contentBox]
            }}
          />
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
        <CustomModal
          openModal={isDeleting}
          closeModal={this.closeModal}
          confirmDeletion={this.confirmDeletion}
        />
        <CardHeader color="rose" icon>
          <CardText color="rose">
            <h4 className={classes.cardTitle}>Available Templates</h4>
          </CardText>
        </CardHeader>
        <CardBody>
          { templateList }
        </CardBody>
        <CardFooter>
          <Button onClick={this.createTemplateHandler} color="rose">
            New template
          </Button>
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
  updateEmailTemplate: (templates) => dispatch(updateEmailTemplate(templates)),
  saveTemplateNameList: (list) => dispatch(saveTemplateNameList(list)),
});

export default withStyles({...gridSystemStyle, ...styles()})(connect(mapStateToProps, mapDispatchToProps)(EmailTemplates));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardText from "components/Card/CardText.jsx";
import Button from "components/CustomButtons/Button.jsx";
import gridSystemStyle from "assets/jss/material-dashboard-pro-react/views/gridSystemStyle.jsx";
import { fetchTemplate, cleanTemplateStatus, editTemplate, cleanEditTemplateStatus } from 'actions/email_templates';
import Loading from 'components/Loading/Loading';
import { isDirty } from "../../validation/validation";
import { eTemplateContentMax, eTemplateNameMax, eTemplateUrl } from "../../constants";

const styles = () => ({
  borderLess: {
    '&:before, &:after': {
      border: 'none !important',
    }
  },
  templateBox: {
    border: '1px solid #ccc',
    padding: '0 1em',
  },
  inputBox: {
    overflow: 'hidden',
  },
  contentBox: {
    minHeight: '250px',
  },
});


class EditEmailTemplate extends Component {
    state = {
      editTemplateContent: '',
      editTemplateName: '',
      templateContent: '',
      templateName: '',
      isTemplateTouched: false,
    };

  cancelEditHandler = () => {
    const { history, cleanTemplateStatus } = this.props;
    cleanTemplateStatus();
    history.push(eTemplateUrl);
  };

  changeHandler = (event, type) => {
    this.setState({
      [type]: event.target.value,
      isTemplateTouched: true,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  componentDidMount() {
    const { match } = this.props;
    this.props.fetchTemplate(match.params.id);
  }

  saveTemplateHandler = () => {
    const { match: { params: { id }}, editTemplate } = this.props;
    const { templateName, templateContent } = this.state;
    editTemplate(id, templateName, templateContent);
  };

  componentWillReceiveProps(nextProps) {
    const { templateName, templateContent, isTemplateEdited } = nextProps;
    const { cleanEditTemplateStatus, history } = this.props;
    let newState = {};
    if (!this.state.isTemplateTouched) {
      newState.editTemplateName = templateName;
      newState.editTemplateContent = templateContent;
    }
    if (isTemplateEdited) {
      cleanEditTemplateStatus();
      history.push(eTemplateUrl);
    }
    this.setState({ ...newState, templateName, templateContent });
  }

  render() {
    const { classes } = this.props;
    const { editTemplateName, templateName, templateContent, editTemplateContent } = this.state;
    const saveEnabled = isDirty(editTemplateName, templateName) || isDirty(editTemplateContent, templateContent);
    const editTemplate = editTemplateName ? (<Card>
        <CardHeader color="rose" icon>
          <CardText color="rose">
            <h4 className={classes.cardTitle}>Editing {editTemplateName}</h4>
          </CardText>
        </CardHeader>
        <CardBody>
          <form onSubmit={this.submitHandler}>
            <div>
              <h4 className={classes.cardTitle}>Template Name</h4>
              <TextField
                id="template-name"
                value={templateName}
                autoFocus
                onChange={(event) => this.changeHandler(event, "templateName")}
                margin="normal"
                fullWidth
                className={classes.templateBox}
                inputProps={{
                  maxLength: eTemplateNameMax ,
                }}
                InputProps={{
                  className: classes.borderLess,
                }}
              />
            </div>
            <div className={classes.templateContent}>
              <h4 className={classes.cardTitle}>Template Content</h4>
              <TextField
                id="template-content"
                value={templateContent}
                onChange={(event) => this.changeHandler(event, "templateContent")}
                margin="normal"
                multiline
                fullWidth
                className={classes.templateBox}
                inputProps={{
                  className: classes.inputBox,
                  maxLength: eTemplateContentMax,
                  placeholder: 'Click here to start!'
                }}
                InputProps={{
                  className: [classes.borderLess, classes.contentBox].join(' '),
                }}
              />
            </div>
          </form>
        </CardBody>
        <CardFooter>
          <Button
            disabled={!saveEnabled}
            color="rose"
            onClick={this.saveTemplateHandler}
          >
            Save
          </Button>
          <Button onClick={this.cancelEditHandler}>Cancel</Button>
        </CardFooter>
      </Card>)
      : <Loading />;
    return(editTemplate);
  }
}

const mapStateToProps = state => ({
  templateContent: state.email.templateContent,
  templateName: state.email.templateName,
  isTemplateEdited: state.email.isTemplateEdited,
});

const mapDispatchToProps = dispatch => ({
  fetchTemplate: (id) => dispatch(fetchTemplate(id)),
  cleanTemplateStatus: () => dispatch(cleanTemplateStatus()),
  editTemplate: (id, name, content) => dispatch(editTemplate(id, name, content)),
  cleanEditTemplateStatus: () => dispatch(cleanEditTemplateStatus()),
});

export default withStyles({...gridSystemStyle, ...styles()})(connect(mapStateToProps,mapDispatchToProps)(EditEmailTemplate));

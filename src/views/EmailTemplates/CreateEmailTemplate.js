import React, {Component} from 'react';
import {connect} from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
import Error from 'components/Error/Error';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardText from "components/Card/CardText.jsx";
import Button from "components/CustomButtons/Button.jsx";
import gridSystemStyle from "assets/jss/material-dashboard-pro-react/views/gridSystemStyle.jsx";
import { createTemplate, fetchTemplates, cleanCreateTemplateError } from 'actions/email_templates';
import { eTemplateUrl, eTemplateNameMax, eTemplateContentMax } from '../../constants';

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

class CreateEmailTemplate extends Component {
  state = {
    templateName: '',
    templateContent: '',
  };

  cleanTemplateCreateError = () => {
    const { history, cleanCreateTemplateError } = this.props;
    cleanCreateTemplateError();
    history.push(eTemplateUrl);
  };

  cancelEditHandler = () => {
    const { history } = this.props;
    history.push(eTemplateUrl);
  };

  createTemplateHandler = () => {
    const { templateName, templateContent } = this.state;
    this.props.createTemplate(templateName, templateContent);
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  changeHandler = (event, type) => {
    this.setState({ [type]: event.target.value });
  };

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    const { templateId, isTemplateCreated } = nextProps;
    if (templateId && isTemplateCreated) {
      this.props.fetchTemplates();
      history.push(eTemplateUrl);
    }
  }

  render() {
    const { classes, error } = this.props;
    const { templateName, templateContent } = this.state;
    const createdTemplate = error ? <Error cancelError={this.cleanTemplateCreateError}>{error.message}</Error>
      : (<Card>
        <CardHeader color="rose" icon>
          <CardText color="rose">
            <h4 className={classes.cardTitle}>Creating your own template</h4>
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
          <Button disabled={!templateName || !templateContent} color="rose" onClick={this.createTemplateHandler}>Create</Button>
          <Button onClick={this.cancelEditHandler}>Cancel</Button>
        </CardFooter>
      </Card>);

    return(createdTemplate)
  }
}

const mapStateToProps = state => ({
  loading: state.email.loading,
  templateId: state.email.templateId,
  isTemplateCreated: state.email.isTemplateCreated,
  error: state.email.error,
});

const mapDispatchToProps = dispatch => ({
  createTemplate: (name, content)=> dispatch(createTemplate(name, content)),
  fetchTemplates: () => dispatch(fetchTemplates()),
  cleanCreateTemplateError: () => dispatch(cleanCreateTemplateError()),
});

export default withStyles({...gridSystemStyle, ...styles()})(connect(mapStateToProps,mapDispatchToProps)(CreateEmailTemplate));

import React, {Component} from 'react';
import {connect} from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInput from "../../components/CustomInput/CustomInput";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import CardText from "../../components/Card/CardText.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import gridSystemStyle from "../../assets/jss/material-dashboard-pro-react/views/gridSystemStyle.jsx";
import {createTemplate, fetchTemplates, cleanCreateTemplateError } from '../../actions/email_templates';
import Error from 'components/Error/Error';

class CreateEmailTemplate extends Component {
  state = {
    templateName: '',
    templateContent: '',
  };

  cleanTemplateCreateError = () => {
    const { history, cleanCreateTemplateError } = this.props;
    cleanCreateTemplateError();
    history.push('/email-templates');
  };

  cancelEditHandler = () => {
    const { history } = this.props;

    history.push('/email-templates');
  };

  createTemplateHandler = () => {
    const { templateName, templateContent } = this.props;
    this.props.createTemplate(templateName, templateContent);
  };

  changeHandler = (event, type) => {
    this.setState({ [type]: event.target.value });
  };

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    const { templateId, isTemplateCreated } = nextProps;
    if (templateId && isTemplateCreated) {
      this.props.fetchTemplates();
      history.push('/email-templates');
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
          <CustomInput
            labelText="Template Name"
            id="Template Name"
            required
            value={this.state.templateName}
            inputProps={{
              onChange: (event) => this.changeHandler(event, "templateName"),
            }}
          />
          <h4>To</h4>
          <CustomInput
            labelText="Template Content"
            id="Template Content"
            required
            value={this.state.templateContent}
            inputProps={{
              onChange: (event) => this.changeHandler(event, "templateContent"),
            }}
          />
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

export default withStyles(gridSystemStyle)(connect(mapStateToProps,mapDispatchToProps)(CreateEmailTemplate));

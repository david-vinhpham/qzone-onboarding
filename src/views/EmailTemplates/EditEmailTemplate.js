import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
import Card from "components/Card/Card.jsx";
import Typography from "@material-ui/core/Typography";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CardText from "components/Card/CardText.jsx";
import Button from "components/CustomButtons/Button.jsx";
import gridSystemStyle from "assets/jss/material-dashboard-pro-react/views/gridSystemStyle.jsx";
import { fetchTemplate, cleanTemplateStatus } from 'actions/email_templates';
import Loading from 'components/Loading/Loading';

class EditEmailTemplate extends Component {
    state = {
      editTemplateContent: '',
      editTemplateName: '',
      templateContent: '',
      templateName: '',
    };

  cancelEditHandler = () => {
    const { history, cleanTemplateStatus } = this.props;
    cleanTemplateStatus();
    history.push('/email-templates');
  };

  changeHandler = (event, type) => {
    this.setState({
      [type]: event.target.value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  fieldDirty = () => {
    const { editTemplateContent, editTemplateName, templateContent, templateName } = this.state;
    return editTemplateContent === templateContent && editTemplateName === templateName;
  };

  componentDidMount() {
    const { match } = this.props;
    this.props.fetchTemplate(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { templateName, templateContent } = nextProps;
    this.setState({ templateName, templateContent });
  }

  render() {
    const { classes } = this.props;
    const { templateName, templateContent } = this.state;
    const editTemplate = templateName ? (<Card>
        <CardHeader color="rose" icon>
          <CardText color="rose">
            <Typography noWrap color={classes.cardTitle} variant="display1">{templateName}</Typography>
          </CardText>
        </CardHeader>
        <CardBody>
          <form onSubmit={this.submitHandler}>
            <TextField
              id="template-name"
              label="Template Name"
              onChange={(event) => this.changeHandler(event, 'templateName')}
              value={templateName}
              margin="normal"
            />
            <TextField
              id="template-content"
              value={templateContent}
              margin="normal"
              onChange={(event) => this.changeHandler(event, 'templateContent')}
              multiline
              fullWidth
            />
          </form>
        </CardBody>
        <CardFooter>
          <Button disabled={this.fieldDirty()} color="rose" onClick={this.saveEditHandler}>Save</Button>
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
});

const mapDispatchToProps = dispatch => ({
  fetchTemplate: (id) => dispatch(fetchTemplate(id)),
  cleanTemplateStatus: () => dispatch(cleanTemplateStatus()),
});

export default withStyles(gridSystemStyle)(connect(mapStateToProps,mapDispatchToProps)(EditEmailTemplate));

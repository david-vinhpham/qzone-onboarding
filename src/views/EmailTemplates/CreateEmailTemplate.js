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
import {createTemplate} from '../../actions/email_templates';

class CreateEmailTemplate extends Component {
  state = {
    templateName: '',
    templateContent: '',
  };

  cancelEditHandler = () => {
    const { history } = this.props;
    history.push('/email-templates');
  };

  createTemplateHandler = () => {
    this.props.createTemplate(this.state.templateName, `"${this.state.templateContent}"`);
  };

  changeHandler = (event, type) => {
    this.setState({ [type]: event.target.value });
  };

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    const { templateId, isCreatedSuccessful } = nextProps;
    console.log('next', nextProps);
    if (templateId) {
      history.push('/email-templates');
    }
  }

  render() {
    const { classes } = this.props;
    return(
      <Card>
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
          <Button color="rose" onClick={this.createTemplateHandler}>Create</Button>
          <Button onClick={this.cancelEditHandler}>Cancel</Button>
        </CardFooter>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.email.loading,
  templateId: state.email.templateId,
  isCreatedSuccessful: state.email.isCreatedSuccessful,
});

const mapDispatchToProps = dispatch => ({
  createTemplate: (name, content)=> dispatch(createTemplate(name, content)),
});

export default withStyles(gridSystemStyle)(connect(mapStateToProps,mapDispatchToProps)(CreateEmailTemplate));

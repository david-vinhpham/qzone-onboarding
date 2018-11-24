import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import CardText from "../../components/Card/CardText.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import gridSystemStyle from "../../assets/jss/material-dashboard-pro-react/views/gridSystemStyle.jsx";
import { fetchTemplate } from '../../actions/email_templates';

class EditEmailTemplate extends Component {
  cancelEditHandler = () => {
    const { history } = this.props;
    history.push('/email-templates');
  };

  componentDidMount() {
    const { match } = this.props;
    this.props.fetchTemplate(match.params.id);
  }

  render() {
    const { classes, template, name } = this.props;
    return(
      <Card>
        <CardHeader color="rose" icon>
          <CardText color="rose">
            <h4 className={classes.cardTitle}>{name}</h4>
          </CardText>
        </CardHeader>
        <CardBody>
          <div>You wanna edit this email template, right?</div>
          <div>{template}</div>
        </CardBody>

        <CardFooter>
          <Button color="rose" onClick={this.saveEditHandler}>Save</Button>
          <Button onClick={this.cancelEditHandler}>Cancel</Button>
        </CardFooter>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  template: state.email.templateContent,
  name: state.email.templateName,
});

const mapDispatchToProps = dispatch => ({
  fetchTemplate: (id) => dispatch(fetchTemplate(id)),
});

export default withStyles(gridSystemStyle)(connect(mapStateToProps,mapDispatchToProps)(EditEmailTemplate));

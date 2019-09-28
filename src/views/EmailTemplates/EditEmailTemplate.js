import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import CardText from 'components/Card/CardText.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import gridSystemStyle from 'assets/jss/material-dashboard-pro-react/views/gridSystemStyle.jsx';
import {
  cleanEditTemplateStatus,
  cleanTemplateStatus,
  editTemplate,
  fetchTemplate
} from 'actions/email_templates';
import Loading from 'components/Loading/Loading';
import { matchType, historyType, classesType } from 'types/global';
import { dangerColor } from '../../assets/jss/material-dashboard-pro-react';
import { isDirty } from '../../validation/validation';
import { eTemplateContentMax, eTemplateNameMax, eTemplateUrl } from '../../constants';

const styles = () => ({
  borderLess: {
    '&:before, &:after': {
      border: 'none !important'
    }
  },
  templateBox: {
    border: '1px solid #ccc',
    padding: '0 1em'
  },
  templateBoxError: {
    color: dangerColor
  },
  inputBox: {
    overflow: 'hidden'
  },
  contentBox: {
    minHeight: '250px'
  }
});

class EditEmailTemplate extends Component {
  state = {
    editTemplateContent: '',
    editTemplateName: '',
    templateContent: '',
    templateName: '',
    isTemplateTouched: false
  };

  componentDidMount() {
    const { match } = this.props;
    this.props.fetchTemplate(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { templateName, templateContent, isTemplateEdited } = nextProps;
    const { history } = this.props;
    const newState = {};
    if (!this.state.isTemplateTouched) {
      newState.editTemplateName = templateName;
      newState.editTemplateContent = templateContent;
    }
    if (isTemplateEdited) {
      this.props.cleanEditTemplateStatus();
      history.push(`/${eTemplateUrl}`);
    }
    this.setState({ ...newState, templateName, templateContent });
  }

  cancelEditHandler = () => {
    const { history } = this.props;
    this.props.cleanTemplateStatus();
    history.push(`/${eTemplateUrl}`);
  };

  changeHandler = (event, type) => {
    this.setState({
      [type]: event.target.value,
      isTemplateTouched: true
    });
  };

  submitHandler = event => {
    event.preventDefault();
  };

  saveTemplateHandler = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const { templateName, templateContent } = this.state;
    this.props.editTemplate(id, templateName, templateContent);
  };

  render() {
    const { classes, templateNameList } = this.props;
    const { editTemplateName, templateName, templateContent, editTemplateContent } = this.state;
    const saveEnabled =
      (isDirty(editTemplateName, templateName.trim()) ||
        isDirty(editTemplateContent, templateContent.trim())) &&
      templateName &&
      templateContent;
    const editNameList = templateNameList.filter(name => name !== editTemplateName);
    const uniqName = editNameList.indexOf(templateName.trim());
    const [templateNameLabel, templateNameClass] =
      uniqName > 1
        ? [
            'Template Name is not unique! Try another name.',
            `${classes.templateBoxError} ${classes.templateBoxError}`
          ]
        : ['Template Name', ''];
    return editTemplateName ? (
      <Card>
        <CardHeader color="rose" icon>
          <CardText color="rose">
            <h4 className={classes.cardTitle}>
              Editing
              {editTemplateName}
            </h4>
          </CardText>
        </CardHeader>
        <CardBody>
          <form onSubmit={this.submitHandler}>
            <div>
              <h4 className={templateNameClass}>{templateNameLabel}</h4>
              <TextField
                id="template-name"
                value={templateName}
                autoFocus
                onChange={event => this.changeHandler(event, 'templateName')}
                margin="normal"
                fullWidth
                className={classes.templateBox}
                inputProps={{
                  maxLength: eTemplateNameMax,
                  className: classes.borderLess
                }}
              />
            </div>
            <div className={classes.templateContent}>
              <h4 className={classes.cardTitle}>Template Content</h4>
              <TextField
                id="template-content"
                value={templateContent}
                onChange={event => this.changeHandler(event, 'templateContent')}
                margin="normal"
                multiline
                fullWidth
                className={classes.templateBox}
                inputProps={{
                  className: [classes.inputBox, classes.borderLess, classes.contentBox].join(' '),
                  maxLength: eTemplateContentMax,
                  placeholder: 'Click here to start!'
                }}
              />
            </div>
          </form>
        </CardBody>
        <CardFooter>
          <Button
            disabled={!saveEnabled || uniqName > 1}
            color="rose"
            onClick={this.saveTemplateHandler}
          >
            Save
          </Button>
          <Button onClick={this.cancelEditHandler}>Cancel</Button>
        </CardFooter>
      </Card>
    ) : (
      <Loading />
    );
  }
}

const mapStateToProps = state => ({
  templateContent: state.email.templateContent,
  templateName: state.email.templateName,
  isTemplateEdited: state.email.isTemplateEdited,
  templateNameList: state.email.templateNameList || []
});

const mapDispatchToProps = dispatch => ({
  fetchTemplate: id => dispatch(fetchTemplate(id)),
  cleanTemplateStatus: () => dispatch(cleanTemplateStatus()),
  editTemplate: (id, name, content) => dispatch(editTemplate(id, name, content)),
  cleanEditTemplateStatus: () => dispatch(cleanEditTemplateStatus())
});

EditEmailTemplate.propTypes = {
  match: matchType.isRequired,
  templateName: PropTypes.string.isRequired,
  templateContent: PropTypes.string.isRequired,
  isTemplateEdited: PropTypes.bool.isRequired,
  fetchTemplate: PropTypes.func.isRequired,
  cleanEditTemplateStatus: PropTypes.func.isRequired,
  history: historyType.isRequired,
  cleanTemplateStatus: PropTypes.func.isRequired,
  editTemplate: PropTypes.func.isRequired,
  classes: classesType.isRequired,
  templateNameList: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default withStyles({ ...gridSystemStyle, ...styles() })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditEmailTemplate)
);

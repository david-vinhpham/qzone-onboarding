import React, { Component } from 'react';
import { any, func } from 'prop-types';
import * as SurveyJSEditor from 'surveyjs-editor';
import 'surveyjs-editor/surveyeditor.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class SurveyEditor extends Component {
  static propTypes = {
    data: any.isRequired,
    change: func.isRequired,
  };

  editor = null;

  constructor(props) {
    super(props);
    this.state = {};
    SurveyJSEditor.StylesManager.applyTheme('blue');
  }

  componentDidMount() {
    const { data } = this.props;
    this.editor = new SurveyJSEditor.SurveyEditor('surveyEditorContainer');
    this.editor.saveSurveyFunc = this.handleSave;
    this.editor.text = data ? JSON.stringify(data) : this.editor.text;
  }

  handleSave = () => {
    const { change } = this.props;
    change(JSON.parse(this.editor.text));
  };

  render() {
    return (
      <div id="surveyEditorContainer" />
    );
  }
}

export default SurveyEditor;

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { css } from '@emotion/core';
import { BeatLoader } from 'react-spinners';
import Button from "../../components/CustomButtons/Button.jsx";
import { uploadPicture } from '../../actions/pictureUpload';
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class PictureUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      picturePreviewUrlOrg: this.props.picturePreviewUrl,
      picturePreviewUrl: this.props.picturePreviewUrl,
      isUploadPicture: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.pictureLoading) {
      this.setState({ picturePreviewUrlOrg: nextProps.picturePreviewUrl });
      this.setState({ picturePreviewUrl: nextProps.picturePreviewUrl });
      if (nextProps.pictureObject != null && this.state.isUploadPicture === 1) {
        this.setState({ picturePreviewUrl: nextProps.pictureObject.fileUrl });
        localStorage.setItem('pictureObject', JSON.stringify(nextProps.pictureObject));
      }
    }
  }

  componentDidMount() {
    this.setState({ pictureObject: '' });
    localStorage.removeItem('pictureObject');
  }

  handlePictureChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        picturePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // this.state.file is the file/picture uploaded
    // in this function you can save the picture (this.state.file) on form submit
    // you have to call it yourself
  }

  handleClick = () => {
    this.refs.fileInput.click();
  }

  handleRemove = () => {
    this.setState({
      file: null,
      picturePreviewUrl: this.state.picturePreviewUrlOrg,
    });
    this.refs.fileInput.value = null;
    localStorage.removeItem('pictureObject');
  }

  uploadPicture = () => {
    this.setState({
      isUploadPicture: 1,
    });
    var data = new FormData();
    data.append("file", this.state.file);
    this.props.uploadPicture(data);
  }

  render() {
    var {
      addButtonProps,
      removeButtonProps,
      pictureLoading,
    } = this.props;
    return (
      <div className="fileinput text-center">
        <input type="file" onChange={this.handlePictureChange} ref="fileInput" />
        <div className={"thumbnail"}>
          <img src={this.state.picturePreviewUrl} alt="..." />
        </div>
        <div className='sweet-loading'>
          <BeatLoader
            css={override}
            sizeUnit={"px"}
            size={22}
            color="#e91e63"
            loading={pictureLoading}
          />
        </div>
        <div>
          {this.state.file === null ? (
            <Button {...addButtonProps} onClick={this.handleClick}>
              {pictureLoading ? "Add Photo" : "Select image"}
            </Button>
          ) : (
            <span>
                <Button onClick={this.uploadPicture}>
                  Upload
              </Button>
                <Button
                  {...removeButtonProps}
                  onClick={this.handleRemove}
                >
                  <i className="fas fa-times" /> Remove
              </Button>
              </span>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pictureLoading: state.picture.pictureLoading,
  pictureError: state.picture.pictureError,
  pictureObject: state.picture.picture,
})

const mapDispatchToProps = (dispatch) => {
  return {
    uploadPicture: (formdata) => dispatch(uploadPicture(formdata))
  }
}

PictureUpload.propTypes = {
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(PictureUpload);

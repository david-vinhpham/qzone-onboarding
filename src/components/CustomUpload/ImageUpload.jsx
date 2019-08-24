import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { css } from '@emotion/core';
import { BeatLoader } from 'react-spinners';
import Button from "../../components/CustomButtons/Button.jsx";
import { uploadImage } from '../../actions/imageUpload';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imagePreviewUrlOrg: this.props.imagePreviewUrl,
      imagePreviewUrl: this.props.imagePreviewUrl,
      isUploadImage: 0
    };
  }

  static getDerivedStateFromProps(props, state) {
    let newState = null;

    if (!props.imageLoading) {
      newState = {
        imagePreviewUrlOrg: props.imagePreviewUrl,
        imagePreviewUrl: !!props.imageObject && state.isUploadImage === 1
          ? props.imageObject.fileUrl
          : props.imagePreviewUrl
      };

      if (!!props.imageObject && state.isUploadImage === 1) {
        localStorage.setItem('imageObject', JSON.stringify(props.imageObject));
      }
    }

    return newState;
  }

  componentDidMount() {
    this.setState({ imageObject: '' });
    localStorage.removeItem('imageObject');
  }

  handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  }

  handleClick = () => {
    this.refs.fileInput.click();
  }

  handleRemove = () => {
    this.setState({
      file: null,
      imagePreviewUrl: this.state.imagePreviewUrlOrg,
    });
    this.refs.fileInput.value = null;
    localStorage.removeItem('imageObject');
  }

  uploadImage = () => {
    this.setState({
      isUploadImage: 1,
    });
    var data = new FormData();
    data.append("file", this.state.file);
    this.props.uploadImage(data);
  }

  render() {
    var {
      addButtonProps,
      removeButtonProps,
      imageLoading,
    } = this.props;
    return (
      <div className="fileinput text-center">
        <input type="file" onChange={this.handleImageChange} ref="fileInput" />
        <div className={"thumbnail"}>
          <img src={this.state.imagePreviewUrl} alt="..." />
        </div>
        <div className='sweet-loading'>
          <BeatLoader
            css={override}
            sizeUnit={"px"}
            size={22}
            color="#e91e63"
            loading={imageLoading}
          />
        </div>
        <div>
          {this.state.file === null ? (
            <Button {...addButtonProps} onClick={this.handleClick}>
              {imageLoading ? "Add Photo" : "Select image"}
            </Button>
          ) : (
              <span>
                <Button onClick={this.uploadImage}>
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
  imageLoading: state.image.imageLoading,
  imageError: state.image.imageError,
  imageObject: state.image.image,
})

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (formdata) => dispatch(uploadImage(formdata))
  }
}

ImageUpload.propTypes = {
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ImageUpload);

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import Button from "../../components/CustomButtons/Button.jsx";
//import defaultImage from "../../assets/img/image_placeholder.jpg";
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
    };
    console.log('imagePreviewUrl: ' + this.props.imagePreviewUrl);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ imagePreviewUrlOrg: nextProps.imagePreviewUrl });
    this.setState({ imagePreviewUrl: nextProps.imagePreviewUrl });
    console.log('Re-render imagePreviewUrl -> ' + this.state.imagePreviewUrl);
  }
  handleImageChange(e) {
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
  handleSubmit(e) {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  }
  handleClick() {
    this.refs.fileInput.click();
  }
  handleRemove() {
    this.setState({
      file: null,
      imagePreviewUrl:  this.state.imagePreviewUrlOrg,
    });
    this.refs.fileInput.value = null;
  }
  uploadImage = () => {
    console.log("file---", this.state.file);
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
          <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={50}
            color={'#123abc'}
            loading={imageLoading}
          />
        </div>
        <div>
          {this.state.file === null ? (
            <Button {...addButtonProps} onClick={() => this.handleClick()}>
              {imageLoading ? "Add Photo" : "Select image"}
            </Button>
          ) : (
            <span>
              <Button onClick={() => this.uploadImage()}>
                Upload
              </Button>
              <Button
                {...removeButtonProps}
                onClick={() => this.handleRemove()}
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

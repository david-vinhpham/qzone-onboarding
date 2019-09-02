import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { serviceCategoryType } from "types/global";
import { connect } from "react-redux";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import {
  createServiceCategory,
  deleteServiceCategory,
  editServiceCategory,
  fetchServiceCategories
} from "../../actions/serviceCategories";
import tableStyle from "../../assets/jss/material-dashboard-pro-react/components/tableStyle";
import listPageStyle from "../../assets/jss/material-dashboard-pro-react/views/listPageStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from '@material-ui/core/Tooltip';
import DeletionModal from "../../shared/deletion-modal";
import { BeatLoader } from "react-spinners";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import { css } from "@emotion/core";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Search from "@material-ui/icons/Search";
import ServiceCategoryDialog from './ServiceCategoryDialog';

const override = css`
  margin: 0 auto;
  border-color: red;
  width: 100%;
  display: flex;
  justify-content: center;
`;

class ServiceCategoriesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      deletedServiceCategory: {
        id: 0,
        isDel: false
      },
      serviceCategoryDialogOpen: false,
      selectedServiceCategory: { name: '' },
      isEditMode: false
    };
  }

  componentDidMount() {
      this.props.fetchServiceCategories();
  }

  handleAddServiceCategoryDialogOpen = () => {
    this.setState({
      isEditMode: false,
      serviceCategoryDialogOpen: true
    });
  };

  handleEditServiceCategoryDialogOpen = (serviceCategory) => {
    this.setState(
      {
        serviceCategoryDialogOpen: true,
        selectedServiceCategory: serviceCategory,
        isEditMode: true
      }
    );
  };

  handleServiceCategoryDialogClose = () => {
    this.setState({ serviceCategoryDialogOpen: false, selectedServiceCategory: { name: '' } });
  };

  handleAddServiceCategory = (name) => {
    this.props.createServiceCategory({
      name,
      businessAdminId: this.props.userId
    });

    this.handleServiceCategoryDialogClose();
  };

  handleEditServiceCategory = (id, name, parentCategoryId) => {
    this.props.editServiceCategory({
      id,
      name,
      parentCategoryId,
      businessAdminId: this.props.userId
    });

    this.handleServiceCategoryDialogClose();
  };

  cancelDelete = () => {
    const data = {
      isDel: false
    };
    this.setState({ deletedServiceCategory: data });
  };

  confirmDelete = serviceCategoryId => {
    this.props.deleteServiceCategory(serviceCategoryId);
    const data = {
      isDel: false
    };
    this.setState({ deletedServiceCategory: data });
  };

  deleteServiceCategory = serviceCategoryId => {
    const data = {
      id: serviceCategoryId,
      isDel: true
    };
    this.setState({ deletedServiceCategory: data });
  }

  render() {
    const { classes, isLoading, serviceCategory } = this.props;
    let data = [];
    const { deletedServiceCategory, selectedServiceCategory, serviceCategoryDialogOpen, isEditMode } = this.state;

    if (isLoading) {
      return (
        <BeatLoader
          css={override}
          sizeUnit="px"
          size={22}
          color="#e91e63"
          loading={isLoading}
        />
      );
    }

    data = (
      <Paper>
        <Table aria-labelledby="serviceCategories">
          <TableHead>
            <TableRow>
              <TableCell className={classes.cellHeaderBold} size="small">No</TableCell>
              <TableCell className={classes.cellHeaderBold}>Name</TableCell>
              <TableCell className={classes.cellHeaderBold} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceCategory.map((svc, index) => (
              <TableRow key={svc.id} classes={{ root: classes.row }}>
                <TableCell size="small">{index + 1}</TableCell>
                <TableCell>{svc.name}</TableCell>
                <TableCell align="center">
                  <Tooltip
                    id="tooltip-top"
                    title="Edit"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                    onClick={() => this.handleEditServiceCategoryDialogOpen(svc)}
                  >
                    <Button color="success" simple justIcon>
                      <Edit />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Remove"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button
                      onClick={() => this.deleteServiceCategory(svc.id)}
                      color="danger"
                      simple
                      justIcon
                    >
                      <Delete />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );

    const deletionPopup = deletedServiceCategory.isDel ? (
      <DeletionModal
        openDialog={deletedServiceCategory.isDel}
        closeDialog={this.cancelDelete}
        itemDeleteHandler={this.confirmDelete}
        itemId={deletedServiceCategory.id}
      />
    ) : null;

    return (
      <div>
        {serviceCategoryDialogOpen && <ServiceCategoryDialog
          isEditMode={isEditMode}
          handleServiceCategoryDialogClose={this.handleServiceCategoryDialogClose}
          handleAddServiceCategory={this.handleAddServiceCategory}
          handleEditServiceCategory={this.handleEditServiceCategory}
          selectedServiceCategory={selectedServiceCategory}
        />}
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardText color="rose">
                  <h4 className={classes.cardTitle}>Service Category List</h4>
                </CardText>
                <div>
                  <CustomInput
                    formControlProps={{
                      className: classes.top + " " + classes.search
                    }}
                    inputProps={{
                      placeholder: "Search",
                      inputProps: {
                        "aria-label": "Search",
                        className: classes.searchInput
                      }
                    }}
                  />
                  <Button
                    color="white"
                    aria-label="edit"
                    justIcon
                    round>
                    <Search />
                  </Button>
                </div>
                <Button
                  size="sm"
                  className={classes.buttonDisplay}
                  onClick={this.handleAddServiceCategoryDialogOpen}
                >
                  New service category
                </Button>
              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>
        {data}
        {deletionPopup}
      </div>
    );
  }
}

ServiceCategoriesList.propTypes = {
  serviceCategory: PropTypes.arrayOf(serviceCategoryType).isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchServiceCategories: PropTypes.func.isRequired,
  deleteServiceCategory: PropTypes.func.isRequired,
  createServiceCategory: PropTypes.func.isRequired,
  editServiceCategory: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  serviceCategory: state.serviceCategory.list,
  isLoading: state.serviceCategory.isLoading,
  userId: state.user.userDetail.id
});

const mapDispatchToProps = {
  fetchServiceCategories,
  deleteServiceCategory,
  createServiceCategory,
  editServiceCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(
    theme => ({
      ...tableStyle(theme),
      ...listPageStyle
    }),
    { withTheme: true }
  )(ServiceCategoriesList)
);

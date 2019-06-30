import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { businessCategoryType } from "types/global";
import { connect } from "react-redux";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { roseColor } from 'assets/jss/material-dashboard-pro-react';
import {
  createBusinessCategory,
  deleteBusinessCategory,
  editBusinessCategory,
  fetchBusinessCategories
} from "../../actions/businessCategories";
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
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Search from "@material-ui/icons/Search";
import BusinessCategoryDialog from './BusinessCategoryDialog';

class BusinessCategoriesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      deletedBusinessCategory: {
        id: 0,
        isDel: false
      },
      businessCategoryDialogOpen: false,
      selectedBusinessCategory: { name: '' },
      isEditMode: false
    };
  }

  componentDidMount() {
      this.props.fetchBusinessCategories();
  }

  handleAddBusinessCategoryDialogOpen = () => {
    this.setState({
      isEditMode: false,
      businessCategoryDialogOpen: true
    });
  };

  handleEditBusinessCategoryDialogOpen = (businessCategory) => {
    this.setState(
      {
        businessCategoryDialogOpen: true,
        selectedBusinessCategory: businessCategory,
        isEditMode: true
      }
    );
  };

  handleBusinessCategoryDialogClose = () => {
    this.setState({ businessCategoryDialogOpen: false, selectedBusinessCategory: { name: '' } });
  };

  handleAddBusinessCategory = (name) => {
    this.props.createBusinessCategory({ name });
    this.handleBusinessCategoryDialogClose();
  };

  handleEditBusinessCategory = (id, name) => {
    this.props.editBusinessCategory({ id, name });
    this.handleBusinessCategoryDialogClose();
  };

  cancelDelete = () => {
    const data = { isDel: false };
    this.setState({ deletedBusinessCategory: data });
  };

  confirmDelete = businessCategoryId => {
    this.props.deleteBusinessCategory(businessCategoryId);
    const data = { isDel: false };
    this.setState({ deletedBusinessCategory: data });
  };

  deleteBusinessCategory = businessCategoryId => {
    const data = {
      id: businessCategoryId,
      isDel: true
    };
    this.setState({ deletedBusinessCategory: data });
  }

  render() {
    const { classes, isLoading, businessCategory } = this.props;
    let data = [];
    const { deletedBusinessCategory, selectedBusinessCategory, businessCategoryDialogOpen, isEditMode } = this.state;

    if (isLoading) {
      return (
        <BeatLoader
          size={22}
          color={roseColor}
        />
      );
    }

    data = (
      <Paper>
        <Table aria-labelledby="businessCategories">
          <TableHead>
            <TableRow>
              <TableCell className={classes.cellHeaderBold} size="small">No</TableCell>
              <TableCell className={classes.cellHeaderBold}>Name</TableCell>
              <TableCell className={classes.cellHeaderBold} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {businessCategory.map((svc, index) => (
              <TableRow key={svc.id} classes={{ root: classes.row }}>
                <TableCell size="small">{index + 1}</TableCell>
                <TableCell>{svc.name}</TableCell>
                <TableCell align="center">
                  <Tooltip
                    id="tooltip-top"
                    title="Edit"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                    onClick={() => this.handleEditBusinessCategoryDialogOpen(svc)}
                  >
                    <Button color="success" simple justIcon>
                      <Edit className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Remove"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button
                      onClick={() => this.deleteBusinessCategory(svc.id)}
                      color="danger"
                      simple
                      justIcon
                    >
                      <Delete className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );

    const deletionPopup = deletedBusinessCategory.isDel ? (
      <DeletionModal
        openDialog={deletedBusinessCategory.isDel}
        closeDialog={this.cancelDelete}
        itemDeleteHandler={this.confirmDelete}
        itemId={deletedBusinessCategory.id}
      />
    ) : null;

    return (
      <div>
        {businessCategoryDialogOpen && <BusinessCategoryDialog
          isEditMode={isEditMode}
          handleBusinessCategoryDialogClose={this.handleBusinessCategoryDialogClose}
          handleAddBusinessCategory={this.handleAddBusinessCategory}
          handleEditBusinessCategory={this.handleEditBusinessCategory}
          selectedBusinessCategory={selectedBusinessCategory}
        />}
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardText color="rose">
                  <h4 className={classes.cardTitle}>Business Category List</h4>
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
                  onClick={this.handleAddBusinessCategoryDialogOpen}
                >
                  New business category
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

BusinessCategoriesList.propTypes = {
  businessCategory: PropTypes.arrayOf(businessCategoryType).isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchBusinessCategories: PropTypes.func.isRequired,
  deleteBusinessCategory: PropTypes.func.isRequired,
  createBusinessCategory: PropTypes.func.isRequired,
  editBusinessCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  businessCategory: state.businessCategory.list,
  isLoading: state.businessCategory.isLoading,
});

const mapDispatchToProps = {
  fetchBusinessCategories,
  deleteBusinessCategory,
  createBusinessCategory,
  editBusinessCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(
    theme => ({
      ...tableStyle(theme),
      ...listPageStyle
    }),
    { withTheme: true }
  )(BusinessCategoriesList)
);

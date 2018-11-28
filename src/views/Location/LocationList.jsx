import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Search from "@material-ui/icons/Search";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import ArtTrack from "@material-ui/icons/ArtTrack";

import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import { fetchProviders } from '../../actions/provider';
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import listPageStyle from "../../assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx"

import priceImage1 from "../../assets/img/faces/profile.jpg";
import locations from "../../assets/location.json";

class LocationList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.providerLists })
    }

    componentDidMount() {
        this.props.fetchProviders()
    }

    render() {
        const { classes } = this.props;
        if (!this.state.data)
            return null;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12}>
                        <Card>
                            <CardHeader color="primary" icon>
                                <CardText color="rose" md={3}>
                                    <h4 className={classes.cardTitle}>Provider List</h4>
                                </CardText>
                                <div className="centerDiv" md={3}>
                                    <div className="search">
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
                                            round
                                            className={classes.top + " " + classes.searchButton} >
                                            <Search
                                                className={classes.headerLinksSvg + " " + classes.searchIcon}
                                            />
                                        </Button>
                                    </div>
                                </div>
                                <Link to={`/location/create`}>
                                    <Button size="sm" className={classes.buttonDisplay} md={3}>
                                        New Location
                                    </Button>
                                </Link>
                                
                            </CardHeader>
                        </Card>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    {locations.map((location, index) => {
                        return (
                            <GridItem xs={12} sm={12} md={3}>
                                <Card product className={classes.cardHover} >
                                    
                                    <CardBody>
                                        <h4 className={classes.cardProductTitle}>
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                {location.address1}
                                            </a>
                                        </h4>
                                        <p className={classes.cardProductDesciprion}>
                                            {location.address2}
                                        </p>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        )
                    })}
                </GridContainer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { providerLists: state.providers.data }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProviders: () => dispatch(fetchProviders()),
    }
}

export default compose(
    withStyles(listPageStyle),
    connect(mapStateToProps, mapDispatchToProps),
)(LocationList);

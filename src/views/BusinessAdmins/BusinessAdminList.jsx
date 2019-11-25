import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Paper } from '@material-ui/core';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import Card from '../../components/Card/Card.jsx';
import CardText from '../../components/Card/CardText.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import { Link } from 'react-router-dom';
import tableStyle from 'assets/jss/material-dashboard-pro-react/components/tableStyle.jsx';
import headerLinksStyle from 'assets/jss/material-dashboard-pro-react/components/headerLinksStyle.jsx';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomTable from 'components/Table/Table';
import { Search, Edit, Block } from '@material-ui/icons';

function BusinessAdminList({ businessAdmins, classes }) {
  return (
    <>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardText color="rose">
                <h4 className={classes.cardTitle}>Business admin list</h4>
              </CardText>
              <div>
                <CustomInput
                  formControlProps={{
                    className: `${classes.top} ${classes.search}`
                  }}
                  inputProps={{
                    placeholder: 'Search',
                    inputProps: {
                      'aria-label': 'Search',
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
              <Link to="/provider/create">
                <Button size="sm" className={classes.buttonDisplay}>
                  New Provider
                  </Button>
              </Link>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
      <Paper>
        {/* <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Provider Name</TableCell>
              <TableCell>Telephone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Edit|Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {businessAdmins.map((ba, index) => (
              <TableRow key={ba.id} classes={{ root: classes.row }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{ba.givenName}</TableCell>
                <TableCell>{ba.telephone}</TableCell>
                <TableCell>{ba.email}</TableCell>
                <TableCell>
                  <Link to={`/provider/edit/${ba.id}`}>
                    <Button color="success" simple justIcon>
                      <Tooltip
                        id="tooltip-top"
                        title="Edit"
                        placement="bottom"
                      >
                        <Edit />
                      </Tooltip>
                    </Button>
                  </Link>
                  <Button
                    onClick={() => this.deleteProvider(ba.id)}
                    color="danger"
                    simple
                    justIcon
                  >
                    <Tooltip
                      id="tooltip-top"
                      title="Remove"
                      placement="bottom"
                    >
                      <Delete />
                    </Tooltip>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
        <CustomTable
          tableHead={['Full name', 'Telephone', 'Email', 'Edit|Disable']}
          tableData={[{
            id: 1,
            data: [
              'ba.givenName',
              'ba.telephone',
              'ba.email',
              [
                <Link key="edit-button" to={`/business-admin/edit/${1}`}>
                  <Button color="success" simple justIcon>
                    <Tooltip
                      id="tooltip-top"
                      title="Edit"
                      placement="bottom"
                    >
                      <Edit />
                    </Tooltip>
                  </Button>
                </Link>,
                <Button
                  key="disable-button"
                  onClick={() => console.log('disable')}
                  color="danger"
                  simple
                  justIcon
                >
                  <Tooltip
                    id="tooltip-top"
                    title="Disable"
                    placement="bottom"
                  >
                    <Block />
                  </Tooltip>
                </Button>
              ]
            ]
          }]}
        />
      </Paper>
    </>
  )
};

export default withStyles(tableStyle, headerLinksStyle)(BusinessAdminList);

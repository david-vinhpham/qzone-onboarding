import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import tableStyle from "assets/jss/material-dashboard-pro-react/components/tableStyle";

function CustomTable({ ...props }) {
  const {
    classes,
    tableHead,
    tableData,
    tableHeaderColor,
    hover,
    colorsColls,
    coloredColls,
    customCellClasses,
    customClassesForCells,
    striped,
    tableShopping,
    customHeadCellClasses,
    customHeadClassesForCells
  } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {!!tableHead && (
          <TableHead className={classes[tableHeaderColor]}>
            <TableRow className={classes.tableRow}>
              <TableCell
                size="small"
                className={cx(classes.tableHeadCell, classes.tableCell, classes.tableHeadFontSize)}
              >
                No
              </TableCell>
              {tableHead.map((head, key) => {
                const tableCellClasses = cx(classes.tableHeadCell, classes.tableCell, {
                  [customHeadCellClasses[customHeadClassesForCells.indexOf(key)]]: customHeadClassesForCells.includes(key),
                  [classes.tableShoppingHead]: tableShopping,
                  [classes.tableHeadFontSize]: !tableShopping
                });
                return (
                  <TableCell className={tableCellClasses} key={head}>
                    {head}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {tableData.map((row, key) => {
            let rowColor = "";
            let rowColored = false;
            if (row.color) {
              rowColor = row.color;
              rowColored = true;
            }
            const tableRowClasses = cx({
              [classes.tableRowHover]: hover,
              [classes[rowColor + "Row"]]: rowColored,
              [classes.tableStripedRow]: striped && key % 2 === 0
            });

            return (
              <TableRow
                key={row.id || key}
                hover={hover}
                className={classes.tableRow + " " + tableRowClasses}
              >
                <TableCell size="small" className={classes.tableCell}>{key + 1}</TableCell>
                {row.data.map((cell, key) => {
                  const tableCellClasses =
                    cx(classes.tableCell, {
                      [classes[colorsColls[coloredColls.indexOf(key)]]]: coloredColls.includes(key),
                      [customCellClasses[customClassesForCells.indexOf(key)]]: customClassesForCells.includes(key)
                    });
                  return (
                    <TableCell className={tableCellClasses} key={key}>
                      {cell}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
  hover: false,
  colorsColls: [],
  coloredColls: [],
  striped: false,
  customCellClasses: [],
  customClassesForCells: [],
  customHeadCellClasses: [],
  customHeadClassesForCells: []
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  // Of(PropTypes.arrayOf(PropTypes.node)) || Of(PropTypes.object),
  tableData: PropTypes.array,
  hover: PropTypes.bool,
  coloredColls: PropTypes.arrayOf(PropTypes.number),
  // Of(["warning","primary","danger","success","info","rose","gray"]) - colorsColls
  colorsColls: PropTypes.array,
  customCellClasses: PropTypes.arrayOf(PropTypes.string),
  customClassesForCells: PropTypes.arrayOf(PropTypes.number),
  customHeadCellClasses: PropTypes.arrayOf(PropTypes.string),
  customHeadClassesForCells: PropTypes.arrayOf(PropTypes.number),
  striped: PropTypes.bool,
  // this will cause some changes in font
  tableShopping: PropTypes.bool
};

export default withStyles(tableStyle)(CustomTable);

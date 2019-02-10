// Library imports
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Toolbar, Typography } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
/**
 * Styling classes
 *
 * @private
 * @param {object} theme - The current app theme
 * @return {object} An object containing all required styling classes
 */

var styles = function styles(theme) {
  return {
    pickerToolbar: {
      height: theme.spacing.unit * 12.5,
      backgroundColor: theme.palette.primary.main,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    startDate: {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column'
    },
    endDate: {
      display: 'flex',
      alignItems: 'flex-end',
      flexDirection: 'column'
    },
    year: {
      color: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.54)
    },
    date: {
      color: theme.palette.getContrastText(theme.palette.primary.main)
    },
    emdash: {
      color: theme.palette.getContrastText(theme.palette.primary.main)
    }
  };
};
/**
 * A functional component that creates a picker header containing start and end date.
 *
 * @param {object} props - The component properties
 * @return {jsx} The component markup
 */


function PickerHeader(props) {
  var startDate = props.startDate,
      endDate = props.endDate,
      classes = props.classes;
  return React.createElement(Toolbar, {
    classes: {
      root: classes.pickerToolbar
    }
  }, React.createElement("div", {
    className: classes.startDate
  }, React.createElement(Typography, {
    variant: "subtitle1",
    className: classes.year
  }, startDate.format('YYYY')), React.createElement(Typography, {
    variant: "h4",
    className: classes.date
  }, startDate.format('ddd, MMM DD'))), endDate ? React.createElement(React.Fragment, null, React.createElement(Typography, {
    variant: "h4",
    className: classes.emdash
  }, "\u2014"), React.createElement("div", {
    className: classes.endDate
  }, React.createElement(Typography, {
    variant: "subtitle1",
    className: classes.year
  }, endDate ? endDate.format('YYYY') : ''), React.createElement(Typography, {
    variant: "h4",
    className: classes.date
  }, endDate ? endDate.format('ddd, MMM DD') : ''))) : '');
} // Set component property types


// Set component default properties
PickerHeader.defaultProps = {
  endDate: null
}; // Export this component as default

export default withStyles(styles, {
  withTheme: true
})(PickerHeader);
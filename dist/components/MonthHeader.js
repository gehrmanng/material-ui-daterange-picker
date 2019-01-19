// Library imports
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
/**
 * Styling classes
 *
 * @private
 * @param {object} theme - The current app theme
 * @return {object} An object containing all required styling classes
 */

var styles = function styles(theme) {
  return {
    monthHeader: {
      marginBottom: theme.spacing.unit * 1.5
    },
    monthName: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit
    },
    withButtons: {
      justifyContent: 'space-between'
    },
    dayNameContainer: {
      display: 'flex',
      justifyContent: 'center'
    },
    dayName: {
      fontSize: '0.75rem',
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.text.secondary,
      width: theme.spacing.unit * 4,
      margin: '0 2px',
      textAlign: 'center'
    },
    hidden: {
      visibility: 'hidden'
    }
  };
};
/**
 * A functional component that creates a month header.
 *
 * @param {object} props - The component properties
 * @return {jsx} The component markup
 */


function MonthHeader(props) {
  var classes = props.classes,
      date = props.date,
      showLeftArrow = props.showLeftArrow,
      showRightArrow = props.showRightArrow,
      onPrevMonthClick = props.onPrevMonthClick,
      onNextMonthClick = props.onNextMonthClick;
  var dayNames = [1, 2, 3, 4, 5, 6, 0].map(function (d) {
    return React.createElement("span", {
      key: "dn".concat(d),
      className: classes.dayName
    }, moment().day(d).format('dd'));
  });
  return React.createElement("div", {
    className: classes.monthHeader
  }, React.createElement("div", {
    className: "".concat(classes.monthName, " ").concat(showLeftArrow || showRightArrow ? classes.withButtons : '')
  }, React.createElement(IconButton, {
    onClick: onPrevMonthClick,
    className: !showLeftArrow ? classes.hidden : ''
  }, React.createElement(Icon, null, "chevron_left")), React.createElement(Typography, {
    component: "span"
  }, date.format('MMMM')), React.createElement(IconButton, {
    onClick: onNextMonthClick,
    className: !showRightArrow ? classes.hidden : ''
  }, React.createElement(Icon, null, "chevron_right"))), React.createElement("div", {
    className: classes.dayNameContainer
  }, dayNames));
} // Set component property types.


// Set component default properties
MonthHeader.defaultProps = {
  showLeftArrow: true,
  showRightArrow: true
}; // Export the component

export default withStyles(styles, {
  withTheme: true
})(MonthHeader);
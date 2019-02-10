import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
// Library imports
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Popover, DialogActions, Button } from '@material-ui/core'; // Local component imports

import Calendar from './Calendar';
import PickerHeader from './PickerHeader';
/**
 * Styling classes
 *
 * @private
 * @param {object} theme - The current app theme
 * @return {object} An object containing all required styling classes
 */

var styles = function styles(theme) {
  return {
    calendar: {
      padding: theme.spacing.unit * 1.5
    }
  };
};
/**
 * A component class that creates a calendar popover.
 *
 * @extends React.PureComponent
 */


var PickerPopover =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PickerPopover, _PureComponent);

  function PickerPopover() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PickerPopover);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PickerPopover)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      startDate: moment().startOf('day'),
      endDate: null
    };

    _this.handleDateSelection = function (date) {
      var _this$props = _this.props,
          autoSubmit = _this$props.autoSubmit,
          onSubmit = _this$props.onSubmit,
          variant = _this$props.variant;
      var _this$state = _this.state,
          startDate = _this$state.startDate,
          endDate = _this$state.endDate;
      var newStart;
      var newEnd;

      if (variant === 'range-picker') {
        if (endDate || date.isSame(startDate)) {
          newStart = moment(date);
          newEnd = null;
        } else {
          newStart = date.isBefore(startDate) ? moment(date) : moment(startDate);
          newEnd = date.isBefore(startDate) ? moment(startDate) : moment(date);
        }
      } else {
        newStart = moment(date);
        newEnd = null;
      }

      _this.setState({
        startDate: newStart,
        endDate: newEnd
      });

      if (autoSubmit) {
        if (variant === 'range-picker' && newEnd !== null) {
          onSubmit(moment.range(newStart, newEnd));
        } else if (variant !== 'range-picker') {
          onSubmit(newStart);
        }
      }
    };

    _this.handleSubmit = function () {
      var _this$state2 = _this.state,
          startDate = _this$state2.startDate,
          endDate = _this$state2.endDate;
      var _this$props2 = _this.props,
          onSubmit = _this$props2.onSubmit,
          variant = _this$props2.variant;

      if (variant === 'range-picker') {
        onSubmit(moment.range(startDate, endDate));
      } else {
        onSubmit(startDate);
      }
    };

    return _this;
  }

  _createClass(PickerPopover, [{
    key: "render",

    /**
     * Render this component
     *
     * @return {jsx} The component markup
     */
    value: function render() {
      var _this$state3 = this.state,
          startDate = _this$state3.startDate,
          endDate = _this$state3.endDate;
      var _this$props3 = this.props,
          anchorEl = _this$props3.anchorEl,
          value = _this$props3.value,
          onClose = _this$props3.onClose,
          autoSubmit = _this$props3.autoSubmit,
          classes = _this$props3.classes;
      var open = Boolean(anchorEl);
      var range = moment.range(startDate, endDate || startDate);
      return React.createElement(Popover, {
        id: "simple-popper",
        open: open,
        anchorEl: anchorEl,
        onClose: onClose,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left'
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left'
        }
      }, React.createElement(PickerHeader, {
        startDate: startDate,
        endDate: endDate
      }), React.createElement("div", {
        className: classes.calendar
      }, React.createElement(Calendar, {
        date: moment.isRange(value) ? value.start : value,
        dateRanges: [range],
        className: classes.pickerCalendar,
        onSelect: this.handleDateSelection,
        displayMonths: 2
      })), !autoSubmit && React.createElement(DialogActions, null, React.createElement(Button, {
        onClick: onClose,
        color: "primary"
      }, "Cancel"), React.createElement(Button, {
        onClick: this.handleSubmit,
        color: "primary"
      }, "OK")));
    }
  }], [{
    key: "getDerivedStateFromProps",

    /**
     * Update the component state with new property values.
     *
     * @param {object} nextProps - The new component properties
     * @param {object} prevState - The previous component state
     * @return {object} The updated component state
     */
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var value = nextProps.value,
          variant = nextProps.variant,
          anchorEl = nextProps.anchorEl;

      if (!value || !variant || prevState.anchorEl === anchorEl) {
        return null;
      }

      var startDate;
      var endDate = null;

      if (variant === 'range-picker' && (moment.isRange(value) || value.start && value.end)) {
        startDate = value.start.startOf('day');
        endDate = value.end.startOf('day');
      } else {
        startDate = value.startOf('day');
      }

      return {
        anchorEl: anchorEl,
        startDate: startDate,
        endDate: endDate
      };
    } // Initial component state

  }]);

  return PickerPopover;
}(PureComponent); // Export this component as default


PickerPopover.defaultProps = {
  anchorEl: null,
  autoSubmit: false,
  value: moment(),
  variant: 'picker'
};
export default withStyles(styles, {
  withTheme: true
})(PickerPopover);
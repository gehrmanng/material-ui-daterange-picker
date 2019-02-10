import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
// Library imports
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import Grid from '@material-ui/core/Grid'; // Local component imports

import Month from './Month'; // Init moment-range

var moment = extendMoment(Moment);
/**
 * Styling classes
 *
 * @private
 * @param {object} theme - The current app theme
 * @return {object} An object containing all required styling classes
 */

var styles = function styles(theme) {
  return {
    gridItem: {
      display: 'flex',
      justifyContent: 'center'
    }
  };
}; // Export a helper constant with available calendar types


export var CALENDAR_TYPE = {
  MONTH: 'month',
  YEAR: 'year'
};
/**
 * A component class that creates a calendar.
 *
 * @extends React.Component
 */

var Calendar =
/*#__PURE__*/
function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Calendar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Calendar)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      visibleRange: moment.range(moment().startOf(CALENDAR_TYPE.MONTH), moment().endOf(CALENDAR_TYPE.MONTH))
    };

    _this.handlePrevRange = function () {
      var _this$state = _this.state,
          visibleRange = _this$state.visibleRange,
          type = _this$state.type;
      var onChangeRange = _this.props.onChangeRange;
      var start = moment(visibleRange.start).subtract(1, type).startOf(type);
      var end = moment(visibleRange.end).subtract(1, type).endOf(type);
      var newRange = moment.range(start, end);

      _this.setState({
        visibleRange: newRange
      });

      onChangeRange(newRange);
    };

    _this.handleNextRange = function () {
      var _this$state2 = _this.state,
          visibleRange = _this$state2.visibleRange,
          type = _this$state2.type;
      var onChangeRange = _this.props.onChangeRange;
      var start = moment(visibleRange.start).add(1, type).startOf(type);
      var end = moment(visibleRange.end).add(1, type).endOf(type);
      var newRange = moment.range(start, end);

      _this.setState({
        visibleRange: newRange
      });

      onChangeRange(newRange);
    };

    _this.handleDaySelection = function (date) {
      var onSelect = _this.props.onSelect;
      onSelect(moment(date));
    };

    return _this;
  }

  _createClass(Calendar, [{
    key: "renderMonths",

    /**
     * Render all months of the current year as a grid.
     *
     * @return {jsx} The created markup
     */
    value: function renderMonths() {
      var _this2 = this;

      var _this$state3 = this.state,
          visibleRange = _this$state3.visibleRange,
          type = _this$state3.type;
      var _this$props = this.props,
          absoluteStartDate = _this$props.absoluteStartDate,
          absoluteEndDate = _this$props.absoluteEndDate,
          displayMonths = _this$props.displayMonths;
      var _this$props2 = this.props,
          classes = _this$props2.classes,
          dateRanges = _this$props2.dateRanges,
          buildDayTooltip = _this$props2.buildDayTooltip,
          getHighlightColor = _this$props2.getHighlightColor;
      return Array.from(visibleRange.by('month')).map(function (m, index) {
        var monthEnd = moment(m).endOf('month');
        var monthRange = moment.range(m, monthEnd);
        var ranges = dateRanges.filter(function (r) {
          return monthRange.overlaps(r, {
            adjacent: true
          });
        });
        return React.createElement(Grid, {
          key: "g".concat(m.format('YYYY-MM-DD')),
          item: true,
          xs: 12,
          sm: type === CALENDAR_TYPE.MONTH ? 12 / displayMonths : 6,
          lg: type === CALENDAR_TYPE.MONTH ? 12 / displayMonths : 4,
          classes: {
            item: classes.gridItem
          }
        }, React.createElement(Month, {
          key: m.format('YYYY-MM-DD'),
          date: m,
          ranges: ranges,
          onSelectDay: _this2.handleDaySelection,
          getTooltip: buildDayTooltip,
          getHighlightColor: getHighlightColor,
          onPrevMonthClick: _this2.handlePrevRange,
          onNextMonthClick: _this2.handleNextRange,
          showLeftArrow: type === CALENDAR_TYPE.MONTH && (!absoluteStartDate || absoluteStartDate.isBefore(visibleRange.start)) && index === 0,
          showRightArrow: type === CALENDAR_TYPE.MONTH && (!absoluteEndDate || absoluteEndDate.isAfter(visibleRange.end)) && index === displayMonths - 1
        }));
      });
    }
    /**
     * Render this component
     *
     * @return {jsx} The component markup
     */

  }, {
    key: "render",
    value: function render() {
      return React.createElement(Grid, {
        container: true,
        spacing: 16
      }, this.renderMonths());
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
      var date = nextProps.date,
          type = nextProps.type,
          displayMonths = nextProps.displayMonths;

      if (date === prevState.date && type === prevState.type && displayMonths === prevState.displayMonths) {
        return null;
      }

      var start = date ? moment(date).startOf(type) : moment().startOf(type);
      var end = date ? moment(date).endOf(type) : moment().endOf(type);

      if (type === CALENDAR_TYPE.MONTH) {
        end.add(displayMonths - 1, 'months');
      }

      return {
        visibleRange: moment.range(start, end),
        date: date,
        type: type,
        displayMonths: displayMonths
      };
    } // Initial component state

  }]);

  return Calendar;
}(Component); // Export this component as default


Calendar.defaultProps = {
  date: moment(),
  type: CALENDAR_TYPE.MONTH,
  displayMonths: 1,
  dateRanges: [],
  absoluteStartDate: undefined,
  absoluteEndDate: undefined,
  buildDayTooltip: function buildDayTooltip() {
    return '';
  },
  getHighlightColor: function getHighlightColor() {
    return undefined;
  },
  onChangeRange: function onChangeRange() {},
  onSelect: function onSelect() {}
};
export default withStyles(styles, {
  withTheme: true
})(Calendar);
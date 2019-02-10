import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
// Library imports
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment'; // Local component imports

import Day, { HIGHLIGHT_TYPE } from './Day';
import MonthHeader from './MonthHeader';
/**
 * Styling classes
 *
 * @private
 * @param {object} theme - The current app theme
 * @return {object} An object containing all required styling classes
 */

var styles = function styles(theme) {
  return {
    month: {
      width: theme.spacing.unit * 33
    },
    week: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      margin: '2px 0'
    }
  };
};
/**
 * Month component class.
 */


var Month =
/*#__PURE__*/
function (_Component) {
  _inherits(Month, _Component);

  function Month() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Month);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Month)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.getDays = function (week) {
      var start = moment(week).startOf('isoWeek');
      var end = moment(week).endOf('isoWeek');
      return Array.from(moment.range(start, end).by('day'));
    };

    _this.getWeeks = function () {
      var date = _this.props.date;
      var start = moment(date).startOf('month').startOf('isoWeek');
      var end = moment(date).endOf('month').endOf('isoWeek');
      return Array.from(moment.range(start, end).by('week'));
    };

    return _this;
  }

  _createClass(Month, [{
    key: "shouldComponentUpdate",

    /**
     * Check if the component should be rerendered by comparing
     * the current properties with the next properties.
     *
     * @param {object} nextProps - The next property values
     * @return {boolean} True if the current and next properties are different
     *                   thus the component should be rerendered. False otherwise.
     */
    value: function shouldComponentUpdate(nextProps) {
      var _this$props = this.props,
          date = _this$props.date,
          ranges = _this$props.ranges,
          showLeftArrow = _this$props.showLeftArrow,
          showRightArrow = _this$props.showRightArrow;
      return !date.isSame(nextProps.date, 'month') || JSON.stringify(ranges) !== JSON.stringify(nextProps.ranges) || showLeftArrow !== nextProps.showLeftArrow || showRightArrow !== nextProps.showRightArrow;
    }
    /**
     * Get all days of the given week.
     *
     * @param {moment} week - A week
     * @return {moment[]} An array of all days within this month
     */

  }, {
    key: "renderWeek",

    /**
     * Render a week with its days.
     *
     * @param {moment} week - The week to be rendered
     * @return {jsx} The week markup
     */
    value: function renderWeek(week) {
      var _this2 = this;

      var _this$props2 = this.props,
          classes = _this$props2.classes,
          ranges = _this$props2.ranges,
          getTooltip = _this$props2.getTooltip;
      var days = this.getDays(week).map(function (d) {
        var range = ranges.filter(function (r) {
          return r.contains(d);
        }).pop();
        var tooltip = getTooltip(d.format('YYYY-MM-DD'));
        return _this2.renderDay(d, range, tooltip);
      });
      return React.createElement("div", {
        className: classes.week,
        key: week.toString()
      }, days);
    }
    /**
     * Determine various date properties and render that date.
     *
     * @param {moment} day - The date to be rendered
     * @param {moment.range} [range] - A date range that contains the given date. Used for highlighting.
     * @param {React.Node} [tooltip] - A tooltip to be displayed for this date
     * @return {jsx} The date markup
     */

  }, {
    key: "renderDay",
    value: function renderDay(day, range, tooltip) {
      var _this$props3 = this.props,
          date = _this$props3.date,
          onSelectDay = _this$props3.onSelectDay,
          getHighlightColor = _this$props3.getHighlightColor;
      var key = day.format('MM-DD');
      var hidden = !day.isSame(date, 'month');
      var hightlightColor = getHighlightColor(day.format('YYYY-MM-DD'));
      var highlighted = HIGHLIGHT_TYPE.NONE;

      if (range) {
        var firstInRange = range && range.start.isSame(day, 'day');
        var lastInRange = range && range.end.isSame(day, 'day');

        if (firstInRange) {
          highlighted = HIGHLIGHT_TYPE.FIRST_IN_RANGE;
        } else if (lastInRange) {
          highlighted = HIGHLIGHT_TYPE.LAST_IN_RANGE;
        }

        if (firstInRange && lastInRange) {
          highlighted = HIGHLIGHT_TYPE.SINGLE;
        } else if (!firstInRange && !lastInRange) {
          highlighted = HIGHLIGHT_TYPE.IN_RANGE;
        }
      }

      return React.createElement(Day, {
        key: key,
        date: day,
        hidden: hidden,
        highlighted: highlighted,
        highlightColor: hightlightColor,
        tooltip: tooltip,
        onSelectDay: onSelectDay
      });
    }
    /**
     * Render this component.
     *
     * @return {jsx} The component markup
     */

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props4 = this.props,
          classes = _this$props4.classes,
          date = _this$props4.date,
          showLeftArrow = _this$props4.showLeftArrow,
          showRightArrow = _this$props4.showRightArrow,
          onPrevMonthClick = _this$props4.onPrevMonthClick,
          onNextMonthClick = _this$props4.onNextMonthClick;
      var weeks = this.getWeeks().map(function (w) {
        return _this3.renderWeek(w);
      });
      return React.createElement("div", {
        className: classes.month
      }, React.createElement(MonthHeader, {
        date: date,
        showLeftArrow: showLeftArrow,
        showRightArrow: showRightArrow,
        onPrevMonthClick: onPrevMonthClick,
        onNextMonthClick: onNextMonthClick
      }), weeks);
    }
  }]);

  return Month;
}(Component); // Export this component as default


Month.defaultProps = {
  ranges: [],
  getTooltip: function getTooltip() {
    return '';
  },
  getHighlightColor: function getHighlightColor() {
    return undefined;
  },
  onPrevMonthClick: function onPrevMonthClick() {},
  onNextMonthClick: function onNextMonthClick() {},
  showLeftArrow: true,
  showRightArrow: true
};
export default withStyles(styles, {
  withTheme: true
})(Month);
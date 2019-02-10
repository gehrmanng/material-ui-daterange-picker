import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
// Library imports
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'; // Export a helper constant with allowed day highlight types

export var HIGHLIGHT_TYPE = {
  NONE: false,
  IN_RANGE: 'inRange',
  FIRST_IN_RANGE: 'firstInRange',
  LAST_IN_RANGE: 'lastInRange',
  SINGLE: 'single'
};
/**
 * Styling classes
 *
 * @private
 * @param {object} theme - The current app theme
 * @return {object} An object containing all required styling classes
 */

var styles = function styles(theme) {
  return {
    day: {
      margin: '0 2px'
    },
    button: {
      height: theme.spacing.unit * 4,
      width: theme.spacing.unit * 4,
      lineHeight: "".concat(theme.spacing.unit * 4, "px"),
      textAlign: 'center',
      borderRadius: '50%',
      userSelect: 'none',
      '&:hover': {
        backgroundColor: theme.palette.action.hover
      }
    },
    hidden: {
      opacity: 0,
      pointerEvents: 'none'
    },
    highlighted: {
      borderRadius: 0,
      margin: 0,
      padding: '0 2px'
    },
    singleHighlight: {
      borderRadius: '50%',
      margin: '0 2px',
      padding: 0
    },
    firstInRange: {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
      margin: '0 0 0 2px',
      padding: '0 2px 0 0'
    },
    lastInRange: {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
      margin: '0 2px 0 0',
      padding: '0 0 0 2px'
    },
    text: {
      lineHeight: "".concat(theme.spacing.unit * 4, "px"),
      fontSize: '0.75rem',
      fontWeight: theme.typography.fontWeightMedium
    },
    today: {
      color: theme.palette.secondary.main
    }
  };
};
/**
 * A component class that creates a calendar day.
 *
 * @extends React.Component
 */


var Day =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Day, _React$Component);

  function Day() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Day);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Day)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleDaySelection = function () {
      var _this$props = _this.props,
          date = _this$props.date,
          onSelectDay = _this$props.onSelectDay;
      onSelectDay(date);
    };

    return _this;
  }

  _createClass(Day, [{
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
      var _this$props2 = this.props,
          date = _this$props2.date,
          hidden = _this$props2.hidden,
          highlighted = _this$props2.highlighted,
          highlightColor = _this$props2.highlightColor,
          tooltip = _this$props2.tooltip;
      return !date.isSame(nextProps.date, 'day') || hidden !== nextProps.hidden || highlighted !== nextProps.highlighted || highlightColor !== nextProps.highlightColor || tooltip !== nextProps.tooltip;
    }
    /**
     * Get the highlight style class depending on the highlight type.
     *
     * @return {object} The matching highlight style class
     */

  }, {
    key: "getHighlightClass",
    value: function getHighlightClass() {
      var _this$props3 = this.props,
          highlighted = _this$props3.highlighted,
          classes = _this$props3.classes;

      switch (highlighted) {
        case HIGHLIGHT_TYPE.IN_RANGE:
          return classes.highlighted;

        case HIGHLIGHT_TYPE.FIRST_IN_RANGE:
          return classes.firstInRange;

        case HIGHLIGHT_TYPE.LAST_IN_RANGE:
          return classes.lastInRange;

        case HIGHLIGHT_TYPE.SINGLE:
          return classes.singleHighlight;

        default:
          return '';
      }
    }
    /**
     * Date selection handler that passes the selected date
     * to the parent component.
     */

  }, {
    key: "render",

    /**
     * Render this component.
     *
     * @return {jsx} The component markup
     */
    value: function render() {
      var _this$props4 = this.props,
          date = _this$props4.date,
          hidden = _this$props4.hidden,
          highlighted = _this$props4.highlighted,
          tooltip = _this$props4.tooltip,
          classes = _this$props4.classes,
          theme = _this$props4.theme;
      var highlightColor = this.props.highlightColor;

      if (!highlightColor || !highlightColor.length) {
        highlightColor = theme.palette.primary.main;
      }

      var style;
      var textStyle;

      if (highlighted && !hidden) {
        style = {
          backgroundColor: highlightColor
        };
        textStyle = {
          color: theme.palette.getContrastText(highlightColor)
        };
      }

      var textClasses = "".concat(classes.text, " ").concat(date.isSame(moment(), 'day') && classes.today);
      var formattedDate = date.format('D');
      var classNames = "".concat(classes.day, " ").concat(this.getHighlightClass(), " ").concat(hidden && classes.hidden);
      var dayElement = React.createElement("div", {
        className: classNames,
        style: style
      }, React.createElement("div", {
        className: classes.button,
        role: "button",
        onClick: this.handleDaySelection
      }, React.createElement(Typography, {
        className: textClasses,
        style: textStyle,
        component: "span"
      }, formattedDate)));
      return React.createElement(React.Fragment, null, tooltip ? React.createElement(Tooltip, {
        title: tooltip
      }, dayElement) : dayElement);
    }
  }]);

  return Day;
}(React.Component); // Export this component as default


Day.defaultProps = {
  hidden: false,
  highlighted: false,
  highlightColor: '',
  tooltip: undefined
};
export default withStyles(styles, {
  withTheme: true
})(Day);
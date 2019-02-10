import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
// Library imports
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { TextField } from '@material-ui/core'; // Local component imports

import PickerPopover from './PickerPopover'; // Init moment-range

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
    textField: {
      minWidth: 200
    }
  };
};
/**
 * Component class for date and date range picker.
 *
 * @extends React.PureComponent
 */


var Picker =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Picker, _PureComponent);

  function Picker() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Picker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Picker)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      anchorEl: null
    };

    _this.handleChange = function (event) {
      var _this$props = _this.props,
          variant = _this$props.variant,
          onChange = _this$props.onChange;
      var value = event.target.value;

      if (!value) {
        onChange();
      }

      var newValue;

      if (variant === 'range-picker') {
        var dateTokens = value.split(" \u2014 ");
        var startDate = moment(dateTokens[0], 'L');
        var endDate = dateTokens.length === 2 && moment(dateTokens[1], 'L');
        newValue = endDate ? moment.range(startDate, endDate) : startDate;
      } else {
        newValue = moment(value, 'L');
      }

      onChange(newValue);
    };

    _this.handleClickTextfield = function (event) {
      var currentTarget = event.currentTarget;

      _this.setState({
        anchorEl: currentTarget
      });
    };

    _this.handleClose = function () {
      _this.setState({
        anchorEl: null
      });
    };

    _this.handleConfirm = function (newDate) {
      var onChange = _this.props.onChange;

      _this.setState({
        anchorEl: null
      });

      onChange(newDate);
    };

    return _this;
  }

  _createClass(Picker, [{
    key: "render",

    /**
     * Render this component.
     *
     * @return {jsx} The component markup
     */
    value: function render() {
      var anchorEl = this.state.anchorEl;
      var _this$props2 = this.props,
          value = _this$props2.value,
          variant = _this$props2.variant,
          autoSubmit = _this$props2.autoSubmit,
          classes = _this$props2.classes,
          textFieldVariant = _this$props2.textFieldVariant,
          InputProps = _this$props2.InputProps,
          fullWidth = _this$props2.fullWidth;
      var textValue;

      if (moment.isRange(value) || value.start && value.end) {
        textValue = "".concat(value.start.format('L'), " \u2014 ").concat(value.end.format('L'));
      } else {
        textValue = value.format('L');
      }

      return React.createElement(React.Fragment, null, React.createElement(TextField, {
        id: "date-picker",
        className: classes.textField,
        value: textValue,
        onChange: this.handleChange,
        margin: "normal",
        onClick: this.handleClickTextfield,
        variant: textFieldVariant,
        InputProps: InputProps,
        fullWidth: fullWidth
      }), React.createElement(PickerPopover, {
        anchorEl: anchorEl,
        onClose: this.handleClose,
        onSubmit: this.handleConfirm,
        autoSubmit: autoSubmit,
        value: value,
        variant: variant
      }));
    }
  }]);

  return Picker;
}(PureComponent); // Export this component as default


Picker.defaultProps = {
  value: moment(),
  onChange: function onChange() {},
  variant: 'picker',
  autoSubmit: false,
  textFieldVariant: 'standard',
  InputProps: {},
  fullWidth: false
};
export default withStyles(styles, {
  withTheme: true
})(Picker);
// Library imports
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { TextField } from '@material-ui/core';

// Local component imports
import PickerPopover from './PickerPopover';

// Init moment-range
const moment = extendMoment(Moment);

/**
 * Styling classes
 *
 * @private
 * @param {object} theme - The current app theme
 * @return {object} An object containing all required styling classes
 */
const styles = theme => ({
  textField: {
    minWidth: 200,
  },
});

/**
 * Component class for date and date range picker.
 *
 * @extends React.PureComponent
 */
class Picker extends PureComponent {
  // Set component property types.
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(moment),
      PropTypes.object,
    ]),
    onChange: PropTypes.func,
    classes: PropTypes.object.isRequired,
    variant: PropTypes.oneOf(['inline', 'picker', 'range-picker']),
    autoSubmit: PropTypes.bool,
    textFieldVariant: PropTypes.string,
    InputProps: PropTypes.object,
    fullWidth: PropTypes.bool,
  };

  // Set default property values
  static defaultProps = {
    value: moment(),
    onChange: () => {},
    variant: 'picker',
    autoSubmit: false,
    textFieldVariant: 'standard',
    InputProps: {},
    fullWidth: false,
  };

  // Initial component state
  state = {
    anchorEl: null,
  };

  /**
   * Change handler for date text field. Sets the
   * component state to the new input value.
   *
   * @param {object} event - The change event
   */
  handleChange = (event) => {
    const { variant, onChange } = this.props;
    const { value } = event.target;

    if (!value) {
      onChange();
    }

    let newValue;
    if (variant === 'range-picker') {
      const dateTokens = value.split(' \u2014 ');
      const startDate = moment(dateTokens[0], 'L');
      const endDate = dateTokens.length === 2 && moment(dateTokens[1], 'L');
      newValue = endDate ? moment.range(startDate, endDate) : startDate;
    } else {
      newValue = moment(value, 'L');
    }

    onChange(newValue);
  };

  /**
   * Click handler that is called when the date text field
   * is clicked. Opens the calendar popover.
   *
   * @param {object} event - The click event
   */
  handleClickTextfield = (event) => {
    const { currentTarget } = event;

    this.setState({
      anchorEl: currentTarget,
    });
  };

  /**
   * Close the calendar popover.
   */
  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  /**
   * Handle the selection of a new date. Either by clicking the
   * OK button or by autosubmit. Also closes the popover.
   *
   * @param {moment|moment.range} newDate - The selected date
   */
  handleConfirm = (newDate) => {
    const { onChange } = this.props;

    this.setState({
      anchorEl: null,
    });

    onChange(newDate);
  };

  /**
   * Render this component.
   *
   * @return {jsx} The component markup
   */
  render() {
    const { anchorEl } = this.state;
    const {
      value, variant, autoSubmit, classes, textFieldVariant, InputProps, fullWidth
    } = this.props;

    let textValue;
    if (moment.isRange(value) || (value.start && value.end)) {
      textValue = `${value.start.format('L')} \u2014 ${value.end.format('L')}`;
    } else {
      textValue = value.format('L');
    }

    return (
      <>
        <TextField
          id="date-picker"
          className={classes.textField}
          value={textValue}
          onChange={this.handleChange}
          margin="normal"
          onClick={this.handleClickTextfield}
          variant={textFieldVariant}
          InputProps={InputProps}
          fullWidth={fullWidth}
        />
        <PickerPopover
          anchorEl={anchorEl}
          onClose={this.handleClose}
          onSubmit={this.handleConfirm}
          autoSubmit={autoSubmit}
          value={value}
          variant={variant}
        />
      </>
    );
  }
}

// Export this component as default
export default withStyles(styles, { withTheme: true })(Picker);

// Library imports
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { TextField } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';

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
  calendar: {
    padding: theme.spacing.unit * 1.5,
  },
  pickerToolbar: {
    height: theme.spacing.unit * 12.5,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  year: {
    color: fade(theme.palette.common.white, 0.54),
  },
  date: {
    color: theme.palette.common.white,
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
    onSelect: PropTypes.func,
    classes: PropTypes.object.isRequired,
    variant: PropTypes.oneOf(['inline', 'picker', 'range-picker']),
    autoSubmit: PropTypes.bool,
  };

  // Set default property values
  static defaultProps = {
    onSelect: () => {},
    variant: 'picker',
    autoSubmit: false,
  };

  // Initialise component state
  state = {
    textValue: '',
    anchorEl: null,
  };

  /**
   * Change handler for date text field. Sets the
   * component state to the new input value.
   *
   * @param {object} event - The change event
   */
  handleChange = (event) => {
    const { target } = event;
    const { value } = target;

    this.setState({
      textValue: value,
    });
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
   * @param {moment} newDate - The selected date
   */
  handleConfirm = (newDate) => {
    this.setState({
      textValue: newDate.format('L'),
      anchorEl: null,
    });
  };

  /**
   * Render this component.
   *
   * @return {jsx} The component markup
   */
  render() {
    const { textValue, anchorEl } = this.state;
    const { variant, autoSubmit, classes } = this.props;

    const dateValue = textValue ? moment(textValue, 'L') : null;

    return (
      <>
        <TextField
          id="date-picker"
          label="Date"
          className={classes.textField}
          value={textValue}
          onChange={this.handleChange}
          margin="normal"
          onClick={this.handleClickTextfield}
        />
        <PickerPopover
          anchorEl={anchorEl}
          onClose={this.handleClose}
          onSubmit={this.handleConfirm}
          autoSubmit={autoSubmit}
          value={dateValue}
          variant={variant}
        />
      </>
    );
  }
}

// Export this component as default
export default withStyles(styles, { withTheme: true })(Picker);

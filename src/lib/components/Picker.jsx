import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { TextField } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';

import PickerPopover from './PickerPopover';

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

class Picker extends PureComponent {
  static propTypes = {
    onSelect: PropTypes.func,
    classes: PropTypes.object.isRequired,
    variant: PropTypes.oneOf(['inline', 'picker', 'range-picker']),
    autoSubmit: PropTypes.bool,
  };

  static defaultProps = {
    onSelect: () => {},
    variant: 'picker',
    autoSubmit: false,
  };

  state = {
    textValue: '',
    anchorEl: null,
  };

  handleChange = (event) => {
    const { target } = event;
    const { value } = target;

    this.setState({
      textValue: value,
    });
  };

  handleClickTextfield = (event) => {
    const { currentTarget } = event;

    this.setState({
      anchorEl: currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleConfirm = (newDate) => {
    this.setState({
      textValue: newDate.format('L'),
      anchorEl: null,
    });
  };

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

export default withStyles(styles, { withTheme: true })(Picker);

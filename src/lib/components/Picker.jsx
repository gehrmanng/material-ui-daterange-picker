import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import {
  TextField, Popover, Toolbar, Typography, DialogActions, Button,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';

import Calendar from './Calendar';

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
    variant: 'inline',
    autoSubmit: false,
  };

  state = {
    internalDate: moment().startOf('day'),
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

  handleDateSelection = (date) => {
    const { autoSubmit } = this.props;
    this.setState(prevState => ({
      ...prevState,
      internalDate: date,
      textValue: autoSubmit ? date.format('L') : prevState.textValue,
      anchorEl: autoSubmit ? null : prevState.anchorEl,
    }));
  };

  handleClickTextfield = (event) => {
    const { currentTarget } = event;
    const { value } = currentTarget;

    this.setState(prevState => ({
      internalDate: value ? moment(value, 'L') : prevState.internalDate,
      anchorEl: currentTarget,
    }));
  };

  handleClose = () => {
    this.setState({
      internalDate: moment().startOf('day'),
      anchorEl: null,
    });
  };

  handleConfirmButton = () => {
    const { internalDate } = this.state;
    this.setState({
      textValue: internalDate.format('L'),
      anchorEl: null,
    });
  };

  render() {
    const { textValue, internalDate, anchorEl } = this.state;
    const { autoSubmit, classes } = this.props;

    const open = Boolean(anchorEl);
    const range = [moment.range(internalDate, internalDate)];

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
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Toolbar classes={{ root: classes.pickerToolbar }}>
            <Typography variant="subtitle1" className={classes.year}>
              {internalDate.format('YYYY')}
            </Typography>
            <Typography variant="h4" className={classes.date}>
              {internalDate.format('ddd, MMM DD')}
            </Typography>
          </Toolbar>
          <div className={classes.calendar}>
            <Calendar
              date={internalDate}
              dateRanges={range}
              className={classes.pickerCalendar}
              onSelect={this.handleDateSelection}
              displayMonths={1}
            />
          </div>
          {!autoSubmit && (
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleConfirmButton} color="primary">
                OK
              </Button>
            </DialogActions>
          )}
        </Popover>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Picker);

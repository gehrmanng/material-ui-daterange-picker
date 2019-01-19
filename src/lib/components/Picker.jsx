import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import {
  TextField, Popover, Toolbar, Typography,
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
    date: PropTypes.instanceOf(moment),
    onSelect: PropTypes.func,
    classes: PropTypes.object.isRequired,
    variant: PropTypes.oneOf(['inline', 'picker', 'range-picker']),
    autoSubmit: PropTypes.bool,
  };

  static defaultProps = {
    date: moment(),
    onSelect: () => {},
    variant: 'inline',
    autoSubmit: false,
  };

  state = {
    date: moment(),
    anchorEl: null,
  };

  handleChange = (event) => {
    const { target } = event;
    const { value } = target;

    this.setState({
      date: value,
    });
  };

  handleDateSelection = (date) => {
    const { autoSubmit } = this.props;
    this.setState(prevState => ({
      ...prevState,
      date,
      anchorEl: autoSubmit ? null : prevState.anchorEl,
    }));
  };

  handleClickTextfield = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const { date, anchorEl } = this.state;
    const { classes } = this.props;
    const open = Boolean(anchorEl);

    const formattedDate = date.format('L');
    const range = [moment.range(date, date)];
    return (
      <>
        <TextField
          id="date-picker"
          label="Date"
          className={classes.textField}
          value={formattedDate}
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
              {date.format('YYYY')}
            </Typography>
            <Typography variant="h4" className={classes.date}>
              {date.format('ddd, MMM DD')}
            </Typography>
          </Toolbar>
          <div className={classes.calendar}>
            <Calendar
              date={date}
              dateRanges={range}
              className={classes.pickerCalendar}
              onSelect={this.handleDateSelection}
            />
          </div>
        </Popover>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Picker);

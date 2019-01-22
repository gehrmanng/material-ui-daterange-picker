// Library imports
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Popover, Toolbar, Typography, DialogActions, Button,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';

// Local component imports
import Calendar from './Calendar';

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
 * A component class that creates a calendar popover.
 *
 * @extends React.PureComponent
 */
class PickerPopover extends PureComponent {
  // Set component property types.
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    anchorEl: PropTypes.any,
    autoSubmit: PropTypes.bool,
    value: PropTypes.instanceOf(moment),
    variant: PropTypes.oneOf(['picker', 'range-picker']),
  };

  // Set default property values
  static defaultProps = {
    anchorEl: null,
    autoSubmit: false,
    value: moment(),
    variant: 'picker',
  };

  /**
   * Update the component state with new property values.
   *
   * @param {object} nextProps - The new component properties
   * @param {object} prevState - The previous component state
   * @return {object} The updated component state
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const { value } = nextProps;

    if (!value || value.isSame(prevState.startDate, 'day')) {
      return null;
    }

    return {
      startDate: value.startOf('day'),
      endDate: value.startOf('day'),
    };
  }

  // Initialise component state
  state = {
    startDate: moment().startOf('day'),
    endDate: moment().startOf('day'),
  };

  /**
   * Date selection handler. Sends the selected date / date range
   * to the parent component if autoSubmit is true.
   *
   * @param {moment} date - The selected date
   */
  handleDateSelection = (date) => {
    const { autoSubmit, onSubmit, variant } = this.props;
    this.setState(prevState => ({
      startDate: variant === 'picker' ? moment(date) : prevState.startDate,
      endDate: moment(date),
    }));

    if (autoSubmit) {
      onSubmit(moment(date));
    }
  };

  /**
   * Submit handler. Sends the selected date to the parent component.
   */
  handleSubmit = () => {
    const { startDate } = this.state;
    const { onSubmit } = this.props;

    onSubmit(startDate);
  };

  /**
   * Render this component
   *
   * @return {jsx} The component markup
   */
  render() {
    const { startDate, endDate } = this.state;

    const {
      anchorEl, onClose, autoSubmit, classes,
    } = this.props;

    const open = Boolean(anchorEl);

    const range = moment.range(startDate, endDate);

    return (
      <Popover
        id="simple-popper"
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
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
            {startDate.format('YYYY')}
          </Typography>
          <Typography variant="h4" className={classes.date}>
            {startDate.format('ddd, MMM DD')}
          </Typography>
        </Toolbar>
        <div className={classes.calendar}>
          <Calendar
            date={startDate}
            dateRanges={[range]}
            className={classes.pickerCalendar}
            onSelect={this.handleDateSelection}
            displayMonths={1}
          />
        </div>
        {!autoSubmit && (
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              OK
            </Button>
          </DialogActions>
        )}
      </Popover>
    );
  }
}

// Export this component as default
export default withStyles(styles, { withTheme: true })(PickerPopover);

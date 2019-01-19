// Library imports
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

/**
 * Styling classes
 *
 * @private
 * @param {object} theme - The current app theme
 * @return {object} An object containing all required styling classes
 */
const styles = theme => ({
  monthHeader: {
    marginBottom: theme.spacing.unit * 1.5,
  },
  monthName: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit,
  },
  withButtons: {
    justifyContent: 'space-between',
  },
  dayNameContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  dayName: {
    fontSize: '0.75rem',
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.text.secondary,
    width: theme.spacing.unit * 4,
    margin: '0 2px',
    textAlign: 'center',
  },
  hidden: {
    visibility: 'hidden',
  },
});

/**
 * A functional component that creates a month header.
 *
 * @param {object} props - The component properties
 * @return {jsx} The component markup
 */
function MonthHeader(props) {
  const {
    classes,
    date,
    showLeftArrow,
    showRightArrow,
    onPrevMonthClick,
    onNextMonthClick,
    showYear,
  } = props;

  const format = `MMMM${showYear ? ' YYYY' : ''}`;

  const dayNames = [1, 2, 3, 4, 5, 6, 0].map(d => (
    <span key={`dn${d}`} className={classes.dayName}>
      {moment()
        .day(d)
        .format('dd')}
    </span>
  ));

  return (
    <div className={classes.monthHeader}>
      <div
        className={`${classes.monthName} ${
          showLeftArrow || showRightArrow ? classes.withButtons : ''
        }`}
      >
        <IconButton onClick={onPrevMonthClick} className={!showLeftArrow ? classes.hidden : ''}>
          <Icon>chevron_left</Icon>
        </IconButton>
        <Typography component="span">{date.format(format)}</Typography>
        <IconButton onClick={onNextMonthClick} className={!showRightArrow ? classes.hidden : ''}>
          <Icon>chevron_right</Icon>
        </IconButton>
      </div>
      <div className={classes.dayNameContainer}>{dayNames}</div>
    </div>
  );
}

// Set component property types.
MonthHeader.propTypes = {
  date: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onPrevMonthClick: PropTypes.func.isRequired,
  onNextMonthClick: PropTypes.func.isRequired,
  showLeftArrow: PropTypes.bool,
  showRightArrow: PropTypes.bool,
  showYear: PropTypes.bool,
};

// Set component default properties
MonthHeader.defaultProps = {
  showLeftArrow: true,
  showRightArrow: true,
  showYear: true,
};

// Export the component
export default withStyles(styles, { withTheme: true })(MonthHeader);

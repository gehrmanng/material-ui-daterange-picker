// Library imports
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Toolbar, Typography } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';

/**
 * Styling classes
 *
 * @private
 * @param {object} theme - The current app theme
 * @return {object} An object containing all required styling classes
 */
const styles = theme => ({
  pickerToolbar: {
    height: theme.spacing.unit * 12.5,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  startDate: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  endDate: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  year: {
    color: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.54),
  },
  date: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  emdash: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
});

/**
 * A functional component that creates a picker header containing start and end date.
 *
 * @param {object} props - The component properties
 * @return {jsx} The component markup
 */
function PickerHeader(props) {
  const { startDate, endDate, classes } = props;

  return (
    <Toolbar classes={{ root: classes.pickerToolbar }}>
      <div className={classes.startDate}>
        <Typography variant="subtitle1" className={classes.year}>
          {startDate.format('YYYY')}
        </Typography>
        <Typography variant="h4" className={classes.date}>
          {startDate.format('ddd, MMM DD')}
        </Typography>
      </div>
      {endDate ? (
        <>
          <Typography variant="h4" className={classes.emdash}>
            {'\u2014'}
          </Typography>
          <div className={classes.endDate}>
            <Typography variant="subtitle1" className={classes.year}>
              {endDate ? endDate.format('YYYY') : ''}
            </Typography>
            <Typography variant="h4" className={classes.date}>
              {endDate ? endDate.format('ddd, MMM DD') : ''}
            </Typography>
          </div>
        </>
      ) : (
        ''
      )}
    </Toolbar>
  );
}

// Set component property types
PickerHeader.propTypes = {
  startDate: PropTypes.instanceOf(moment).isRequired,
  endDate: PropTypes.instanceOf(moment),
  classes: PropTypes.object.isRequired,
};

// Set component default properties
PickerHeader.defaultProps = {
  endDate: null,
};

// Export this component as default
export default withStyles(styles, { withTheme: true })(PickerHeader);

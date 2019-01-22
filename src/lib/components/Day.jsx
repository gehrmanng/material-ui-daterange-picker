// Library imports
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

// Export a helper constant with allowed day highlight types
export const HIGHLIGHT_TYPE = {
  NONE: false,
  IN_RANGE: 'inRange',
  FIRST_IN_RANGE: 'firstInRange',
  LAST_IN_RANGE: 'lastInRange',
  SINGLE: 'single',
};

/**
 * Styling classes
 *
 * @private
 * @param {object} theme - The current app theme
 * @return {object} An object containing all required styling classes
 */
const styles = theme => ({
  day: {
    margin: '0 2px',
  },
  button: {
    height: theme.spacing.unit * 4,
    width: theme.spacing.unit * 4,
    lineHeight: `${theme.spacing.unit * 4}px`,
    textAlign: 'center',
    borderRadius: '50%',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
  highlighted: {
    borderRadius: 0,
    margin: 0,
    padding: '0 2px',
  },
  singleHighlight: {
    borderRadius: '50%',
    margin: '0 2px',
    padding: 0,
  },
  firstInRange: {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
    margin: '0 0 0 2px',
    padding: '0 2px 0 0',
  },
  lastInRange: {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
    margin: '0 2px 0 0',
    padding: '0 0 0 2px',
  },
  text: {
    lineHeight: `${theme.spacing.unit * 4}px`,
    fontSize: '0.75rem',
    fontWeight: theme.typography.fontWeightMedium,
  },
  today: {
    color: theme.palette.secondary.main,
  },
});

/**
 * A component class that creates a calendar day.
 *
 * @extends React.Component
 */
class Day extends React.Component {
  // Set component property types.
  static propTypes = {
    date: PropTypes.instanceOf(moment).isRequired,
    hidden: PropTypes.bool,
    highlighted: PropTypes.oneOf(Object.values(HIGHLIGHT_TYPE)),
    highlightColor: PropTypes.string,
    tooltip: PropTypes.node,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    onSelectDay: PropTypes.func.isRequired,
  };

  // Set default property values.
  static defaultProps = {
    hidden: false,
    highlighted: false,
    highlightColor: '',
    tooltip: undefined,
  };

  /**
   * Check if the component should be rerendered by comparing
   * the current properties with the next properties.
   *
   * @param {object} nextProps - The next property values
   * @return {boolean} True if the current and next properties are different
   *                   thus the component should be rerendered. False otherwise.
   */
  shouldComponentUpdate(nextProps) {
    const {
      date, hidden, highlighted, highlightColor, tooltip,
    } = this.props;
    return (
      !date.isSame(nextProps.date, 'day')
      || hidden !== nextProps.hidden
      || highlighted !== nextProps.highlighted
      || highlightColor !== nextProps.highlightColor
      || tooltip !== nextProps.tooltip
    );
  }

  /**
   * Get the highlight style class depending on the highlight type.
   *
   * @return {object} The matching highlight style class
   */
  getHighlightClass() {
    const { highlighted, classes } = this.props;

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
  handleDaySelection = () => {
    const { date, onSelectDay } = this.props;

    onSelectDay(date);
  };

  /**
   * Render this component.
   *
   * @return {jsx} The component markup
   */
  render() {
    const {
      date, hidden, highlighted, tooltip, classes, theme,
    } = this.props;
    let { highlightColor } = this.props;

    if (!highlightColor || !highlightColor.length) {
      highlightColor = theme.palette.primary.main;
    }

    let style;
    let textStyle;
    if (highlighted && !hidden) {
      style = {
        backgroundColor: highlightColor,
      };
      textStyle = {
        color: theme.palette.getContrastText(highlightColor),
      };
    }

    const textClasses = `${classes.text} ${date.isSame(moment(), 'day') && classes.today}`;
    const formattedDate = date.format('D');

    const classNames = `${classes.day} ${this.getHighlightClass()} ${hidden && classes.hidden}`;
    const dayElement = (
      <div className={classNames} style={style}>
        <div className={classes.button} role="button" onClick={this.handleDaySelection}>
          <Typography className={textClasses} style={textStyle} component="span">
            {formattedDate}
          </Typography>
        </div>
      </div>
    );

    return <>{tooltip ? <Tooltip title={tooltip}>{dayElement}</Tooltip> : dayElement}</>;
  }
}

// Export this component as default
export default withStyles(styles, { withTheme: true })(Day);

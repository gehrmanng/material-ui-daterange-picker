// Library imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

// Local component imports
import Day, { HIGHLIGHT_TYPE } from './Day';
import MonthHeader from './MonthHeader';

/**
 * Styling classes
 *
 * @private
 * @param {object} theme - The current app theme
 * @return {object} An object containing all required styling classes
 */
const styles = theme => ({
  month: {
    width: theme.spacing.unit * 33,
  },
  week: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    margin: '2px 0',
  },
});

/**
 * Month component class.
 */
class Month extends Component {
  // Set component property types.
  static propTypes = {
    classes: PropTypes.object.isRequired,
    date: PropTypes.object.isRequired,
    onSelectDay: PropTypes.func.isRequired,
    ranges: PropTypes.arrayOf(PropTypes.object),
    getTooltip: PropTypes.func,
    getHighlightColor: PropTypes.func,
    onPrevMonthClick: PropTypes.func,
    onNextMonthClick: PropTypes.func,
    showLeftArrow: PropTypes.bool,
    showRightArrow: PropTypes.bool,
  };

  // Default property values
  static defaultProps = {
    ranges: [],
    getTooltip: () => '',
    getHighlightColor: () => undefined,
    onPrevMonthClick: () => {},
    onNextMonthClick: () => {},
    showLeftArrow: true,
    showRightArrow: true,
  };

  shouldComponentUpdate(nextProps) {
    const {
      date, ranges, showLeftArrow, showRightArrow,
    } = this.props;
    return (
      !date.isSame(nextProps.date, 'month')
      || JSON.stringify(ranges) !== JSON.stringify(nextProps.ranges)
      || showLeftArrow !== nextProps.showLeftArrow
      || showRightArrow !== nextProps.showRightArrow
    );
  }

  /**
   * Get all days of the given week.
   *
   * @param {moment} week - A week
   * @return {moment[]} An array of all days within this month
   */
  getDays = (week) => {
    const start = moment(week).startOf('isoWeek');
    const end = moment(week).endOf('isoWeek');
    return Array.from(moment.range(start, end).by('day'));
  };

  /**
   * Get all weeks of this month.
   *
   * @return {moment[]} An array of all weeks represented by their start date
   */
  getWeeks = () => {
    const { date } = this.props;
    const start = moment(date)
      .startOf('month')
      .startOf('isoWeek');
    const end = moment(date)
      .endOf('month')
      .endOf('isoWeek');

    return Array.from(moment.range(start, end).by('week'));
  };

  /**
   * Render a week with its days.
   *
   * @param {moment} week The week to be rendered
   * @return {jsx} The week markup
   */
  renderWeek(week) {
    const { classes, ranges, getTooltip } = this.props;

    const days = this.getDays(week).map((d) => {
      const range = ranges.filter(r => r.contains(d)).pop();
      const tooltip = getTooltip(d.format('YYYY-MM-DD'));

      return this.renderDay(d, range, tooltip);
    });

    return (
      <div className={classes.week} key={week.toString()}>
        {days}
      </div>
    );
  }

  renderDay(day, range, tooltip) {
    const { date, onSelectDay, getHighlightColor } = this.props;

    const key = day.format('MM-DD');
    const hidden = !day.isSame(date, 'month');
    const hightlightColor = getHighlightColor(day.format('YYYY-MM-DD'));
    let highlighted = HIGHLIGHT_TYPE.NONE;

    if (range) {
      const firstInRange = range && range.start.isSame(day, 'day');
      const lastInRange = range && range.end.isSame(day, 'day');

      if (firstInRange) {
        highlighted = HIGHLIGHT_TYPE.FIRST_IN_RANGE;
      } else if (lastInRange) {
        highlighted = HIGHLIGHT_TYPE.LAST_IN_RANGE;
      }

      if (firstInRange && lastInRange) {
        highlighted = HIGHLIGHT_TYPE.SINGLE;
      } else if (!firstInRange && !lastInRange) {
        highlighted = HIGHLIGHT_TYPE.IN_RANGE;
      }
    }

    return (
      <Day
        key={key}
        date={day}
        hidden={hidden}
        highlighted={highlighted}
        highlightColor={hightlightColor}
        tooltip={tooltip}
        onSelectDay={onSelectDay}
      />
    );
  }

  /**
   * Render this component.
   *
   * @return {jsx} The component markup
   */
  render() {
    const {
      classes,
      date,
      showLeftArrow,
      showRightArrow,
      onPrevMonthClick,
      onNextMonthClick,
    } = this.props;
    const weeks = this.getWeeks().map(w => this.renderWeek(w));

    return (
      <div className={classes.month}>
        <MonthHeader
          date={date}
          showLeftArrow={showLeftArrow}
          showRightArrow={showRightArrow}
          onPrevMonthClick={onPrevMonthClick}
          onNextMonthClick={onNextMonthClick}
        />
        {weeks}
      </div>
    );
  }
}

// Export the component
export default withStyles(styles, { withTheme: true })(Month);

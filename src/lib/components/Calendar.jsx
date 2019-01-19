import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import Grid from '@material-ui/core/Grid';

// Local component imports
import Month from './Month';

const moment = extendMoment(Moment);

/**
 * Styling classes
 *
 * @private
 * @param {object} theme - The current app theme
 * @return {object} An object containing all required styling classes
 */
const styles = theme => ({
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export const CALENDAR_TYPE = {
  MONTH: 'month',
  YEAR: 'year',
};

class Calendar extends Component {
  static propTypes = {
    date: PropTypes.instanceOf(moment),
    onSelect: PropTypes.func,
    classes: PropTypes.object.isRequired,
    type: PropTypes.oneOf(Object.values(CALENDAR_TYPE)),
    displayMonths: PropTypes.number,
    dateRanges: PropTypes.array,
    absoluteStartDate: PropTypes.instanceOf(moment),
    absoluteEndDate: PropTypes.instanceOf(moment),
    buildDayTooltip: PropTypes.func,
    getHighlightColor: PropTypes.func,
    onChangeRange: PropTypes.func,
  };

  static defaultProps = {
    date: moment(),
    type: CALENDAR_TYPE.MONTH,
    displayMonths: 1,
    dateRanges: [],
    absoluteStartDate: undefined,
    absoluteEndDate: undefined,
    buildDayTooltip: () => '',
    getHighlightColor: () => undefined,
    onChangeRange: () => {},
    onSelect: () => {},
  };

  state = {
    visibleRange: moment.range(
      moment().startOf(CALENDAR_TYPE.MONTH),
      moment().endOf(CALENDAR_TYPE.MONTH),
    ),
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { date, type, displayMonths } = nextProps;

    if (
      date === prevState.date
      && type === prevState.type
      && displayMonths === prevState.displayMonths
    ) {
      return null;
    }

    const start = moment(date).startOf(type);
    const end = moment(date).endOf(type);

    if (type === CALENDAR_TYPE.MONTH) {
      end.add(displayMonths - 1, 'months');
    }

    return {
      visibleRange: moment.range(start, end),
      date,
      type,
      displayMonths,
    };
  }

  handlePrevRange = () => {
    const { visibleRange, type } = this.state;
    const { onChangeRange } = this.props;

    const start = moment(visibleRange.start)
      .subtract(1, type)
      .startOf(type);
    const end = moment(visibleRange.end)
      .subtract(1, type)
      .endOf(type);

    const newRange = moment.range(start, end);
    this.setState({
      visibleRange: newRange,
    });

    onChangeRange(newRange);
  };

  handleNextRange = () => {
    const { visibleRange, type } = this.state;
    const { onChangeRange } = this.props;

    const start = moment(visibleRange.start)
      .add(1, type)
      .startOf(type);
    const end = moment(visibleRange.end)
      .add(1, type)
      .endOf(type);

    const newRange = moment.range(start, end);
    this.setState({
      visibleRange: newRange,
    });

    onChangeRange(newRange);
  };

  handleDaySelection = (date) => {
    const { onSelect } = this.props;

    onSelect(moment(date));
  };

  /**
   * Render all months of the current year as a grid.
   *
   * @return {jsx} The created markup
   */
  renderMonths() {
    const { visibleRange, type } = this.state;
    const { absoluteStartDate, absoluteEndDate, displayMonths } = this.props;

    const {
      classes, dateRanges, buildDayTooltip, getHighlightColor,
    } = this.props;

    return Array.from(visibleRange.by('month')).map((m) => {
      const monthEnd = moment(m).endOf('month');
      const monthRange = moment.range(m, monthEnd);
      const ranges = dateRanges.filter(r => monthRange.overlaps(r));

      return (
        <Grid
          key={`g${m.format('YYYY-MM-DD')}`}
          item
          xs={12}
          sm={type === CALENDAR_TYPE.MONTH ? 12 / displayMonths : 6}
          lg={type === CALENDAR_TYPE.MONTH ? 12 / displayMonths : 4}
          classes={{ item: classes.gridItem }}
        >
          <Month
            key={m.format('YYYY-MM-DD')}
            date={m}
            ranges={ranges}
            onSelectDay={this.handleDaySelection}
            getTooltip={buildDayTooltip}
            getHighlightColor={getHighlightColor}
            onPrevMonthClick={this.handlePrevRange}
            onNextMonthClick={this.handleNextRange}
            showLeftArrow={
              type === CALENDAR_TYPE.MONTH
              && (!absoluteStartDate || absoluteStartDate.isBefore(visibleRange.start))
            }
            showRightArrow={
              type === CALENDAR_TYPE.MONTH
              && (!absoluteEndDate || absoluteEndDate.isAfter(visibleRange.end))
            }
          />
        </Grid>
      );
    });
  }

  render() {
    return (
      <Grid container spacing={16}>
        {this.renderMonths()}
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Calendar);
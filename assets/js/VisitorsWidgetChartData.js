import { extendMoment } from 'moment-range';
import Moment from 'moment';

const moment = extendMoment(Moment);

export class VisitorsWidgetChartData {
  /**
   * Generates an object contaning two time periods
   * which are compared in VisitorsCharts.
   *
   * @param report
   * @returns {{current, previous}}
   */
  buildPeriods(report) {
    const chartItems = this.makeChartItem(report);

    // current period is a date range from yesterday to 7 days ago.
    const yesterday = moment(moment.now()).subtract(1, 'd'); // yesterday
    const currentPeriodStart = moment(yesterday).subtract(7, 'd');
    const currentPeriodRange = moment.range(currentPeriodStart, yesterday);

    // last period is a date range from 7 days ago to 14 days ago.
    const lastPeriodStart = moment(currentPeriodStart).subtract(7, 'd');
    const lastPeriodEnd = moment(yesterday).subtract(7, 'd');
    const lastPeriodRange = moment.range(lastPeriodStart, lastPeriodEnd);

    const current = chartItems.filter(item =>
      this.isWithinRange(Object.keys(item).join(), currentPeriodRange)
    );

    const previous = chartItems.filter(item =>
      this.isWithinRange(Object.keys(item).join(), lastPeriodRange)
    );

    return { current, previous };
  }

  /**
   * Returns a single object where the object-key is a dimension
   * value and the object-value is a metric value.
   *
   * @example {20170518 : 44}
   *
   * @private
   * @param {array} report
   * @returns {object}
   */
  makeChartItem(report) {
    return report.map(row => {
      const dimension = row.dimensions;
      const metrics = row.metrics;

      return { [dimension]: metrics[0].values[0] };
    });
  }

  /**
   * Validates if date is within range.
   *
   * @param {string} date
   * @param {moment} range
   * @returns {boolean}
   */
  isWithinRange(date, range) {
    return moment(date).within(range);
  }
}

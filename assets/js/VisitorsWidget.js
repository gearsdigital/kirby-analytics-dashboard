import { Auth } from './Auth';
import { Widget } from './Widget';
import { VisitorsWidgetChart } from './VisitorsWidgetChart';
import { VisitorsWidgetChartData } from './VisitorsWidgetChartData';
import { VisitorsWidgetErrorHandler } from './VisitorsWidgetErrorHandler';

/**
 * VisitorsWidget
 *
 * @since 1.0
 * @author Steffen Giers <steffen.giers@gmail.com>
 */
export class VisitorsWidget extends Widget {
  constructor(options) {
    super();

    this.options = options;

    // make sure to make only authorized requests
    const auth = new Auth(this.options);
    const authorized = auth.authorize();

    authorized
      .then(() => {
        super
          .fetchData([this.options.visitorsReport])
          .then(response => this.prepareWidgetData(response.result.reports))
          .then(widgetData => {
            this.renderChart(widgetData.periods);
          })
          .catch(exception => {
            new VisitorsWidgetErrorHandler(exception, this.options.container);
          });
      })
      .catch(
        exception =>
          new VisitorsWidgetErrorHandler(exception, this.options.container)
      );
  }

  /**
   * Render chart.
   *
   * @private
   * @property {array} response.result.reports
   * @param chartData
   */
  renderChart(chartData) {
    const chart = new VisitorsWidgetChart(this.options.container);
    chart.create(chartData);
  }

  /**
   * Returns an array of objects containg widget data.
   *
   * @private
   * @property {array} report.data.rows
   * @param reports
   * @returns {object}
   */
  prepareWidgetData(reports) {
    const provider = new VisitorsWidgetChartData();
    let periods;

    for (const report of reports) {
      if (!report.data.rows) {
        throw {
          message: 'Sorry, but there is currently no data available.'
        };
      }
      periods = provider.buildPeriods(report.data.rows);
    }

    return { periods };
  }
}

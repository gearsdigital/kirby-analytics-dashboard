import Chart from 'chart.js';
import moment from 'moment';
import 'moment/src/locale/de';
import 'moment/src/locale/fr';
import 'moment/src/locale/en-gb';

/**
 * VisitorsChart
 *
 * @since 1.0
 * @author Steffen Giers <steffen.giers@gmail.com>
 */
export class VisitorsWidgetChart {
  constructor(container, locale) {
    this.container = container;
    this.locale = locale;
  }

  /**
   * Create chart.
   *
   * @public
   * @param {object} periods
   * @property {array} periods.current
   * @property {array} periods.previous
   * @returns {Chart}
   */
  create(periods) {
    const canvas = this.createCanvas();
    const currentPeriod = this.createChartDataset(periods.current);
    const currentPeriodLabels = this.createChartLabels(periods.current);
    const previousPeriod = this.createChartDataset(periods.previous);

    // @todo refactor options to importable object
    const chartOptions = {
      type: 'line',
      data: {
        labels: currentPeriodLabels,
        datasets: [
          {
            data: previousPeriod,
            borderWidth: 1,
            borderDash: [5, 5],
            borderColor: '#2e9dff',
            lineTension: 0,
            backgroundColor: 'rgba(0,0,0,0)',
            pointBackgroundColor: '#2e9dff',
            pointHoverBackgroundColor: '#2e9dff',
            pointHoverBorderColor: '#2e9dff',
            pointRadius: 0,
            pointHoverRadius: 2,
            pointHitRadius: 10,
            showLine: true
          },
          {
            data: currentPeriod,
            borderWidth: 2,
            lineTension: 0,
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#2767c2',
            pointBackgroundColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointRadius: 0,
            pointHoverRadius: 2,
            pointHitRadius: 10,
            showLine: true
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            title: (tooltipItem, data) =>
              this.createTooltipTitle(tooltipItem, data),
            label: (tooltipItem, data) =>
              this.createTooltipLabel(tooltipItem, data)
          },
          cornerRadius: 0,
          borderWidth: 2,
          borderColor: '#e4e4e4',
          backgroundColor: '#FFF',
          titleFontSize: 12,
          titleFontColor: '#000',
          bodyFontColor: '#949494',
          bodyFontSize: 12,
          displayColors: false,
          xPadding: 12,
          yPadding: 12
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                callback: value => {
                  return this.makeReadableDate(value, 'DD.MM');
                }
              }
            }
          ]
        }
      }
    };

    return new Chart(canvas, chartOptions);
  }

  /**
   * Creates the Tooltip title.
   *
   * @todo localization
   * @param tooltipItem
   * @param data
   * @returns {string}
   */
  createTooltipTitle(tooltipItem, data) {
    const index = tooltipItem[0]['index'];
    const thisWeek = data['datasets'][1]['data'][index];
    const lastWeek = data['datasets'][0]['data'][index];
    const difference = this.getPercentageChange(thisWeek, lastWeek);
    const prefix = difference > 0 ? '+' : '';
    const suffix = '%';

    return `${thisWeek} ${this.locale.visitors} (${prefix}${difference.replace(
      '.',
      ','
    )}${suffix})`;
  }

  /**
   * Creates tooltip label
   *
   * @param tooltipItem
   * @param data
   * @returns {string}
   */
  createTooltipLabel(tooltipItem, data) {
    const dateValue = data['labels'][tooltipItem['index']];
    const dateFormat = 'dd, DD.MM';
    const seperator = ' vs. ';
    const thisWeek = this.makeReadableDate(dateValue, dateFormat);
    const lastWeek = this.makeReadableDate(dateValue, dateFormat, 7);

    return thisWeek + seperator + lastWeek;
  }

  /**
   * Returns an array of data points.
   *
   * @private
   * @param {array} chartData
   * @returns {array}
   */
  createChartDataset(chartData) {
    return chartData.map(entry => {
      return Object.values(entry).join();
    });
  }

  /**
   * Returns an array of chart lables.
   *
   * @private
   * @param {array} chartData
   * @returns {array}
   */
  createChartLabels(chartData) {
    return chartData.map(entry => {
      return Object.keys(entry).join();
    });
  }

  /**
   * Converts a ISO_8601 calendar date representation to an
   * human readable format.
   *
   * @private
   * @see https://en.wikipedia.org/wiki/ISO_8601#Calendar_dates
   * @param {string} date
   * @param {string } format=ddd - momentjs date format
   * @param {number} [subtract]
   * @returns {string}
   */
  makeReadableDate(date, format = 'ddd', subtract) {
    const momentDate = moment(date);
    if (subtract) {
      momentDate.subtract(subtract, 'd');
    }

    // this is a bit hacky but works for now
    if (this.locale.code === 'en') {
      this.locale.code = 'en-gb';
    }

    return momentDate.locale(this.locale.code).format(format);
  }

  /**
   * Create and append an canvas element to container.
   *
   * @private
   * @returns {HTMLCanvasElement}
   */
  createCanvas() {
    // Get the reference node
    const container = document.querySelector(`#${this.container} .hgroup`);
    const canvas = document.createElement('canvas');

    container.after(canvas);
    return canvas;
  }

  /**
   * Calculate the percentage difference between two numbers.
   *
   * @param oldNumber
   * @param newNumber
   * @param {number} precision
   * @returns {string} Difference in percent
   */
  getPercentageChange(oldNumber, newNumber, precision = 1) {
    return ((oldNumber - newNumber) / newNumber * 100).toFixed(1);
  }
}

/**
 * Widget
 *
 * @since 1.0
 * @author Steffen Giers <steffen.giers@gmail.com>
 * @todo add loading animation while fetching data
 */
export class Widget {
  /**
   * Fetch data from Google API.
   *
   * @param {array} requests - Specifies of Reporting API requests
   * @see https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet#reportrequest
   * @returns {gapi.client.HttpRequest<object>}
   */
  fetchData(requests) {
    return gapi.client.request({
      root: 'https://analyticsreporting.googleapis.com/',
      path: '/v4/reports:batchGet',
      method: 'POST',
      body: {
        reportRequests: requests
      }
    });
  }
}

import gears from './Namespace';
import { addScript } from './Helper';
import { VisitorsWidget } from './VisitorsWidget';

// load google platform api
const platform = addScript('https://apis.google.com/js/client:platform.js');

/**
 * VisitorsWidget
 *
 * @param {object} options
 * @constructor
 */
gears.VisitorsWidget = function(options) {
  platform.then(() => new VisitorsWidget(options));
};

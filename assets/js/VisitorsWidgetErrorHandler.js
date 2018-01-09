/**
 * VisitorsWidgetErrorHandler
 *
 * @since 1.0
 * @author Steffen Giers <steffen.giers@gmail.com>
 */
export class VisitorsWidgetErrorHandler {
  constructor(exception, container) {
    let message = exception.message;

    if (!message && exception.status !== 200) {
      message = exception.result.error.message;
    }
    this.create(message, container);
  }

  /**
   * Create and append a div containg current message text.
   *
   * @public
   * @param message
   * @param {string} containerID - Element to which the button will be added
   */
  create(message, containerID) {
    const container = document.getElementById(containerID);
    const element = document.createElement('div');

    element.innerHTML = message;
    element.className = 'gears-error-message';

    container.appendChild(element);
  }
}

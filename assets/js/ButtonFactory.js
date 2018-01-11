import { uuid } from './Helper';

/**
 * ButtonFactory
 *
 * @since 1.0
 * @author Steffen Giers <steffen.giers@gmail.com>
 */
export class ButtonFactory {
  constructor(authInstance, locale) {
    this.authInstance = authInstance;
    this.locale = locale;
  }

  /**
   * Creates a suffixed button identifier.
   *
   * @private
   * @param {string} prefix
   * @returns {string}
   */
  createButtonID(prefix) {
    return prefix + '-button';
  }

  /**
   * Create and append a button with all necessary
   * event handlers attached.
   *
   * @public
   * @param {HTMLElement} container - Element to which the button will be added
   * @param clsName
   */
  create(container, clsName) {
    const button = document.createElement('button');

    button.innerHTML = this.locale.signIn
      ? this.locale.signIn
      : 'Sign in with Google';
    button.id = this.createButtonID(uuid());

    if (clsName) {
      button.className = clsName;
    }

    container.appendChild(button);

    this.attachEvent(this.authInstance, button);
  }

  /**
   * Destroy a button.
   *
   * Removes all buttons within given container if the button id
   * is prefixed with 'gears-'.
   *
   * @public
   * @param {HTMLElement} container - Element which contains the button
   */
  destroy(container) {
    const button = container.querySelector('[id^="gears-"]');

    if (button) {
      button.remove();
    }
  }

  /**
   * Attach attach google auth click handler to given element.
   *
   * @private
   * @param {object} googleAuth
   * @param {HTMLElement} element
   */
  attachEvent(googleAuth, element) {
    googleAuth.attachClickHandler(element, {}, null, null);
  }
}

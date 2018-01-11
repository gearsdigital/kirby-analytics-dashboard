import { ButtonFactory } from './ButtonFactory';

/**
 * Auth
 *
 * @since 1.0
 * @author Steffen Giers <steffen.giers@gmail.com>
 * @todo add Promise() polyfill
 */
export class Auth {
  constructor(options) {
    this.options = options;
  }

  /**
   * Authorizes current user and returns a promise which gets resolved
   * if current auth state has changed.
   *
   * If gapi.auth2.init throws an exeption, the Promise gets
   * rejected. The current exception is passed to reject().
   *
   * @public
   * @returns {Promise<boolean>}
   */
  authorize() {
    return new Promise((resolve, reject) => {
      gapi.load('auth2', () => {
        try {
          const googleAuth = gapi.auth2.init({
            client_id: this.options.client,
            scope: 'https://www.googleapis.com/auth/analytics.readonly'
          });

          // If a user navigates in the backend (panel), Kirby does not reload the page but
          // replaces some parts of the DOM using AJAX.  Once the user is authenticated and
          // is calling the dashboard again, gapi.auth2.getAuthInstance() is defined and the
          // Promise should be resolved directly.
          // As gapi.auth2.getAuthInstance() is undefined upon intial request this will be ignored.
          if (this.getSignedInState(gapi.auth2.getAuthInstance())) {
            resolve(this.getSignedInState(gapi.auth2.getAuthInstance()));
          }

          googleAuth.then(this.getSignedInState).then(authState => {
            if (!authState) {
              this.toogleAuthButton(authState);
            }
          });

          // listen for sign-in state changes
          googleAuth.isSignedIn.listen(authState => {
            this.toogleAuthButton(authState);
            resolve(authState);
          });
        } catch (exception) {
          reject(exception);
        }
      });
    });
  }

  /**
   * Toogles authorization button based on current
   * users sign-in state.
   *
   * @private
   * @param {boolean} authState
   */
  toogleAuthButton(authState) {
    const authInstance = gapi.auth2.getAuthInstance();
    const button = new ButtonFactory(authInstance, this.options.locale);
    const container = document.getElementById(this.options.container);

    authState
      ? button.destroy(container)
      : button.create(container, 'google-auth');
  }

  /**
   * Returns the current sign-in state.
   *
   * @private
   * @param {gapi.auth2.GoogleAuth} googleAuth
   * @returns {boolean}
   */
  getSignedInState(googleAuth) {
    return googleAuth.isSignedIn.get();
  }
}

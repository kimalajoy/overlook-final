import $ from 'jquery';
import Manager from '../src/manager.js';
import Customer from '../src/customer.js';

class App {
  constructor(user, registry) {
    this.user = user;
    this.registry = registry;
    this.currentUser = null;

    this.initialize();
  }

  initialize() {
    this.loginButton = $('#loginButton');
    this.usernameInput = $('#username');
    this.passwordInput = $('#password');
    this.logoutButton = $('#logoutButton');

    this.loginButton.on('click', this.login.bind(this));
    this.logoutButton.on('click', this.logout.bind(this));
  }

  login() {
    this.currentUser = null;
    let username = this.usernameInput.val();
    let password = this.passwordInput.val();

    //todo: remove this
    password = 'overlook2020'

    if (username === 'manager' && password === 'overlook2020') {
      this.currentUser = new Manager();
      this.loadPage();
    } else if (username.includes('customer') && password === 'overlook2020') {
      let userId = Number(username.replace('customer', ''));

      if (!this.isValidUserId(userId)) {
        return;
      }

      this.currentUser = new Customer(username);
      this.loadPage();
    }
  }

  isValidUserId(userId) {
    if (isNaN(userId)) {
      return false;
    }

    if (userId < 1 || userId > 50) {
      return false;
    }

    return true;
  }

  logout() {
    this.currentUser = null;
    this.loadPage();
    console.log('logout!');
  }

  // Hide/unhide section of page as necessary
  loadPage() {
    let loginContainer = $('.login-container');
    let managerContainer = $('.manager-container');
    let customerContainer = $('.customer-container');
    let logoutButton = $('#logoutButton');

    if (this.currentUser instanceof Manager) {
      loginContainer.hide();
      managerContainer.removeClass('hidden');
      logoutButton.removeClass('hidden');
    } else if (this.currentUser instanceof Customer) {
      loginContainer.hide();
      customerContainer.removeClass('hidden');
      logoutButton.removeClass('hidden');
    } else {
      loginContainer.show();
      managerContainer.addClass('hidden');
      customerContainer.addClass('hidden');
      logoutButton.addClass('hidden');
    }
  }
}

export default App;
import $ from 'jquery';
import Manager from '../src/manager.js';
import Customer from '../src/customer.js';

class App {
  constructor(user, bookings) {
    this.user = user;
    this.bookings = bookings;
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
    console.log('login!', username, password);

    if (username === 'manager') {
      this.currentUser = new Manager();
      this.loadPage();
    } else if (username.includes('customer')) {
      this.currentUser = new Customer(username);
      this.loadPage();
    }
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


// username: manager
// password: overlook2020
// If it is a customer logging in, they should log in with the following credentials:

// username: customer50 (where 50 is the ID of the user)
// password: overlook2020
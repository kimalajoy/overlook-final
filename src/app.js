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

    this.loginButton.on('click', this.login.bind(this));
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
  }

// Hide/unhide section of page as necessary
  loadPage() {
    // let loginContainer = $('.login-container')
    if (this.currentUser instanceof Manager) {
      $('.login-container').hide();
      $('#manager-container').show();
    } else if (this.currentUser instanceof Customer) {
      $('.login-container').hide();
      $('#customer-container').show();
    }

  }
}

export default App;


// username: manager
// password: overlook2020
// If it is a customer logging in, they should log in with the following credentials:

// username: customer50 (where 50 is the ID of the user)
// password: overlook2020
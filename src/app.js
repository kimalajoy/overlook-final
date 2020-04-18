import $ from 'jquery';

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
    let username = this.usernameInput.val();
    let password = this.passwordInput.val();
    console.log('login!', username, password);

  

    //this.currentUser
  }
}

export default App;



import $ from 'jquery';
import Manager from '../src/manager.js';
import Customer from '../src/customer.js';
import domUpdates from '../src/domUpdates.js';

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
      this.loadUserView();
      this.loadManagerDashboard ();
    } else if (username.includes('customer') && password === 'overlook2020') {
      let userId = Number(username.replace('customer', ''));

      if (!this.isValidUserId(userId)) {
        return;
      }

      this.currentUser = new Customer(username, userId);
      this.loadUserView();
      this.loadCustomerDashboard();
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
    this.loadUserView();
  }

  // Hide/unhide section of page as necessary
  loadUserView() {
    let loginContainer = $('.login-container');
    let managerContainer = $('.manager-container');
    let customerContainer = $('.customer-container');
    let logoutButton = $('#logoutButton');
    let welcomeManager = $('.welcome-manager');
    let welcomeCustomer = $('.customer-greeting');

    if (this.currentUser instanceof Manager) {
      loginContainer.hide();
      managerContainer.removeClass('hidden');
      logoutButton.removeClass('hidden');
      welcomeManager.removeClass('hidden');
    } else if (this.currentUser instanceof Customer) {
      loginContainer.hide();
      customerContainer.removeClass('hidden');
      logoutButton.removeClass('hidden');
      console.log(this.userName)
      welcomeCustomer.text(`Welcome to the Snowed Inn ${this.currentUser.name}`);
    } else {
      loginContainer.show();
      managerContainer.addClass('hidden');
      customerContainer.addClass('hidden');
      logoutButton.addClass('hidden');
    }
  }

  getCurrentDate() {
    let date = new Date();
    let year = date.getYear() + 1900;
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    return `${year}/${month.padStart(2, '0')}/${day.padStart(2, '0')}`;
  }

  loadManagerDashboard () {
    let date = this.getCurrentDate();
    this.registry.getPercentOccupiedByDate(date);
    this.registry.getAvailableRoomCountByDate(date);
    this.registry.getTotalRevenueByDate(date);

    // // console.log('bookingResponse', bookingPromise);
    // let deletePromise = this.registry.deleteBookingRequest(id);
    // console.log('deletePromise', deletePromise)
    let allCustomerList = this.user.listAllCustomers();
    domUpdates.makeCustomerList(allCustomerList);

    $('#customer-list').on('change', this.managerSelectCustomer.bind(this));

    $('#CustomerBookingDate').on('change', this.managerSelectCustomerBookingDate.bind(this));

    $('#bookingDate').on('change', this.managerSelectCustomerBookingDate.bind(this));
 
    let numOfRooms = this.registry.getAvailableRoomCountByDate(date);
    domUpdates.showNumberOfRoomsAvailableToday(numOfRooms);

    let totalMoney = this.registry.getTotalRevenueByDate(date);
    domUpdates.showTotalRevenue(totalMoney);

    let percentFull = this.registry.getPercentOccupiedByDate(date);
    domUpdates.showPercentFull(percentFull);

  }
  managerSelectCustomer(e) {
    let userId = $(e.target).val();
    this.registry.listOfBookingsByUser(userId);
    this.registry.getTotalBookingsCostByUser(userId);
    //show rooms available
  }

  managerSelectCustomerBookingDate(e) {
    let date = $(e.target).val().replace(/-/g, '/');
    //show rooms available by date
    // this.managerBookRoomForCustomer(date);
    let availableRooms = this.registry.getAvailableRoomsByDate(date);
    domUpdates.makeAvailableRoomsList(availableRooms);
  }

  managerBookRoomForCustomer(roomNumber, date, userId) {
    // let bookingPromise = this.registry.bookRoomByRoomNumber(roomNumber, date, userId);
  }

  loadCustomerDashboard () {
    let customerTotalBooked = this.registry.listOfBookingsByUser(this.currentUser.userId);
    domUpdates.showRoomsCustomerHasBooked(customerTotalBooked);

  console.log(this.currentUser.userId)
    let customerTotalSpent = this.registry.getTotalBookingsCostByUser(43);
    domUpdates.showTotalCustomerSpent(customerTotalSpent);

  // domUpdates.makeAvailableRoomsList(availableRooms);
    

    // let bookingPromise = this.registry.bookRoomByRoomNumber(roomNumber, date, userId);

    // let allBookingsList = this.registry.getTotalBookingsCostByUser(userId);
    // domUpdates.listCurrentUserTotalBookingsCost(allBookingsList);
  }
}

export default App;

import $ from 'jquery';
import Manager from '../src/manager.js';
import Customer from '../src/customer.js';
import domUpdates from '../src/domUpdates.js';

class App {
  constructor(user, registry) {
    this.user = user;
    this.registry = registry;
    this.currentUser = null;
    this.selectedUserId = 0;
    this.selectedBookingDate = null;
    this.selectedRoomNumber = 0;
    this.selectedBookingId = null;

    this.initialize();
  }

  initialize() {
    this.usernameInput = $('#username');
    this.passwordInput = $('#password');

    $('#loginButton').on('click', this.login.bind(this));
    $('#logoutButton').on('click', this.logout.bind(this));
    $('#customer-add-booking').on('click', this.customerBookRoom.bind(this));
    $('#manager-add-booking').on('click', this.managerBookRoom.bind(this));
    $('.room-select').on('change', this.selectRoomNumber.bind(this));
    $('.customer-booked').on('change', this.selectBooking.bind(this));
    $('#delete-a-booking').on('click', this.deleteRoomBookingForCustomer.bind(this));
  }

  selectRoomNumber(e) {
    this.selectedRoomNumber = Number($(e.target).val());
  }

  selectBooking(e) {
    this.selectedBookingId = $(e.target).val();
  }

  login() {
    this.currentUser = null;
    let username = this.usernameInput.val();
    let password = this.passwordInput.val();

    if (username === 'manager' && password === 'overlook2020') {
      this.currentUser = new Manager();
      this.loadUserView();
      this.loadManagerDashboard();
    } else if (username.includes('customer') && password === 'overlook2020') {
      let userId = Number(username.replace('customer', ''));

      if (!this.isValidUserId(userId)) {
        return;
      }
      this.currentUser = new Customer(this.user.userData, userId);
      this.selectedUserId = userId;
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
    $('.bookingDate').on('change', this.selectCustomerBookingDate.bind(this));

    if (this.currentUser instanceof Manager) {
      loginContainer.hide();
      managerContainer.removeClass('hidden');
      logoutButton.removeClass('hidden');
      welcomeManager.removeClass('hidden');
    } else if (this.currentUser instanceof Customer) {
      loginContainer.hide();
      customerContainer.removeClass('hidden');
      logoutButton.removeClass('hidden');
      welcomeCustomer.text(`${this.currentUser.user.name}`);
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

    let allCustomerList = this.user.listAllCustomers();
    domUpdates.makeCustomerList(allCustomerList);

    $('#customer-list').on('change', this.managerSelectCustomer.bind(this));
 
    let numOfRooms = this.registry.getAvailableRoomCountByDate(date);
    domUpdates.showNumberOfRoomsAvailableToday(numOfRooms);

    let totalMoney = this.registry.getTotalRevenueByDate(date);
    domUpdates.showTotalRevenue(totalMoney);

    let percentFull = this.registry.getPercentOccupiedByDate(date);
    domUpdates.showPercentFull(percentFull);
  }
  managerSelectCustomer(e) {
    this.selectedUserId = Number($(e.target).val());
    let customerBookings = this.registry.listOfBookingsByUser(this.selectedUserId);
    let customerTotalSpent = this.registry.getTotalBookingsCostByUser(this.selectedUserId);
    domUpdates.showTotalCustomerSpent(customerTotalSpent);
    //show rooms a selected customer has booked
    domUpdates.showRoomsCustomerHasBooked(customerBookings);
  }

  selectCustomerBookingDate(e) {
    this.selectedBookingDate = $(e.target).val().replace(/-/g, '/');
    
    //show rooms available by date
    
    let availableRooms = this.registry.getAvailableRoomsByDate(this.selectedBookingDate);

    if(!availableRooms) {
      alert('No Rooms Available for the date selected, please choose a different day.')
    }

  
    domUpdates.makeAvailableRoomsList(availableRooms);
  }

  managerBookRoom() {
    let roomNumber = Number($('.room-select').val());
    let date = this.selectedBookingDate;
    let userId = this.selectedUserId;
    console.log(`[M] roomNumber: ${roomNumber}, date: ${date}, userId: ${userId}`)

    this.bookRoomForCustomer(roomNumber, date, userId);
  }

  customerBookRoom() {
    let roomNumber = this.selectedRoomNumber;
    let date = this.selectedBookingDate;
    let userId = this.selectedUserId;
    console.log(`[C] roomNumber: ${roomNumber}, date: ${date}, userId: ${userId}`)

    this.bookRoomForCustomer(roomNumber, date, userId);
  }
  
  bookRoomForCustomer(roomNumber, date, userId) {
    if (!userId) {
      alert('You must select a customer to book a room.');
      return;
    }

    if (!date) {
      alert('You must select a date to book a room.');
      return;
    }

    if (!roomNumber) {
      alert('You must select a room number to book a room.');
      return;
    }

    this.registry.bookRoomByRoomNumber(roomNumber, date, userId).then(function(response) {
      alert(`Successfully booked room ${response.roomNumber} on ${response.date}! (${response.id})`);
    }).catch(function() {
      alert(`Failed booking room ${roomNumber} on ${date}.`);
    });
  }

  deleteRoomBookingForCustomer() {
    let booking = this.registry.getBookingById(this.selectedBookingId);

    if (new Date(booking.date) < new Date()) {
      alert('You may only remove future bookings.');
      return;
    }

    this.registry.deleteBookingRequest(this.selectedBookingId).then(function(response) {
      alert(response.message);
    }).catch(function(response) {
      alert(response.message);
    });
  }

  loadCustomerDashboard () {
    let customerTotalBooked = this.registry.listOfBookingsByUser(this.currentUser.userId);
    domUpdates.showRoomsCustomerHasBooked(customerTotalBooked);

    let customerTotalSpent = this.registry.getTotalBookingsCostByUser(this.currentUser.userId);
    domUpdates.showTotalCustomerSpent(customerTotalSpent);
  }
}

export default App;

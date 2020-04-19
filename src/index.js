// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import './css/style.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import '../src/images/wil-stewart-KjMy5dLL1s0-unsplash.jpg';
console.log('This is the JavaScript entry file - your code begins here.');

import App from '../src/app.js';
import User from '../src/user.js';
import Registry from '../src/registry.js';

let user;
let registry;

function fetchData() {
  let fetchedUserData =
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
      .then(response => response.json());

  let fetchedRoomData =
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
      .then(response => response.json());

  let fetchedBookingsData =
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
      .then(response => response.json());

  return Promise.all([fetchedUserData, fetchedRoomData, fetchedBookingsData])
    .then(response => {
      let dataObj = {};
      dataObj.userData = response[0].users;
      dataObj.roomData = response[1].rooms;
      dataObj.bookingsData = response[2].bookings;
      console.log(dataObj);
      return dataObj;
    });
}

fetchData().then(data => {
  user = new User(data.userData);
  registry = new Registry(data.bookingsData, data.roomData);
  new App(user, registry);
}).catch(error => console.log(error.message));


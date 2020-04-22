import $ from 'jquery';

import './css/base.scss';
import './css/style.scss';

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
      return dataObj;
    });
}

fetchData().then(data => {
  user = new User(data.userData);
  registry = new Registry(data.bookingsData, data.roomData);
  new App(user, registry);
}).catch(error => console.log(error.message));


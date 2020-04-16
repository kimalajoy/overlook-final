// let userData;
// let roomData;
// let bookingsData;

// function fetchUserData() {
//   let fetchedUserData =
//     fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
//       .then(response => response.json());

//   let fetchedRoomData =
//     fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
//       .then(response => response.json());

//   let fetchedBookingsData =
//     fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
//       .then(response => response.json());


//   return Promise.all([fetchedUserData, fetchedRoomData, fetchedBookingsData])
//     .then(response => {
//       let dataObj = {};
//       dataObj.userData = response[0].userData;
//       dataObj.roomData = response[1].roomData;
//       dataObj.bookingsData = response[2].bookingsData;
//       console.log(dataObj);
//       return dataObj;
//     });
// }

// fetchUserData().then(data => {
//   userData = data.userData;
//   roomData = data.roomData;
//   bookingsData = data.bookingsData;
  
// }).then(function() {
//   index.startApp(userData, roomData, bookingsData);
// })
//   .catch(error => console.log(error.message))
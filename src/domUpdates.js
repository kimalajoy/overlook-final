import $ from 'jquery';

const domUpdates = {

  makeCustomerList(allCustomerList) {
    let customerList = $('#customer-list');
    let customerOptions = '';
    allCustomerList.forEach(customer => {
      customerOptions = customerOptions.concat((`<option value="${customer.id}">${customer.name}</option>`));
    })
    customerList.append(customerOptions);
  },

  makeAvailableRoomsList(availableRoomsList) {
    let availableRoomSelect = $('.room-select');
    let roomOptions = '<option value="">Choose room</option>';
    availableRoomsList.forEach(room => {
      roomOptions = roomOptions.concat((`<option value="${room.number}">${room.number} ${room.roomType} (${room.bedSize})</option>`));
    })
    availableRoomSelect.empty().append(roomOptions);
  },

// manager dashboard
  showNumberOfRoomsAvailableToday (numOfRooms) {
    let numberOfRooms = $('.number-rooms');
    numberOfRooms.empty().append(`Here are the number of rooms available for today: ${numOfRooms}`);
  },

  showTotalRevenue (totalMoney) {
    let todaysRevenue = $('.todays-revenue');
    todaysRevenue.empty().append(`Total Revenue for today: $${totalMoney}`);
  },

  showPercentFull (percentFull) {
    let todaysRevenue = $('.percent-full');
    todaysRevenue.empty().append(`The Snowed Inn is this full today: ${percentFull}%`);
  },

  //customer dashboard
  showRoomsCustomerHasBooked (customerBookingList) {
    let bookingsByCustomer = $('.customer-booked');

    let roomOptions = '<option value="">Booked Rooms</option>';
    customerBookingList.forEach(room => {
      roomOptions = roomOptions.concat((`<option value="${room.id}">${room.date} ${room.roomNumber}</option>`));
    });

    bookingsByCustomer.empty().append(roomOptions);
  },

  showTotalCustomerSpent (customerTotalSpent) {
    let customerSpending = $('.dollas');
    customerSpending.empty().append(`Here is the total amount you have spent staying here: $${customerTotalSpent} `);
  }


}


export default domUpdates;
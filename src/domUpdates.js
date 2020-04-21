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
    let availableRoomSelect = $('#room-select');
    availableRoomSelect.empty();
    let roomOptions = '<option value="">Choose room</option>';
    availableRoomsList.forEach(room => {
      roomOptions = roomOptions.concat((`<option value="${room.number}">${room.number} ${room.roomType} (${room.bedSize})</option>`));
    })
    availableRoomSelect.append(roomOptions);
  },

  listCurrentUserTotalBookingsCost (allBookingsList) {
    let customerBookings = $('.dollas');
    customerBookings.append(` $${allBookingsList}`);
  },

}


export default domUpdates;
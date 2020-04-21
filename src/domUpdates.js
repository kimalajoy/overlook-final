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

  listCurrentUserTotalBookingsCost (allBookingsList) {
    let customerBookings = $('.dollas');
    customerBookings.append(` $${allBookingsList}`);
  },

}


export default domUpdates;
import { expect } from 'chai';
import User from '../src/user.js';
import Customer from '../src/customer.js'
import userData from '../src/dataSets/userData.js'


describe('Customer', () => {
  let customer;
  let userId;
  
  beforeEach(() => {
    customer = new Customer(userData, userId)
  });

  it('should be an instance of customer', () => {
    expect(customer).to.be.an.instanceOf(Customer);
  });
});
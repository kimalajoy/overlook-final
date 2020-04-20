import { expect } from 'chai';
import User from '../src/user.js';
import Customer from '../src/customer.js'


describe('Customer', () => {
  let customer;
  
  beforeEach(() => {
    customer = new Customer()
  });

  it('should be an instance of customer', () => {
    expect(customer).to.be.an.instanceOf(Customer);
  });
});
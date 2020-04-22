import User from '../src/user.js';

class Customer extends User {
  constructor (userData, userId) {
    super(userData)
    this.userId = userId;

    this.user = this.userData.find(customer => customer.id === userId);
  }
}

export default Customer;
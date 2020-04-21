import User from '../src/user.js';

class Customer extends User {
  constructor (userData, userId) {
    super(userData)
    this.userId = userId;
  }
}


export default Customer;
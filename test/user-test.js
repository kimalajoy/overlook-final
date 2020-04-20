import { expect } from 'chai';
import User from '/Users/home/turing/overlook-final/src/user.js';
import userData from '/Users/home/turing/overlook-final/src/dataSets/userData.js';



describe('User', () => {
  let user;
  
  beforeEach(() => {
    user = new User(userData)
  });

  it('should be an instance of registry', () => {
    expect(user).to.be.an.instanceOf(User);
  });

  describe('listAllCustomers', () => {

    it('should return a list of all customers in alphabetical order along with their ID', () => {
      
      expect(user.listAllCustomers()).to.deep.equal([
        { name: 'Fleta Schuppe', id: 6 },
        { name: 'Kelvin Schiller', id: 3 },
        { name: 'Kennedi Emard', id: 4 },
        { name: 'Leatha Ullrich', id: 1 },
        { name: 'Rhiannon Little', id: 5 },
        { name: 'Rocio Schuster', id: 2 }
      ])
    });
  });

})
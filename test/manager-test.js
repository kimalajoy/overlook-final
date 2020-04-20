import { expect } from 'chai';
import User from '../src/user.js';
import Manager from '/Users/home/turing/overlook-final/src/manager.js';



describe('Manager', () => {
  let manager;
  
  beforeEach(() => {
    manager = new Manager()
  });

  it('should be an instance of manager', () => {
    expect(manager).to.be.an.instanceOf(Manager);
  });

});
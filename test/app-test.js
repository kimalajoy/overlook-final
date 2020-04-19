import { expect } from 'chai';
import App from '../src/app.js';


describe('App', () => {
  let app;
  let user;
  let bookings;

  beforeEach(() => {
    app = new App(user, bookings);
  });

  it('should be an instance of app', () => {
    expect(app).to.be.an.instanceOf(App)
  })


})

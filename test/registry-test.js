import { expect } from 'chai';
import Registry from '../src/registry.js';
import bookingsData from '../src/dataSets/bookingsData.js';
import roomData from '../src/dataSets/roomsData.js';

describe('Registry', () => {
  let registry;
  
  beforeEach(() => {
    registry = new Registry(bookingsData, roomData)
  });

  it('should be an instance of registry', () => {
    expect(registry).to.be.an.instanceOf(Registry);
  });

  describe('getAvailableRoomCountByDate', () => {
    
    it('should return the rooms available for the date given', () => {
      
      expect(registry.getAvailableRoomCountByDate('2020/02/04')).to.equal(4)
    });
  });

  describe('getTotalRevenueByDate', () => {

    it('should return the total revenue for a given date', () => {

      expect(registry.getTotalRevenueByDate('2020/02/04')).to.equal(340.17)
    });
  });

  describe('getPercentOccupiedByDate', () => {
    
    it('should show the percent occupied by a given date', () => {

      expect(registry.getPercentOccupiedByDate('2020/02/04')).to.equal(20)
    });
  });
  
  describe('listOfBookingsByUser', () => {

    it('should give a list of bookings when given a userID', () => {

      expect(registry.listOfBookingsByUser(1)).to.deep.equal([
        {
          id: '5fwrgu4i7k55hl6t8',
          userID: 1,
          date: '2020/02/05',
          roomNumber: 12,
          roomServiceCharges: []
        }
      ])
    });

  });

  describe('getTotalBookingsCostByUser', () => {

    it('should give the total revenue produced by a user given a userID', () => {

      expect(registry.getTotalBookingsCostByUser(1)).to.equal(477)
    });
  });

  describe('getAvailableRoomsByDate', () => {

    it('should provide a list of available rooms after a date is selected', () => {

      expect(registry.getAvailableRoomsByDate('2020/01/10')).to.deep.equal([
        {
          number: 1,
          roomType: 'residential suite',
          bidet: true,
          bedSize: 'queen',
          numBeds: 1,
          costPerNight: 358.4
        },
        {
          number: 3,
          roomType: 'single room',
          bidet: false,
          bedSize: 'king',
          numBeds: 1,
          costPerNight: 491.14
        },
        {
          number: 4,
          roomType: 'single room',
          bidet: false,
          bedSize: 'queen',
          numBeds: 1,
          costPerNight: 429.44
        },
        {
          number: 5,
          roomType: 'single room',
          bidet: true,
          bedSize: 'queen',
          numBeds: 2,
          costPerNight: 340.17
        }
      ])
    })

  })

})
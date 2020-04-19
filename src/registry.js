class Registry {
  constructor (bookingsData, roomData) {
    this.bookingsData = bookingsData;
    this.roomData = roomData;
  }

  //dashboard methods
  getAvailableRoomsByDate(date) {
    let bookedRooms = this.bookingsData.filter(booking => booking.date === date).length;
    let roomsAvailable = this.roomData.length - bookedRooms;
    return roomsAvailable;
  }

  getTotalRevenueByDate(date) {
    let bookedRooms = this.bookingsData.filter(booking => booking.date === date);
    let totalRevenue = bookedRooms.reduce((acc, bookedRoom) => {
      let room = this.roomData.find(room => room.number === bookedRoom.roomNumber)
      acc += room.costPerNight;
      return acc;
    }, 0)
    return totalRevenue;
  }

  getPercentOccupiedByDate(date) {
    let bookedRooms = this.bookingsData.filter(booking => booking.date === date).length;
    let percentOccupied = (bookedRooms / this.roomData.length) * 100;
    return percentOccupied;
  }

  //user specific methods
  listOfBookingsByUser(userId) {
    let userBookings = this.bookingsData.filter(booking => booking.userID === userId);
    return userBookings;
  }

  getTotalBookingsCostByUser(userId) {
    let userBookings = this.bookingsData.filter(booking => booking.userID === userId);
    let totalUserRevenue = userBookings.reduce((acc, bookedRoom) => {
      let room = this.roomData.find(room => room.number === bookedRoom.roomNumber)
      acc += room.costPerNight;
      return acc;
    }, 0);
    return totalUserRevenue;
  }
}

export default Registry;
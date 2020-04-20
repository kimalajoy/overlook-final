class User {
  constructor(userData) {
    this.userData = userData;
  }

  listAllCustomers() {
    let allCustomers = this.userData.map(user => {
      return {name: user.name,
        id: user.id}
    }).sort((a, b) => b.name < a.name ?  1 
      : b.name > a.name ? -1 
        : 0);
    return allCustomers
  }

}

export default User;

    
export default {
  parseUserObject: (oldUserObj) => {
    const newUserObj = {
      createdAt: oldUserObj.createdAt,
      id: parseInt(oldUserObj.id),
      userType: parseInt(oldUserObj.userType),
      fullName: oldUserObj.fullName,
      address: oldUserObj.address,
      phone: oldUserObj.phone,
      email: oldUserObj.email
    }

    return newUserObj;
  }
}
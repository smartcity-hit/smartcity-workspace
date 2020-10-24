export default {
  checkID: (userId) => {
    const re = /^[0-9]{9}$/;
    if (!re.test(userId)) {
      return 'ID must contain 9 numbers';
    } else {
      return '';
    }
  },
  checkFullName: (fullName) => {
    const re = /^[a-zA-Z0-9 ]{1,15}$/;
    if (!re.test(fullName)) {
      return 'Full Name must contain 2-15 characters';
    } else {
      return '';
    }
  },
  checkAddress: (address) => {
    const re = /^[a-zA-Z0-9 ]{5,}$/;
    if (!re.test(address)) {
      return 'Address must contain atleast 5 characters';
    } else {
      return '';
    }
  },
  checkPhone: (phone) => {
    const re = /^([0-9]{3})-{0,1}([0-9]{7})$/;
    if (!re.test(phone)) {
      return 'Please insert a valid phone number';
    } else {
      return '';
    }
  },
  checkEmail: (email) => {
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,5})$/;
    if (!re.test(email)) {
      return 'Email is required and must be valid';
    } else {
      return '';
    }
  },
  checkPassword: (password) => {
    const re = /^[a-zA-Z0-9]{5,}$/;
    if (!re.test(password)) {
      return 'Password must contain atleast 5 characters';
    } else {
      return '';
    }
  },
  checkVerifyPassword: (password, verifyPassword) => {
    if (verifyPassword === '' || password !== verifyPassword) {
      return 'Passwords must be identical';
    } else {
      return '';
    }
  },
};

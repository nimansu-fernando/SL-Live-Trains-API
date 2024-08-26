exports.validateRegistration = (username, password) => {
    if (!username || !password) {
      return false;
    }
    return true;
  };
  
export const isValidUser = async (userName) => {
  if (userName.trim()) {
    try {
      // Make a GET API call
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbwCeHG0lORn8skSqZpjoVMLaPCt4URsS1DfSG1COoAqO0UhVGB-qjOjzLbK19Y7Vv4b1A/exec?action=validateUser&user=${userName}`,
        {
          redirect: 'follow',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
        }
      );
      const data = await response.json();
      if (data.message === 'success') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

export let checkForUser = async (token) => {
  const axios = require('axios').default;
  const res = await axios.get('/api/v1/users/verify', {
    headers: {
      'token': token,
    },
  });
  return res.status == 200 ? true : false;
};

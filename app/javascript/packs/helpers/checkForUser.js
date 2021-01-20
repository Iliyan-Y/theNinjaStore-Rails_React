import axios from 'axios';

export let checkForUser = (token, setIsUser) => {
  axios
    .get('/api/v1/users/verify', {
      headers: {
        token,
      },
    })
    .then((res) => res.status == 200 && setIsUser(res.data))
    .catch(() => {});
};

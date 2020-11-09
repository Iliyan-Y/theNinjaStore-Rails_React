import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const LogIn = () => {
  let history = useHistory();
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['user_token']);

  function submit(event) {
    event.preventDefault();

    let body = {
      user: {
        email,
        password,
      },
    };

    axios
      .post('/api/v1/users/sign_in', body)
      .then((res) => {
        let response = JSON.stringify(res.data);
        let parsed = JSON.parse(response);
        setCookie('user_token', parsed.data.user.auth_token, {
          maxAge: 3600,
        });
        // localStorage.setItem('user_token', parsed.data.user.auth_token);
        history.push('/');
      })
      .catch((err) => console.log(err.message));

    setEmail('');
    setPassword('');
  }

  return (
    <form onSubmit={(action) => submit(action)}>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="email"
        value={email}
        placeholder="email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        name="Password"
        placeholder="password"
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

export default LogIn;

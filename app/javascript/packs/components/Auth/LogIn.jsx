import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LogIn = () => {
  let history = useHistory();
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  async function submit(event) {
    event.preventDefault();

    let body = {
      user: {
        email,
        password,
      },
    };

    await axios
      .post('/api/v1/users/sign_in', body)
      .then((res) => {
        let response = JSON.stringify(res.data);
        let parsed = JSON.parse(response);
        localStorage.setItem('user_token', parsed.data.user.auth_token);
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

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
        setCookie('user_token', res.data, {
          maxAge: 3600,
        });
      })
      .then(() => history.push('/'))
      .catch((err) => console.error(err.message));

    setEmail('');
    setPassword('');
  }

  return (
    <form
      style={{ textAlign: 'center', border: '0.5px solid darkgrey' }}
      onSubmit={(action) => submit(action)}
      className="wid-50 mx-auto p-3"
    >
      <div className="form-group">
        <h4>Log In</h4>
        <label htmlFor="email">Email address</label>
        <input
          required
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          className="form-control wid-50 mx-auto"
          id="email"
          aria-describedby="email"
          value={email}
          placeholder="Email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          name="Password"
          placeholder="Password"
          className="form-control wid-50 mx-auto"
          id="password"
          aria-describedby="password"
        />
      </div>
      <input className="btn btn-primary mt-2" type="submit" value="Submit" />
    </form>
  );
};

export default LogIn;

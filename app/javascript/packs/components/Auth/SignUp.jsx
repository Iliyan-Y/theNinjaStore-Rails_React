import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [password_confirmation, setConfirmPassword] = useState('');
  let history = useHistory();

  function submit(event) {
    event.preventDefault();
    let body = {
      user: {
        email,
        password,
        password_confirmation,
      },
    };
    postData(body);
  }

  function postData(body) {
    axios
      .post('/api/v1/users', body)
      .then(() => {
        alert('Registration successful');
        history.push('/');
      })
      .catch((err) => {
        alert(err.response.data);
        console.error(err.message);
      });
  }

  return (
    <form
      style={{ textAlign: 'center', border: '0.5px solid darkgrey' }}
      onSubmit={(event) => submit(event)}
      className="wid-50 mx-auto p-3"
    >
      <h3>Sign Up</h3>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          required
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          className="form-control mx-auto"
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
          className="form-control mx-auto"
          id="password"
          aria-describedby="password"
        />
      </div>
      <div className="form-group">
        <label htmlFor="PasswordConfirmation">Confirm Password</label>
        <input
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={password_confirmation}
          type="password"
          name="PasswordConfirmation"
          id="PasswordConfirmation"
          aria-describedby="PasswordConfirmation"
          placeholder="Confirm Password"
          className="form-control mx-auto"
        />
        <input className="btn btn-primary mt-2" type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default SignUp;

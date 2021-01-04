import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [password_confirmation, setConfirmPassword] = useState('');

  async function submit(event) {
    event.preventDefault();

    let body = {
      user: {
        email,
        password,
        password_confirmation,
      },
    };

    await axios
      .post('/api/v1/users', body)
      .then((res) => console.log(res.status))
      .catch((err) => console.log(err.message));

    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  return (
    <form style={{ textAlign: 'center' }} onSubmit={(action) => submit(action)}>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="email"
        value={email}
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        name="Password"
        placeholder="Password"
      />
      <input
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={password_confirmation}
        type="password"
        name="PasswordConfirmation"
        placeholder="Confirm Password"
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default SignUp;

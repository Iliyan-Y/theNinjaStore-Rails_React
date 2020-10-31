import React from 'react';

const SignUp = () => {
  return (
    <form onSubmit={() => console.log('Submitted')}>
      <input type="email" name="email" />
      <input type="password" name="Password" />
      <input type="password" name="PasswordConfirmation" />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default SignUp;

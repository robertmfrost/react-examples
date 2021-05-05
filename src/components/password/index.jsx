import React, { useRef, useState } from 'react';
import { string } from 'prop-types';
import passwordCheck from './passwordCheck';
import { changed } from './passwordRequirements.json';
import './password.css';

const Password = ({ testId }) => {
  const [passwordChecks, setPasswordChecks] = useState([]);
  const newPassword = useRef();
  const retypePassword = useRef();

  const submitPasswordChange = e => {
    e.preventDefault();
    setPasswordChecks(passwordCheck((newPassword.current).value, (retypePassword.current).value));
  };

  return (
    <main className="password-page">
      <form
        className="password-form"
        onSubmit={submitPasswordChange}
        data-testid={`${testId}-form`}
      >
        <input
          className="password-input"
          type="password"
          placeholder="New Password"
          ref={newPassword}
          data-testid={`${testId}-new-input`}
        />
        <input
          className="password-input"
          type="password"
          placeholder="Retype Password"
          ref={retypePassword}
          data-testid={`${testId}-retype-input`}
        />
        <input
          className="password-submit"
          type="submit"
          value="Change Password"
          data-testid={`${testId}-submit`}
        />
        {passwordChecks.filter(check => !check.pass).map((check, index) => (
          <p
            key={`${index + 1}`}
            className={`password-error`}
          >{check.message}</p>
        ))}
        {Boolean(passwordChecks.length) && passwordChecks.length === (passwordChecks.filter(check => check.pass) || []).length && (
          <p data-testid={`${testId}-success`}>{changed}</p>
        )}
      </form>
    </main>
  );
};
Password.propTypes = {
  testId: string,
};
Password.defaultProps = {
  testId: 'password',
};

export default Password;

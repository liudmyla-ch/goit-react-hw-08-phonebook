import { logIn } from 'redux/auth/operations';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import styles from './LoginForm.module.css';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    if (email.trim() === '') {
      setEmailError(true);
    }
    if (password.trim() === '') {
      setPasswordError(true);
    }
    if (email.trim() && password.trim()) {
      dispatch(logIn({ email, password }));
    }
  };
  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Email Address:
        <input
          value={email}
          required
          onChange={handleChange}
          type="email"
          name="email"
          autoComplete="off"
          aria-invalid={emailError}
          {...(emailError && {
            'aria-describedby': 'email-error-message',
          })}
          className={emailError ? styles.inputError : styles.input}
        />
        {emailError && (
          <span id="email-error-message" className={styles.errorMessage}>
            This is a required field
          </span>
        )}
      </label>
      <label className={styles.label}>
        Password:
        <input
          value={password}
          required
          onChange={handleChange}
          type="password"
          name="password"
          autoComplete="off"
          aria-invalid={passwordError}
          {...(passwordError && {
            'aria-describedby': 'password-error-message',
          })}
          className={passwordError ? styles.inputError : styles.input}
        />
        {passwordError && (
          <span id="password-error-message" className={styles.errorMessage}>
            This is a required field
          </span>
        )}
      </label>
      <button type="submit" className={styles.button}>
        Log In
      </button>
      <p className={styles.register}>
        Don't have an account?{' '}
        <a href="/goit-react-hw-08-phonebook/register" className={styles.link}>
          Register
        </a>
      </p>
    </form>
  );
};

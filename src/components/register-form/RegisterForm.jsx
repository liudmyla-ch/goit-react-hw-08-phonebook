import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { register } from "redux/auth/operations";
import { validateEmail, validatePassword } from "components/Validations";
import styles from "./RegisterForm.module.css";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (name === "") {
      return;
    }
    if (name.trim() === "") {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [name, nameError]);

  useEffect(() => {
    if (email === "") {
      return;
    }
    if (!validateEmail(email.trim())) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [email, emailError]);

  useEffect(() => {
    if (password === "") {
      return;
    }
    if (!validatePassword(password.trim())) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [password, passwordError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      setNameError(true);
      setEmailError(true);
      setPasswordError(true);
      return;
    }
    if (!nameError && !emailError && !passwordError) {
      dispatch(register({ name, email, password }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} autoComplete="off" >
      <label className={styles.label}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
          aria-required="true"
          className={nameError ? styles.inputError : styles.input}
        />
        {nameError && <span className={styles.errorMessage}>This is a required field</span>}
      </label>

      <label className={styles.label}>
        Email Address
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
          aria-required="true"
          className={emailError ? styles.inputError : styles.input}
        />
        {emailError && <span className={styles.errorMessage}>Your email is invalid</span>}
      </label>

      <label className={styles.label}>
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
          aria-required="true"
          className={passwordError ? styles.inputError : styles.input}
        />
        {passwordError && (
          <span className={styles.errorMessage}>
            Password minimum length must be 8 and contain at least 1 big and 1 small letter and 1 number
          </span>
        )}
      </label>

      <button type="submit"className={styles.button}>Register</button>

      <p className={styles.login}>
        Already have an account? <a href="/goit-react-hw-08-phonebook/login" className={styles.link}>Log In</a>
      </p>

    </form>
  );
};

export {RegisterForm}

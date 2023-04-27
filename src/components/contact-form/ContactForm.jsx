import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ContactForm.module.css';
import { addContact } from 'redux/contacts/operations';
import { selectContacts } from 'redux/contacts/selectors';
import { validateName, validateNumber } from 'components/Validations';
import toast from 'react-hot-toast';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [nameError, setNameError] = useState(false);
  const [numberError, setNumberError] = useState(false);

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const checkContact = value => {
    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === value.toLowerCase()
    );
    return isInContacts;
  };

  useEffect(() => {
    if (name === '') {
      return;
    }
    if (!validateName(name.trim())) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [name]);

  useEffect(() => {
    if (number === '') {
      return;
    }
    if (!validateNumber(number.trim())) {
      setNumberError(true);
    } else {
      setNumberError(false);
    }
  }, [number]);

  const handleSubmit = e => {
    e.preventDefault();
    if (checkContact(name)) {
      return toast.error(`${name} is already in contacts.`);
    }
    if (
      nameError ||
      numberError ||
      name.trim() === '' ||
      number.trim() === ''
    ) {
      setNameError(true);
      setNumberError(true);
      return;
    }
    dispatch(addContact({ name, number }));
    reset();
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
    <h1 className={styles.title}>Phonebook</h1>
    <form className={styles.form} autoComplete="off" onSubmit={handleSubmit}>
      <label className={styles.label}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          className={nameError ? styles.inputError : styles.input}
          required
        />
        {nameError && <div className={styles.inputError}>Invalid name</div>}
      </label>
      <label className={styles.label}>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          className={numberError ? styles.inputError : styles.input}
          required
        />
        {numberError && (
          <div className={styles.errorMessage}>Invalid number</div>
        )}
      </label>
      <button type="submit" className={styles.button}>
        Add contact
      </button>
    </form>
    </>
  );
};

export default ContactForm;

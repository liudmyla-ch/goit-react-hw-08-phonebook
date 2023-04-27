import React, { useEffect } from 'react';
import ContactForm from 'components/contact-form/ContactForm';
import Filter from 'components/filter/Filter';
import ContactList from 'components/contact-list/ContactList';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getIsLoading, getError } from 'redux/contacts/selectors';
import { fetchContacts } from 'redux/contacts/operations';

export const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm />

      <>
        {isLoading && !error && <b>Request in progress...</b>}
        {contacts?.length > 0 && (
          <>
            <h2>Contacts</h2>
            <Filter />
            <ContactList />
          </>
        )}
      </>
    </>
  );
};

export default Contacts;

import React, { useEffect } from 'react';
import ContactForm from 'components/contact-form/ContactForm';
import Filter from 'components/filter/Filter';
import ContactList from 'components/contact-list/ContactList';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectContacts,
  selectIsLoading,
  selectError,
} from 'redux/contacts/selectors';
import { fetchContacts } from 'redux/contacts/operations';

export const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <ContactForm />

      {isLoading && !error && <b>Request in progress...</b>}
      {contacts?.length > 0 && (
        <>
          <Filter />
          <ContactList />
        </>
      )}
    </>
  );
};

export default Contacts;

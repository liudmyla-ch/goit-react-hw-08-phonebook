import styles from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { selectVisibleContacts } from 'redux/contacts/selectors';
import Contact from 'components/contact/Contact';

const ContactList = () => {
  const visibleContacts = useSelector(selectVisibleContacts);
 
  return (
    <ul className={styles.list}>
      {visibleContacts.map(contact => (
        <Contact contact={contact} key={contact.id} />
      ))}
    </ul>
  );
};

export default ContactList;

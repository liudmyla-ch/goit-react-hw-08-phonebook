import { useDispatch } from 'react-redux';
import styles from './Contacts.module.css'
import { deleteContact } from 'redux/contacts/operations';


const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(contact.id));
  
  return (
    <li key={contact.id} className={styles.item}>
      {contact.name}: {contact.number}
      <button type="button" className={styles.button} onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};



export default Contact;

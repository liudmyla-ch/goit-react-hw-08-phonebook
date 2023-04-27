import styles from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/contacts/filterSlise';
import { selectFilter } from 'redux/contacts/selectors';



const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChangeFilter = evt => {
    dispatch(setFilter(evt.target.value));
  };



  return (
    <> <h2 className={styles.title}>Contacts</h2>
      <form autoComplete="off" className={styles.form}>
        <label className={styles.label}>
          Find contacts by name
          <input
            name="filter"
            type="search"
            value={filter}
            onChange={handleChangeFilter}
            className={styles.input}
          />
        </label>
      </form>
    </>
  );
};

export default Filter;

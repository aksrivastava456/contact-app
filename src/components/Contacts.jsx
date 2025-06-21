import ContactCard from "./ContactCard";
import styles from "./Contacts.module.css";

const Contacts = ({ contacts, onEditClick, onDeleteClick }) => {
  return (
    <div className={styles.contactsContainer}>
      {contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
      ))}
    </div>
  );
};

export default Contacts;

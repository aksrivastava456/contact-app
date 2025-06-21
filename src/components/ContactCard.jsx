import styles from "./ContactCard.module.css";
import { IoIosContact } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { CgTrashEmpty } from "react-icons/cg";

const ContactCard = ({ contact, onEditClick, onDeleteClick }) => {
  return (
    <div className={styles.card}>
      <div
        style={{
          backgroundColor: "#ffeaae",
          display: "flex",
          marginLeft: "2px",
          gap: "10px",
        }}
      >
        <IoIosContact className={styles.contact} />
        <div className={styles.contactDetails}>
          <h3 className={styles.name}>{contact.name}</h3>
          <p className={styles.email}>{contact.email}</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "4px",
          backgroundColor: "#ffeaae",
          marginRight: "10px",
        }}
      >
        <button className={styles.button} onClick={() => onEditClick(contact)} >
          <RiEditCircleLine className={styles.edit} />
        </button>
        <button className={styles.button} onClick={() => onDeleteClick(contact.id)}>
          <CgTrashEmpty className={styles.delete} />
        </button>
      </div>
    </div>
  );
};

export default ContactCard;

import styles from "./Navbar.module.css";
import AppLogo from "../assets/images/logos_firebase.svg";
import { IoIosAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

const Navbar = ({ contacts, onAddClick, setFilteredContacts }) => {
  const handleContactSearch = (event) => {
    const contactSearch = event.target.value;
    if (contactSearch === "") setFilteredContacts(contacts);
    const filter = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(contactSearch.toLowerCase())
    );
    setFilteredContacts(filter);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <img src={AppLogo} alt="Logo" />
        <h3>Firebase Contact App</h3>
      </nav>
      <div className={styles.searchContainer}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search Contact"
          onChange={handleContactSearch}
        />
        <button className={styles.addButton} onClick={onAddClick}>
          <IoIosAddCircle className={styles.addIcon} />
        </button>
      </div>
    </>
  );
};

export default Navbar;

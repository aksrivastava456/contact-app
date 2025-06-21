import { useEffect, useState } from "react";
import styles from "./App.module.css";
import Navbar from "./components/Navbar";
import NoContactCard from "./components/NoContactCard";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./config/firebase";
import Contacts from "./components/Contacts";
import AddContactModal from "./components/AddContactModal";
import EditContactModal from "./components/EditContactModal";

function App() {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const contactsSnapshot = await getDocs(contactsRef);
        const contactsList = contactsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(contactsList);
        setFilteredContacts(contactsList);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    getContacts();
  }, []);

  const handleAddContact = async (contact) => {
    try {
      // Add to Firestore
      const docRef = await addDoc(collection(db, "contacts"), {
        name: contact.name,
        email: contact.email,
      });
      // Add the new contact to state with Firestore-generated id
      setContacts((prev) => [
        ...prev,
        { id: docRef.id, name: contact.name, email: contact.email },
      ]);
      // Also update filteredContacts to include the new contact
      setFilteredContacts((prev) => [
        ...prev,
        { id: docRef.id, name: contact.name, email: contact.email },
      ]);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const handleEditContact = async (contact) => {
    try {
      // Update Firestore document
      const contactRef = doc(db, "contacts", contact.id);
      await updateDoc(contactRef, {
        name: contact.name,
        email: contact.email,
      });
      // Update the contact in state
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? contact : c))
      );
      // Also update filteredContacts
      setFilteredContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? contact : c))
      );
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      // Delete from Firestore
      const contactRef = doc(db, "contacts", contactId);
      await deleteDoc(contactRef);
      // Remove the contact from state
      setContacts((prev) => prev.filter((c) => c.id !== contactId));
      // Also update filteredContacts
      setFilteredContacts((prev) => prev.filter((c) => c.id !== contactId));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <Navbar
        onAddClick={() => setShowModal(true)}
        contacts={contacts}
        setFilteredContacts={setFilteredContacts}
      />
      {showModal && (
        <AddContactModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddContact}
        />
      )}
      {/* Render NoContactCard if filteredContacts is empty, else render Contacts */}
      {filteredContacts && filteredContacts.length > 0 ? (
        <>
          <Contacts
            contacts={filteredContacts}
            onEditClick={(contact) => setEditContact(contact)}
            onDeleteClick={(contactId) => handleDeleteContact(contactId)}
          />
          {editContact && (
            <EditContactModal
              contact={editContact}
              onClose={() => setEditContact(null)}
              onEdit={handleEditContact}
            />
          )}
        </>
      ) : (
        <NoContactCard />
      )}
    </div>
  );
}

export default App;

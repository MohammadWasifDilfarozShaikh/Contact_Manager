import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContentList";
import ContactDetails from "./components/ContactDetails";
import EditContact from "./components/EditContact";
import api from "./api/contacts";
import "./index.css";
import "./App.css";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  // Fetch contacts from API
  const fetchContacts = async () => {
    try {
      const response = await api.get("/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Add Contact
  const addContactHandler = async (contact) => {
    try {
      const response = await api.post("/contacts", contact);
      setContacts((prevContacts) => [...prevContacts, response.data]);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  // Update Contact
  const updateContactHandler = async (updatedContact) => {
    try {
      const response = await api.put(`/contacts/${updatedContact._id}`, updatedContact);
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === updatedContact._id ? response.data : contact
        )
      );
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  // Delete Contact
  const deleteContactHandler = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  // Search Handler
  useEffect(() => {
    if (searchTerm) {
      setFilteredContacts(
        contacts.filter((contact) =>
          Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredContacts(contacts);
    }
  }, [searchTerm, contacts]);

  return (
    <Router>
      <Header />
      <hr />
      <Routes>
        <Route
          path="/"
          element={
            <ContactList
              contacts={searchTerm ? filteredContacts : contacts}
              term={searchTerm}
              searchKeyWord={setSearchTerm}
              getContactId={deleteContactHandler}
            />
          }
        />
        <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />} />
        <Route path="/edit/:id" element={<EditContact updateContactHandler={updateContactHandler} />} />
        <Route path="/contact/:id" element={<ContactDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

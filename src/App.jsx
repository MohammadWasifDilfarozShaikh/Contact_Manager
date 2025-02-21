import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import AddContactWrapper from "./components/AddContactWrapper"; // Wrapper for Class Component
import ContactList from "./components/ContentList";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import ContactDetails from "./components/ContactDetails";
import api from "./api/contacts";
import EditContact from "./components/EditContact";
import './App.css'

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // Fetch contacts from API
  const retrieveContacts = async () => {
    try {
      const resp = await api.get("/users");
      return resp.data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    fetchContacts();
  }, []);

  // Add Contact
  const addContactHandler = async (contact) => {
    const newContact = { id: uuidv4(), ...contact };

    try {
      const resp = await api.post("/users", newContact);
      setContacts((prevContacts) => [...prevContacts, resp.data]);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  // Update Contact
  const updateContactHandler = async (contact) => {
    try {
      const response = await api.put(`/users/${contact.id}`, contact);
      setContacts((prevContacts) =>
        prevContacts.map((curElm) =>
          curElm.id === contact.id ? { ...response.data } : curElm
        )
      );
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  // Delete Contact
  const deleteContact = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setContacts((prevContacts) => prevContacts.filter((curElm) => curElm.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  // Search Handler
  const SearchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const filteredContacts = contacts.filter((curElm) =>
        Object.values(curElm).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResult(filteredContacts);
    } else {
      setSearchResult(contacts);
    }
  };

  return (
    <Router>
      <Header />
      <hr />
      <Routes>
        <Route
          path="/"
          element={
            <ContactList
              contacts={searchTerm ? searchResult : contacts}
              term={searchTerm}
              searchKeyWord={SearchHandler}
              getContactId={deleteContact}
            />
          }
        />
        <Route path="/add" element={<AddContactWrapper addContactHandler={addContactHandler} />} />
        <Route path="/edit" element={<EditContact updateContactHandler={updateContactHandler} />} />
        <Route path="/contact/:id" element={<ContactDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

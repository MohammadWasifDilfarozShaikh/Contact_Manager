import React, { useRef, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContentList = ({ contacts = [], getContactId, searchKeyWord, term = "" }) => {
  const inputElement = useRef("");

  const deleteData = (id) => {
    if (id) {
      getContactId(id);
    }
  };

  const getSearchTerm = () => {
    if (inputElement.current) {
      searchKeyWord(inputElement.current.value.trim());
    }
  };

  const renderContactList = useMemo(
    () =>
      contacts.length > 0
        ? contacts.map((contact) => (
            <ContactCard contact={contact} clickHandler={deleteData} key={contact.id || Math.random()} />
          ))
        : <p className="text-center text-muted">No Contact Available</p>,
    [contacts]
  );

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded shadow-sm">
        <h2 className="text-primary">Contact List</h2>
        <Link to="/add" className="btn btn-success">
          <i className="bi bi-person-plus"></i> Add Contact
        </Link>
      </div>

      {/* Search Section */}
      <div className="input-group my-3">
        <input
          ref={inputElement}
          type="text"
          className="form-control"
          placeholder="Search Contacts"
          aria-label="Search Contacts"
          defaultValue={term}
          onChange={getSearchTerm}
        />
        <span className="input-group-text">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
      </div>

      {/* Contact Cards List */}
      <div>{renderContactList}</div>
    </div>
  );
};

export default ContentList;

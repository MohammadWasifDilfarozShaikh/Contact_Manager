import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddContact = ({ addContactHandler }) => {
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();
    if (!contact.name || !contact.email || !contact.phone) {
      alert("All fields are mandatory!");
      return;
    }
    addContactHandler(contact);
    setContact({ name: "", email: "", phone: "" });
    navigate("/"); // ✅ Redirect to home after adding
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 tt">
      <div className="card shadow-lg p-4 w-50">
        <h2 className="text-center text-primary mb-4">Add Contact</h2>
        <form onSubmit={add}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your phone number"
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            />
          </div>

          <button className="btn btn-primary w-100">Add Contact</button>
        </form>
      </div>
    </div>
  );
};

export default AddContact;

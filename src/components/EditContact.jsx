import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditContact = ({ updateContactHandler }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const contact = location.state?.contact || { id: "", name: "", email: "" };
  
  const [id] = useState(contact.id);
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);

  const updateContact = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("All fields are mandatory");
      return;
    }

    updateContactHandler({ id, name, email });
    navigate("/");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 w-50 w-md-75 w-sm-100 border-0">
        <h2 className="text-center text-primary mb-4">Edit Contact</h2>
        <form onSubmit={updateContact}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100 fw-bold py-2">Update Contact</button>
        </form>
      </div>
    </div>
  );
};

export default EditContact;

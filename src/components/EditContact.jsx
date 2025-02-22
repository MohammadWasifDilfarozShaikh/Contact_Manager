import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditContact = ({ updateContactHandler }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const contact = location.state?.contact || { id: "", name: "", email: "" };

  // Initialize state directly with the contact object
  const [formData, setFormData] = useState({ ...contact });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateContact = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("All fields are mandatory");
      return;
    }

    updateContactHandler(formData);
    navigate("/");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 w-50 w-md-75 w-sm-100 border-0">
        <h2 className="text-center text-primary mb-4">Edit Contact</h2>
        <form onSubmit={updateContact}>
          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              aria-label="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              aria-label="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold py-2">Update Contact</button>
        </form>
      </div>
    </div>
  );
};

export default EditContact;

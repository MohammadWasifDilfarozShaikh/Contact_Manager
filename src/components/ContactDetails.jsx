import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import api from "../api/contacts"; 

const ContactDetails = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state
  const [error, setError] = useState(null); // ✅ Added error state

  useEffect(() => {
    if (!id) return; // ✅ Ensure `id` exists before making API call

    const fetchContact = async () => {
      try {
        const response = await api.get(`/contacts/${id}`);
        if (response.data) {
          setContact(response.data);
        } else {
          setError("Contact not found.");
        }
      } catch (error) {
        console.error("Error fetching contact details:", error);
        setError("Failed to fetch contact details.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchContact();
  }, [id]);

  // ✅ Show loading state
  if (loading) {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-primary">Loading Contact Details...</h2>
      </div>
    );
  }

  // ✅ Show error message if contact not found
  if (error || !contact) {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger">{error || "No Contact Data Found"}</h2>
        <Link to="/" className="btn btn-secondary mt-3">Back to Contact List</Link>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <div className="card-body text-center">
          <FontAwesomeIcon icon={faUser} className="mb-3 text-primary" size="3x" />
          <h4 className="card-title text-dark">{contact.name || "No Name Provided"}</h4>
          <p className="card-text text-muted">{contact.email || "No Email Provided"}</p>
          <Link to="/" className="btn btn-primary mt-3">Back to Contact List</Link>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;

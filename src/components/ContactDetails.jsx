import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ContactDetails = () => {
  const location = useLocation();
  const contact = location.state?.contact; 
  
  if (!contact) {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger">No Contact Data Found</h2>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <div className="card-body text-center">
          <FontAwesomeIcon
            icon={faUser}
            className="mb-3 text-primary"
            style={{ width: "50px", height: "50px" }}
          />
          <h4 className="card-title text-dark">{contact.name}</h4>
          <p className="card-text text-muted">{contact.email}</p>
          <Link to="/" className="btn btn-primary mt-3">
            Back to Contact List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;

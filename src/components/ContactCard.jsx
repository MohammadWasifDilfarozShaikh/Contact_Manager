import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-12">
          <div className="card shadow-sm mb-3 border-0" style={{ borderRadius: "10px" }}>
            <div className="card-body d-flex justify-content-between align-items-center p-3">
              
              {/* Left Side - User Icon and Info */}
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faUser} className="text-primary me-3" style={{ fontSize: "35px" }} />
                <Link to={`/contact/${id}`} state={{ contact: props.contact }} className="text-decoration-none text-dark">
                  <h5 className="mb-1 fw-bold">{name}</h5>
                  <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>{email}</p>
                </Link>
              </div>

              {/* Right Side - Action Buttons */}
              <div className="d-flex gap-2">
              
                <Link to={'/edit'} state={{contact:props.contact}}
                  className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} style={{ fontSize: "18px" }} />
                </Link>

                
              
                <button
                  className="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this contact?")) {
                      props.clickHandler(id);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} style={{ fontSize: "18px" }} />
                </button>
      
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;

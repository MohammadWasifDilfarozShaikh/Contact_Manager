import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ContactCard = ({ contact, clickHandler }) => {
  const { _id, name, email } = contact || {}; // ✅ Changed `id` to `_id`

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-12">
          <div className="card shadow-sm mb-3 border-0 rounded-3">
            <div className="card-body d-flex justify-content-between align-items-center p-3">
              
              {/* Left Side - User Icon and Info */}
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faUser} className="text-primary me-3" size="2x" />
                <Link to={`/contact/${_id}`} state={{ contact }} className="text-decoration-none text-dark">
                  <h5 className="mb-1 fw-bold">{name || "Unknown"}</h5>
                  <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
                    {email || "No Email Available"}
                  </p>
                </Link>
              </div>

              {/* Right Side - Action Buttons */}
              <div className="d-flex gap-2">
              
                {/* Edit Button */}
                <Link
                  to={`/edit/${_id}`} // ✅ Fixed path
                  state={{ contact }}
                  className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} size="sm" />
                </Link>

                {/* Delete Button */}
                <button
                  className="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this contact?")) {
                      clickHandler(_id); // ✅ Changed `id` to `_id`
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} size="sm" />
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

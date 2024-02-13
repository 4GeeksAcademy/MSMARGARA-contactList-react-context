import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const ContactCard = ({ contact }) => {
  const { actions } = useContext(Context);

  const handleDeleteContact = async () => {
    await actions.deleteContact(contact.id); 
    actions.listContacts(); 
  };

  return (
    <div className="card contactCard">
      <div className="row">
        <div className="col-md-2 colorColumn1"></div>
        <div className="col-md-1 colorColumn2"></div>
        <div className="col-md-3">
          <img
            src={contact.image || "https://via.placeholder.com/150"} 
            className="img-fluid rounded-start"
            alt="Contact"
          />
        </div>
        <div className="col-md-4">
          <div className="card-body">
            <p className="card-text">Name: {contact.full_name}</p>
            <p className="card-text">Address: {contact.address}</p>
            <p className="card-text">Phone: {contact.phone}</p>
            <p className="card-text">Email: {contact.email}</p>
          </div>
        </div>
        <div className="col-md-1">
            <Link to={`/edit/${contact.id}`} className="btn btn-primary">
                <span className="bi bi-pencil-fill">lapiz</span>
            </Link>
        </div>
        <div className="col-md-1">
          <button className="btn btn-danger" onClick={handleDeleteContact}>
            <span className="bi bi-trash-fill">tacho</span> 
          </button>
        </div>
      </div>
    </div>
  );
};


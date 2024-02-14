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
          <div className="col-md-2">
            <img
              src={contact.image || "https://github.com/4GeeksAcademy/MSMARGARA-contactList-react-context/blob/master/src/img/photo.jpg?raw=true"} 
              className="img-fluid rounded-start img"
              alt="Contact"
            />
          </div>
          <div className="col-md-6">
            <div className="card-body text">
              <p className="card-text name">{contact.full_name}</p>
              <p className="card-text data">ADDRESS:  <span className="italic">{contact.address}</span></p>
              <p className="card-text data">PHONE:  <span className="italic">{contact.phone}</span></p>
              <p className="card-text data">EMAIL:  <span className="italic">{contact.email}</span></p>
            </div>
          </div>
          <div className="col-md-2 offset-md-1 d-flex align-items-center justify-content-center flex-column">
            <Link to={`/edit/${contact.id}`} className="btn btn_edit">
                Edit
            </Link>
            <button className="btn btn_delete" onClick={handleDeleteContact}>
                Delete
            </button>
        </div>
      </div>
    </div>
  );
};


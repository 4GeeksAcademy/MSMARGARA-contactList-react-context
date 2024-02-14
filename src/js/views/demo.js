import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

export const Demo = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams(); 
    const location = useLocation(); 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
	const agenda_slug = store.agenda_slug
    const [errorMessage, setErrorMessage] = useState("");

    const editContact = async () => {
        const response = await actions.updateContact(id, name, email, address, phone);
        console.log(response); 
    };

    const addContact = async () => {
        const response = await actions.addContact(name, email, phone, address);
        console.log(response); 
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !email || !phone || !address) {
            setErrorMessage("Fields cannot be left blank. Please fill them all.");
            return; 
        }
        setErrorMessage("");
        if (location.pathname.startsWith("/edit")) {
            await editContact(); 
        } else {
            await addContact(); 
        }
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
    };
    
    useEffect(() => {
        if (location.pathname.startsWith("/edit")) {
            const fetchContactDetails = async () => {
                try {
                    const contactDetails = await actions.getContact(id);
                    setName(contactDetails.full_name);
                    setEmail(contactDetails.email);
                    setPhone(contactDetails.phone);
                    setAddress(contactDetails.address);
                } catch (error) {
                    console.error("Error fetching contact details:", error.message);
                }
            };
            fetchContactDetails();
        }
    }, [id, actions, location.pathname]);

    return (
        <div className="addContainer">
            <div className="contact-form-component">
                <div className="row">
                    <div className="col-1 colColor"></div>
                    <div className="col-4 titleForm"> <h2>{location.pathname.startsWith("/edit") ? "Edit your contact" : "New contact here!"}</h2></div>
                    <div className="col-7"></div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="inputName">NAME</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputEmail">EMAIL</label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPhone">PHONE</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputPhone"
                            placeholder="Enter phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">ADDRESS</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAddress"
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    {errorMessage && <p className="msg-error">{errorMessage}</p>}
                    <div className="button-container d-flex justify-content-end">
                        <button type="submit" className="btnAddContact" onClick={handleSubmit}>{location.pathname.startsWith("/edit") ? "Save" : "Create"}</button>
                    </div>
                    <div className="d-flex justify-content-end link">
                        <Link to="/">
                            <p>Get back to contacts</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};



import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams(); // Obtener el ID del contacto de los parámetros de ruta
    const location = useLocation(); // Obtener la URL actual

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
	const agenda_slug = store.agenda_slug

    // Función para editar un contacto existente
    const editContact = async () => {
        // Llamar a la acción para editar contacto
        const response = await actions.updateContact(id, name, email, agenda_slug, address, phone);
        console.log(response); // Puedes hacer algo con la respuesta si lo necesitas
    };

    // Función para agregar un nuevo contacto
    const addContact = async () => {
        // Llamar a la acción para agregar contacto
        const response = await actions.addContact(name, email, phone, address);
        console.log(response); // Puedes hacer algo con la respuesta si lo necesitas
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Determinar la funcionalidad según la URL actual
        if (location.pathname.startsWith("/edit")) {
            await editContact(); // Editar un contacto existente
        } else {
            await addContact(); // Agregar un nuevo contacto
        }

        // Limpiar campos después de agregar o editar contacto
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
    };

    useEffect(() => {
        // Si la URL actual es para editar un contacto, cargar los detalles del contacto
        if (location.pathname.startsWith("/edit")) {
            // Llamar a la acción para obtener los detalles del contacto por ID
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
        <div className="contact-form-component">
            <h2>{location.pathname.startsWith("/edit") ? "Edit Contact" : "Add Contact"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="inputName">Name</label>
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
                    <label htmlFor="inputEmail">Email</label>
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
                    <label htmlFor="inputPhone">Phone</label>
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
                    <label htmlFor="inputAddress">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                </button>
                <Link to="/">
                    <p>Get back to contacts</p>
                </Link>
            </form>
        </div>
    );
};



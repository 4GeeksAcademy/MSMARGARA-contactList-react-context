import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components.css";

export const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="d-flex justify-content-between align-items-center w-100">
				<span className="ml-auto title">Hey Contacts, Hi!</span>
				<Link to="/demo">
					<button className="btn addContact">Add new contact</button>
				</Link>
			</div>
		</nav>
	);
};

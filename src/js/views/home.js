import React, { useContext, useEffect } from "react";
import { Navbar } from "../component/navbar";
import { ContactCard } from "../component/contactCard";
import { Context } from "../store/appContext"; // Importa el contexto global

export const Home = () => {
	const { store, actions } = useContext(Context);
  
	// URL de la imagen fija
	const defaultImageUrl = "https://via.placeholder.com/150";
  
	useEffect(() => {
	  actions.listContacts();
	}, []);
  
	return (
	  <div>
		<Navbar />
		<div className="text-center mt-5">
		  {store.contacts.map((contact, index) => (
			<ContactCard
			  key={index}
			  contact={contact}
			  defaultImageUrl={defaultImageUrl}
			/>
		  ))}
		</div>
	  </div>
	);
  };
  
  export default Home;


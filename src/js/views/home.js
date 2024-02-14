import React, { useContext, useEffect } from "react";
import { Navbar } from "../component/navbar";
import { Footer} from "../component/footer"
import { ContactCard } from "../component/contactCard";
import { Context } from "../store/appContext"; 
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const defaultImageUrl = "https://via.placeholder.com/150";
  
	useEffect(() => {
	  actions.listContacts();
	}, []);
  
	return (
	  <div>
		<Navbar />
		<div className="home">
			<div className="text-center">
			{store.contacts.map((contact, index) => (
				<ContactCard
				key={index}
				contact={contact}
				defaultImageUrl={defaultImageUrl}
				/>
			))}
			</div>
		</div>
		<Footer/>
	  </div>
	);
  };
  
  export default Home;


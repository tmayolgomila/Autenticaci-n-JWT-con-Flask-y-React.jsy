import React, { useContext } from "react";
import { Context } from "../store/appContext";
import SignUp from "../component/sign";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<SignUp/>
		
		</div>
	);
};

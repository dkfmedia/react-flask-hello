import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate} from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	
	return (
		<div className="text-center mt-5 ">
			<h1>Welcome! </h1>
			<p>
				Select one of the following options: 
			</p>

			<div className="d-grid gap-2 col-6 mx-auto my-5">
			<Link to='/login'>
				<button className="btn btn-outline-secondary" type="button">Click here to Login</button>
			</Link>

			<Link to="/signup">
				<button className="btn btn-outline-secondary" type="button">Click here to sign up</button>
			</Link>
			
			</div>
		</div>
	);
};

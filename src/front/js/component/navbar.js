import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="nav navbar">
			<div className="container">
				<Link style={{ textDecoration: 'none' , color: 'red'}} to="/">
					<span className="navbar-brand mb-0 h1">Thanks for checking me out</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
					 <button className="btn btn-outline-secondary" type="button">Login</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};

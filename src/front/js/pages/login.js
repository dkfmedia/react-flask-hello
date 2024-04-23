import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
	const{store, actions} = useContext(Context)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = (e) => { 
		e.preventDefault();
		actions.login(email, password)
	}

	const navigate = useNavigate()

	if (store.token && store.token !== "" && store.token !== undefined ) {
            navigate("/profile") 
	} 
 
	return (
		<div className="d-flex justify-content-center mt-5"> 
				<form>
						<div className="mb-3">
						<div id="emailHelp" className="form-text mb-3">Welcome back, please sign in✨ </div>
							<label for="exampleInputEmail1" className="form-label">Email address</label>
							<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
							placeholder="your_email@icloud.com"
							onChange={e => setEmail(e.target.value)} 
							value={email} />
						</div>
						<div className="mb-3">
							<label for="exampleInputPassword1" className="form-label">Password</label>
							<input type="password" className="form-control" id="exampleInputPassword1"
							placeholder="*********"
							onChange={e => setPassword(e.target.value)} 
							value={password}
							/>
						</div>
						<Link to="/profile"> 
							<button className="btn btn-outline-success" type="button"
							onClick={handleLogin} >Login</button>
						</Link>
						

					<p className="mt-5"> Don't have an account yet? Select one of the following options: </p>
				<div className="d-flex justify-content-between my-5">
					<Link to="/signup">
							<button className="btn btn-outline-success" type="button">Register</button>
						</Link>
						<Link to="/">
							<button className="btn btn-outline-danger" type="button">Back home</button>
					</Link>
				</div>
			</form>
		</div>
	);
};

import React, {useState, useContext, useEffect} from "react";
import { Link , useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup = () => {
	
	const{store, actions} = useContext(Context)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState()

	const handleSubmit = () => { 
		actions.signup(email, password)
	}

	const navigate = useNavigate()

	useEffect(() => { 
		if (store.message != null && store.message != "" )
		{
			setError(store.message)
		}
	}, [store.message])

	
	return (
		<div className="d-flex justify-content-center mt-5"> 
				<form>
						<div className="mb-3">
							<label for="exampleInputEmail1" className="form-label">Email address</label>
							<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
							onChange={e => setEmail(e.target.value)} 
							value={email}/>
							<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
						</div>
						<div className="mb-3">
							<label for="exampleInputPassword1" className="form-label">Password</label>
							<input type="password" className="form-control" id="exampleInputPassword1"
							onChange={e => setPassword (e.target.value)} 
							value={password}
							/>
						</div>
						<div className="mb-3 form-check">
							<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
							<label className="form-check-label" for="exampleCheck1">Check me out</label>
						</div>
				<div className="d-flex justify-content-between mb-5">

					<Link to="/login">
							<button className="btn btn-outline-success" type="button" 
							onClick={handleSubmit}> Register</button>
						</Link>
						
						{/* <div>{error != null && error}
						{error != null && <Link to="/login">
							 Login 
							 <Link/> } 
						</div>  */}

						<Link to="/">
							<button className="btn btn-outline-danger" type="button">Back home</button>
					</Link>
				</div>
			</form>
		</div>
	);
};


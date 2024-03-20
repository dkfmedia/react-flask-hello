import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import { Context } from "../store/appContext";


export const Profile = () => {
    const{store, actions} = useContext(Context)

    const navigate = useNavigate()

    useEffect(() => { 
        if (store.token && store.token !== "" && store.token !== undefined ?
            navigate("/profile")
            : 
            navigate("/login"));
    }, [store.token]) 

	return (
		<div className="d-flex justify-content-center mt-5"> 
			<h1> Welcome to your profile </h1> 
						<div className="mb-3">
						<div id="emailHelp" className="form-text mb-3">Welcome back, please sign in✨ </div>
							<label for="exampleInputEmail1" className="form-label">Email address</label>
							<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
							placeholder="your_email@icloud.com"/>
						</div>
                    </div> 
        )
    };
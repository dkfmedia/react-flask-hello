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
		<div className="m-5"> 
			<h1> Welcome to your profile </h1> 
            <div className="justify-content-center m-4 w-25"> 
				<p>Here's your token: <br/> 
                {store.token}</p> 	
                </div> 	
            </div> 
        )
    };
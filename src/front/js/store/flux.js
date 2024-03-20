const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token:null, 
			
		},
		actions: {
			syncSessionToken:() => { 
				const token = sessionStorage.getItem("token");
				if(token && token !== "" && token !== undefined){
					setStore({token: token})
				}
			},
			login: async(email, password ) => { 
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(
						{
							email:email,
							password:password
						}
					)
				}
			try { 
				const response = await fetch (process.env.BACKEND_URL + "/api/token", options)
				if (response.status !== 200) { 
					alert("ERROR RESPONSE CODE!", response.status)
					return false
				}
				const data = await response.json()
				console.log("access token", data)
				sessionStorage.setItem("token", data.access_token)
				setStore ({token: data.access_token})
				return true
			}
			catch(error){ 
				console.log("login error, please try again")
			}

			},
			logout:() => { 
				sessionStorage.removeItem("token")
				console.log("You are logged out")
				setStore ({token: null})
			},

			signup: async(email, password ) => { 
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(
						{
							email:email,
							password:password
						}
					)
				}
			try { 
				const response = await fetch (process.env.BACKEND_URL + "/api/token", options)
				if (response.status !== 200) { 
					alert("ERROR RESPONSE CODE!", response.status)
					return false
				}
				const data = await response.json()
				console.log("signup data", data)
				return true 
			}
			catch(error){ 
				console.log("signup error")
			}
		}
		},
		getMessage: async () => {
			const store = getStore();
			const options = {
				headers: {
					"Authorization": "Bearer " + store.token
				},
			}
			try  {
				// fetching data from the backend
				const response = await fetch(process.env.BACKEND_URL + "/api/hello", options)
				const data = await response.json()
				setStore({ message: data.message })
				// don't forget to return something, that is how the async resolves
				return data;
			} catch (error) {
				console.log("Error loading message from backend", error)
			}
		}
	
	}
};

export default getState;

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			 setUsers : async (username,email, password) => {
				const resp = await fetch(`https://3001-tmayolgomil-jwtconflask-1mt3mvq5b43.ws-eu54.gitpod.io/token`, { 
					 method: "POST",
					 headers: { "Content-Type": "application/json" },
					 body: JSON.stringify({ "username": username,"email":email, "password": password }) 
				})
		   
				if(!resp.ok) throw Error("There was a problem in the login request")
		   
				if(resp.status === 401){
					 throw("Invalid credentials")
				}
				else if(resp.status === 400){
					 throw ("Invalid email or password format")
				}
				const data = await resp.json()
				// save your token in the localStorage
			   //also you should set your user into the store using the setStore function
				localStorage.setItem("jwt-token", data.token);
		   
				return data
		   },
		

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			}
		}
	};
};

export default getState;

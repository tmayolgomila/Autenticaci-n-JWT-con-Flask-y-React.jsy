

const getState = ({ getStore, getActions, setStore }) => {
	return {
    store: {
      message: null,
      auth: false,
      token: "bienvenido",
      email: null,
      username: null,

      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      signup: async (username, email, password) => {
		try{console.log(username, email, password);
			const resp = await fetch(process.env.BACKEND_URL + "/signup", {
			  method: "POST",
			  headers: { "Content-Type": "application/json" },
			  body: JSON.stringify({ username, email, password }),
			});
	
			if (!resp.ok) throw Error("There was a problem in the login request");
	
			if (resp.status === 401) {
			  throw "Invalid credentials";
			} else if (resp.status === 400) {
			  throw "Invalid email or password format";
			}
			const data = await resp.json();
			setStore({ email: email });
			setStore({ username: username });
			setStore({ password: password });
	
			localStorage.setItem("jwt-token", username);
			setStore({ token: username });
			return data;}
			catch(err){
				alert(err)
			}
        
      },

      login: async (username, password, navigate) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          });

          if (!resp.ok) throw Error("There was a problem in the login request");

          if (resp.status === 401) {
            throw "Invalid credentials";
          } else if (resp.status === 400) {
            throw "Invalid email or password format";
          }
          navigate("/private");
          const data = await resp.json();
          setStore({ username: username });
          setStore({ password: password });
          setStore({ auth: true });
          localStorage.setItem("jwt-token", username);
          setStore({ token: username });
          return data;
        } catch (err) {
          alert(err);
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        setStore({ auth: false });
        setStore({ username: null });
        setStore({ email: null });
      },
    },
  };
};

export default getState;

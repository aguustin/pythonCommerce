import { createContext, useState } from "react";
import { loginRequest, signInRequest } from "../components/api/authRequests";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({children}) => {

    const navigate = useNavigate();

    const [session, setSession] = useState([]);
    const [SHCart, setSHCart] = useState(false);

    const signInContext = async (data) => {
      for(const key in data) {
        if(!data[key]){
            alert(`Missing ${key}`)
            return false;
        }
      }
      const res = await signInRequest(data);
      if(res.status === 200){
          await signInRequest(data);
          alert(`Successfully signed`)
      }
    }

    const loginContext = async (data) => {
        const res = await loginRequest(data);
        console.log(res.data)
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(res.data[0]));
        await setSession(JSON.parse(localStorage.getItem('user')));
        navigate('/');
    }

    return(
        <AuthContext.Provider value={{session, SHCart, setSHCart, signInContext, loginContext}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
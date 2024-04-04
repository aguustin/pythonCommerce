import { createContext, useState } from "react"

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [SHCart, setSHCart] = useState(false);

    const signIn = () => {

    }

    const login = () => {
        setSHCart(true);
    }

    return(
        <AuthContext.Provider value={{SHCart, setSHCart, signIn, login}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../../firebase.init";

export const AuthContext = createContext();
const getAdmin = () => {
    let admin = localStorage.getItem("admin");
    if (admin) {
        return JSON.parse(localStorage.getItem("admin"));
    } else {
        const data = "empty";
        return data;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})
    console.log("🚀 ~ file: AuthContext.js:21 ~ AuthContextProvider ~ currentUser:", currentUser)
    const [currentAdmin, setCurrentAdmin] = useState(getAdmin())
    const [loader, setLoader] = useState('')
    console.log("🚀 ~ file: AuthContext.js:22 ~ AuthContextProvider ~ currentAdmin:", currentAdmin)

    const auth = getAuth(app)
    const [user, loading] = useAuthState(auth)
    console.log("🚀 ~ file: AuthContext.js:28 ~ AuthContextProvider ~ user:", user)




    useEffect(() => {
        if (user) {
            setCurrentUser(user)
        }
      
        else if (currentAdmin) {
            setCurrentUser(currentAdmin)
        }

    },[user,currentAdmin]);
    return (
        <AuthContext.Provider value={{ currentUser, currentAdmin ,loader}}>
            {children}
        </AuthContext.Provider>
    )


}
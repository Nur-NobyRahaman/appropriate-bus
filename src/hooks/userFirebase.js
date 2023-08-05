import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react"
import app from "../firebase.init";


const useFirebase = () => {
    const [user, setUser] = useState({});
    console.log("🚀 ~ file: userFirebase.js:7 ~ useFirebase ~ user:", user)
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setUser(user)

            })
            .catch((error) => {
                console.log("error", error)
            })
    }



    const handleSignOut=()=>{
        signOut(auth)
        .then(()=>{})
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setUser(user)
        })
    }, [])
    return { user, signInWithGoogle ,handleSignOut}
}
export default useFirebase;
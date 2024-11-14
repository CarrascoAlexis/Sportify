import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

export default function ProtectedPage({children}){
    const auth = useAuth()
    if(auth.user != null && auth.user != undefined)
    {
        return children
    }
    if(localStorage.getItem("token") != null && localStorage.getItem("token") != "")
    {
        auth.firstLog()
        return <p>Loading session</p>
        // ON crée une nouvelle session ici
    }
    return <Navigate to={"/connexion"}/>
}
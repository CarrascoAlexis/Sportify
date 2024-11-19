import { Navigate } from "react-router-dom";
import { useAuth } from "../App/AuthProvider";
import Connexion from "../../Pages/User/Connexion";

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
    }
    return <Connexion redirection={window.location.pathname}/>
}
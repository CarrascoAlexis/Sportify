import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../App/AuthProvider";
import Connexion from "../../Pages/User/Connexion";

export default function ProtectedPage(props){
    const auth = useAuth()
    const navigate = useNavigate()
    if(auth.user != null && auth.user != undefined)
    {
        if(props.employe === "true")
        {
            if(auth.user.isEmploye) return props.children
            else return navigate("/events")
        }
        return props.children
    }
    if(localStorage.getItem("token") != null && localStorage.getItem("token") != "")
    {
        auth.firstLog()
        return <p>Loading session</p>
    }
    return <Connexion redirection={window.location.pathname}/>
}
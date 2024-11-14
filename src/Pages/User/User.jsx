import './User.css'
import { useAuth } from '../../Components/AuthProvider/AuthProvider'
import { Navigate, Outlet } from "react-router-dom";

export default function User(props)
{
    const auth = useAuth();
    if(auth.ephemeralSession == true && !auth.user)
    {
        return auth.logOut();
    }
    return <p>ah askip t connecté</p>;
}
import './User.css'
import { useAuth } from '../../Components/AuthProvider/AuthProvider'
import { Navigate, Outlet } from "react-router-dom";

export default function User(props)
{
    const auth = useAuth();
    return <p>{auth.user.nickname}</p>;
}
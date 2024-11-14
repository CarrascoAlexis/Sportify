import './User.css'
import { useAuth } from '../../Components/AuthProvider/AuthProvider'
import { Link } from "react-router-dom";


export default function User(props)
{
    const auth = useAuth();
    return (<>
                <p>{auth.user.nickname}</p>
                <button onClick={auth.logOut}></button>
            </>
    );
}
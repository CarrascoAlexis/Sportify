import './User.css'
import { useAuth } from '../../Components/AuthProvider/AuthProvider'
import { Link } from "react-router-dom";

export default function User(props)
{
    const auth = useAuth();
    let profile = `./resources/profile_pics/${auth.user.profile}`
    if(auth.user.profile == "" || auth.user.profile == null || auth.user.profile == undefined)
    {
        profile = `./resources/profile_pics/default.png`
    }
    console.log(auth.user)
    return (<>
                <p>{auth.user.nickname}</p>
                <p>{auth.user.profile}</p>
                <img src={profile} alt="" />
                <button onClick={auth.logOut}></button>
            </>
    );
}
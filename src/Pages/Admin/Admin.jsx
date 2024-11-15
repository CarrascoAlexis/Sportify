import { Link } from 'react-router-dom'
import { useAuth } from '../../Components/AuthProvider/AuthProvider'
import Connexion from '../User/Connexion'
import './Admin.css'

export default function Admin({children}, props)
{
    console.log(window.location.pathname)
    const auth = useAuth()
    if(auth.user == null)
    {
        return <Connexion redirection={window.location.pathname}/>
    }
    if(children == undefined)
    return(
        <div>
            Page principale du panel admin
            <Link to={"users"}>Gestion user</Link>
            <Link to={"events"}>Gestion user</Link>
        </div>
    )
    return(<>{children}</>)
}
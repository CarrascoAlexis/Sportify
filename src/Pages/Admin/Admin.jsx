import { Link } from 'react-router-dom'
import { useAuth } from '../../Components/AuthProvider/AuthProvider'
import Connexion from '../Connexion/Connexion'
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
            Admin
            <Link to="/admin/test">test</Link>
        </div>
    )
    return(<>{children}</>)
}
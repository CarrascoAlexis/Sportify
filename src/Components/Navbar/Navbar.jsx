import { Link } from 'react-router-dom'
import './Navbar.css'
import { useEffect } from 'react'
import { useAuth } from '../AuthProvider/AuthProvider'

export default function Navbar()
{

    let userPageELem
    const auth = useAuth()
    if(auth == undefined)
    {
        userPageELem = <Link to={'/connexion'}>Connexion</Link>
    }
    else
    {
        auth.updateConnection()
        if(auth.user == null)
        {
            userPageELem = <Link to={'/connexion'}>Connexion</Link>
        }
        else {
            userPageELem = <Link to={'/compte'}>Compte</Link>
        }
    }


    return(
        <header>
            <nav>
                <Link to={'/'}>Accueil</Link>
                <Link to={'/events'}>Events</Link>
                {userPageELem}
                <Link to={'/contact'}>Contact</Link>
            </nav>
        </header>
    )
}
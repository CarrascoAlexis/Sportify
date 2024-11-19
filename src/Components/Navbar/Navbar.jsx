import { Link } from 'react-router-dom'
import './Navbar.css'
import { useEffect } from 'react'
import { useAuth } from '../AuthProvider/AuthProvider'

export default function Navbar()
{

    let userPageELem
    const auth = useAuth()
    useEffect(() => {
        if(auth == undefined)
        {
            userPageELem = <Link to={'/compte/connexion'}>Connexion</Link>
        }
        else
        {
            auth.updateConnection()
            console.log("caca")
            if(auth.user == null)
            {
                userPageELem = <Link to={'/compte/connexion'}>Connexion</Link>
            }
            else {
                userPageELem = <Link to={'/compte'}>Compte</Link>
            }
        }
    }, [])
    if(auth == undefined)
        {
            userPageELem = <Link to={'/compte/connexion'}>Connexion</Link>
        }
        else
        {
            if(auth.user == null)
            {
                userPageELem = <Link to={'/compte/connexion'}>Connexion</Link>
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
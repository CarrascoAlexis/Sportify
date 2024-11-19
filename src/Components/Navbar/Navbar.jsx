import { Link } from 'react-router-dom'
import './Navbar.css'
import { useEffect, useState } from 'react'
import { useAuth } from '../AuthProvider/AuthProvider'

export default function Navbar()
{
    const [userPageElem, setUserPageELem] = useState(<Link to={'/compte/connexion'}>Connexion</Link>)
    const auth = useAuth()
    useEffect(() => {
        if(auth != undefined) auth.updateConnection()
        if(auth == undefined || auth.user == null)
        {
            setUserPageELem(<Link to={'/compte/connexion'}>Connexion</Link>)
        }
        else
        {
            setUserPageELem(<Link to={'/compte'}>Compte</Link>)
        }
    }, [])
    

    return(
        <header>
            <nav>
                <Link to={'/'}>Accueil</Link>
                <Link to={'/events'}>Events</Link>
                {userPageElem}
                <Link to={'/contact'}>Contact</Link>
            </nav>
        </header>
    )
}
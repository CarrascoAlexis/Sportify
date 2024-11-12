import { Link } from 'react-router-dom'
import './Navbar.css'
import { useEffect } from 'react'

export default function Navbar()
{
    
    return(
        <header>
            <nav>
                <Link to={'/'}>Accueil</Link>
                <Link to={'/events'}>Events</Link>
                <Link to={'/connexion'}>Connexion</Link>
                <Link to={'/contact'}>Contact</Link>
            </nav>
        </header>
    )
}
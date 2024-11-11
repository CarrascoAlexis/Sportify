import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar()
{
    return(
        <header>
            <nav>
                <Link to={'/'}>Accueil</Link>
                <Link to={'/events'}>Events</Link>
                <Link to={'/compte'}>Compte</Link>
                <Link to={'/contact'}>Contact</Link>
            </nav>
        </header>
    )
}
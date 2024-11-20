import { Link } from 'react-router-dom'
import './Navbar.css'
import { useEffect, useState } from 'react'
import { useAuth } from '../App/AuthProvider'

export default function Navbar()
{
    const auth = useAuth()
    
    let userPageElem = <Link to={'/compte/connexion'}>Connexion</Link>

    if(auth != undefined) auth.updateConnection()
    if(auth.user == null)
    {
        auth.updateConnection()
        console.log(auth)
        console.log("bah oui bb")
        userPageElem = <Link to={'/compte/connexion'}>Connexion</Link>
    }
    else
    {
        userPageElem = <Link to={'/compte'}>Compte</Link>
    }

    return(
        <header>
            <nav>
                <Link to={'/'}>Accueil</Link>
                <Link to={'/events'}>Events</Link>
                <h1>Sportify</h1>
                {userPageElem}
                <Link to={'/contact'}>Contact</Link>
            </nav>
        </header>
    )
}
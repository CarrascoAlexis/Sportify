import './User.css'
import { useAuth } from '../../Components/App/AuthProvider'
import { Link } from "react-router-dom";
import EventCard from '../../Components/Cards/EventCard';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';

export default function User()
{
    const [events, setEvents] = useState([{}])

    useEffect(() => {
        axiosInstance.get("/events", {"params": {"filter": {"authorId": auth.user.id}}})
        .then(res => {
            if(res.data.error) return console.log(res.data.error)
            setEvents(res.data)
        })
    }, [])

    const employePanel = (
    <div className='employe-panel'>
        <Link to={"/manageEvents"} className='animated-button'>Gerer les  evenements</Link>
    </div>)

    const auth = useAuth();
    let profile = `${axiosInstance.defaults.baseURL}/profiles/${auth.user.profile}`

    
    return(
        <div className='container user-show'>
            <button className='animated-button' onClick={auth.logOut}>Deconnexion</button>
            <div className='user-top'>
                <img src={profile} alt="" />
                <h2>Bienvenue, {auth.user.nickname} !</h2>
                <p>{auth.user.isEmploye ? (<>Compte employe</>) : (<></>)}</p>
            </div>
            {auth.user.isEmploye ? employePanel : (<></>)}
            <div className='user-events'>
                <h3 className='col-12'>Mes evenements</h3>
                {events.length === 0 ? (
                    <div className='col-12'>
                        <p>Aucn evenement cree</p>
                        <Link to={"/events/create"}>Créer un event</Link>
                    </div>
                ) : (<></>)}
                <div className='user-events-container'>
                {events.map(event => <EventCard event={event} show="author"/>)}
                </div>
                
            </div>
        </div>
    )
}
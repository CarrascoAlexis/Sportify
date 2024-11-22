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

    const auth = useAuth();
    let profile = `./resources/profile_pics/${auth.user.profile}`
    if(auth.user.profile == "" || auth.user.profile == null || auth.user.profile == undefined)
    {
        profile = `./resources/profile_pics/default.png`
    }
    return (
        <>
            <p>{auth.user.nickname}</p>
            <p>{auth.user.profile}</p>
            <img src={profile} alt="" />
            <button onClick={auth.logOut}></button>
            <div className='container user-events'>
                <h2>Mes evenements</h2>
                {events.map(event => <EventCard event={event} show="author"/>)}
            </div>
            <div>
                {auth.user.isEmploye ? (<Link to={"/manageEvents"}>Gerer les  evenements</Link>) : (<></>)}
            </div>
        </>
    );
}
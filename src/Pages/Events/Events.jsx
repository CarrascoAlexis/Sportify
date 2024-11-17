import { useEffect, useState } from 'react'
import './Events.css'
import axiosInstance from '../../axiosConfig'
import EventCard from '../../Components/Cards/EventCard'
import { useAuth } from '../../Components/AuthProvider/AuthProvider'
import { Link } from 'react-router-dom'

export default function Events(props)
{
    const auth = useAuth()
    const [events, setEvents] = useState([{}])

    useState(() => {
        axiosInstance.get("/events")
        .then(res => {
            setEvents(res.data)
        })
    }, [])

    var createButton = null

    if(auth.user != null)
    {
        createButton = <Link to={"/events/create"}>Créer un event</Link>
    }

    return (
        <div>
            {
                events
                .map(event =>
                    <EventCard key={event.id} event={event}/>
                )
            }
            {createButton}
        </div>
    )
}
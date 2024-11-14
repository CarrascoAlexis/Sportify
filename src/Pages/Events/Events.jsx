import { useEffect, useState } from 'react'
import './Events.css'
import axiosInstance from '../../axiosConfig'
import EventCard from '../../Components/EventCard/EventCard'

export default function Events(props)
{
    const [events, setEvents] = useState([{}])

    axiosInstance.get("/events")
    .then(res => {
        setEvents(res.data)
    })
    return (
        <div>
          {
            events
              .map(event =>
                <EventCard key={event.id} event={event}/>
              )
          }
        </div>
    )
}
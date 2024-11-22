import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import { useState } from 'react'
import './Cards.css'


export default function EventCard(props)
{
    const [event, setEvent] = useState(props.event)
    let editButton = null

    const validateEvent = (e) => 
    {
        e.preventDefault();
        setEvent((prev) => ({
            ...prev,
            isVisible: 1,
        }));
        axiosInstance.post("/events/validate", {eventId: event.id})
        .then(res => {
            if(res.data.error) return console.log(res.data.error)
        })
    }

    const unvalidateEvent = (e) => 
    {
        e.preventDefault();
        setEvent((prev) => ({
            ...prev,
            isVisible: 0,
        }));
        axiosInstance.post("/events/unvalidate", {eventId: event.id})
        .then(res => {
            if(res.data.error) return console.log(res.data.error)
        })
    }

    const navigate = useNavigate()
    const HandleClick = () => {
        if(props.editable || props.show == "author") return
        return navigate(`/events/${event.title ? event.title : props.event.title}`)
    }

    if(props.editable || props.show == "author")
    {
        editButton = <button onClick={(e) => navigate(`/events/edit/${event.title ? event.title : props.event.title}`)}>Editer</button>
    }

    return(
        <div className='event-card' onClick={() => HandleClick()}>
            <h3>{event.title ? event.title : props.event.title}</h3>
            {
                props.editable ? (
                    <div>
                        {event.isVisible ? (<button onClick={unvalidateEvent}>Annuler validation</button>) : (<button onClick={validateEvent}>Valider</button>)}
                        <button onClick={() => navigate(`/events/${event.title ? event.title : props.event.title}`)}>Voir</button>
                    </div>
                ) : (
                    <></>
                )
            }
            {
                props.show == "author" ? (event.isVisible || props.event.isVisible ? (<p>Valide</p>) : (<p>Non valide</p>)) : (<></>)
            }
            {editButton}

        </div>
    )
}
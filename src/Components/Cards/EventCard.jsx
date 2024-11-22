import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import { useState } from 'react'



export default function EventCard(props)
{
    const [event, setEvent] = useState(props.event)
    let editButton = null
    if(props.editable)
    {
        editButton = <p>Editer</p>
    }

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
        if(!props.editable) return navigate(`/events/${event.title}`)
    }
    return(
        <div className='event-card' onClick={() => HandleClick()}>
            <h3>{event.title}</h3>
            {
                props.editable ? (
                    <div>
                        {event.isVisible ? (<button onClick={unvalidateEvent}>Annuler validation</button>) : (<button onClick={validateEvent}>Valider</button>)}
                        <button onClick={() => navigate(`/events/${event.title}`)}>Voir</button>
                    </div>
                ) : (
                    <></>
                )
            }
        </div>
    )
}
import { useNavigate } from 'react-router-dom'
import './EventCard.css'



export default function EventCard(props, key)
{
    const event = props.event
    
    const navigate = useNavigate()
    const test = () => {
        navigate(`/events/${event.title}`)
        return
    }
    return(
        <div className='event-card' onClick={() => test()}>
            <h3>{event.title}</h3>
        </div>
    )
}
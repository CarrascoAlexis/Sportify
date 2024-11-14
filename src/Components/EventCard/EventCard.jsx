import './EventCard.css'

export default function EventCard(props, key)
{
    const event = props.event
    return(
        <div className='event-card'>
            <h3>{event.title}</h3>
        </div>
    )
}
import { useState } from 'react';
import axiosInstance from '../../../axiosConfig';
import './EventDetails.css'
import { useParams } from 'react-router-dom';

export default function EventDetails()
{
    const [event, setEvent] = useState({})
    let { title } = useParams();

    useState(() => {    
        axiosInstance.get("/events", {"params": {"filter": {"title": title}}})
            .then(res => {
                if(!res.error) setEvent(res.data[0])
                console.log("Successfully loaded event data")
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    return(
        <div>
            <h2>{event.title}</h2>
            <p>{event.shortDescription}</p>
            <p>{event.description}</p>
        </div>
    )
}
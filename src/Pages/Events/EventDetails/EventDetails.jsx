import { useState } from 'react';
import axiosInstance from '../../../axiosConfig';
import './EventDetails.css'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../Components/AuthProvider/AuthProvider';

export default function EventDetails()
{
    const auth = useAuth()
    const [event, setEvent] = useState({})
    let { title } = useParams();

    if(!auth.user) auth.updateConnection()

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

    let editButton = null
    if(auth != undefined && auth.user && event.authorId == auth.user.id) editButton = <p>Editer</p>
    if(editButton != null || event.isVivible) return(
        <div>
            <h2>{event.title}</h2>
            <p>{event.shortDescription}</p>
            <p>{event.description}</p>
            {editButton}
        </div>
    )
    return(
        <p>Event innaccessible</p>
    )
}
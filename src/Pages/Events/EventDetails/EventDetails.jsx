import { useState } from 'react';
import axiosInstance from '../../../axiosConfig';
import './EventDetails.css'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../Components/App/AuthProvider';

export default function EventDetails()
{
    const auth = useAuth()
    const [event, setEvent] = useState({
        authorId: -1
    })
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
    if(event != null && auth != undefined && auth.user && event.authorId == auth.user.id) editButton = <p>Editer</p>
    if(event == null || event == undefined ||editButton == null)
    {
        return(
            <p>Event innaccessible</p>
        )
    }
    return(
        <div>
            <h2>{event.title}</h2>
            <p>{event.shortDescription}</p>
            <p>{event.description}</p>
            {editButton}
        </div>
    )
}
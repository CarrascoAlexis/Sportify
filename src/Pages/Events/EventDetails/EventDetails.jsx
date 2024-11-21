import { useState } from 'react';
import axiosInstance from '../../../axiosConfig';
import './EventDetails.css'
import { useNavigate, useParams } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import { useAuth } from '../../../Components/App/AuthProvider';
import 'react-slideshow-image/dist/styles.css';
import { BsMouse } from "react-icons/bs";
import { infinite } from 'swr/infinite';

export default function EventDetails()
{
    const auth = useAuth()
    const [event, setEvent] = useState({
        authorId: -1
    })
    const [images, setImages] = useState([{}])
    let { title } = useParams();
    const navigate = useNavigate()

    if(!auth.user) auth.updateConnection()

    const handleParticipation = (e) => {
        e.preventDefault()
        console.log(auth.user)
        if(!auth.user)
        {
            // Va te connecter
            navigate("/compte/connexion")
            return
        }
        axiosInstance.post("/events/participation", {"params": {"eventId": event.id, "userId": auth.user.id}})
        .then(res => {
            console.log(res)
        })
    }


    useState(() => {    
        axiosInstance.get("/events", {"params": {"filter": {"title": title}}})
            .then(res => {
                if(!res.error) 
                {
                    setEvent(res.data[0])
                    console.log("Successfully loaded event data")
                    axiosInstance.get("/image/event", {"params": {"filter": {"eventId": res.data[0].id}}})
                    .then(res => {
                        setImages(res.data)
                    })
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    let editButton = null
    let participationButton = <button onClick={handleParticipation}>Participer</button>
    if(event != null && auth != undefined && auth.user && event.authorId == auth.user.id) editButton = <p>Editer</p>
    if(!event.isVisible && (event == null || event == undefined || editButton == null))
    {
        return(
            <p>Event innaccessible</p>
        )
    }

    if(auth.user !== null)
    {
        axiosInstance.get("/events/users", {"params": {"filter": {"eventId": event.id, "userId": auth.user.id}}})
    }

    const properties = {
        prevArrow: <></>,
        nextArrow: <></>,
        infinite: true
    }

    return(
        <div className='event-show'>
            <div className='event-title-block'>
                <h2>{event.title}</h2>
            </div>
            <div className='imageContainer'>
                <Slide {...properties}>
                    {
                        images.map(img => 
                        <div className="each-slide-effect" key={img.id}>
                            <div style={{ 'backgroundImage': `url(http://localhost:5000/eventsPic/${img.fileName})`}}>
                            </div>
                        </div>
                        )
                    }
                </Slide>
            </div>
            <div className='event-data-block container row'>
                <div className='col-6'>
                    <p>{event.description}</p>
                </div>
                <div className='col-6'>
                    <p>Du {new Date(event.startDate).toLocaleDateString('FR-fr')} a {new Date(event.startDate).toLocaleTimeString('FR-fr', {hour: '2-digit', minute:'2-digit'})} au {new Date(event.endDate).toLocaleDateString('FR-fr')} a {new Date(event.endDate).toLocaleTimeString('FR-fr', {hour: '2-digit', minute:'2-digit'})}</p>
                    {participationButton}
                </div>
            </div>
            {editButton}
        </div>
    )
}
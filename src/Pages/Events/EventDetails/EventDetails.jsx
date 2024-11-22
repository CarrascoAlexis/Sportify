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
        authorId: -1,
        id: 0
    })
    const [images, setImages] = useState([{}])
    const [participation, setParticipation] = useState(false)
    let { title } = useParams();
    const navigate = useNavigate()


    if(!auth.user) auth.updateConnection()

    const handleParticipation = (e) => {
        e.preventDefault()
        if(!auth.user)
        {
            // Va te connecter
            navigate("/compte/connexion")
            return
        }
        axiosInstance.post("/events/participation", {"params": {"eventId": event.id, "userId": auth.user.id}})
        .then(res => {
            setParticipation(true)
            return
        })
    }

    const handleUninscription = (e) => {
        e.preventDefault();
        if(!auth)
        {
            // Va te connecter
            navigate("/compte/connexion")
            return
        }
        axiosInstance.post("/events/uninscription", {"params":  {"eventId": event.id, "userId": auth.user.id}})
        .then(res => {
            setParticipation(false)
            return
        })
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


    useState(() => {
        auth.updateConnection()
        axiosInstance.get("/events", {"params": {"filter": {"title": title}}})
            .then(res => {
                if(!res.error) 
                {
                    const id = res.data[0].id
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
    })

    if(auth.user)axiosInstance.get("/events/users", {"params": {"filter": {"eventId": event.id, "userId": auth.user.id}}})
        .then(res => {
            if(res.data.length != 0) return setParticipation(true)
            else return setParticipation(false)
        })

    let editButton = null
    let waitValidateArea = null
    if(event != null && auth != undefined && auth.user && event.authorId == auth.user.id) 
    {
        editButton = <button onClick={(e) => navigate(`/events/edit/${event.title}`)}>Editer</button>
        if(!event.isVisible) waitValidateArea = <div className='validation-advert'>EN ATTENTE DE VALIDATION</div>
    }
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
            {
            waitValidateArea
            }
            <div className='event-title-block'>
                <h2>{event.title}</h2>
            </div>
            <div className='imageContainer'>
                <Slide {...properties}>
                    {
                        images.map(img => 
                        <div className="each-slide-effect" key={img.id}>
                            <div style={{ 'backgroundImage': `url(${axiosInstance.defaults.baseURL}/eventsPic/${img.fileName})`}}>
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
                    {
                        auth.user && event.authorId === auth.user.id ? (editButton) : (participation ? (
                            <button onClick={handleUninscription}>Se desinscrire</button>
                        ) : (
                            <button onClick={handleParticipation}>Inscription</button>))
                        }
                </div>
            </div>
            {
                auth.user && auth.user.isEmploye ? (event.isVisible ? (<button onClick={unvalidateEvent}>Annuler validation</button>) : (<button onClick={validateEvent}>Valider</button>)) : <></>
            }
        </div>
    )
}
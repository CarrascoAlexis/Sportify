import { useState } from 'react';
import axiosInstance from '../../../axiosConfig';
import './EventDetails.css'
import { useParams } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import { useAuth } from '../../../Components/App/AuthProvider';
import 'react-slideshow-image/dist/styles.css';
import { BsMouse } from "react-icons/bs";

export default function EventDetails()
{
    const auth = useAuth()
    const [event, setEvent] = useState({
        authorId: -1
    })
    const [images, setImages] = useState([{}])
    let { title } = useParams();

    if(!auth.user) auth.updateConnection()


    const initSlider = () => {
        const slides = document.getElementsByClassName('slider')
        for(let i = 0; i < slides.length; i++)
        {
            console.log(slides[i])
            slides[i].classList.remove('active')
        }
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
    if(event != null && auth != undefined && auth.user && event.authorId == auth.user.id) editButton = <p>Editer</p>
    if(event == null || event == undefined ||editButton == null)
    {
        return(
            <p>Event innaccessible</p>
        )
    }

    const properties = {
        prevArrow: <></>,
        nextArrow: <></>
    }

    return(
        <div className='event-show'>
            <div className='slideshow-block'>
                <div className='imageContainer'>
                    <Slide {...properties}>
                        {
                            images.map(img => 
                            <div className="each-slide-effect">
                                <div style={{ 'backgroundImage': `url(http://localhost:5000/eventsPic/${img.fileName})`}}>
                                </div>
                            </div>
                            )
                        }
                    </Slide>
                </div>
                <div className='event-title-block'>
                    <h2>{event.title}</h2>
                    <div className='event-scroll-mouse'>
                        <BsMouse />
                    </div>
                </div>
            </div>
            
            <p>{event.shortDescription}</p>
            <p>{event.description}</p>
            {editButton}
        </div>
    )
}
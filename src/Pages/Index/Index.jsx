import { useEffect, useState } from "react"
import { Slide } from "react-slideshow-image"
import axiosInstance from "../../axiosConfig"
import EventCard from '../../Components/Cards/EventCard'

export default function Index()
{
    const [images, setImages] = useState([{}])
    const [events, setEvents] = useState([{}])
    const properties = {
        prevArrow: <></>,
        nextArrow: <></>,
        infinite: true
    }

    useState(() => {
        axiosInstance.get("/events", {"params": {"filter": {"isVisible": 1}}})
        .then(res => {
            setEvents(res.data)
            console.log(res.data)
        })
        axiosInstance.get("/image/indexSlide")
        .then(res => {
            setImages(res.data)
        })
    })


    return(
        <div>
            <Slide {...properties} >
                {
                    images.map(img => 
                    <div className="each-slide-effect" key={img.id}>
                        <div style={{ 'backgroundImage': `url(${axiosInstance.defaults.baseURL}/eventsPic/${img.fileName})`}}>
                        </div>
                    </div>
                    )
                }
            </Slide>
            <div className="index-presentation container">
                <p>Esportify est une startup spécialisée dans le domaine du e-sports qui a vu le jour le 17 mars
                2021. Elle est située en France et propose d’organiser ces évènements.</p>
            </div>
            <div className="container row">
                {
                    events
                    .map(event =>
                        <EventCard key={event.id} event={event}/>
                    )
                }
            </div>
        </div>
    )
}
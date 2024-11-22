import { useState } from 'react'
import './EventsCreate.css'
import axiosInstance from '../../axiosConfig';
import { useAuth } from '../../Components/App/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';

export default function EventEdit()
{
    const auth = useAuth()
    const navigate = useNavigate()

    const [event, setEvent] = useState({
        authorId: -1,
        id: 0,
        title: "",
        description: "",
        startDate: "1946-02-05",
        endDate: "1946-02-06"
    })
    const [images, setImages] = useState([{}])
    const [files, setFiles] = useState([])
    let { title } = useParams();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setEvent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        let error = false

        Object.keys(event).forEach((key) => {
            if(event[key] == "")
            {
                if(document.getElementById(key) != undefined) document.getElementById(key).classList.add("error")
                console.log(key)
                error = true
            }
            else
            {
                if(document.getElementById(key) != undefined) document.getElementById(key).classList.remove("error")
            }
        
        })
        navigate(`/events/${event.title}`)

        axiosInstance.post("/events/edit", event)
        .then(res => {
            console.log(res)
        })
        
    }
    const fileChange = (e) => {
        console.log(e.target.files)
        setFiles(e.target.files)
    }

    useState(() => {
        auth.updateConnection()
        axiosInstance.get("/events", {"params": {"filter": {"title": title}}})
            .then(res => {
                console.log(res)
                if(!res.error) 
                {
                    // Pour retirer les elements a la fin du String pour que les Input le comprenne
                    res.data[0].startDate = res.data[0].startDate.slice(0, -8)
                    res.data[0].endDate = res.data[0].endDate.slice(0, -8)
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

    console.log(images)

    console.log(event.startDate.slice(0, -8))

    return(
        <>
            <form onSubmit={handleSubmit} id='connection-form'>
                <label id="title">
                    Titre:
                    <input type="text" name="title" value={event.title} onChange={handleInput}/>
                </label>
                <label id="description">
                    Description détaillée:
                    <textarea name="description" value={event.description} onChange={handleInput}/>
                </label>
                <label id="startDate">
                    Description détaillée:
                    <input type="datetime-local" name="startDate" value={event.startDate.toString()} onChange={handleInput}/>
                </label>
                <label id="endDate">
                    Description détaillée:
                    <input type="datetime-local" name="endDate" value={event.endDate.toString()} onChange={handleInput}/>
                </label>
                <label id="images">
                    Images
                    <input type='file' name="eventPic" onChange={fileChange} multiple/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
            <div>
                Galerie d'images : 
                {
                    images.map(img => 
                        <img src={`${axiosInstance.defaults.baseURL}/eventsPic/${img.fileName}`}/>
                    )
                }
            </div>
        </>
    )
}
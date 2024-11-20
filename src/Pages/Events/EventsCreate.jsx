import { useState } from 'react'
import './EventsCreate.css'
import axiosInstance from '../../axiosConfig';
import { useAuth } from '../../Components/App/AuthProvider';


export default function EventsCreate()
{
    const auth = useAuth()
    const [files, setFiles] = useState([])
    const [input, setInput] = useState({
        title: "",
        description: "",
        startDate: "1946-02-05",
        endDate: "1946-02-06"
    });
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        let error = false

        Object.keys(input).forEach((key) => {
            if(input[key] == "")
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

        if(files.length == 0)
        {
            error = true
        } 
        console.log(error)
        if(error) return;

        const formData = new FormData();
        for(let i = 0; i < files.length; i++)
        {
            formData.append(
                "eventPic",
                files[i],
                files[i].name
            )
        }
        const data = input
        data["authorId"] = auth.user.id
        axiosInstance.post("/events/create", {"params": input})
        .then(res => {
            if(res.data.error)
            {
                // Future gestion d'erreur
                return;
            }
            formData.append("eventId", res.data.insertId)
            axiosInstance.post("/image/eventupload/", formData)
            .then(res => {
                console.log(res)
            })
            
        })
    }
    const fileChange = (e) => {
        console.log(e.target.files)
        setFiles(e.target.files)
    }

    return(
        <form onSubmit={handleSubmit} id='connection-form'>
            <label id="title">
                Titre:
                <input type="text" name="title" value={input.title} onChange={handleInput} />
            </label>
            <label id="description">
                Description détaillée:
                <textarea name="description" value={input.description} onChange={handleInput}/>
            </label>
            <label id="startDate">
                Description détaillée:
                <input type="datetime-local" name="startDate" value={input.startDate} onChange={handleInput}/>
            </label>
            <label id="endDate">
                Description détaillée:
                <input type="datetime-local" name="endDate" value={input.endDate} onChange={handleInput}/>
            </label>
            <label id="images">
                Images
                <input type='file' name="eventPic" onChange={fileChange} multiple/>
            </label>
            <input type="submit" value="Submit"/>
        </form>
    )
}
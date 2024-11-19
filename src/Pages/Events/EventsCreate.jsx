import { useState } from 'react'
import './EventsCreate.css'
import axiosInstance from '../../axiosConfig';
import { useAuth } from '../../Components/App/AuthProvider';


export default function EventsCreate()
{
    const auth = useAuth()
    const [input, setInput] = useState({
        title: "",
        description: "",
        startDate: "1946-02-05",
        endDate: "1946-02-06",
        players: 0
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
            }
            else
            {
                if(document.getElementById(key) != undefined) document.getElementById(key).classList.remove("error")
            }
        })

        if(error) return;
        const data = input
        data["authorId"] = auth.user.id
        axiosInstance.post("/events/create", {"params": input})
        .then(res => {
            
        })
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
            <input type="submit" value="Submit"/>
        </form>
    )
}
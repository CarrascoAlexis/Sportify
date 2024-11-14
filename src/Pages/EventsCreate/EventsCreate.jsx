import { useState } from 'react'
import './EventsCreate.css'
import axiosInstance from '../../axiosConfig';
import { useAuth } from '../../Components/AuthProvider/AuthProvider';

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
        const data = input
        data["authorId"] = auth.user.id
        axiosInstance.post("/events/create", {"params": input})
        .then(res => {
            console.log(res)
        })
    }

    return(
        <form onSubmit={handleSubmit} id='connection-form'>
            <label>
                Titre:
                <input type="text" name="title" value={input.title} onChange={handleInput} />
            </label>
            <label>
                Description détaillée:
                <textarea name="description" value={input.description} onChange={handleInput}/>
            </label>
            <label>
                Description détaillée:
                <input type="date" name="startDate" value={input.startDate} onChange={handleInput}/>
            </label>
            <label>
                Description détaillée:
                <input type="date" name="endDate" value={input.endDate} onChange={handleInput}/>
            </label>
            <label>
                Description détaillée:
                <input type="date" name="endDate" value={input.endDate} onChange={handleInput}/>
            </label>
            <input type="submit" value="Submit"/>
        </form>
    )
}
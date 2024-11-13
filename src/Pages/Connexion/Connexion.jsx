import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import './Connexion.css'

export default function Connexion(props)
{
    const navigate = useNavigate();
    const [input, setInput] = useState({
        nickname: "",
        password: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        if(input.nickname == "admin" && input.password == "admin")
        {
            // Future redirection vers le panel admin (un peu particulier celui là, se crée un token a chaque nouvelle session)
            return
        }

        

        axios.get(`http://localhost:5000/user/connect`, {"params": {"nickname" : input.nickname, "password": input.password}})
        .then(res => {
            if(res.data.error == undefined && res.data.token != undefined)
            {
                console.log("connection réussie !")
                console.log(res.data.token)
                document.cookie = `token=${res.data.token}`
                navigate("/compte");
                return
            }
            console.log("connection échouée")
            document.getElementById('connection-form').classList.add("error")
        })
        .catch(error => {
            console.log(error);
        });
    }

    
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return(
        <form onSubmit={handleSubmit} id='connection-form'>
            <label>
                Pseudo:
                <input type="text" name="nickname" value={input.nickname} onChange={handleInput} />
            </label>
            <label>
                Pass:
                <input type="text" name="password" value={input.password} onChange={handleInput}/>
            </label>
            <input type="submit" value="Submit"/>
        </form>
    )
}
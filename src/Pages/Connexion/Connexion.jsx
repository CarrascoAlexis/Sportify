import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import './Connexion.css'

export default function Connexion(props)
{
    const navigate = useNavigate();
    const [pseudo, setPseudo] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if(pseudo == "admin" && pass == "admin")
        {
            // Future redirection vers le panel admin (un peu particulier celui là, se crée un token a chaque nouvelle session)
            return
        }

        axios.get(`http://localhost:5000/user/connect`, {"params": {"nickname" : pseudo, "password": pass}})
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

    return(
        <form onSubmit={handleSubmit} id='connection-form'>
            <label>
                Pseudo:
                <input type="text" name="pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
            </label>
            <label>
                Pass:
                <input type="text" name="pass" value={pass} onChange={(e) => setPass(e.target.value)}/>
            </label>
            <input type="submit" value="Submit"/>
        </form>
    )
}
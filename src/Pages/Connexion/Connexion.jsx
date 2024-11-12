import { useEffect, useState } from 'react'
import axios from 'axios';

import './Connexion.css'

export default function Connexion(props)
{
    const [pseudo, setPseudo] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`http://localhost:5000/user/connect`, {"params": {"nickname" : pseudo, "password": pass}})
        .then(res => {
            if(res.data.error == undefined && res.data.token != undefined)
            {
                console.log("connection réussie !")
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
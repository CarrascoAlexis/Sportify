import { useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../../Components/App/AuthProvider';

import './Connexion.css'

export default function Connexion(props)
{
    const navigate = useNavigate();
    const [input, setInput] = useState({
        nickname: "",
        password: "",
        ephemeral: true
    });
    const auth = useAuth();
    const handleSubmit = (event) => {
        event.preventDefault();       

        // axios.get(`http://localhost:5000/user/connect`, {"params": {"nickname" : input.nickname, "password": input.password}})
        // .then(res => {
        //     if(res.data.error == undefined && res.data.token != undefined)
        //     {
        //         console.log("connection réussie !")
        //         document.cookie = `token=${res.data.token}`
        //         navigate("/compte");
        //         return
        //     }
        //     console.log("connection échouée")
        //     document.getElementById('connection-form').classList.add("error")
        // })
        // .catch(error => {
        //     console.log(error);
        // });
        if (input.username !== "" && input.password !== "") {
            if(props.redirection != undefined) auth.loginAction(input, props.redirection);
            else auth.loginAction(input);
            return;
        }
    }

    
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleInputCheck = (e) => {
        setInput((prev) => ({
            ...prev,
            ["ephemeral"]: !input.ephemeral,
        }));
    }

    return(
        <>
        <form onSubmit={handleSubmit} id='connection-form'>
            <label>
                Pseudo:
                <input type="text" name="nickname" value={input.nickname} onChange={handleInput} />
            </label>
            <label>
                Pass:
                <input type="text" name="password" value={input.password} onChange={handleInput}/>
            </label>
            <label >
                Rester connecté
                <input type="checkbox" onChange={handleInputCheck} checked={!input.ephemeral}/>
            </label>
            <input type="submit" value="Submit"/>
        </form>
        <Link to={"/compte/creation"}>Creer un compte</Link>
        </>
    )
}
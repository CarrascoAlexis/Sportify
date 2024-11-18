import { useState } from "react"
import './Cards.css'

export default function UserCard(props)
{
    const [user, setUser] = useState(props.user);
    const [edition, setEdition] = useState(false)

    let profile = `./resources/profile_pics/${user.profile}`
    if(user.profile == "" || user.profile == null || user.profile == undefined)
    {
        profile = `./resources/profile_pics/default.png`
    }
    
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditButtonClick = (e) => {
        e.preventDefault()
        if(edition)
        {
            document.getElementById(`nicnkame-${user.id}`).disabled = true
            document.getElementById(`mail-${user.id}`).disabled = true
            document.getElementById(`is-employe-${user.id}`).disabled = true
            document.getElementById(`validate-${user.id}`).innerHTML = "Editer"

            // ICI ON ENVOIE A LA BDD SALE FOU
            console.log("validation")

            setEdition(false)
            return
        }
        else
        {
            document.getElementById(`nicnkame-${user.id}`).disabled = false
            document.getElementById(`mail-${user.id}`).disabled = false
            document.getElementById(`is-employe-${user.id}`).disabled = false
            document.getElementById(`validate-${user.id}`).innerHTML = "Valider"
            setEdition(true)
            return
        }
    }

    return(
        <div id={`user-card-${user.id}`} className="user-card" classname="user-card">
            <img src={profile} alt=""/>
            <input id={`nicnkame-${user.id}`} onChange={handleInput} type="text" value={user.nickname} disabled/>
            <input id={`mail-${user.id}`} onChange={handleInput} type="text" value={user.mail} disabled/>
            <input id={`is-employe-${user.id}`} onChange={handleInput} type="checkbox" checked={user.isEmploye} disabled></input>
            <button id={`validate-${user.id}`} onChange={handleInput} onClick={handleEditButtonClick}>Editer</button>
        </div>
    )
}
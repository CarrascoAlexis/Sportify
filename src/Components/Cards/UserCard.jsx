import { useState } from "react"
import './Cards.css'
import axiosInstance from "../../axiosConfig"

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

    const handleInputCheck = (e) => {
        setUser((prev) => ({
            ...prev,
            isEmploye: !user.isEmploye,
        }));
    }

    const handleEditButtonClick = (e) => {
        e.preventDefault()
        if(edition)
        {
            document.getElementById(`nicnkame-${user.id}`).disabled = true
            document.getElementById(`mail-${user.id}`).disabled = true
            document.getElementById(`is-employe-${user.id}`).disabled = true
            document.getElementById(`validate-${user.id}`).innerHTML = "Editer"
            axiosInstance.post("/user/edit", user)
            .then(res => {
                if(res.data.error){
                    console.log(res.data.error)
                }
                else
                {
                    setEdition(false)
                }
            })
        }
        else
        {
            document.getElementById(`nicnkame-${user.id}`).disabled = false
            document.getElementById(`mail-${user.id}`).disabled = false
            document.getElementById(`is-employe-${user.id}`).disabled = false
            document.getElementById(`validate-${user.id}`).innerHTML = "Valider"
            setEdition(true)
        }
        return
    }

    return(
        <div id={`user-card-${user.id}`} className="user-card">
            <img src={profile} alt=""/>
            <input id={`nicnkame-${user.id}`} onChange={handleInput} name="nickname" type="text" value={user.nickname} disabled/>
            <input id={`mail-${user.id}`} onChange={handleInput} name="mail" type="text" value={user.mail} disabled/>
            <input id={`is-employe-${user.id}`} onChange={handleInputCheck} name="isEmploye" type="checkbox" checked={user.isEmploye} disabled></input>
            <button id={`validate-${user.id}`} onClick={handleEditButtonClick}>Editer</button>
        </div>
    )
}
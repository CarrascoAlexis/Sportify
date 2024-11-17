import { useState } from "react"
import './Cards.css'

export default function UserCard(props)
{
    const [user, setUser] = useState(props.user)

    let profile = `./resources/profile_pics/${user.profile}`
    if(user.profile == "" || user.profile == null || user.profile == undefined)
    {
        profile = `./resources/profile_pics/default.png`
    }

    const handleEditButtonClick = (e) => {
        e.preventDefault()

    }

    return(
        <div id={`user-card-${user.id}`} className="user-card" classname="user-card">
            <img src={profile} alt="" />
            <input type="text"  value={user.nickname} disabled/>
            <p>{user.mail}</p>
            <input type="checkbox" checked={user.isEmploye} disabled></input>
            <button onClick={handleEditButtonClick}>Editer</button>
        </div>
    )
}
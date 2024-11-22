import { useState } from "react"
import '../../Stylesheets/Cards.css'
import axiosInstance from "../../axiosConfig"

export default function UserCard(props)
{
    const [user, setUser] = useState(props.user);
    const [edition, setEdition] = useState(false)

    let profile = `${axiosInstance.defaults.baseURL}/profiles/${user.profile}`
    
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
            document.getElementById(`delete-${user.id}`).classList.add("no-visible")
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
            document.getElementById(`delete-${user.id}`).classList.remove("no-visible")
            setEdition(true)
        }
        return
    }

    const handleDelete = (e) => {
        e.preventDefault();
        axiosInstance.delete("/user/delete", {"params": {userId: user.id}})
        .then(res => {
            console.log(res)
        })
        return
    }

    return(
        <tr id={`user-card-${user.id}`} className="user-card">
            <td><img src={profile} alt=""/></td>
            <td><input id={`nicnkame-${user.id}`} onChange={handleInput} name="nickname" type="text" value={user.nickname} disabled/></td>
            <td><input id={`mail-${user.id}`} onChange={handleInput} name="mail" type="text" value={user.mail} disabled/></td>
            <td><input id={`is-employe-${user.id}`} onChange={handleInputCheck} name="isEmploye" type="checkbox" checked={user.isEmploye} disabled></input></td>
            <td><button id={`validate-${user.id}`} onClick={handleEditButtonClick}>Editer</button></td>
            <td><button id={`delete-${user.id}`} onClick={handleDelete} name="delete" className="no-visible">Supprimer</button></td>
        </tr>
    )
}
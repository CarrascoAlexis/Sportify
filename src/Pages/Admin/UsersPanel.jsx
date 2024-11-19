import { useState } from "react"
import axiosInstance from "../../axiosConfig"
import UserCard from "../../Components/Cards/UserCard"
import { Link } from "react-router-dom"

export default function UsersPanel()
{
    const [userList, setUserList] = useState([])

    useState(() => {
        axiosInstance.get("/user")
        .then(res => {
            setUserList(res.data)
        })
    }, [])

    return (
    <div className="container">
        <table> 
        <tr>
            <th>Profil</th>
            <th>Pseudo</th>
            <th>Mail</th>
            <th>Est employé</th>
            <th>Edition</th>
            <th></th>
        </tr>
        {
        userList
        .map(user =>
            <UserCard key={user.id} user={user}/>
        )
        }
        </table>
        <Link to={"/admin/users/create"}>Creer nouvel utilisateur</Link>
        <Link to={"../"}>Retour</Link>
    </div>
    )
}
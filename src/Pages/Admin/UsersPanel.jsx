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
    <div>
        {
            userList
            .map(user =>
                <UserCard key={user.id} user={user}/>
            )
        }
        <Link to={"/admin/users/create"}>Creer nouvel utilisateur</Link>
        <Link to={"../"}>Retour</Link>
    </div>
    )
}
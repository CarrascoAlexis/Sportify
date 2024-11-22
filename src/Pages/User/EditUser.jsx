import { useEffect, useState } from "react"
import axiosInstance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Components/App/AuthProvider";

export default function EditUser() 
{
    const auth = useAuth();

    const [profile, setProfile] = useState(null)
    const [profilePreview, setProfilePreview] = useState(null)
    const [input, setInput] = useState({
        nickname: "",
        profile: "",
        mail: "",
        isEmploye: "0"
    });

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("test")

        const formData = new FormData();
        axiosInstance.post("/user/edit", input)
        .then(res => {
            console.log(res)
            if(res.data.error) return
            if(profile != null || profile != undefined)
            { 
                formData.append(
                    "profilePic",
                    profile,
                    profile.name
                );
            }
            formData.append("userId", res.data.insertId)
            axiosInstance.post("/image/profileupload/", formData);
            // navigate("/compte/connexion")
        })
    }
    
    const fileChange = (e) => {
        e.preventDefault()
        setProfile(e.target.files[0])
        setProfilePreview(URL.createObjectURL(e.target.files[0]))
    }
    
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if(auth.user){
            console.log(auth.user)
            setInput(auth.user)
        }
    }, [])

    return( 
        <form onSubmit={handleSubmit} id='connection-form'>
            <label>
                Pseudo:
                <input type="text" name="nickname" value={input.nickname} onChange={handleInput} />
            </label>
            <label>
                profil
                <input type='file' accept="image/png, image/gif, image/jpeg" name="profilePic" onChange={fileChange}/>
            </label>
            <input type="submit" value="Submit"/>
            <img src={profilePreview} />
        </form>
    )
}
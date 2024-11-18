import { useState } from "react"
import axiosInstance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

export default function UserCreation()
{
    const [file, setFile] = useState(null)
    const [input, setInput] = useState({
        nickname: "",
        password: "",
        profile: "",
        mail: "",
        isEmploye: false
    });

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData();

        // Update the formData object
        formData.append(
            "profilePic",
            file,
            file.name
        );

        // Details of the uploaded file
        console.log(file);

        // Request made to the backend api
        // Send formData object
        axiosInstance.post("/image/profileupload", formData);
        axiosInstance.post("/user/create", input)
        .then(res => {
            if(res.data.error) return
            navigate("/admin/users")
        })
    }
    
    const fileChange = (e) => {
        setFile(e.target.files[0])
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
            isEmploye: !input.isEmploye,
        }));
    }

    return(
        <form onSubmit={handleSubmit} id='connection-form'>
            <label>
                Pseudo:
                <input type="text" name="nickname" value={input.nickname} onChange={handleInput} />
            </label>
            <label>
                Mot de passe:
                <input type="text" name="password" value={input.password} onChange={handleInput}/>
            </label>
            <label>
                Employé
                <input type="checkbox" onChange={handleInputCheck} checked={input.isEmploye}/>
            </label>
            <label>
                profil
                <input type='file' name="profilePic" onChange={fileChange}/>
            </label>
            <input type="submit" value="Submit"/>
        </form>
    )
}
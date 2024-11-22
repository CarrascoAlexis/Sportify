import { useState } from "react"
import axiosInstance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() 
{
    const [file, setFile] = useState(null)
    const [input, setInput] = useState({
        nickname: "",
        password: "",
        profile: "",
        mail: "",
        isEmploye: "0"
    });

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("test")

        const formData = new FormData();
        axiosInstance.post("/user/create", input)
        .then(res => {
            console.log(res)
            if(res.data.error) return
            if(file != null || file != undefined)
            { 
                formData.append(
                    "profilePic",
                    file,
                    file.name
                );
            }
            formData.append("userId", res.data.insertId)
            axiosInstance.post("/image/profileupload/", formData);
            navigate("/compte/connexion")
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
                profil
                <input type='file' name="profilePic" onChange={fileChange}/>
            </label>
            <input type="submit" value="Submit"/>
        </form>
    )
}
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext();

export default function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const [ephemeralSession, setEphemeralSession] = useState(true)
    const navigate = useNavigate();

    const loginAction = async (data) => {


        axios.get(`http://localhost:5000/user/connect`, {"params": {"nickname" : data.nickname, "password": data.password, "ephemeral": data.ephemeral}})
        .then(res => {
            if(res.data.error == undefined && res.data.token != undefined)
            {
                setUser(res.data.user);
                setToken(res.data.token);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("ephemeral", data.ephemeral)
                if(data.ephemeral == false) setEphemeralSession(false)
                else setEphemeralSession(true)
                navigate("/compte");
                return
            }
            console.log("connection échouée")
            document.getElementById('connection-form').classList.add("error")
        })
        .catch(error => {
            console.log(error);
        });
    };

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
        navigate("/connexion");
        return <Navigate to="/connexion" />;
    };

    const firstLog = () => {
        if(localStorage.getItem("ephemeral") == "true") logOut()
        if(localStorage.getItem("token") == undefined || localStorage.getItem("token") == null || localStorage.getItem("ephemeral") == true)
        {
            setUser(null);
            setToken("");
            localStorage.removeItem("token");
            return
        }
        axios.get(`http://localhost:5000/user/getSession`, {"params": {"token": localStorage.getItem("token")}})
        .then(res => {
            console.log(res)
            if(res.data.nickname == undefined)
            {
                navigate("/connexion")
                return
            }
            setToken(localStorage.getItem("token"))
            setUser(res.data)
            console.log(res.data)
        })
    }

    const updateConnection = () => {
        if(user != null)
        {
            return true
        }
        if(localStorage.getItem("token") != null && localStorage.getItem("token") != "")
        {
            if(localStorage.getItem("ephemeral") == "true") logOut()
            firstLog()
            return true
            // ON crée une nouvelle session ici
        }
        return false;
    }

    return(
        <AuthContext.Provider value={{ token, user, loginAction, logOut, firstLog, updateConnection,  ephemeralSession }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
  return useContext(AuthContext);
};
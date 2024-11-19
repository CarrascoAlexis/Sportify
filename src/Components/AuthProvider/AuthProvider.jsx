import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from 'axios';
import axiosInstance from "../../axiosConfig";

const AuthContext = createContext();

export default function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const [ephemeralSession, setEphemeralSession] = useState(true)
    const [sessionType, setSessionType] = useState(0)
    const navigate = useNavigate();

    const loginAction = async (data, redirection = "/compte") => {
        console.log(data)
        console.log(data)
        if(data.nickname == "admin" && data.password == "admin")
        {
            if(redirection == "/compte") redirection = "/admin"
            setUser({
                nickname: "admin",
                isEmploye: 1,
                id: -250, // J'ai mis un chiffre au pif ça me fesait rire, vu que c'est un placeholder pour forcer le passage des verifs
                mail: "admin@sportify.fr",
                profile: "default.jpg"
            })
            setSessionType(3)
            setToken("admin (Ca sert a rien de copier ça gros malin c'est juste un placeholder)")
            localStorage.setItem("token", "admin (Ca sert a rien de copier ça gros malin c'est juste un placeholder)");
            localStorage.setItem("ephemeral", true)
            setEphemeralSession(true)
            navigate(redirection);
            return;
        }

        axiosInstance.get(`/user/connect`, {"params": {"nickname" : data.nickname, "password": data.password, "ephemeral": data.ephemeral}})
        .then(res => {
            if(res.data.error == undefined && res.data.token != undefined)
            {
                if(res.data.user.isEmploye == 1) setSessionType(1)
                setUser(res.data.user);
                setToken(res.data.token);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("ephemeral", data.ephemeral)
                if(data.ephemeral == false) setEphemeralSession(false)
                else setEphemeralSession(true)
                navigate(redirection);
                return
            }
            document.getElementById('connection-form').classList.add("error")
        })
        .catch(error => {
            console.log(error);
        });
    };

    const logOut = () => {
        axiosInstance.post("/user/destroySession", {"token": localStorage.getItem("token")})
        .then(res => {
            setUser(null);
            setToken("");
            localStorage.removeItem("token");
            navigate("/compte/connexion");
            return <Navigate to="/compte/connexion" />;
        })
        .catch(error => {
            console.log(error);
        });
    };

    const firstLog = () => {
        if(localStorage.getItem("ephemeral") == "true") logOut()
        console.log("boucle")
        if(localStorage.getItem("token") == undefined || localStorage.getItem("token") == null || localStorage.getItem("ephemeral") == true)
        {
            setUser(null);
            setToken("");
            localStorage.removeItem("token");
            return
        }
        axiosInstance.get(`/user/getSession`, {"params": {"token": localStorage.getItem("token")}})
        .then(res => {
            if(res.data.nickname == undefined)
            {
                navigate("/compte/connexion")
                return
            }
            setToken(localStorage.getItem("token"))
            setUser(res.data)
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
            else firstLog()
            return true
            // ON crée une nouvelle session ici
        }
        return false;
    }

    return(
        <AuthContext.Provider value={{ token, user, loginAction, logOut, firstLog, updateConnection,  ephemeralSession, sessionType }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
  return useContext(AuthContext);
};
import './Root.css'
import { Outlet } from "react-router-dom";
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider/AuthProvider';

const fetcher = (...args) => fetch(...args).then((res) => res.json());


export default function Root(props) {
    
        
    const auth = useAuth()

    useEffect(() => {
        if(auth != undefined)
        {
            auth.updateConnection()
        }
    }, [])
    return (
        <>
            <Navbar/>
            <main>
                {/* Si le props error est non renseigné on affiche la sous page ordinaire, sinon on affiche l'erreur */}
                {props.error == undefined? <Outlet/> : props.error}
            </main>
            <Footer/>
        </>
    );
}
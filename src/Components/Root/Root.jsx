import './Root.css'
import { Outlet } from "react-router-dom";
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

export default function Root(props) {


    return (
        <>
            <Navbar/>
            <main id="detail">
                {/* Si le props error est non renseigné on affiche la sous page ordinaire, sinon on affiche l'erreur */}
                {props.error == undefined? <Outlet/> : props.error}
            </main>
            <Footer/>
        </>
    );
}
import './Root.css'
import { Outlet } from "react-router-dom";
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

export default function Root(props) {
    return (
        <>
            <Navbar/>
            <main id="detail">
                {/* Si le props insertedElement est non renseigné on affiche la sous page ordinaire, sinon on affiche le props (peut contenir une errur ou un élément a afficher sur l'accueil) */}
                {props.insertedElement == undefined? <Outlet/> : props.insertedElement}
            </main>
            <Footer/>
        </>
    );
}
import './Root.css'
import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <header>
        <nav><Link to={"/"}>accueil</Link>          <Link to={"/test"}>test</Link></nav>
      </header>
      <main id="detail">
        <Outlet />
      </main>
      <footer>DU TEXTE EN FOOTER SALOPE</footer>
    </>
  );
}
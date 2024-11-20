import { Link } from 'react-router-dom'

export default function Footer() {
    return(
        <footer>
            <div className='container row'>
                <div className='col-3 white-text' id='footer-title'>
                    <h2>Sportify</h2>
                    <p>Sous titre</p>
                </div>
                <div className='col-7'>
                    <table id='footer-table' className='table-full-w'>
                        <tr className='white-text'>
                            <th>Pages</th>
                            <th>Contacts</th>
                            <th>Légal</th>
                        </tr>
                        <tr>
                            <td><Link to="/">Accueil</Link></td>
                            <td><Link to="/contact">Contact</Link></td>
                            <td>aa</td>
                        </tr>
                    </table>
                </div>
            </div>
        </footer>
    )
}
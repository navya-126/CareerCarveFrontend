
import {Link} from "react-router-dom"

import "./index.css"

const Header=()=>(
        <header className="header-container"> 
            <nav className="nav-container">
                <img src="https://www.careercarve.com/Career_Carve_Logo__1_-removebg-preview%202.png" alt="CareerCarve" className="website-logo"/>
                <ul className="nav-links-items">
                    <li>  <Link to="/" className="nav-link"> Home </Link></li>
                    <li> <Link  to="/mentors" className="nav-link"> Mentors </Link> </li>
                   <li> <Link to="/booking-history" className="nav-link">BookingHistory </Link>  </li>
                   <li> <Link to="/slot-booking" className="nav-link">SlotBooking </Link>  </li>
                </ul>
            </nav>
        </header>
)

export default Header;

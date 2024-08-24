import {Link} from "react-router-dom"
import Header from "../Header"
import "./index.css"


const Home =()=>{

   
  
        return (
            <>
            <Header/>
            
            <div className="home-container">
                <div className="description-container">
                    <h1 className="heading">From <span className="heading-style">resume</span> to <span className="heading-style">final interview prep</span></h1>
                    <p className="text">We've got you covered</p>
                    <Link to="slot-booking"><button className="custom-button">Book 1X1</button></Link>
                    
                </div>
                <div className="landing-img-container">
                    <img src="https://profile-picture-and-logo.s3.amazonaws.com/CareerCarve+App/Public/LandingPageImg_1.jpg" alt="Landing img" className="landing-img"/>
                </div>
                
            </div>
            
            
            
            </>

        )
    
}

export default Home
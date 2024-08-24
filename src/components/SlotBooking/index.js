
import {Component} from "react"
import {v4 as uuidv4} from "uuid"
import Popup from 'reactjs-popup';
import Header from "../Header"

import "./index.css"

const interestList=[
    {
        id:uuidv4(),
        name: " Logistics manager"
    },{
        id:uuidv4(),
        name:"Marketing manager"
    },
    {
        id:uuidv4(),
        name:"Business operations manager"
    },
    {
        id:uuidv4(),
        name:" Human resources manager"
    },
    {
        id:uuidv4(),
        name:" Purchasing manager"
    },
    {
        id:uuidv4(),
        name:"Financial analyst"
    },
    {
        id:uuidv4(),
        name:"Operation analyst"
    },
    {
        id:uuidv4(),
        name:"Investment banker"
    },
    {
        id:uuidv4(),
        name:" Management consultant"
    },
    {
        id:uuidv4(),
        name:"Chief executive officer"
    },
    {
        id:uuidv4(),
        name:" Finance manager"
    },
    {
        id:uuidv4(),
        name:" Product manager"
    },
    {
        id:uuidv4(),
        name:"Business intelligence analyst"
    },
]

class SlotBooking extends Component{
    state={name:"",studentAva:true,studentInterest:interestList[0].name,mentorList:[],mentorExpertiseRoles:[],mentorName:"Gopi",timer:"30 min",role:"Product Mangaer",price:2000,isPremium:false}

    onChangeUserName=(event)=>{
        this.setState({name:event.target.value})
    }

    selectAvailability=(event)=>{
        this.setState({studentAva:event.target.value})
    }

    onSelectInterest=(event)=>{
        this.setState({studentInterest:event.target.value})
    }

    getMentorsExpertise=async()=>{
        const {mentorName} =this.state 
        console.log(mentorName)
        const url=`https://careercarveapi.onrender.com/mentors/roles?name=${mentorName}`
        const options={
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }
        const response= await fetch(url,options)
        const data=await response.json() 
        console.log(data)
        const updateData=data.map(eachItem=>({
            skills:eachItem.areas_of_expertise.split(",")

    }))
        this.setState({mentorExpertiseRoles:updateData}) 
        
    }

    getMentorsDetails=async ()=>{
        const {studentInterest}=this.state
        console.log(studentInterest)
        const url=`https://careercarveapi.onrender.com/mentors`
        const options={
            method:"GET",headers:{
                "Content-Type":"application/json"
            }
        }
        const response= await fetch(url,options)
        const data=await response.json() 
        console.log(data)
        this.setState({mentorList:data})
    }

    
    onChangeMentor=(event)=>{
        this.setState({mentorName:event.target.value}, this.getMentorsExpertise)
    }

    onSelectRoles=(event)=>{
        this.setState({role:event.target.value})
    }

    onSetTimerForInterview=(event)=>{
        this.setState({timer:event.target.value},this.onBookingPrice)
    }




    onSubmitStudentDetails= async (event)=>{
        event.preventDefault()
        const {name,studentAva,studentInterest}=this.state 
        if (name===""){
            alert("Please enter a name")
            return
        }

        const userDetails={
            name,
            availability:studentAva,
            areaOfInterest:studentInterest
        }

       const url="https://careercarveapi.onrender.com/students"
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userDetails)
        }

        const response= await fetch(url,options)
        const data=await response.json() 
        console.log(data) 
        this.setState({name:""})
        if (response.ok){
            this.getMentorsDetails()
        }
    }

    onBookingPrice=()=>{
        const {mentorList,mentorName}=this.state
        const {timer}=this.state
        if (timer==="30 min"){
            this.setState({price:2000})
        }
        else if (timer==="45 min"){
            this.setState({price:3000})
        }
        else{
            this.setState({price:4000})
        }

        const premium=mentorList.find(eachItem=>(eachItem.name===mentorName))
        this.setState({isPremium:premium.is_premium})


    }


    onBookingSlot=async (event)=>{
        event.preventDefault()
        const {mentorList,role,timer,mentorName,price,isPremium}=this.state
        const mentorDetails=mentorList.find(eachMentor=>eachMentor.name===mentorName)
        if (!mentorDetails){
            alert("Please select a mentor")
            return
        }

        const totalPrice=price+isPremium?1000:0

        const url="https://careercarveapi.onrender.com/booking"
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                areaOfTeaching:role,
                sessionTime:timer,
                dateTime: new Date(),
                price:totalPrice
                  
            })

       
        }
        const response=await fetch(url,options)
        const data=await response.json()
        console.log(data)

        alert("successfully Booking your slot")
            
    }


  



    render (){
        const {name,studentAva,studentInterest,mentorList,mentorName,mentorExpertiseRoles,role,timer,price,isPremium}=this.state
        return (
            <>
            <Header/>
            <div className="slot-booking-container">
                <div className="slot-card-container">
                <div className="slot-description">
                    <h1 className="text-heading">Placement Preparedness Perfected</h1>
                    <p className="text-description">Our mission is to prepare every MBA student to crack their dream job. We believe that with the right guidance, training, and support, every aspiring professional can excel in the fiercely competitive job market. We are committed to providing comprehensive and personalized training programs that prepare students to conquer the challenges of the corporate world.</p>

                </div>
                <form className="form-container" onSubmit={this.onSubmitStudentDetails}> 
                    <label className="label-text" htmlFor="name">NAME</label>
                    <input className="input-field" id="name" type="text" value={name} placeholder="Enter the student name" onChange={this.onChangeUserName} />
                    <label className="label-text" htmlFor="availability">AVAILABILITY</label>
                    <select id="availability" value={studentAva} className="input-field" onChange={this.selectAvailability}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                    <label className="label-text" htmlFor="areaOfInterest">AREA OF INTEREST</label>
                    <select className="input-field" id="reaOfInterest" value={studentInterest} onChange={this.onSelectInterest}>
                        
                        {
                            interestList.map((item)=>(
                                <option key={item.id} value={item.name}>{item.name}</option>
                            ))
                        }
                        
                    </select>
                    <button className="submit-button" type="submit">Submit</button>
                </form>

            </div>
            <form className="mentor-name-container"  onSubmit={this.onBookingSlot}>

                <div className="container">
                    <label className="label-text">MENTOR NAMES</label>
                    <select className="input-field" value={mentorName} onChange={this.onChangeMentor}>
                        {
                            mentorList.map((mentor,index)=>(
                                <option key={index} value={mentor.name}>{mentor.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="container">
                    <label className="label-text">MENTOR EXPERTISE</label>
                    <select className="input-field" value={role} onChange={this.onSelectRoles}>
                       {
                        mentorExpertiseRoles.map(eachItem=>(
                            eachItem.skills.map((skill)=>(
                                <option key={skill}>{skill}</option>
                            ))
                            
                        ))
                       }
                    </select>
                </div>
                <div className="container">
                    <label className="label-text">TIMER</label>
                    <select className="input-field" value={timer} onChange={this.onSetTimerForInterview}>
                        <option value="30 min">30 min</option>
                        <option value="45 min">45 min</option>
                        <option value="60 min">60 min</option>
                    </select>

                </div>
                        <Popup
                            trigger={ <button className="submit-button">Book</button>}
                            modal
                        >
                            {close => (
                            <div className="popup-container">
                            <div className="modal">
                                <button className="close" onClick={close}>
                                &times;
                                </button>
                                <div className="header"> Booking Interview Slot </div>
                                <div className="content">
                                    
                                   
                                    <span> <p className="label-text-booking">Mentor: {mentorName}</p></span><span><p className="label-text-booking">Role: {role}</p></span><p className="label-text-booking">Mentor Premium : {isPremium?1000:0}</p><span></span>
                                    <p className="label-text-booking">Timer: {timer}</p>
                                    <p className="label-text-booking">Price: {price}</p>
                                    <h1 className="label-text-booking">Total Price:{price+isPremium?1000:0}</h1>
                                    
                                    
                                </div>
                                <div className="actions">
                                <button
                                    className="submit-button"
                                    onClick={() => {
                                    close();
                                    }}
                                >
                                    close Button
                                </button>
                                <button className="submit-button" type="submit">Confirm</button>
                                </div>
                            </div>
                            </div>
                            )}
                        </Popup>

            </form>

            </div>
            
            </>


        )
    }
}


export default SlotBooking
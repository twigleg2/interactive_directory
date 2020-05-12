import React from 'react';
import './PersonViewer.css';


// import MaleImage from '../public/images/Male.jpg';
// import FemaleImage from '../public/images/Female.jpg';

const MaleImage = "Male.jpg";
const FemaleImage = "Female.jpg"

function PersonViewer(props) {
  return(
    <div className="PersonViewer">
      <div className="PersonCard">
        <img className="Headshot" src={getProfilePicture(props.selectedPerson.profilePicture, props.selectedPerson.gender)} alt="headshot"/>
        <div className="PersonInfo">
          <div className="Name">{props.selectedPerson.firstName + " " + props.selectedPerson.lastName}</div>
          <div className="Room">Room {props.selectedPerson.roomNumber}</div>
        </div>
      </div>
    </div>
  )
}

function getProfilePicture(profilePicture, gender) {
  if(profilePicture){
    //profile picture exists, go get it
    return "images/people/" + profilePicture;
  }
  else {
    return "images/people/" + (gender === "MALE" ? MaleImage : FemaleImage);
  }
}

export default PersonViewer;
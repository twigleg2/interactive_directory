import React from 'react';
import './ServiceViewer.css';

function ServiceViewer(props) {

    let people = [];
    for(let person of props.selectedService.people) {
        people.push(
        <div className="Person" key={person.id}>{person.firstName} {person.lastName} - {person.roomNumber}</div>
        )
    }

    return(
        <div className="ServiceViewer">
            <h1 className="Title">{props.selectedService.name} - Room {props.selectedService.roomNumber}</h1>
            {people}
        </div>
    );
}

export default ServiceViewer;

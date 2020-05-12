import React from 'react';
import './PersonListItem.css';

function PersonListItem(props) {
    return (
        <div className="PersonListItem" onClick={() => onClick(props)} key={props.id}>
            <span className="name">{props.person.lastName + ", " + props.person.firstName}</span>
            <span className="dots"/>
            <span className="roomNum">{props.person.roomNumber}</span>
        </div>
    )
}

function onClick(props){
    props.selectPerson(props.person)
}

export default PersonListItem;
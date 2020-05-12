import React from "react";
import "./ServiceListItem.css";

function ServiceListItem(props) {
    return (
        <div className="ServiceListItem" onClick={() => onClick(props)} key={props.id}>
            <span className="name">{props.service.name}</span>
            <span className="dots"/>
            <span className="roomNum">{props.service.roomNumber}</span>
        </div>
    )
}

function onClick(props){
    props.selectService(props.service)
}

export default ServiceListItem;
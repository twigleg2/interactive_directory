import React from 'react';
import ServiceListItem from './ServiceListItem';
import './ServiceDirectory.css'

function ServiceDirectory (props) {

   let serviceListItems = [];
   for(let service of props.services) { // might be null at start?
    serviceListItems.push(<ServiceListItem
        selectService = {props.selectService}
        service = {service}
        key = {service.id}
        />);
   }

   return (
       <div className="ServiceDirectory">
           <h1>Service Directory</h1>
           {serviceListItems}
       </div>
   )
}

export default ServiceDirectory;
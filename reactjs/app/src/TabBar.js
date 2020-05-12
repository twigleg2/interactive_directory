import React from 'react';
import Tab from './Tab.js';
import './TabBar.css';

function TabBar(props){

    let tabs = [];
    for(let page of props.pages) {
        let cssClassName = "";
        if(props.selectedPage === page) {
            cssClassName = "Selected";
        }

        tabs.push(<Tab 
            selectPage = {props.selectPage}
            tag={page.getTag()}
            page={page}
            key={page.getTag()}
            class={cssClassName}
        />);
    }

    return (
        <div className="TabBar">
            {tabs}
        </div>
    );
}


export default TabBar;
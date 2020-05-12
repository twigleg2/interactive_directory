import React from 'react';
import classNames from 'classnames'
import './Tab.css';

function Tab(props) {
    let tabClass = classNames("Tab", props.class);
    return (
        <button className={tabClass} onClick={() => onClick(props)}>{props.tag}</button>
    );
}

function onClick(props) {
    props.selectPage(props.page);
}


export default Tab;
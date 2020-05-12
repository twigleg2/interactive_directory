import React from 'react';
import './InfoBox.css';

import {Fade} from 'react-slideshow-image'

const images = [
    'library.jpg',
    'winter.jpg',
    'fall.jpg',
    'stairs.jpg',
    // 'summer.jpg',
]

let imageLocation = 'images/backgrounds/';

const slideProps = {
    duration: 60000,
    transitionDuration: 2000,
    infinite: true,
    indicators: false,
    arrows: false,
    pauseOnHover: false,
    onChange: (oldIndex, newIndex) => {
        console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    }
}

function InfoBox(props) {
    let slides = []
    for(let image of images) {
        slides.push(
            <div className="each-slide">
                <div className="InfoBox" style={{backgroundImage: 'url(' + imageLocation + image + ')',backgroundSize: 'cover'}}>
                    <span className="SpecialSpacing"></span>
                    <span className="ShadowBox"><span className="Headline">Interactive Directory</span></span>
                    <span className="ShadowBox"><span className="Blurb">Touch a person or service</span></span>
                </div>
            </div>
        )
    }
    return (
        <div className="slide-container">
            <Fade {...slideProps}>
                {slides}
            </Fade>
        </div>
    )
}

export default InfoBox;
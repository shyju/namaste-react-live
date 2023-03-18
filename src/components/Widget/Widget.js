import { useState, useEffect } from "react";

import './Widget.css'

export const Widget = ({restaurant_widgets, widgetIndex, clickFunction}) => {
    const [widgetStyle, setWidgetStyle] = useState("widget");

    const listenScrollEvent = () => {
        if (window.scrollY < 73) {
            setWidgetStyle("widget");
            return; 
        } else if (window.scrollY > 70) {
            setWidgetStyle("widget-scroll");
            return; 
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);
      
        return () =>
          window.removeEventListener('scroll', listenScrollEvent);
      }, []);
      
    return (
        <div className={widgetStyle}>
        <ul>
            {
                restaurant_widgets?.map(({widget: {name}}, index) => 
                <li 
                key={index} 
                className= {widgetIndex === index && 'widget-column'}
                onClick={() =>clickFunction(index)}
                >{name}</li>)
            }
        </ul>
        </div>
    )
}
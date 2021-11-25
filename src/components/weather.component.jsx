import React from 'react'

const Weather = (props) => {
    return (
        <div className="container text-light">
            <div className="cards pt-4">
                <h1>{props.city}</h1>
                {props.lat ? <h3 className="px-4">Latitude: {props.lat}&deg;</h3> : null}
                {props.long ? <h3 className="px-4">Longitude: {props.long}&deg;</h3> : null}
                <h5 className="py-4">
                    <i className={`wi ${props.weatherIcon} display-1`}></i>
                </h5>
                {props.tempCelsius ? <h1 className="py-2">{props.tempCelsius}&deg;</h1> : null}
                {maxminTemp(props.tempMin, props.tempMax)}

                <h4 className="py-3">{props.description.charAt(0).toUpperCase() +
            props.description.slice(1)}</h4>

                {props.humidity ? <h4 className="py-3">Humidity: {props.humidity}</h4> : null}
            </div>
        </div>
    )
}


export default Weather;
function maxminTemp(min, max){
    if(min && max){
        return(
            <h3>
                <span className="px-4">Min: {min}&deg;</span>
                <span className="px-4">Max: {max}&deg;</span>
            </h3>
        )
    }
}

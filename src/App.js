import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Weather from './components/weather.component';
import Form from './components/form.component';

const apiKey = "fdb1d62b271d97a80a734e1e5bb466f3";

export default class App extends Component {
  
  constructor(){
    super();

    this.state={
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      tempCelsius: undefined,
      tempMax: undefined,
      tempMin: undefined,
      description: "",
      error: false,
      lat: undefined,
      long: undefined,
      humidity: undefined
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
  }

  inCelsius(temp){
    let cel = Math.floor(temp - 273.15);
    return cel;
  }

  getWeatherIcons(icons, rangeId){
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  getweather = async (e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if(city && country){
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`)
  
      const response = await api_call.json();
    
      console.log(response);

      this.setState({
        city: `${response.name},${response.sys.country}`,
        country: response.sys.country,
        main: response.weather[0].main,
        tempCelsius: this.inCelsius(response.main.temp),
        tempMin: this.inCelsius(response.main.temp_min),
        tempMax: this.inCelsius(response.main.temp_max),
        description: response.weather[0].description,
        error: false,
        humidity: response.main.humidity,
        lat: response.coord.lat,
        long: response.coord.lon
      })

      this.getWeatherIcons(this.weatherIcon, response.weather[0].id);
    }
    else{
      this.setState({error: true})
    }

    
  }

  render() {
    return (
      <div className="App">
        <Form loadWeather={this.getweather} error={this.state.error}/>
        <Weather city={this.state.city} tempCelsius={this.state.tempCelsius} tempMin={this.state.tempMin} tempMax={this.state.tempMax} description={this.state.description} weatherIcon={this.state.icon} humidity={this.state.humidity} lat={this.state.lat} long={this.state.long}/>
      </div>
    )
  }
}

